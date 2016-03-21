const {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
var self = require("sdk/self");
var contractId = '@mozilla.org/geolocation;1';
var { Class } = require('sdk/core/heritage');
var xpcom = require('sdk/platform/xpcom');

var geolocation = xpcom.factoryByContract(contractId).getService(Ci.nsISupports);

var id = components.manager.QueryInterface(Ci.nsIComponentRegistrar).
      contractIDToCID(contractId);
console.log("ClassID of real '@mozilla.org/geolocation;1' : " + id);

console.log("Got Geolocation service: " + geolocation);
console.log("clearWatch is: " + geolocation.clearWatch);
console.log("getCurrentPosition is: " + geolocation.getCurrentPosition);
console.log("watchPosition is: " + geolocation.watchPosition);

// TODO: implement the XPCOM service here

// Implement the service by subclassing Unknown
var SpoofedGeolocation = Class({
	extends: xpcom.Unknown,
	get wrappedJSObject() this,
	clearWatch: function(watchId) { 
        return "new clearWatch invoked: ["+watchId+"]";
	},
	getCurrentPosition: function(successCallback, errorCallback, options) {
		return "new getCurrentPosition invoked";
	},
	watchPosition: function(successCallback, errorCallback, options){
		return "new watchPosition invoked";
	}
});

// Register the service using the contract ID
var service = xpcom.Service({
    contract: contractId,
    interfaces: [Ci.nsIDOMGeoGeolocation],
    register: false,
    Component: SpoofedGeolocation
});

console.log("(expecting false) Service is registered: " + xpcom.isRegistered(service));

var registered_id = components.manager.QueryInterface(Ci.nsIComponentRegistrar).
      contractIDToCID(contractId);
console.log("ClassID of system registered '@mozilla.org/geolocation;1' : " + registered_id);

xpcom.register(service);

console.log("(expecting true) Service is registered: " + xpcom.isRegistered(service));
console.log("Service class ID: " + service.id);

// Access the newly registered service

var new_id = components.manager.QueryInterface(Ci.nsIComponentRegistrar).
      contractIDToCID(contractId);
console.log("ClassID of newly registered component '@mozilla.org/geolocation;1' : " + new_id);

// Shouldn't this work?  The service is registered.
var new_geo = xpcom.factoryByContract(contractId).getService(Ci.nsISupports);
console.log("ClassID of acquired component '@mozilla.org/geolocation;1' : " + new_geo.id);
console.log("Got new_geo service: " + new_geo);
console.log("clearWatch is: " + new_geo.clearWatch);
console.log("getCurrentPosition is: " + new_geo.getCurrentPosition);
console.log("watchPosition is: " + new_geo.watchPosition);
