import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

function CampaignNew() {
  const router = useRouter();
  const [minimalContribution, setMinimalContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setIsLoading(true);
    try {
      await factory.methods.createCampaign(minimalContribution).send({
        from: accounts[0],
      });

      router.push("/");
    } catch (error) {
      setErrorMessage(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <h3>Campaign New</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            value={minimalContribution}
            onChange={(event) => setMinimalContribution(event.target.value)}
            label="wei"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="oops!" content={errorMessage} />
        <Button loading={isLoading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

export default CampaignNew;
