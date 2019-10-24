/*global cordova*/
module.exports = {

    connect: function (macAddress, device, success, failure) {
        cordova.exec(success, failure, device, "connect", [macAddress]);
    },

    // Android only - see http://goo.gl/1mFjZY
    connectInsecure: function (macAddress, device, success, failure) {
        cordova.exec(success, failure, device, "connectInsecure", [macAddress]);
    },

    disconnect: function (device, success, failure) {
        cordova.exec(success, failure, device, "disconnect", []);
    },

    // list bound devices
    list: function (device, success, failure) {
        cordova.exec(success, failure, device, "list", []);
    },

    isEnabled: function (device, success, failure) {
        cordova.exec(success, failure, device, "isEnabled", []);
    },

    isConnected: function (device, success, failure) {
        cordova.exec(success, failure, device, "isConnected", []);
    },

    // the number of bytes of data available to read is passed to the success function
    available: function (device, success, failure) {
        cordova.exec(success, failure, device, "available", []);
    },

    // read all the data in the buffer
    read: function (device, success, failure) {
        cordova.exec(success, failure, device, "read", []);
    },

    // reads the data in the buffer up to and including the delimiter
    readUntil: function (delimiter, device, success, failure) {
        cordova.exec(success, failure, device, "readUntil", [delimiter]);
    },

    // writes data to the bluetooth serial port
    // data can be an ArrayBuffer, string, integer array, or Uint8Array
    write: function (data, device, success, failure) {

        // convert to ArrayBuffer
        if (typeof data === 'string') {
            data = stringToArrayBuffer(data);
        } else if (data instanceof Array) {
            // assuming array of interger
            data = new Uint8Array(data).buffer;
        } else if (data instanceof Uint8Array) {
            data = data.buffer;
        }

        cordova.exec(success, failure, device, "write", [data]);
    },

    // calls the success callback when new data is available
    subscribe: function (delimiter, device, success, failure) {
        cordova.exec(success, failure, device, "subscribe", [delimiter]);
    },

    // removes data subscription
    unsubscribe: function (device, success, failure) {
        cordova.exec(success, failure, device, "unsubscribe", []);
    },

    // calls the success callback when new data is available with an ArrayBuffer
    subscribeRawData: function (device, success, failure) {

        successWrapper = function(data) {
            // Windows Phone flattens an array of one into a number which
            // breaks the API. Stuff it back into an ArrayBuffer.
            if (typeof data === 'number') {
                var a = new Uint8Array(1);
                a[0] = data;
                data = a.buffer;
            }
            success(data);
        };
        cordova.exec(successWrapper, failure, device, "subscribeRaw", []);
    },

    // removes data subscription
    unsubscribeRawData: function (device, success, failure) {
        cordova.exec(success, failure, device, "unsubscribeRaw", []);
    },

    // clears the data buffer
    clear: function (device, success, failure) {
        cordova.exec(success, failure, device, "clear", []);
    },

    // reads the RSSI of the *connected* peripherial
    readRSSI: function (device, success, failure) {
        cordova.exec(success, failure, device, "readRSSI", []);
    },

    showBluetoothSettings: function (device, success, failure) {
        cordova.exec(success, failure, device, "showBluetoothSettings", []);
    },

    enable: function (device, success, failure) {
        cordova.exec(success, failure, device, "enable", []);
    },

    discoverUnpaired: function (device, success, failure) {
        cordova.exec(success, failure, device, "discoverUnpaired", []);
    },

    setDeviceDiscoveredListener: function (notify, device) {
        if (typeof notify != 'function')
            throw 'BluetoothSerial.setDeviceDiscoveredListener: Callback not a function';

        cordova.exec(notify, null, device, "setDeviceDiscoveredListener", []);
    },

    clearDeviceDiscoveredListener: function (device) {
        cordova.exec(null, null, device, "clearDeviceDiscoveredListener", []);
    },

    setName: function (newName, device) {
        cordova.exec(null, null, device, "setName", [newName]);
    },

    setDiscoverable: function (discoverableDuration, device) {
        cordova.exec(null, null, device, "setDiscoverable", [discoverableDuration]);
    }


};

var stringToArrayBuffer = function(str) {
    var ret = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        ret[i] = str.charCodeAt(i);
    }
    return ret.buffer;
};
