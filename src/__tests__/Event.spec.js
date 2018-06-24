import React from 'react';
import renderer from 'react-test-renderer';
import Event from '../components/Event';

// beforeEach(() => {
//   // values stored in tests will also be available in other tests unless you run
//   localStorage.clear();
//   // or directly reset the storage
//   localStorage.__STORE__ = {};
//   // you could also reset all mocks, but this could impact your other mocks
//   jest.resetAllMocks();
//   // or individually reset a mock used
//   localStorage.setItem.mockClear();
// });

// test('should save to localStorage', () => {
//   const KEY = 'foo',
//     VALUE = 'bar';
//   localStorage.setItem(KEY, VALUE)
//   expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
//   expect(localStorage.__STORE__[KEY]).toBe(VALUE);
//   expect(Object.keys(localStorage.__STORE__).length).toBe(1);
// });



test('Participents can be added to localStorage', () => {
  const KEY = 'participants';
  const VALUE = [{name: 'ted', profile: {}}, {name: 'bob', profile: {}}]
  localStorage.setItem(KEY, JSON.stringify(VALUE))
  expect(JSON.parse(localStorage.__STORE__[KEY])).toEqual((VALUE));
  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
});

// test('Event renders correctly', () => {
//   const key = 'expenses'
//   const expenses = {
//     expenseName: 'Ice cream',
//     amount: '50',
//     payer: {name:'ted', profile:{}},
//     consumers: ['ted', 'bob']
//   };
//   localStorage.setItem(key, JSON.stringify(expenses))
//   expect(JSON.parse(localStorage.__STORE__[key])).toEqual((expenses));
//   // expect(Object.keys(localStorage.__STORE__).length).toBe(1);
//   const component = renderer.create(<Event />);
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// })
