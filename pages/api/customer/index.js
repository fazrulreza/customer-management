import customer from '../../../customer.json';


export default function handler(req, res) {
    res.status(200).json(customer)
  };
