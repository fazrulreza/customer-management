import { getCustomerData, saveCustomerData } from '../../../utils/api';

export default function handler(req, res) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).json({ success: false, msg: 'no data found' });
  } else {
    const { id, ...others } = req.body;

    const customer = getCustomerData();
    const [oneCustomer] = customer.filter((x) => x.id === id);
    const otherCustomer = customer.filter((y) => y.id !== id);

    const updatedCustomer = [{
      ...oneCustomer,
      ...others,
    }];

    const newCustomerList = [
      ...otherCustomer,
      ...updatedCustomer,
    ];

    saveCustomerData(newCustomerList);

    res
      .status(200)
      .json({ success: true, msg: 'customer updated successfully' });
  }
}
