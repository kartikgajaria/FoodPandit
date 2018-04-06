var menuTemplate = "<div class='price_grid'><div class='content_right-box1' style='margin-left:40px;margin-bottom: 15px;'><img src='##_IMG_##' class='img-responsive' alt='Item Image'></div><input type='checkbox' id='##_ID_##' name='orderItem' /><label for='##_ID_##'><h3>##_ItemName_##</h3></label><h4>Price : ##_ItemPrice_##</h4></div>";
var urlTemplate = "http://##_IP_##:8080/FoodPandit_BillingServer/RequestHandler";
var MenuPageMain = function() {
  // Application Constructor
  //var menuTemplate = "<div class='price_grid'><div class='content_right-box1'><img src='##_IMG_##' class='img-responsive' alt='Item Image'></div><input type='checkbox' id='##_ID_##' /><label for='##_ID_##'><h3>##_ItemName_##</h3></label><h4>Price : ##_ItemPrice_##</h4></div>";
  console.log("Init Menu");
  document.addEventListener("deviceready", onDeviceReady.bind(this), false);
};
function onDeviceReady() {
  BR.beacon = JSON.parse(localStorage.beacon);
  BR.config = JSON.parse(localStorage.config);
  //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  document.getElementById("orderNowButton").addEventListener("click",orderNow);
  document.addEventListener("backbutton", BackKeyDown, true);
  prepareMenu();
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
var prepareMenu = function() {
  var url = urlTemplate.replace(/##_IP_##/g, BR.config.serverIP);
  $.post(url, function(data) {
    for (i = 0; i < data.itemset.length; i++) {
      //console.log(data.itemset[i]);
      var temp = menuTemplate;
      var menuHtml = "";
      temp = temp.replace(/##_ID_##/g, data.itemset[i].id);
      temp = temp.replace(/##_IMG_##/g, data.itemset[i].img);
      temp = temp.replace(/##_ItemPrice_##/g, data.itemset[i].price);
      temp = temp.replace(/##_ItemName_##/g, data.itemset[i].name);
      menuHtml = menuHtml + temp;
      $("#menuPlaceHolder").append(menuHtml);
    }
    setTimeout(() => {
        SpinnerDialog.hide();
    }, 2000);
  });
};

var orderNow = function(){
  console.log("Order Now Called");
  var order = [];
  $.each($("input[name='orderItem']:checked"), function(){            
    order.push($(this).attr("id"));
  });
  if(order.length<=0)
    alert("Please Select At Least One Item.");
  else  
    console.log(order);
};
//app.initialize();
MenuPageMain();
