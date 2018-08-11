import { Meteor } from 'meteor/meteor';

// let loop = setInterval(() => {
// 	if (Accounts.loginServicesConfigured()) {
// 	    setupMicrosoftLogin();
// 	    clearInterval(loop);
// 	}
// }, 2500);

function setupMicrosoftLogin() {
	console.log('setup microsoft login');
	Meteor.loginWithMicrosoft({
		loginStyle: 'redirect',
	    requestOfflineToken: true,
	    requestPermissions: ['User.Read'] // Permission scopes are found here: https://msdn.microsoft.com/en-us/library/hh243648.aspx
	}, function(error) {
	    if (error) {
	        console.error('Login failed:', error.reason || error);
	    }
	    else {
	        console.log('Logged in!');
	    }
	});
}
