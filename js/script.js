// *****************  3.0 ADD WINDOW ONLOAD TO ALLOW EMBEDDED SVG TO TARGET PROPERLY

window.onload = function() {

    // *** 1.1 Delcare new micro:bit object ***
    let microBit = new uBit();

    // ** 3.2 GET SVG OBJECT AND LOOK INSIDE ITS CONTENTS
    let obj = document.getElementById("mainSVG").contentDocument;
    let landingSVG = obj.getElementById("landing");
    let natureSVG = obj.getElementById("nature");
    let citySVG = obj.getElementById("city");
    let winnerSVG = obj.getElementById("winner");
    let cloudsNature = obj.getElementById('clouds-nature');
    let cloudsCity = obj.getElementById('clouds-city');
    let moonNature = obj.getElementById('moon-nature');
    let moonCity = obj.getElementById('moon-city');
    let buttonA = obj.getElementById('button-a');
    let buttonB = obj.getElementById('button-b');
    let btnAB = [buttonA, buttonB];

    //  **************** 3.1 GET SEARCH BUTTON AND ADD EVENT LISTENER ****************
    let searchBtn = document.getElementById('searchButton');

    // ** 2.1 Declare a variable to hold the count
    let buttonACurrentCount = 0;
    let buttonBCurrentCount = 0;

    // * 3.0 ADD CURRENT STATE BUTTONS
    let bothButtonsPressed = false;
    let currentAState = false;
    let currentBState = false;
    let prevAState = currentAState;
    let prevBState = currentBState;

    searchBtn.addEventListener('click', searchDevice);
    landing();

    // *** Temperature
    let tempField = document.getElementById('temperature');

    // *** 1.2 Declare a function and search for the Micro:bit ***
    function searchDevice(){
        microBit.searchDevice();
    }

    // *** 1.3 Check if micro:bit successfully connected ***
    microBit.onConnect(function() {
        console.log("Vitot has entered the server!");
    });

    // ** 1.4 GetButton data that updates with every frame
    microBit.onBleNotify(function() {
        // console.log(microbit.getButtonA());
        // ** 1.4.1 Update button data to write to our HTML
        document.getElementById("buttonA").innerHTML = microBit.getButtonA();
        document.getElementById("buttonB").innerHTML = microBit.getButtonB();

        buttonAHasChanged();
        buttonBHasChanged();
        tempField.innerHTML = microBit.getTemperature();

    });

    // ** 1.5 Only calls function once when Button A is pressed. 
    microBit.setButtonACallback(function() {
        console.log("Button A is Pressed!");
        // ** 2.3 Call our GSAP

        // ** 2.3 Call our function with the current count 
        currentButtonACount();

    });

    // ** 1.5.2
    microBit.setButtonBCallback(function() {
        console.log("Button B is Pressed!");
        currentButtonBCount();
    });

    // ! ***** A BUTTON HOLD *****   
    // ** 2.2 Create a function to keep the current count of button presses
    function currentButtonACount() {
        buttonACurrentCount++;
        console.log(buttonACurrentCount);

        // ** 2.4 Reset count if it exceeds a maximum
        if(buttonACurrentCount >= 2) {
            console.log("Button A has been pressed 2 times");
            gsap.to(landingSVG, {
                opacity: 1.,
                duration: 1.5
            })
            microBit.writeMatrixText("Main Menu!");
            hideCity();
            hideNature();
            hideWinner();
            // Reset count
            buttonACurrentCount = 0;
        }
    }

    // * 3.1 Function to see if the button state has changed
    function buttonAHasChanged() {
        // * 3.2 Declare in the function that's always updating, and cast button state to Boolean
        let buttonAState = Boolean(microBit.getButtonA());

        currentAState = buttonAState;

        // * 3.3 IF a BUTTON is not equal to its previous state (i.e., it has changed)
        if(currentAState != prevAState) {
            // console.log("Not equal to previous state");
            if (currentAState && currentBState) {
                // * both buttons are pressed
                bothButtonsPressed = true;
                handleBothButtonsPressed();
            } else {
                bothButtonsPressed = false;
            }
        }
    

        if(prevAState === false && currentAState === true) {
            // console.log("OFF TO ON! // BUTTON HELD DOWN");
            gsap.delayedCall(3, timerAFinished);
        
        } else if(prevAState === true && currentAState === false) {
            // console.log("ON TO OFF! // BUTTON RELEASED");
            gsap.killTweensOf(timerAFinished);
        }

        // * Set the previous state to the current state so that it updates before we loop through this block again
        prevAState = currentAState;
    }

    // * 3.4 Function for when timer has finsished
    function timerAFinished() {
        // console.log("TIMER FINISHED");
        // * RUN GSAP
        gsap.to(citySVG, {
            opacity: 1,
            duration: 1.5
        });
        microBit.writeMatrixText("City!");
        city();
        hideLanding();
        hideNature();
        hideWinner();
    }

    // ! ***** B BUTTON HOLD *****    
    // ** 2.2 Create a function to keep the current count of button presses
    function currentButtonBCount() {
        buttonBCurrentCount++;
        console.log(buttonBCurrentCount);

        // ** 2.4 Reset count if it exceeds a maximum
        if(buttonBCurrentCount >= 2) {
            console.log("Button B has been pressed 2 times");
            gsap.to(landingSVG, {
                opacity: 1.,
                duration: 1.5
            })

            microBit.writeMatrixText("Main Menu!");
            hideCity();
            hideNature();
            hideWinner();
            // Reset count
            buttonBCurrentCount = 0;
        }
    }

    // * 3.1 Function to see if the button state has changed
    function buttonBHasChanged() {
        // * 3.2 Declare in the function that's always updating, and cast button state to Boolean
        let buttonBState = Boolean(microBit.getButtonB());

        currentBState = buttonBState;

        // * 3.3 IF a BUTTON is not equal to its previous state (i.e., it has changed)
        if(currentBState != prevBState) {
            // console.log("Not equal to previous state");
            if (currentAState && currentBState) {
                // * both buttons pressed
                bothButtonsPressed = true;
                handleBothButtonsPressed();
            } else {
                bothButtonsPressed = false;
            }
        }

        if(prevBState === false && currentBState === true) {
            // console.log("OFF TO ON! // BUTTON HELD DOWN");
            gsap.delayedCall(3, timerBFinished);
        
        } else if(prevBState === true && currentBState === false) {
            // console.log("ON TO OFF! // BUTTON RELEASED");
            gsap.killTweensOf(timerBFinished);
        }

        // * Set the previous state to the current state so that it updates before we loop through this block again
        prevBState = currentBState;
    }

    // * 3.4 Function for when timer has finsished
    function timerBFinished() {
        // console.log("TIMER FINISHED");
        // * RUN GSAP
        gsap.to(natureSVG, {
            opacity: 1,
            duration: 1.5
        });

        microBit.writeMatrixText("Nature!");
        nature();
        hideLanding();
        hideCity();
        hideWinner();
    }

    function handleBothButtonsPressed() {
        gsap.to(winnerSVG, {
            opacity: 1,
            duration: 1.5
        });


        microBit.writeMatrixText("Congratulations!");
        hideCity();
        hideLanding();
        hideNature();

        bothButtonsPressed = false;
    }

    function nature() {
        gsap.fromTo(cloudsNature, {
            translateX: -600
        },{
            duration: 10,
            translateX: 600,
            ease: "linear",
            repeat: -1
        });

        gsap.fromTo(moonNature, {
            translateX: -500
        },{
            duration: 20,
            translateX: 500,
            ease: "linear",
            repeat: -1
        });
    }

    function city() {
        gsap.fromTo(cloudsCity, {
            translateX: -600
        },{
            duration: 10,
            translateX: 600,
            ease: "linear",
            repeat: -1
        });

        gsap.fromTo(moonCity, {
            translateX: -500
        },{
            duration: 20,
            translateX: 500,
            ease: "linear",
            repeat: -1
        });
    }

    function landing() {
        gsap.to(btnAB, {
            transformOrigin: "center",
            scale: 1.1,
            repeat: -1,
            ease: "linear",
            duration: 3
        })
    }

    function hideLanding() {
        gsap.to(landingSVG, {
            opacity: 0,
            duration: 0.1
        })
        buttonACurrentCount = 0;
        buttonBCurrentCount = 0;
    }

    function hideCity() {
        gsap.to(citySVG, {
            opacity: 0,
            duration: 0.1
        })
        buttonACurrentCount = 0;
        buttonBCurrentCount = 0;
    }

    function hideNature() {
        gsap.to(natureSVG, {
            opacity: 0,
            duration: 0.1
        })
        buttonACurrentCount = 0;
        buttonBCurrentCount = 0;
    }

    function hideWinner() {
        gsap.to(winnerSVG, {
            opacity: 0,
            duration: 0.1
        })
        buttonACurrentCount = 0;
        buttonBCurrentCount = 0;
    }

}