const {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");
var self = require("sdk/self");
var contractId = '@mozilla.org/geolocation;1';
var { Class } = require('sdk/core/heritage');
var xpcom = require('sdk/platform/xpcom');

var geolocation = xpcom.factoryByContract(contractId).getService(Ci.nsIDOMGeoGeolocation);

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
    interfaces: ['nsIDOMGeoGeolocation'],
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

var registered_id = components.manager.QueryInterface(Ci.nsIComponentRegistrar).
      contractIDToCID(contractId);
console.log("UUID of system registered '@mozilla.org/geolocation;1' : " + registered_id);

// Register the service using the contract ID
var service = xpcom.Service({
    contract: contractId,
    Component: SpoofedGeolocation
});
console.log("(expecting true) Service is registered: " + xpcom.isRegistered(service));

// Service is automatically registered
// xpcom.register(service);

console.log("(expecting true) Service is registered: " + xpcom.isRegistered(service));
console.log("Service class ID: " + service.id);

// Access the newly registered service

var new_uuid = components.manager.QueryInterface(Ci.nsIComponentRegistrar).
      contractIDToCID(contractId);
console.log("New UUID of newly registered component '@mozilla.org/geolocation;1' : " + new_uuid);

// Shouldn't this work?  The service is registered.
/*
 Note that this has to use xpcom.factoryByContract
 Components.classes isn't replaced automatically.
 https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/platform_xpcom#factoryByContract%28contract%29

To manually test this, you'll need to force import the 'require' keyword

Components.utils.import("resource://devtools/shared/Loader.jsm");
var require = devtools.require;
var xpcom = require('sdk/platform/xpcom');
var contractId = '@mozilla.org/geolocation;1';

This is weird.  I can get at the proper xpconnect wrapper, as
demonstrated by accessing the wrappedJSObject - but trying to
access the service using Ci.nsIGeoGeolocation throws a
NS_ERROR_XPC_GS_RETURNED_FAILURE error when getService is invoked.

xpcom.factoryByContract(contractId).getService()
	doesn't crash and returns an xpconnect object 

xpcom.factoryByContract(contractId).getService(Ci.nsISupports)
	doesn't crash and returns an xpconnect object 

xpcom.factoryByContract(contractId).getService(Ci.nsIDOMGeoGeolocation)
	crashes with: 

	console.error: xpcomgeo:
	Object
		- message = Component returned failure code: 0x80570016 (NS_ERROR_XPC_GS_RETURNED_FAILURE) [nsIJSCID.getService]
		- fileName = undefined
		- lineNumber = 94
		- stack = @undefined:94:undefined|@resource://xpcomgeo/index.js:94:15|run@resource://gre/modules/commonjs/sdk/addon/runner.js:147:19|startup/</<@resource://gre/modules/commonjs/sdk/addon/runner.js:87:9|Handler.prototype.process@resource://gre/modules/Promise-backend.js:937:23|this.PromiseWalker.walkerLoop@resource://gre/modules/Promise-bac


	kend.js:816:7|Promise*this.PromiseWalker.scheduleWalkerLoop@resource://gre/modules/Promise-backend.js:747:11|this.PromiseWalker.schedulePromise@resource://gre/modules/Promise-backend.js:779:7|this.PromiseWalker.completePromise@resource://gre/modules/Promise-backend.js:714:7|handler@resource://gre/modules/commonjs/sdk/addon/window.js:56:3|EventListener.handleEvent*EventTargetInterposition.methods.addEventListener@resource://gre/modules/RemoteAddonsParent.jsm:626:5|AddonInterpositionService.prototype.interposeProperty/desc.value@file:///Users/victorng/dev/mozilla-central/obj-x86_64-apple-darwin15.3.0/dist/NightlyDebug.app/Contents/Resources/components/multiprocessShims.js:160:52|@resource://gre/modules/commonjs/sdk/addon/window.js:54:1|startup/<@resource://gre/modules/commonjs/sdk/addon/runner.js:72:21|Handler.prototype.process@resource://gre/modules/Promise-backend.js:937:23|this.PromiseWalker.walkerLoop@resource://gre/modules/Promise-backend.js:816:7|Promise*this.PromiseWalker.scheduleWalkerLoop@resource://gre/modules/Promise-backend.js:747:11|this.PromiseWalker.schedulePromise@resource://gre/modules/Promise-backend.js:779:7|this.PromiseWalker.completePromise@resource://gre/modules/Promise-backend.js:714:7|listener/<@resource://gre/modules/sdk/system/Startup.js:52:46|
		- toString = () => toString
*/


var new_geo = xpcom.factoryByContract(contractId).getService().wrappedJSObject;
var new_geo = xpcom.factoryByContract(contractId).getService(Ci.nsISupports).wrappedJSObject;
var new_geo = xpcom.factoryByContract(contractId).getService(Ci.nsIDOMGeoGeolocation);

console.log("ClassID of acquired component '@mozilla.org/geolocation;1' : " + new_geo.id);
console.log("Got new_geo service: " + new_geo);
console.log("clearWatch is: " + new_geo.clearWatch);
console.log("getCurrentPosition is: " + new_geo.getCurrentPosition);
console.log("watchPosition is: " + new_geo.watchPosition);
/*
*/
