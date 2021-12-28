import createStripe from 'stripe-client';
import { host } from '../../utils/env';

const stripe = createStripe(
  'pk_test_51K08kLLp1ZWXnRibUrjLJHmF5KeocMDxhmewEq5TYTlfN1r0y4P4OPiT8iH9X8oKEmA5viofwBjll3ZwMiscyFsu0064ECnpAA'
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  amount = amount * 100;
  return fetch(`${host}/pay`, {
    body: JSON.stringify({ token, amount, name }),
    method: 'POST',
  }).then((res) => {
    console.log(res, 'payRequest');
    if (res.status > 200) {
      return Promise.reject('Something went wrong processing your payment');
    }
    return res.json();
  });
};
