import { getCustomerData, saveCustomerData } from '../../../../utils/api';

export default function handler({ query: { id } }, res) {
  if (!id) {
    res.status(400).json({ success: false, msg: 'no id found' });
  }
  const customer = getCustomerData();
  const otherCustomer = customer.filter((x) => x.id !== id);

  saveCustomerData(otherCustomer);

  res
    .status(200)
    .json({ success: true, msg: 'customer deleted successfully' });
}
