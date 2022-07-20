import { Container, Navbar } from 'react-bootstrap';
import Head from 'next/head';

const Layout = ({ children }) => (
  <Container fluid>
    <Head>
      <title>Customer Management</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar sticky="top" bg="dark" variant="dark" className="justify-content-center">
      <Navbar.Text>Customer Management</Navbar.Text>
    </Navbar>
    {children}
    <Navbar className="justify-content-center mt-5" sticky="bottom" bg="dark" variant="dark">
      <Navbar.Text>For demo purposes</Navbar.Text>
    </Navbar>
  </Container>
);

export default Layout;
