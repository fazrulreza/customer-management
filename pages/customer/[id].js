import Link from 'next/link';
import {
  Container, Card, Button, Row, Col,
} from 'react-bootstrap';
import Layout from '../../layout';

const Index = ({ customer }) => (
  <Layout>
    <Container>
      <h1 className="fw-bold text-center my-5">User Details</h1>
      <Row className="mb-3">
        <Col md={4} />
        <Col md={4}>
          <Card className="p-2">
            <Card.Body>
              <Card.Title>{customer.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{customer.location}</Card.Subtitle>
              <Card.Text>{customer.description}</Card.Text>
              <Button variant="primary" href={`mailto:${customer.email}`}>Email</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} />
      </Row>
      <Link href="/">← Back to home</Link>
    </Container>
  </Layout>
);

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/customer/${params.id}`);
  const customer = await res.json();

  return {
    props: { customer },
  };
};

export default Index;
