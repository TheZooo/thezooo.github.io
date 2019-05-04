<html>
  <head>
    <style>
      canvas {
        position: absolute;
        left: 0;
        top: 0;
      }
    </style>
    <script src="p5/p5.min.js"></script>
    <script>
      var w = window.innerWidth;
      var h = window.innerHeight;
      //--------------------------------------
      var amtX = w * 0.05;
      var setY = 400;
      var instX = [];
      var instAY = [];
      var instBY = [];
      var baseChangeInc = 30;
      var changeInc = baseChangeInc;
      var changeRandom = 60;
      var changeRAdd = setY - changeRandom/2;
      var changeSpeed = 0.1;
      //---------------------------------------
      var interX = [];
      var interY = [];
      var interSize = [];
      var interMaxSize = [];
      var interR = [];
      var interG = [];
      var interB = [];
      var interType = [];
      var interCheck = [];

      function setup() {
        createCanvas(w, h);
        for (var i = 0; i < w; i+=amtX) {
          instX.push(i);
          instAY.push(setY);
        }
      }
      
      function draw() {
        background(255,255,255,90);
        //------------------------------------------------
        for (var i = 0; i < instAY.length; i++) {
          if (instBY.length < instAY.length) {
            var rand = Math.floor(Math.random() * changeRandom) + changeRAdd;
            instBY.push(rand);
          }
          if (instAY[i] > instBY[i]) {
            instAY[i]-=changeSpeed;
          } else if (instAY[i] < instBY[i]) {
            instAY[i]+=changeSpeed;
          }
          strokeWeight(0);
          fill(0, 0, 255, 0.8);
          beginShape();
          for (var ss = 0; ss < instX.length; ss++) {
            vertex(instX[ss], instAY[ss]);
          }
          vertex(w, h);
          vertex(0, h);
          endShape(CLOSE);
        }
        if (changeInc <= 0) {
          changeSpeed = Math.floor(Math.random() * 1) + 0.1;
          if (instBY.length === instAY.length) {
            for (var ii = 0; ii < instAY.length; ii++) {
              instBY.pop();
            }
          }
          changeInc = baseChangeInc;
        } else if (changeInc > 0) {
          changeInc--;
        }
        //-------------------------------------------------
        if (mouseIsPressed) {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            if (mouseButton === LEFT) {
                var size = Math.floor(Math.random() * 40) + 40;
                interX.push(mouseX);
                interY.push(mouseY);
                interR.push(r);
                interG.push(g);
                interB.push(b);
                interSize.push(0);
                interMaxSize.push(size);
                interType.push(0);
                interCheck.push(false);
            }
            if (mouseButton === RIGHT) {
                var xrand = Math.floor(Math.random() * -40) + Math.floor(Math.random() * 40);
                var yrand = Math.floor(Math.random() * -40) + Math.floor(Math.random() * 40);
                interX.push(mouseX + xrand);
                interY.push(mouseY + yrand);
                interR.push(r);
                interG.push(g);
                interB.push(b);
                interSize.push(0);
                interMaxSize.push(20);
                interType.push(1);
                interCheck.push(false);
            }
        }
        //------------------------------------------------------------------
        for (var ii = 0; ii < interCheck.length; ii++) {
            if (interSize[ii] < interMaxSize[ii] && interCheck[ii] === false) {
                interSize[ii] += interMaxSize[ii] * 0.05;
            }
            if (interSize[ii] >= interMaxSize[ii]) {
                interCheck[ii] = true;
            }
            if (interCheck[ii] === true) {
                interSize[ii] -= interMaxSize[ii] * 0.05;
                if (interSize[ii] <= 0) {
                    interX.splice(ii, 1);
                    interY.splice(ii, 1);
                    interR.splice(ii, 1);
                    interG.splice(ii, 1);
                    interB.splice(ii, 1);
                    interSize.splice(ii, 1);
                    interMaxSize.splice(ii, 1);
                    interType.splice(ii, 1);
                    interCheck.splice(ii, 1);
                }
            }
            strokeWeight(0);
            fill(interR[ii], interG[ii], interB[ii], 10);
            if (interType[ii] === 0) {
                ellipse(interX[ii], interY[ii], interSize[ii]);
            } else if (interType[ii] === 1) {
                rectMode(CENTER);
                rect(interX[ii], interY[ii], interSize[ii], interSize[ii]);
            }
        }
      }

      function windowResized() {
          w = window.innerWidth;
          h = window.innerHeight;
          resizeCanvas(w, h);
      }
    </script>
  </head>
  <body>
    
  </body>
</html>
