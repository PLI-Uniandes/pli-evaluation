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
console.log("updated credentials");
