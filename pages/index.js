import { Container } from "react-bootstrap";
import ReactTable from 'react-table-v6';


const getCols = () => [
    {
      Header: 'Name',
      accessor: 'name',
      minResizeWidth: 10,
      style: { whiteSpace: 'unset' },
    },
    // {
    //   Header: '',
    //   Cell: ({ original: { id: x } }) => <UserDetails id={x} />,
    //   minResizeWidth: 10,
    //   width: 50,
    // },
    // {
    //   Header: '',
    //   Cell: (
    //     { original:
    //       {
    //         id: a, username: b, email: c, phone_no: d, skillsets: e, hobby: f
    //       }
    //     }) => <UpdateUser id={a} username={b} email={c} phone_no={d} skillsets={e} hobby={f} refetch={refetch} />,
    //   minResizeWidth: 10,
    //   width: 50,
    // },
    // {
    //   Header: '',
    //   Cell: ({ original: { id: x, username: y } }) => <DeleteUser id={x} username={y} refetch={refetch} />,
    //   minResizeWidth: 10,
    //   width: 50,
    // },
  ];


const Index = ({customer}) => {
    return (
        <Container>
            <h1 className="display-1 fw-bold text-center mb-5">Customer List</h1>
            <ReactTable
                data={customer}
                columns={getCols()}
                defaultPageSize={10}
                filterable
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).toUpperCase().includes(filter.value.toUpperCase())}
                style={({
                    fontSize: 13,
                })}
            />
        </Container>
    )
};


export const getStaticProps = async () => {
    const res = await fetch('http://localhost:3000/api/customer');
    const customer = await res.json();

    return {
        props: {
            customer,
        },
        revalidate: 10,
    }
}

export default Index;