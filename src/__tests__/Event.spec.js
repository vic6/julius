test('Event renders correctly', () => {
  const participants = [
    { name: 'chef', profile: {} },
    { name: 'bob', profile: {} },
    { name: 'stan', profile: {} }
  ];
  const expenses = {
    expenseName: 'Girl scout cookies',
    amount: '3.50',
    payer: participants[0],
    consumers: [participants[1], participants[2]]
  };

  localStorage.setItem('participants', JSON.stringify(participants));
  localStorage.setItem('expenses', JSON.stringify(expenses));
  localStorage.setItem('eventName', JSON.stringify('Half Christmas Party'));

  expect(JSON.parse(localStorage.__STORE__.participants)).toEqual((participants));
  expect(JSON.parse(localStorage.__STORE__.expenses)).toEqual((expenses));
  expect(Object.keys(localStorage.__STORE__).length).toBe(3);
})
