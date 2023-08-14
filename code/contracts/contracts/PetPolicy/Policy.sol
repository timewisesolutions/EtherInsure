// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PetPolicy {
    // there will be accident cover, accident + illness cover and comprehensive
    // for now $50 per month/dog and $30 per month/cat
    uint256 public immutable premium_per_annum; // $600 for dog and $360 for cat
    uint32 public immutable platform_fee_percent; // fix it to 3% for now
    // premium in Aud $
    uint256 constant dog_premium = 600 * (10 ** 18);
    uint256 constant cat_premium = 360 * (10 ** 18);
    uint256 constant dog_platform_fee = 18 * (10 ** 18);
    uint256 constant cat_platform_fee = 10.8 * (10 ** 18);
    // premium in Ethers
    uint256 constant dog_premium_eth = 0.212761 ether;
    uint256 constant cat_premium_eth = 0.127656 ether;
    uint256 constant dog_platform_fee_eth = 0.006383 ether;
    uint256 constant cat_platform_fee_eth = 0.003830 ether;

    enum PetType {
        DOG,
        CAT
    }

    constructor(uint256 _premium_per_annum, uint32 _platform_fee_percent) {
        premium_per_annum = _premium_per_annum;
        platform_fee_percent = _platform_fee_percent;
    }

    // includes the platform fee (in $= AUS)
    function get_premium_per_annum(
        string memory _pettype
    ) public pure returns (uint256) {
        //uint256 platform_fee = (premium_per_annum * platform_fee_percent) / 100;
        bytes32 pettype = bytes32(abi.encodePacked(_pettype));

        if (pettype == "Dog") {
            return (dog_premium + dog_platform_fee) / (10 ** 18);
        } else {
            return (cat_premium + cat_platform_fee) / (10 ** 18);
        }
    }

    function get_premium_per_annum_inEth(
        string memory _pettype
    ) public pure returns (uint256) {
        //uint256 total_amount = get_premium_per_annum(_pettype);
        // convert Aud$ to Eth using oracle. For now fix
        // $600 aud  = 0.212761 ETH
        // $360 aud  = 0.127656 ETH
        // $18 aud   = 0.006383 ETH (platform fee for dog)
        // $10.8 aud = 0.003830 ETH (platform fee for cat)
        bytes32 pettype = bytes32(abi.encodePacked(_pettype));
        if (pettype == "Dog") {
            return dog_premium_eth + dog_platform_fee_eth;
        } else {
            return cat_premium_eth + cat_platform_fee_eth;
        }
    }
}
