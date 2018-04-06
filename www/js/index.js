var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        BR.startBLEScan();
        document.addEventListener("backbutton", BackKeyDown, true);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        if(parentElement != null){
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            console.log('Received Event: ' + id);
        }
    }
};
function BackKeyDown(){
    navigator.notification.confirm(
        'Do You Really Want To Exit?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Exit Application',           // title
        ['Stay Here','Exit']     // buttonLabels
    );
}
function onConfirm(buttonIndex) {
    if(buttonIndex == 2)
        navigator.app.exitApp();
}
app.initialize();