import { useRouter } from 'next/router';
import { Container, Button } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import DeleteCustomer from '../components/DeleteCustomer';
import Layout from '../layout';
import { getGenderLabel } from '../utils/pages';

const getLink = (id, process) => {
  const linkColor = process === 'view' ? 'secondary' : 'dark';
  const linkURL = process === 'view' ? `/customer/${id}` : `/customer/update/${id}`;
  return (
    <Button variant={linkColor} size="sm" href={linkURL}>
      {process.toUpperCase()}
    </Button>
  );
};

const getCols = (refresh) => [
  {
    Header: 'Name',
    accessor: 'name',
    minResizeWidth: 10,
    style: { whiteSpace: 'unset' },
  },
  {
    Header: 'Age',
    accessor: 'age',
    minResizeWidth: 10,
    style: { whiteSpace: 'unset' },
  },
  {
    Header: 'Location',
    accessor: 'location',
    Cell: ({ original: { location } }) => location.replace('Wilayah Persekutuan ', ''),
    minResizeWidth: 10,
    style: { whiteSpace: 'unset' },
  },
  {
    Header: 'Gender',
    accessor: 'gender',
    Cell: ({ original: { gender } }) => getGenderLabel(gender),
    minResizeWidth: 10,
    style: { whiteSpace: 'unset' },
  },
  {
    Header: '',
    Cell: ({ original: { id } }) => getLink(id, 'view'),
    minResizeWidth: 10,
    width: 80,
  },
  {
    Header: '',
    Cell: ({ original: { id } }) => getLink(id, 'update'),
    minResizeWidth: 10,
    width: 100,
  },
  {
    Header: '',
    Cell: ({ original: { id, name } }) => <DeleteCustomer id={id} name={name} refresh={refresh} />,
    minResizeWidth: 10,
    width: 80,
  },
];

const Index = ({ customer }) => {
  const router = useRouter();

  const refresh = () => router.replace(router.asPath);

  return (
    <Layout>
      <Container fluid className="px-5 text-center">
        <h1 className="fw-bold text-center my-5">Customer List</h1>
        <Button className="mb-3" href="/customer/create">Add Customer</Button>
        {' '}
        <Button className="mb-3" onClick={refresh}>Refresh</Button>
        <ReactTable
          className="text-center"
          data={customer}
          columns={getCols(refresh)}
          defaultPageSize={5}
          filterable
          defaultFilterMethod={
        (filter, row) => String(row[filter.id]).toUpperCase().includes(filter.value.toUpperCase())
}
        />
      </Container>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/customer');
  const customer = await res.json();

  return {
    props: { customer },
  };
};

export default Index;
