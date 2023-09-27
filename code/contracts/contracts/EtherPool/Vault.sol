// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract Vault is PaymentSplitter {
    uint256 DANGER_MARK_LEVEL = 1 ether;
    constructor(
        address[] memory payees,
        uint256[] memory shares
    ) payable  PaymentSplitter(payees, shares) {}

    function get_balance() public view returns (uint256) {
        return address(this).balance;
    }

    function depositEther() payable external {
        DANGER_MARK_LEVEL = address(this).balance/2;
        emit PaymentReceived(_msgSender(), msg.value);
    }

    function transferEther(address _to, uint256 _amount) external returns (bool){

        require(_amount <= DANGER_MARK_LEVEL, "Not enough Ether");
        uint256 amount = address(this).balance - _amount;
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "Failed to Claim Ether");
        return true;
    }

}