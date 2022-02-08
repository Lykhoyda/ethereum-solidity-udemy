// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function doMath(int256 a, int256 b) public {
        a + b;
        b - a;
        b * a;
        a == 0;
    }
}
