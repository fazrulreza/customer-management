import {
  Container, Button, Modal, Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useState } from 'react';

const DeleteCustomer = ({ id, name, refresh }) => {
  const [isOpen, setOpen] = useState(false);

  const onToggle = () => setOpen(!isOpen);

  return (
    <Formik
      enableReinitialize
      initialValues={{ id }}
      onSubmit={() => {
        fetch(`/api/customer/delete/${id}`)
          .then((res) => {
            if (res.status === 200) {
              setTimeout(() => refresh(), 1000);
            }
          });
      }}
    >
      {
        ({ handleSubmit }) => (
          <div>
            <Button size="sm" variant="danger" onClick={onToggle}>DELETE</Button>
            <Modal show={isOpen} onHide={onToggle} scrollable size="lg" centered>
              <Modal.Header closeButton>
                <Modal.Title>Delete Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid>
                  <Form onSubmit={handleSubmit}>
                    <p>{`This will delete customer ${name}`}</p>
                    <p>Are you sure?</p>
                    <br />
                    <Button variant="secondary" onClick={onToggle}>
                      Cancel
                    </Button>
                    {'  '}
                    <Button variant="danger" type="submit">
                      Delete
                    </Button>
                  </Form>
                </Container>
              </Modal.Body>
            </Modal>
          </div>
        )
}
    </Formik>
  );
};

export default DeleteCustomer;
