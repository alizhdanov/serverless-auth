const { handler } = require('../signup');
const dynamodb = require('../utils/dynamodb');

jest.mock('../utils/dynamodb',() => ({
    put: jest.fn((item) => ({ id: item.id }))
}))

jest.mock('uuid', () => ({
    v1: jest.fn(() => '1')
}))

describe('signup', () => {
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

    it('returns user id on sucess', async () => {
        const data = await handler({
            body: '{"email": "123@123.com", "password": "123"}',
        });
        expect(data.statusCode).toBe(200);
        expect(data.body).toBe(`{"data":{"id":"1"}}`);
    });
});
