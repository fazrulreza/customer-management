import { generateId, getCustomerData, saveCustomerData } from '../../../utils/api';

export default function handler(req, res) {
  if (req.method !== 'POST' || !req.body) {
    res.status(400).json({ success: false, msg: 'no data found' });
  } else {
    const customer = getCustomerData();

    const newCustomer = [{
      ...req.body,
      id: generateId(),
    }];

    const newCustomerList = [
      ...customer,
      ...newCustomer,
    ];

    saveCustomerData(newCustomerList);

    res
      .status(200)
      .json({ success: true, msg: 'customer added successfully' });
  }
}
