const { handler } = require('../signup');
const dynamodb = require('../dynamodb');

jest.mock('../dynamodb',() => ({
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
            '{"errors":["Please Supply an email address.","Please Supply a password."]}'
        );
    });

    it('returns error if email not provided', async () => {
        const noBody = await handler({ body: '{"password": "123"}' });

        expect(noBody.statusCode).toBe(400);
        expect(noBody.body).toBe('{"errors":["Please Supply an email address."]}');
    });

    it('returns error if password not provided', async () => {
        const noBody = await handler({ body: '{"email": "123@123.com"}' });

        expect(noBody.statusCode).toBe(400);
        expect(noBody.body).toBe('{"errors":["Please Supply a password."]}');
    });

    it('returns token on success', async () => {
        // jest.spyOn(dynamodb, 'put').mockImplementation((item) => ({ id: item.id }));
        // dynamodb.put = jest.fn((item) => ({ id: item.id }))
        const data = await handler({
            body: '{"email": "123@123.com", "password": "123"}',
        });
        expect(data.statusCode).toBe(200);
        expect(data.body).toBe(`{"data":{"id":"1"}}`);
    });

    // TODO: add error tests
});
