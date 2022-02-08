import React from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { useRouter } from "next/router";

function CampaignsComponent({
  address,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) {
  const router = useRouter();
  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Adress of Manager",
        description:
          "Manager created this campaign and can create a request to withdraw the eth",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution (wei)",
        description:
          "You mustt contribute at least this amount of wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from the contract. Request must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to the campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <a>
              <Button
                style={{ marginTop: "10px" }}
                primary
                onClick={() => router.push(`/campaigns/${address}/requests`)}
              >
                View Requests
              </Button>
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

CampaignsComponent.getInitialProps = async ({ query: { address } }) => {
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default CampaignsComponent;
