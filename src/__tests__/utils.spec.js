import round2Fixed from '../utils/index';

test('Expenses get rounded correctly', ()=> {
  const change = 4.34843;
  const change2 = 45.9894;
  const change3 = 0.99953495;
  
  expect(round2Fixed(change)).toEqual('4.35');
  expect(round2Fixed(change2)).toEqual('45.99');
  expect(round2Fixed(change3)).toEqual('1.00');
})
