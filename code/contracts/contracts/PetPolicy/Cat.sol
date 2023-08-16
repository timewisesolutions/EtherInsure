// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Policy.sol";
uint256 constant cat_premium = 360;
uint256 constant fee_percent = 3;
uint256 constant insured_value = 20000;

contract CatPolicy is PetPolicy {
    constructor() PetPolicy(cat_premium, fee_percent, insured_value) {}
}
