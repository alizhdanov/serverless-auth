const generatePayload = (status, body) => {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
};

const payloadError = (status, errors) =>
  generatePayload(status, {
    errors,
  });


module.exports = {
    generatePayload,
    payloadError
}
