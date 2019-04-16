const { handler } = require('../login');
const dynamodb = require('../utils/dynamodb');
const password = require('../utils/password');
const jsonwebtoken = require('jsonwebtoken');

jest.mock('../utils/dynamodb')
jest.mock('../utils/password')
jest.mock('jsonwebtoken')

describe('login', () => {
  it('returns error if empty body', async () => {
    const noBody = await handler({ body: null });

    expect(noBody.statusCode).toBe(400);
    expect(noBody.body).toBe(
      '{"errors":["Please provide email.","Please provide password."]}'
    );
  });

  it('returns error if email not provided', async () => {
    const noBody = await handler({ body: '{"password": "123"}' });

    expect(noBody.statusCode).toBe(400);
    expect(noBody.body).toBe('{"errors":["Please provide email."]}');
  });

  it('returns error if password not provided', async () => {
    const noBody = await handler({ body: '{"email": "123@123.com"}' });

    expect(noBody.statusCode).toBe(400);
    expect(noBody.body).toBe('{"errors":["Please provide password."]}');
  });

  it('returns error if user not exists', async () => {
    jest.spyOn(dynamodb, 'get').mockImplementation(() => null);
    const data = await handler({ body: '{"email": "123", "password": "123"}' });
    expect(data.statusCode).toBe(400);
    expect(data.body).toBe('{"errors":["User does not exist."]}');
  });

  it('returns error if wrong password', async () => {
    jest.spyOn(dynamodb, 'get').mockImplementation(() => ({ password: '123' }));
    const data = await handler({
      body: '{"email": "123@123.com", "password": "1234"}',
    });
    expect(data.statusCode).toBe(400);
    expect(data.body).toBe('{"errors":["Wrong password."]}');
  });

  it('returns token on success', async () => {
    jest.spyOn(dynamodb, 'get').mockImplementation(() => ({ password: '123' }));
    jest.spyOn(jsonwebtoken, 'sign').mockImplementation(() => '123');
    jest.spyOn(password, 'compare').mockImplementation(() => true);
    const data = await handler({
      body: '{"email": "123@123.com", "password": "123"}',
    });
    expect(data.statusCode).toBe(200);
    expect(data.body).toBe('{"data":{"token":"123"}}');
  });
});
