const { handler } = require('../login')
const dynamodb = require('../dynamodb');


describe('login', () => {
    it('returns error if body or email not provided', async () => {
        const noBody = await handler({body: '{}'});
        const noEmail = await handler({body: '{"email": ""}'});

        expect(noBody.statusCode).toBe(400);
        expect(noBody.body).toBe('{"error":"Please provide email."}');
        expect(noEmail.statusCode).toBe(400);
        expect(noEmail.body).toBe('{"error":"Please provide email."}');

    });

    it('returns error if body or email not provided', async () => {
        jest.spyOn(dynamodb, 'get').mockImplementation(() => null)
        const data = await handler({body: '{"email": "123"}'});
        expect(data.statusCode).toBe(400);
        expect(data.body).toBe('{"error":"User does not exist."}');
    });
});
