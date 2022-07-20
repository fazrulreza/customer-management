import {
  Badge, Form, Col, Row,
} from 'react-bootstrap';

export const getGenderLabel = (gender) => {
  const gColor = gender === 'female' ? 'info' : 'success';
  return (
    <Badge bg={gColor}>
      {gender.toUpperCase()}
    </Badge>
  );
};

/**
 * render select / dropdown form
 * @param {Object} object main object with value
 * @param {string} formName form name
 * @param {number} index index number
 * @param {string} name form question
 * @param {string} param parameter name
 * @param {string []} options LOV
 * @param {Function} handleChange handleChange handler
 * @param {Function} handleBlur handleBlur handler
 * @param {boolean} [true] row render question in single row
 * @param {number} [labelSize=2] label size
 * @param {number} [inputSize=10] input size
 * @returns {Object} React form object
 */
export const renderSelectForm = (
  object, formName, index, name, param, options, handleChange, handleBlur,
  row = true, labelSize = 2, inputSize = 10,
) => {
  const value = index === '' ? object[param] : object[formName][index][param];
  const newName = index === '' ? param : `${formName}[${index}].${param}`;
  const formStyle = row ? Col : Row;
  const core = (
    <Form.Control
      as="select"
      defaultValue={value}
      required
      name={newName}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {options.map((z) => (
        <option
          key={`${param}-${z.name}`}
          value={z.value}
        >
          {z.name}
        </option>
      ))}
    </Form.Control>
  );

  return (
    <Form.Group key={`${param}${index}`} as={formStyle} controlId={`formGrid${param}${index}`}>
      {row
        ? <Form.Label>{name}</Form.Label>
        : <Form.Label column md={labelSize}>{name}</Form.Label>}
      {row
        ? (
          <div>
            {core}
          </div>
        )
        : (
          <Col md={inputSize}>
            {core}
          </Col>
        )}

    </Form.Group>
  );
};

/**
 * Render form question
 * @param {Object} values main object with value
 * @param {string} formName form name
 * @param {number} index index number
 * @param {string} inputType input type
 * @param {string} type question type
 * @param {boolean} required question is required?
 * @param {Function} touched touched handler
 * @param {Object} errors Object containing errors
 * @param {Function} handleChange handleChange handler
 * @param {Function} handleBlur  handleBlur handler
 * @param {string} param parameter name
 * @param {string} name form question
 * @param {boolean} nolabel have label or not
 * @param {number} [labelSize=2] label size
 * @param {number} [inputSize=10] input size
 * @returns {Object} React form object
 */
export const renderForm = (
  values, formName, index, inputType, type, required, touched, errors, handleChange, handleBlur,
  param, name, nolabel, labelSize = 2, inputSize = 10,
) => {
  const newValue = index === '' ? values[param] : values[formName][index][param];
  const newName = index === '' ? param : `${formName}[${index}].${param}`;
  const keyIn = index === '' ? 0 : index;
  return (
    <Form.Group
      as={Row}
      key={`${param}-${keyIn}-${name}`}
      controlId={`formHorizontal${name}`}
      className="mt-3"
    >
      {!nolabel && <Form.Label column md={labelSize}>{name}</Form.Label>}
      <Col md={nolabel ? 12 : inputSize}>
        <Form.Control
          required={required}
          as={inputType}
          type={type}
          placeholder={name}
          name={newName}
          value={newValue}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched[param] && !errors[param]}
          isInvalid={touched[param] && !!errors[param]}
        />
      </Col>
      <Form.Control.Feedback type="invalid">
        {errors[param]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
