const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); // constructor
const web3 = new Web3(ganache.provider()); // instance
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const INITIAL_STRING = "hi there";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of the accounts. to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // Contract
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contact", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    const messageToSet = "bye";
    await inbox.methods.setMessage(messageToSet).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();

    assert.equal(message, messageToSet);
  });
});
