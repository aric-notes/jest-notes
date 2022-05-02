import { rest } from 'msw';

module.exports = [
  rest.get('http://my-backend/fake-data', (req, res, ctx) => {
    console.log('listening for fake data');
    return res(
      ctx.json(['item1', 'item2', 'item3']),
    );
  }),
];