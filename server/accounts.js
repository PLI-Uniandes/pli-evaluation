console.log("running accounts.js");

ServiceConfiguration.configurations.upsert({service: "office365"}, {
    $set: {        
        requestOfflineToken: true,
        loginStyle: "popup",
        clientId: process.env.PLI_CLIENT,
        secret: process.env.PLI_SECRET,
        tenant: "common" // or "common" for not specific tenant. TO-DO: put "uniandes.edu.co"
    }
  });
if(Meteor.isDevelopment){
    console.log(process.env.PLI_CLIENT);
    console.log(process.env.PLI_SECRET);
}
console.log("updated credentials");
