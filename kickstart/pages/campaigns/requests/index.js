import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useRouter } from "next/router";
import Campaign from "../../../ethereum/campaign";
import Layout from "../../../components/Layout";
import RequestRow from "../../../components/RequestRow";

function RequestIndex({ address, requests, requestCount, approversCount }) {
  const router = useRouter();
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          id={index}
          key={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <h3>Request List</h3>
      <a>
        <Button
          primary
          floated="right"
          style={{ marginBottom: "10px" }}
          onClick={() => router.push(`/campaigns/${address}/requests/new`)}
        >
          Add request
        </Button>
      </a>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requestCount} requests</div>
    </Layout>
  );
}

RequestIndex.getInitialProps = async ({ query: { address } }) => {
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return {
    address,
    requests,
    requestCount,
    approversCount,
  };
};

export default RequestIndex;
