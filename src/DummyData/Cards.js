import Visa from '../images/Visa.png';
import Locker from 'lockr';

let Cards = [
  // {
  //   cardNumber: '1234567890123456',
  //   expiry: { month: 6, year: 25 },
  //   name: 'RaviKant M',
  //   image: Visa
  // }
];

if(!Locker.get('cards')) {
  Locker.set('cards', JSON.stringify(Cards));
}

export const getCards = () => {
  return JSON.parse(Locker.get('cards'));
}

export const setCard = (name, expiry, cardDetails) => {
  Locker.set('cards', JSON.stringify([...getCards(), { name, cardNumber: cardDetails, expiry: { month: parseInt(expiry.slice(0,2)), year: parseInt(expiry.slice(2)) }, image: Visa }]));
}

