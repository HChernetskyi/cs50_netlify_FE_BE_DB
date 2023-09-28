exports.handler = async(event, context) => {
    const { name = "Anonymous" } = event.queryStringParameters;
    const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
    return {
        statusCode: 200,
        body: `Hello, ${name}`
    };
};
