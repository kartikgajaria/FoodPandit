var BR = {
    beacon:{},
    config:{}
};
BR.startBLEScan = function() {
    console.log("Start BLE Scan Called");
    //BR.makeToast("Scanning Tables...");
    evothings.eddystone.startScan(
        function(scannedBeacon){
            if(scannedBeacon.address == "B8:27:EB:4A:2C:DD"){
                beacon = scannedBeacon;
                console.log("Found The Beacon, Calculating Distance....");
                //console.log(beacon);
                var distance = evothings.eddystone.calculateAccuracy(beacon.txPower, beacon.rssi)
                var serverIP = "";
                var tableID = ""; 
                console.log(distance);
                if(distance < 0.45 ){
                    evothings.eddystone.stopScan();
                    for(var i = 0; i < 5; i++){
                        if(i == 4){
                            tableID = beacon.nid[i];
                            continue;
                        }
                        if(i == 0){
                            serverIP = serverIP + beacon.nid[i];
                            continue;
                        }
                        serverIP = serverIP + "." + beacon.nid[i];
                    }
                    console.log("Table Found At Distance - "+distance);
                    //BR.makeToast("Table Locked, ID = "+tableID);
                    Storage.prototype.setObject = function(key, value) { this.setItem(key, JSON.stringify(value)); }
                    localStorage.setObject('beacon',beacon);
                    localStorage.setObject('config',{ tableID : tableID,serverIP : serverIP });
                    SpinnerDialog.show("Please Wait", "Boiling Your Menu...", true);
                    window.location = "MenuPage.html";
                    return;
                }
            }
        }, 
        function(b){
            //console.log("not done" + b);
        }
    );
}
BR.stopBLEScan = function() {
    console.log("Stop BLE Scan Called");
    evothings.eddystone.stopScan();
}

BR.setupWiFi = function(ssid,key){
    //Setup WiFi Object
    var wifiObj = WifiWizard.formatWifiConfig(ssid,key,"WPA");
    //Add Network
    WifiWizard.addNetwork(wifiObj,function(status){console.log(status)});
    //Connect Network
    WifiWizard.connectNetwork(ssid,function(status){console.log(status)});
}
/*
BR.makeToast = function(msg){
    window.plugins.toast.show(msg, 'long', 'bottom', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
}
*/