// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "../EtherPool/Vault.sol";
import "../Claims/MultiSigWallet.sol";

contract PetPolicy {
    // there will be accident cover, accident + illness cover and comprehensive
    // for now $50 per month/dog and $30 per month/cat
    uint256 public immutable premium_per_annum; // $600 for dog and $360 for cat
    uint256 public immutable platform_fee_percent; // fix it to 3% for now
    uint256 public immutable max_value_insured;
    uint256 public immutable aud_to_eth;
    uint256 public immutable eth_to_aud;
    uint32 public total_policies_count; // count of total policies
    uint32 public MAX_NO_POLICIES = 10000; // helps generate random policy number



    enum PetType {
        DOG,
        CAT
    }

    struct Policy {
        address policyHolder;
        string petIpfsLink;
        uint256 createdTime;
        uint256 endTime;
        uint256 policyNumber;
        uint256 max_amount_insured;
        uint256 claimCount;
        uint256 claimAmount; // should be always <= max_amount_insured
        uint256[] submitClaimTime; // there can be multiple claims
        uint256[] executeClaimTime;
    }
    mapping(address => uint256[]) public premiumsPaid; // address : premiums Paid
    mapping(address => Policy[]) public petPolicies;
    address[] policy_holders; // put policy holders address here
    // Additional Map: useful for eliminating if address does not
    //exist in policy_holders list
    mapping(address => bool) public _exists;

    // events
    event NewPolicy(
        address policyHolder,
        uint256 policyNumber,
        uint256 insured_amount
    );

    constructor(
        uint256 _premium_per_annum,
        uint256 _platform_fee_percent,
        uint256 _max_value_insured
    ) {
        premium_per_annum = (_premium_per_annum) * (10 ** 18);
        platform_fee_percent = (_platform_fee_percent);
        aud_to_eth = 0.00039 * (10 ** 18); // in wei or 0.000353174 ether
        eth_to_aud = 2588;
        max_value_insured = _max_value_insured;
    }
    // get conversion value (aud to eth)
    function get_aud_to_eth(uint256 aud_amount) public view returns (uint256) {
        return (aud_to_eth * aud_amount) / (10 ** 18);
    }

    // get conversion value (eth to aud)
    function get_eth_to_aud(uint256 eth_amount) public view returns (uint256) {
        return eth_to_aud * eth_amount;
    }

    // calculate platform fee (in Aud $)
    function get_platform_fee() public view returns (uint256) {
        uint256 fee = (premium_per_annum * platform_fee_percent) / 100;
        return fee;
    }

    // includes the platform fee (in $= AUS)
    function get_premium_per_annum() public view returns (uint256) {
        //bytes32 pettype = bytes32(abi.encodePacked(_pettype));
        return (premium_per_annum + get_platform_fee());
    }

    function get_premium_per_annum_inEth() public view returns (uint256) {
        return get_aud_to_eth(premium_per_annum + get_platform_fee());
    }

    function get_max_insured_value() public view returns (uint256) {
        return max_value_insured;
    }

    // only wallet owner can create a policy for him/her
    function create_policy(
        string memory _petIpfsLink
    ) public payable returns (uint256) {
        console.log("create policy  msg sender: %s", msg.sender);
        require(bytes(_petIpfsLink).length != 0, "Invalid Pet IPFS link");
        uint256 premium = get_premium_per_annum_inEth();
        require(msg.value >= premium, "Insufficient funds!");

        Policy memory newpolicy;
        newpolicy.policyHolder = msg.sender;
        newpolicy.petIpfsLink = _petIpfsLink;
        newpolicy.createdTime = block.timestamp;
        newpolicy.endTime = block.timestamp + 60 * 60 * 24 * 365;
        newpolicy.policyNumber =
            uint(
                keccak256(
                    abi.encodePacked(
                        msg.sender,
                        block.timestamp,
                        total_policies_count
                    )
                )
            ) %
            MAX_NO_POLICIES;

        newpolicy.max_amount_insured = max_value_insured;
        petPolicies[msg.sender].push(newpolicy); // update petPolicies map
        premiumsPaid[msg.sender].push(premium); // update premium paid

        total_policies_count++;

        if (!_exists[msg.sender]) {
            policy_holders.push(msg.sender);
            _exists[msg.sender] = true; 
        }
        emit NewPolicy(
            msg.sender,
            newpolicy.policyNumber,
            newpolicy.max_amount_insured
        );

        //return extra payment
        if (msg.value > premium){
            (bool sent,  ) = msg.sender.call{value: (msg.value - premium)}("");
            require(sent, "Failed to return extra payment");
            //payable(msg.sender).transfer(msg.value - premium);
        }


        return newpolicy.policyNumber;
    }

    function get_policy_details(
        uint256 _policyNumber
    ) public view returns (Policy memory p, uint256 premiumpaid) {
        console.log("get policy details msg sender: %s",  msg.sender);
        require(_exists[msg.sender], "You dont have any policy");
        Policy[] memory policies = petPolicies[msg.sender];
        for (uint i = 0; i < policies.length; i++) {
            if (policies[i].policyNumber == _policyNumber) {
                require (policies[i].policyHolder == msg.sender, "Not your policy");
                require(premiumsPaid[msg.sender][i] > 0, "Policy premium not paid");
                return (policies[i], premiumsPaid[msg.sender][i]);
            }
        }
        assert(false);
    }

    function get_premiums_paid(address addr)  public view returns (uint256[] memory) {
        return premiumsPaid[addr];
    }

    function get_pet_policies(address addr)  public view returns (Policy[] memory) {
        return petPolicies[addr];
    }

    function get_exists(address addr)  public  view returns (bool) {
        return _exists[addr];
    }

    function get_policy_exists_from_policy_number(uint256 _policyNumber) public view returns (bool) {
        require(_exists[msg.sender], "You dont have any policy");
        Policy[] memory policies = petPolicies[msg.sender];
        for (uint i = 0; i < policies.length; i++) {
            if (policies[i].policyNumber == _policyNumber) {
                require (policies[i].policyHolder == msg.sender, "Not your policy");
                require(premiumsPaid[msg.sender][i] > 0, "Policy premium not paid");
                require( block.timestamp < policies[i].endTime, "Policy expired");
                return true;
            }
        }
        return false;
    }

    // Should be called by multisig wallet when a claim is submitted
    function submitClaim(uint256 _policyNumber, uint256 _amount) external {
        require(_exists[msg.sender], "You dont have any policy");
        Policy[] storage policies = petPolicies[msg.sender];
        for (uint i = 0; i < policies.length; i++) {
            if (policies[i].policyNumber == _policyNumber) {
                require(premiumsPaid[msg.sender][i] > 0, "Policy premium not paid");
                require( block.timestamp < policies[i].endTime, "Policy expired");
                require(_amount > 0 && _amount <= policies[i].max_amount_insured , "amount >0 and <maxAmount insured");
                policies[i].claimCount = policies[i].claimCount + 1;
                policies[i].claimAmount += _amount;
                policies[i].submitClaimTime.push(block.timestamp);
                break;
            }
        }
    }

    function executeClaim(uint256 _policyNumber,address claimerAddress, uint256 _amount, address _vault) external {
        //uint256 claimTime;
        Policy[] storage policies = petPolicies[claimerAddress];
        for (uint i = 0; i < policies.length; i++) {
            if (policies[i].policyNumber == _policyNumber) {
                require(policies[i].policyHolder == claimerAddress, "Wrong Claimer Address" );
                require(premiumsPaid[claimerAddress][i] > 0, "Policy premium not paid");
                require( block.timestamp < policies[i].endTime, "Policy expired");
                require(_amount > 0 && _amount <= policies[i].max_amount_insured , "amount >0 and <maxAmount insured");
                uint256 amount_in_eth = _amount * aud_to_eth;
                (bool sent, ) = _vault.call(abi.encodeWithSignature("transferEther(address,uint256)", claimerAddress, amount_in_eth));
                //Vault(payable(_vault)).transferEther(policies[i].policyHolder, amount_in_eth);
                if (sent == true){
                    policies[i].max_amount_insured -= _amount;
                    policies[i].executeClaimTime.push(block.timestamp);
                    //claimTime = block.timestamp;
                }
                break;
            }
        }
    }

    receive() external payable {}

    fallback() external payable {}
}