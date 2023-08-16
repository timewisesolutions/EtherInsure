// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Policy.sol";
uint256 constant dog_premium = 600;
uint256 constant fee_percent = 3;
uint256 constant insured_value = 25000;

contract DogPolicy is PetPolicy {
    constructor() PetPolicy(dog_premium, fee_percent, insured_value) {}
}
