# Geolocation Tester
A basic add-on which clobbers the '@mozilla.org/geolocation;1'
components with the XPCOM interface of nsIDOMGeoGeolocation.


Notes:

* this requires support from a custom build of Firefox as 
  defined by xpidl_webidl.patch
* Having the 'builtinclass' declaration in the XPIDL is what restricts
  Components.classes from being successfully clobbered by a JS
  replacement.

