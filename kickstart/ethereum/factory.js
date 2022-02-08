import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xF25fd4e740ADFa8f8Ff4B3912C9A0de03985839E"
);

export default instance;
