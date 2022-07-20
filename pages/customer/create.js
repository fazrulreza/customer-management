import { Formik } from 'formik';
import { useRouter } from 'next/router';
import {
  Container, Form, Button, Row, Col,
} from 'react-bootstrap';
import Layout from '../../layout';
import { genderOptions, stateOptions } from '../../lov';
import { renderForm, renderSelectForm } from '../../utils/pages';

const CreateCustomer = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        name: '',
        age: '',
        gender: 'male',
        location: 'Johor',
        description: '',
        email: '',
      }}
      validate={((values) => {
        const errors = {};
        if (!values.name) errors.name = 'Name is required';
        if (!values.age) errors.age = 'Age is required';
        if (Number.isNaN(values.age)) errors.age = 'Please enter a valid age';
        if (!values.gender) errors.gender = 'Gender is required';
        if (!values.location) errors.location = 'Location is required';
        if (!values.description) errors.description = 'Description is required';
        if (!values.email) errors.email = 'Email is required';
        return errors;
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const customerData = {
          name: values.name,
          age: parseInt(values.age, 10),
          gender: values.gender,
          location: values.location,
          description: values.description,
          email: values.email,
        };

        fetch('/api/customer/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customerData),
        })
          .then((res) => {
            if (res.status === 200) {
              setSubmitting(false);
              resetForm();
              router.push('/');
            }
          });
      }}
    >
      {
    ({
      values, errors, touched, handleChange, handleSubmit, handleBlur,
    }) => (
      <Layout>
        <Container fluid className="px-5">
          <h1 className="fw-bold text-center my-5">Create Customer</h1>
          <Row>
            <Col md={3} />
            <Col md={6}>
              <Form noValidate onSubmit={handleSubmit}>
                { renderForm(
                  values, '', '', 'input', 'text', true, touched, errors, handleChange, handleBlur, 'name', 'Name', false, 3, 9,
                )}
                { renderForm(
                  values, '', '', 'input', 'text', true, touched, errors, handleChange, handleBlur, 'age', 'Age', false, 3, 9,
                )}
                { renderForm(
                  values, '', '', 'input', 'text', true, touched, errors, handleChange, handleBlur, 'email', 'Email', false, 3, 9,
                )}
                <br />
                { renderSelectForm(
                  values, '', '', 'Gender', 'gender', genderOptions, handleChange, handleBlur, false, 3, 9,
                )}
                <br />
                { renderSelectForm(
                  values, '', '', 'Location', 'location', stateOptions, handleChange, handleBlur, false, 3, 9,
                )}
                { renderForm(
                  values, '', '', 'textarea', 'text', true, touched, errors, handleChange, handleBlur, 'description', 'Description', false, 3, 9,
                )}
                <br />
                <Button type="submit">Create</Button>
                {' '}
                <Button href="/" variant="danger">Cancel</Button>
              </Form>
            </Col>
            <Col md={3} />
          </Row>
        </Container>
      </Layout>
    )
}
    </Formik>
  );
};

export default CreateCustomer;
