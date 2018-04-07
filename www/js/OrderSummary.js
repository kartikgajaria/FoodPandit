var menuTemplate = "<div class='price_grid'><div class='content_right-box1' style='margin-left:40px;margin-bottom: 15px;'><img src='##_IMG_##' class='img-responsive' alt='Item Image'></div><input type='checkbox' id='##_ID_##' name='orderItem' /><label for='##_ID_##'><h3>##_ItemName_##</h3></label><h4>Price : ##_ItemPrice_##</h4></div>";
var urlTemplate = "http://##_IP_##:8080/FoodPandit_BillingServer/RequestHandler";
var OrderSummaryMain = function() {
  // Application Constructor
  //var menuTemplate = "<div class='price_grid'><div class='content_right-box1'><img src='##_IMG_##' class='img-responsive' alt='Item Image'></div><input type='checkbox' id='##_ID_##' /><label for='##_ID_##'><h3>##_ItemName_##</h3></label><h4>Price : ##_ItemPrice_##</h4></div>";
  console.log("Init Menu");
  document.addEventListener("deviceready", onDeviceReady.bind(this), false);
};
function onDeviceReady() {
  document.addEventListener("backbutton", BackKeyDown, true);
  var bill = localStorage.bill;
  $("#bill").append(bill);
}
function BackKeyDown() {
  navigator.notification.confirm(
    "Do You Really Want To Exit?", // message
    onConfirm, // callback to invoke with index of button pressed
    "Exit Application", // title
    ["Stay Here", "Exit"] // buttonLabels
  );
}
function onConfirm(buttonIndex) {
  if (buttonIndex == 2) navigator.app.exitApp();
}
//app.initialize();
OrderSummaryMain();
