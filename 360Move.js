var w = window.innerWidth;
        var h = window.innerHeight;
        var carX = 50;
        var carY = 50;
        var carW = 5;
        var carH = 5;
        //---------------------
        var movementChng = 0.01;
        var moveDegrade = 0.3;
        var moveX = 0;
        var moveY = 0;
        var moveRate = 0;
        var moveMax = 0.2;
        var moveMin = -0.2;
        var moveInc = 0;
        var moveIncMax = 5;
        //----------------------
        var radius = 50;
        var ang = 0;
        //----------------------
        var turnChng = 0.01;
        var turnDegrade = 0.5;
        var turnRate = 0;
        var turnRateMax = 0.05;
        var turnRateMin = -0.05;
        var turnInc = 0;
        var turnIncMax = 2;
        var keys = [false, false, false, false]; //LEFT, UP, RIGHT, DOWN

        function draw() {
            if (carX < 0) { //BORDERS
                carX = 0;
            }
            if (carX > w) {
                carX = w;
            }
            if (carY < 0) {
                carY = 0;
            }
            if (carY > h) {
                carY = h
            }
            //------------------------------------------------------------------------------
            if (keys[0] || keys[2]) { //TURNING MECHINISM
                if (turnInc >= turnIncMax) {
                    turnInc = 0;
                    if (keys[0] && turnRate > turnRateMin) {
                        turnRate -= turnChng;
                    }
                    if (keys[2] && turnRate < turnRateMax) {
                        turnRate += turnChng;
                    }
                } else if (turnInc < turnIncMax) {
                    turnInc++;
                }
            } else if (turnRate > 0.001 || turnRate < -0.001) {
                if (turnInc >= turnIncMax) {
                    turnInc = 0;
                    if (turnRate > 0) {
                        turnRate -= Math.abs(turnRate * turnDegrade);
                    }
                    if (turnRate < 0) {
                        turnRate += Math.abs(turnRate * turnDegrade);
                    }
                } else if (turnInc < turnIncMax) {
                    turnInc++;
                }
            }
            ang += Number(turnRate.toFixed(2));
            //------------------------------------------------------------------------------
            if (keys[1] || keys[3]) { //MOVING MECHINISM
                if (moveInc >= moveIncMax) {
                    moveInc = 0;
                    if (keys[1] && moveRate < moveMax) {
                        moveRate += movementChng;
                    }
                    if (keys[3] && moveRate > moveMin) {
                        moveRate -= movementChng;
                    }
                } else if (moveInc < moveIncMax) {
                    moveInc++;
                }
            } else if (moveRate > 0.001 || moveRate < -0.001) {
                if (moveInc >= moveIncMax) {
                    moveInc = 0;
                    if (moveRate > 0) {
                        moveRate -= Math.abs(moveRate * moveDegrade);
                    }
                    if (moveRate < 0) {
                        moveRate += Math.abs(moveRate * moveDegrade);
                    }
                } else if (moveInc < moveIncMax) {
                    moveInc++;
                }
            }
            moveX = (Math.abs((carX + cos(ang) * radius / 2)) - carX) * moveRate;
            moveY = (Math.abs((carY + sin(ang) * radius / 2)) - carY) * moveRate;
            carX += Number(moveX.toFixed(2));
            carY += Number(moveY.toFixed(2));
            //------------------------------------------------------------------------------
            background(220);

            fill(255, 10, 10);
            stroke(0);
            strokeWeight(1);
            ellipse(carX, carY, carW, carH);

            noFill();
            ellipse(carX, carY, radius);

            stroke(0, 0, 0, 50);
            line(carX, carY, carX + cos(ang) * radius / 2, carY + sin(ang) * radius / 2);

            strokeWeight(3);
            stroke(255, 10, 10);
            point(carX + cos(ang) * radius / 2, carY + sin(ang) * radius / 2);
        }
