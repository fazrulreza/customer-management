import { getCustomerData } from '../../../utils/api';

export default function handler(req, res) {
  const customer = getCustomerData();
  res
    .status(200)
    .json(customer);
}
