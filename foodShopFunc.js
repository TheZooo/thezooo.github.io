var d = document;
var myData;
var amtBox = d.getElementsByClassName('itemBox');
var i = 0;

function startA() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { //4 = ready ; 200 = okay
      myData = JSON.parse(this.responseText);
      }
    };
  xmlhttp.open("GET", "sample.json", true);
  xmlhttp.send();
  
  
  for (i; i < amtBox.length; i++) {
    d.getElementsByClassName('itemDesc')[i].innerHTML = myData.food[i].desc;
    window.alert(i);
  }
  
}
