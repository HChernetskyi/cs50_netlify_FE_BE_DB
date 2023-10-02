const text = document.getElementById("text-change");

text.innerHTML = "Hello World!";
 
exports.handler = async function (event, context) {
  const { identity, user } = context.clientContext;
  // Do stuff and return a response...
  if (user)
    return {
      statusCode: 200,
      text.innerHTML += " My name is function!";
      };
};
