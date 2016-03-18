const {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
var self = require("sdk/self");
var contractId = '@mozilla.org/geolocation;1';
var { Class } = require('sdk/core/heritage');
var xpcom = require('sdk/platform/xpcom');

var geolocation = xpcom.factoryByContract(contractId).getService(Ci.nsISupports);
console.log("Got Geolocation service: " + geolocation);
console.log("clearWatch is: " + geolocation.clearWatch);
console.log("getCurrentPosition is: " + geolocation.getCurrentPosition);
console.log("watchPosition is: " + geolocation.watchPosition);
console.log("log method is: " + geolocation.log);

// TODO: implement the XPCOM service here

// Implement the service by subclassing Unknown
var SpoofedGeolocation = Class({
	extends: xpcom.Unknown,
	get wrappedJSObject() this,
	clearWatch: function(watchId) { 
		console.log("new clearWatch invoked: ["+watchId+"]");
	},
	getCurrentPosition: function(successCallback, errorCallback, options) {
		console.log("new getCurrentPosition invoked");
	},
	watchPosition: function(successCallback, errorCallback, options){
		console.log("new watchPosition invoked");
	},
	log: function(message) {
		console.log(new Date().getTime() + ' : ' + message);
	}
});

// Register the service using the contract ID
var service = xpcom.Service({
    contract: contractId,
    register: false,
    Component: SpoofedGeolocation
});

xpcom.register(service);

console.log("(expecting true) Service is registered: " + xpcom.isRegistered(service));

// Access the service using getService()

/* 
 Note that this has to use xpcom.factoryByContract
 Components.classes isn't replaced automatically.

 https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/platform_xpcom#factoryByContract%28contract%29

 This function is similar to the standard
 Components.classes[contractID] with one significant difference: that
 Components.classes is not updated at runtime.
*/

