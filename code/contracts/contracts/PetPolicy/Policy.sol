// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PetPolicy {
    // there will be accident cover, accident + illness cover and comprehensive
    // for now $50 per month/dog and $30 per month/cat
    uint256 public immutable premium_per_annum; // $600 for dog and $360 for cat
    uint256 public immutable platform_fee_percent; // fix it to 3% for now
    uint256 public immutable max_value_insured;
    uint256 public immutable aud_to_eth;
    uint256 public immutable eth_to_aud;

    enum PetType {
        DOG,
        CAT
    }

    constructor(
        uint256 _premium_per_annum,
        uint256 _platform_fee_percent,
        uint256 _max_value_insured
    ) {
        premium_per_annum = (_premium_per_annum) * (10 ** 18);
        platform_fee_percent = (_platform_fee_percent);
        aud_to_eth = 0.000353174 * (10 ** 18); // in wei or 0.000353174 ether
        eth_to_aud = 2830;
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
}
