var d = document;
var myData;
var boxes = d.getElementsByClassName('itemBox');
var i = 0;
var iv = 0;
var numberCheckerA = setInterval(fixNum, 10);
var numberCheckerB = setInterval(fixTip, 10);
var selector = 0;
var currTxtTotal = 0;
var fTot = 0;
var tax = 4.712;
var saveBackground = ["https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201204-xl-zimmern-soft-shell-crab.jpg?itok=QwTNS3E6", "https://assetcloud02.roccommerce.net/w750-h510-cpad//_rastelli/7/5/3/1622_lobstertail_cooked_web.jpg", "https://img.delicious.com.au/7qM0cvJi/w1200/del/2015/10/mixed-sushi-and-sashimi-platter-15351-1.jpg", "https://i0.wp.com/prosperousfood.com/wp-content/uploads/2018/04/Shark-Fin-Soup.jpg?fit=647%2C500", "http://www.chopstickchronicles.com/wp-content/uploads/2016/05/Fried-Calamari-with-Wasabi-Mayo.jpg", "http://4.bp.blogspot.com/-mdZqJPFXNSE/UA8kB-UYRXI/AAAAAAAACb4/Iri4ajSvXWU/s1600/photo+002.JPG"];
var ordersCost = [];
var ordersAmt = [];
var ordersItem = [];
var boxChecker = [];

function startA() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { //4 = ready ; 200 = okay
      myData = JSON.parse(this.responseText);
      for (i; i < boxes.length; i++) {
        d.getElementsByClassName('itemHead')[i].innerHTML = myData.food[i].item;
        d.getElementsByClassName('itemDesc')[i].innerHTML = myData.food[i].desc;
        d.getElementsByClassName('itemCost')[i].innerHTML = "$" + myData.food[i].price;
        d.getElementsByClassName('amtOrder')[i].value = 0;
        }
      }
    };
  xmlhttp.open("GET", "sample.json", true);
  xmlhttp.send();
  localStorage.clear();
  d.getElementById('taxNow').innerHTML = "Tax rate: " + tax + "%";
}

function startB() {
  var ul = document.getElementById('finalOrder');
  fTot = Number(localStorage.getItem("finalTotal"));
  var v = 0;
  iv = localStorage.getItem("confirNum");
  var chngLength = iv;
  if (fTot === 0) {
    window.alert("No order detected. Automatically sending back to menu.")
    done();
  }
  for (v; v < iv; v++) {
    var c = localStorage.getItem("costs" + v);
    var a = localStorage.getItem("amts" + v);
    var i = localStorage.getItem("items" + v);
    ordersCost.push(c);
    ordersAmt.push(a);
    ordersItem.push(i);
  }
  v = 0;
  for (v = 0; v < chngLength; v++) {
    if (ordersItem[v] === ordersItem[v + 1]) {
      ordersItem.splice(v + 1, 1);
      var x = parseFloat(ordersCost[v]) + parseFloat(ordersCost[v + 1]);
      var y = parseFloat(ordersAmt[v]) + parseFloat(ordersAmt[v + 1]);
      ordersCost.splice(v, 2, x);
      ordersAmt.splice(v, 2, y);
      chngLength = chngLength - 1;
    }
  }
  v = 0;
  for (v = 0; v < chngLength; v++) {
    var li = document.createElement('li');
    var ordr = document.createTextNode(parseFloat(ordersAmt[v]) + " " + ordersItem[v] + " - $" + parseFloat(ordersCost[v]));
    li.appendChild(ordr);
    ul.appendChild(li);
  }
  d.getElementById('finalTotal').innerHTML = "Total: $" + fTot.toFixed(2);
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
  } else if (ordrNum === "") {
    d.getElementsByClassName('amtOrder')[selector].value = 0;
  } else if (ordrNum >= 20) {
    d.getElementsByClassName('amtOrder')[selector].value = 10;
  }
}

function fixTip() {
  var inputTip = d.getElementById('tipInput').value;
  if (inputTip < 0) {
    d.getElementById('tipInput').value = 0;
  } else if (inputTip === "") {
    d.getElementById('tipInput').value = 0;
  }
}

