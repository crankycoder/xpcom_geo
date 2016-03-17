var self = require("sdk/self");

const {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");

var geolocation = Cc["@mozilla.org/geolocation;1"].getService(Ci.nsISupports);

console.log("Got Geolocation service: " + geolocation);
