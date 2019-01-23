var d = document;
var myData;
var boxes = d.getElementsByClassName('itemBox');
var numberChecker = setInterval(fixNum, 10);
var i = 0;
var selector = 0;
var finalTotal = 0;
var tax = 4.712;
var ordersCost = [];
var ordersAmt = [];
var ordersItem = [];

function startA() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { //4 = ready ; 200 = okay
      myData = JSON.parse(this.responseText);
      window.alert(myData);
      }
    };
  xmlhttp.open("GET", "sample.json", true);
  xmlhttp.send();
  for (i; i < boxes.length; i++) {
    d.getElementsByClassName('itemHead')[i].innerHTML = myData.food[i].item;
    d.getElementsByClassName('itemDesc')[i].innerHTML = myData.food[i].desc;
    d.getElementsByClassName('itemCost')[i].innerHTML = "$" + myData.food[i].price;
    d.getElementsByClassName('amtOrder')[i].value = 0;
  }
  d.getElementById('taxNow').innerHTML = "Tax rate: " + tax + "%";
}

function startB() {
  var c = localStorage.getItem("costs");
  var a = localStorage.getItem("amts");
  var i = localStorage.getItem("items");
  window.alert(c);
  window.alert(a);
  window.alert(i);
  localStorage.clear();
}

function selectOne() {
  if (selector != 0) {
    selector = 0;
  }
}

function selectTwo() {
  if (selector != 1) {
    selector = 1;
  }
}

function selectTri() {
  if (selector != 2) {
    selector = 2;
  }
}

function selectFor() {
  if (selector != 3) {
    selector = 3;
  }
}

function selectFiv() {
  if (selector != 4) {
    selector = 4;
  }
}

function selectSix() {
  if (selector != 5) {
    selector = 5;
  }
}

function fixNum() {
  var ordrNum = d.getElementsByClassName('amtOrder')[selector].value;
  if (ordrNum < 0) {
    d.getElementsByClassName('amtOrder')[selector].value = 0;
  } else if (ordrNum == "") {
    d.getElementsByClassName('amtOrder')[selector].value = 0;
  }
}

function order() {
  var ordrNum = d.getElementsByClassName('amtOrder')[selector].value;
  var total = 0;
  var taxed = 0;
  var taxedTotal = 0;
  var li = document.createElement('li');
  var csh;
  var ul = document.getElementById('currOrder');
  if (ordrNum != 0) {
    total = ordrNum * myData.food[selector].price;
    taxed = total * (tax / 100);
    taxedTotal = (total + taxed).toFixed(2);
    d.getElementById('inOrderBox').style.visibility = "visible";
    d.getElementById('confirmOrder').style.visibility = "visible";
    d.getElementById('discardOrder').style.visibility = "visible";
    d.getElementById('lineA').style.display = "block";
    ordersCost.push(taxedTotal);
    ordersAmt.push(ordrNum);
    ordersItem.push(myData.food[selector].item);
    if (ordrNum == 1) {
      csh = document.createTextNode(ordrNum + " " + myData.food[selector].item + " - " + "$" + taxedTotal);
    } else if (ordrNum > 1) {
      csh = document.createTextNode(ordrNum + " " + myData.food[selector].item + "s" + " - " + "$" + taxedTotal);
    }
    li.appendChild(csh);
    ul.appendChild(li);
    d.getElementsByClassName('amtOrder')[selector].value = 0;
    finalTotal = finalTotal + Number(taxedTotal);
    d.getElementById('currTotal').innerHTML = "Total: " + "$" + finalTotal.toFixed(2);
  } else if (ordrNum === 0) {
    window.alert("Order Something");
  }
}

function kOrder(event) {
  var key = event.keyCode;
  if (key === 13) {
    order();
  }
}

function confirmed() {
  localStorage.setItem("costs", ordersCost);
  localStorage.setItem("amts", ordersAmt);
  localStorage.setItem("items", ordersItem);
  location.href = "orderFoodShop.html";
}

function discarded() {
  var ii = 0;
  var ul = d.getElementById('currOrder');
  var orderLength = ordersCost.length;
  var cntDown = orderLength - 1;
  for (ii; ii < orderLength; ii++) {
    var li = d.getElementsByTagName('li')[cntDown];
    cntDown = cntDown - 1;
    ordersCost.pop();
    ordersAmt.pop();
    ordersItem.pop();
    ul.removeChild(li);
  }
  d.getElementById('inOrderBox').style.visibility = "hidden";
  d.getElementById('confirmOrder').style.visibility = "hidden";
  d.getElementById('discardOrder').style.visibility = "hidden";
  d.getElementById('lineA').style.display = "none";
  d.getElementById('currTotal').innerHTML = "";
  finalTotal = 0;
}

function done() {
  location.href = "myFoodShop.html";
}
