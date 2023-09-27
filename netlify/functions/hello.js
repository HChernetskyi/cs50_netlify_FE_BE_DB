//functions/hello.js
exports.handler = async (event, context) => {
  const { name = "Anonymous" } = event.queryStringParameters;
  return {
    statusCode: 200,
    body: `Hello, ${name}`
  };
};
