import { getCustomerData } from '../../../utils/api';

export default function handler({ query: { id } }, res) {
  const customer = getCustomerData();
  const [oneCustomer] = customer.filter((x) => x.id === id);
  res
    .status(200)
    .json(oneCustomer);
}
