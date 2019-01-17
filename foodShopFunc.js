var d = document;
var myData;
var amtBox = d.getElementsByTagName('div').length;

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
  
  window.alert(amtBox);
  window.alert(myData);
  
  //for (i = 0;)
  //d.getElementsByClassName('itemDesc')
}