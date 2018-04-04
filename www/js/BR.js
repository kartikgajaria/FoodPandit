var BR = {
    beacon:{}
};
BR.startBLEScan = function() {
    console.log("Start BLE Scan Called");
    evothings.eddystone.startScan(
        function(scannedBeacon){
            if(scannedBeacon.address == "B8:27:EB:4A:2C:DD"){
                beacon = scannedBeacon;
                console.log("Found The Beacon, Calculating Distance....");
                //console.log(beacon);
                var distance = evothings.eddystone.calculateAccuracy(beacon.txPower, beacon.rssi)
                console.log(distance);
                if(distance < 0.5 ){
                    evothings.eddystone.stopScan();
                    console.log("Table Found At Distance - "+distance);
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