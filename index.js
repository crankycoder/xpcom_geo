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
console.log("log method is: " + geolocation.log);

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

var new_geo = xpcom.factoryByContract(contractId).getService(Ci.nsISupports);
console.log("ClassID of acquired component '@mozilla.org/geolocation;1' : " + new_geo.id);

var alt_new_geo_svc = Cc[contractId].getService(Ci.nsIDOMGeoGeolocation);
console.log("ClassID of alt acquired component '@mozilla.org/geolocation;1' : " + alt_new_geo_svc.id);


/* 
 *
var newgeo = xpcom.factoryByContract(contractId).getService(Ci.nsISupports);

console.log("(expecting method here) newgeo: " + newgeo);
console.log("(expecting method here) clearWatch: " + newgeo.clearWatch);
 *
 *
 *
 Note that this has to use xpcom.factoryByContract
 Components.classes isn't replaced automatically.

 https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/platform_xpcom#factoryByContract%28contract%29

 This function is similar to the standard
 Components.classes[contractID] with one significant difference: that
 Components.classes is not updated at runtime.
*/

