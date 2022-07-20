import fs from 'fs';
import moment from 'moment';
import path from 'path';

const customer = path.resolve('customer.json');

export const generateId = () => {
  const baseTime = moment().format('YYYYMMDDHHmmss');
  const pad = '000000';
  const n = (Math.random().toFixed(5) * 100000);
  const randomNo = (pad + n).slice(-pad.length);
  return baseTime + randomNo;
};

export const saveCustomerData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(customer, stringifyData);
};

export const getCustomerData = () => {
  const jsonData = fs.readFileSync(customer);
  return JSON.parse(jsonData);
};
