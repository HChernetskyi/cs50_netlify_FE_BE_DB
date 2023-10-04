const text = document.getElementById("text-change");
const updateLoginText = ()=>{
                document.getElementById("text-change").textContent="Looks like you've logged in successfully! Now try clicking the 'Test Auth' link at the top!"
            }
text.innerHTML = "Hello World!";
 
exports.handler = async function (event, context) {
  const { identity, user } = context.clientContext;
  window.netlifyIdentity.on("init", user => {
   if (!user) {
    window.netlifyIdentity.on("login", () => {
     updateLoginText() });
   }
  });   
};
