import React, { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

function ContributeForm({ address }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(address);

    setLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={onSubmit} error={!!error}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          label="ether"
          labelPosition="right"
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>
      <Message error header="Oops" content={error} />
      <Button loading={loading} primary>
        Contribute!
      </Button>
    </Form>
  );
}

export default ContributeForm;