function order() {
  var ordrNum = Math.floor(d.getElementsByClassName('amtOrder')[selector].value);
  var total = 0;
  var taxed = 0;
  var taxedTotal = 0;
  var li = document.createElement('li');
  var csh;
  var ul = document.getElementById('currOrder');
  if (ordrNum !== 0) {
    total = ordrNum * myData.food[selector].price;
    taxed = total * (tax / 100);
    paid = total.toFixed(2);
    taxedTotal = total + (currTxtTotal + taxed);
    d.getElementById('inOrderBox').style.visibility = "visible";
    d.getElementById('confirmOrder').style.visibility = "visible";
    d.getElementById('discardOrder').style.visibility = "visible";
    d.getElementById('lineA').style.display = "block";
    ordersCost.push(paid);
    ordersAmt.push(ordrNum);
    ordersItem.push(myData.food[selector].item);
    boxChecker.push(selector);
    if (ordrNum == 1) {
      csh = document.createTextNode(ordrNum + " " + myData.food[selector].item + " - " + "$" + paid);
    } else if (ordrNum > 1) {
      csh = document.createTextNode(ordrNum + " " + myData.food[selector].item + "s" + " - " + "$" + paid);
    }
    li.appendChild(csh);
    ul.appendChild(li);
    d.getElementsByClassName('amtOrder')[selector].value = 0;
    currTxtTotal = taxedTotal;
    d.getElementById('currTotal').innerHTML = "Total: $" + currTxtTotal.toFixed(2);
    
    d.getElementsByClassName('itemBox')[selector].style.background = "url(" + "https://img.freepik.com/free-vector/dark-blue-watercolor-background-design_1034-737.jpg?size=338&ext=jpg" + ")";
    d.getElementsByClassName('itemBox')[selector].style.backgroundSize = "cover";
    d.getElementsByClassName('itemBox')[selector].style.backgroundRepeat = "no-repeat";
    d.getElementsByClassName('itemBox')[selector].style.backgroundPosition = "center";
    d.getElementsByClassName('itemHead')[selector].style.display = "none";
    d.getElementsByClassName('itemBody')[selector].style.display = "none";
    d.getElementsByClassName('amtOrder')[selector].style.display = "none";
    d.getElementsByClassName('bttnOrder')[selector].style.display = "none";
    d.getElementsByClassName('afterOrder')[selector].style.display = "block";
    d.getElementsByClassName('moreOrder')[selector].style.visibility = "visible";
    d.getElementsByClassName('purchased')[selector].style.visibility = "visible";
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

function openInput() {
  d.getElementsByClassName('itemBox')[selector].style.background = "url(" + saveBackground[selector] + ")";
  d.getElementsByClassName('itemBox')[selector].style.backgroundSize = "cover";
  d.getElementsByClassName('itemBox')[selector].style.backgroundRepeat = "no-repeat";
  d.getElementsByClassName('itemBox')[selector].style.backgroundPosition = "right";
  d.getElementsByClassName('itemHead')[selector].style.display = "block";
  d.getElementsByClassName('itemBody')[selector].style.display = "block";
  d.getElementsByClassName('amtOrder')[selector].style.display = "initial";
  d.getElementsByClassName('bttnOrder')[selector].style.display = "initial";
  d.getElementsByClassName('afterOrder')[selector].style.display = "none";
  d.getElementsByClassName('moreOrder')[selector].style.visibility = "hidden";
  d.getElementsByClassName('purchased')[selector].style.visibility = "hidden";
}

function confirmed() {
  for (iv; iv < ordersCost.length; iv++) {
    localStorage.setItem("costs" + iv, ordersCost[iv]);
    localStorage.setItem("amts" + iv, ordersAmt[iv]);
    localStorage.setItem("items" + iv, ordersItem[iv]);
  }
  localStorage.setItem("confirNum", iv);
  localStorage.setItem("finalTotal", currTxtTotal);
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
  ii = 0;
  for (ii; ii < boxChecker.length; ii++) {
    var defSel = selector;
    selector = boxChecker[ii];
    openInput();
    selector = defSel;
  }
  ii = 0;
  for (ii; ii < boxChecker.length; ii++) {
    boxChecker.pop();
  }
  d.getElementById('inOrderBox').style.visibility = "hidden";
  d.getElementById('confirmOrder').style.visibility = "hidden";
  d.getElementById('discardOrder').style.visibility = "hidden";
  d.getElementById('lineA').style.display = "none";
  d.getElementById('currTotal').innerHTML = "";
  currTxtTotal = 0;
}

function done() {
  localStorage.clear();
  location.href = "index.html";
}

function confirmTip() {
  var aTip = fTot * 0.1;
  var bTip = fTot * 0.15;
  var cTip = fTot * 0.2;
  d.getElementById('askTip').style.display = "none";
  d.getElementById('tenPer').style.display = "block";
  d.getElementById('fiftenPer').style.display = "block";
  d.getElementById('twenPer').style.display = "block";
  d.getElementById('dollarTip').style.display = "initial";
  d.getElementById('tipInput').style.display = "initial";
  d.getElementById('tipInput').value = 0;
  d.getElementById('customTip').style.display = "initial"
  d.getElementById('tenPer').innerHTML = "$" + aTip.toFixed(2) + " - 10%";
  d.getElementById('fiftenPer').innerHTML = "$" + bTip.toFixed(2) + " - 15%";
  d.getElementById('twenPer').innerHTML = "$" + cTip.toFixed(2) + " - 20%";
}

function tenPer() {
  var aTip = fTot * 0.1;
  fTot = fTot + aTip;
  d.getElementById('finalTotal').innerHTML = "Total: $" + fTot.toFixed(2);
  d.getElementById('tenPer').style.display = "none";
  d.getElementById('fiftenPer').style.display = "none";
  d.getElementById('twenPer').style.display = "none";
  d.getElementById('dollarTip').style.display = "none";
  d.getElementById('tipInput').style.display = "none";
  d.getElementById('customTip').style.display = "none";
  d.getElementById('thank').style.display = "block";
}

function fiftenPer() {
  var bTip = fTot * 0.15;
  fTot = fTot + bTip;
  d.getElementById('finalTotal').innerHTML = "Total: $" + fTot.toFixed(2);
  d.getElementById('tenPer').style.display = "none";
  d.getElementById('fiftenPer').style.display = "none";
  d.getElementById('twenPer').style.display = "none";
  d.getElementById('dollarTip').style.display = "none";
  d.getElementById('tipInput').style.display = "none";
  d.getElementById('customTip').style.display = "none";
  d.getElementById('thank').style.display = "block";
}

function twenPer() {
  var cTip = fTot * 0.2;
  fTot = fTot + cTip;
  d.getElementById('finalTotal').innerHTML = "Total: $" + fTot.toFixed(2);
  d.getElementById('tenPer').style.display = "none";
  d.getElementById('fiftenPer').style.display = "none";
  d.getElementById('twenPer').style.display = "none";
  d.getElementById('dollarTip').style.display = "none";
  d.getElementById('tipInput').style.display = "none";
  d.getElementById('customTip').style.display = "none";
  d.getElementById('thank').style.display = "block";
}

function kCustTip() {
  var key = event.keyCode;
  if (key === 13) {
    custTip();
  }
}

function custTip() {
  var xTip = d.getElementById('tipInput').value;
  fTot = fTot + parseFloat(xTip);
  d.getElementById('finalTotal').innerHTML = "Total: $" + fTot.toFixed(2);
  d.getElementById('tenPer').style.display = "none";
  d.getElementById('fiftenPer').style.display = "none";
  d.getElementById('twenPer').style.display = "none";
  d.getElementById('dollarTip').style.display = "none";
  d.getElementById('tipInput').style.display = "none";
  d.getElementById('customTip').style.display = "none";
  d.getElementById('thank').style.display = "block";
}

/*
var previous = null;
var current = null;
  setInterval (function () {
    $.getJSON("sample.json", function(json) {
      current = JSON.stringify(json);
      if (previous && current && previous !== current) {
        location.relod();
      }
      previous = current;
    }
  });
  }, 2000);
*/
