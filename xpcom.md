Geolocation is implemented as an XPCOM service.

```javascript
var geolocation = Components.classes["@mozilla.org/geolocation;1"]
                            .getService(Components.interfaces.nsISupports);
```


Plan:

1. Acquire access to the geolocation xpcom service via an addon.
2. Verify which service is actually acquired by invoking a method.
3. Implement a JS XPCOM component using platform/xpcom
4. Repeat step 1 but verify that the new service has clobbered the old
   interface registration.
