FoodPlate.InitUser = (function() {
        console.log('FoodPlateApp InitUser module loaded');
        let userIsRegistered;
        let user;
        let difference;
        let lastCheckInDate;
        let returnDate;
        const regBtn = document.getElementById('initRegister_btn');

        function checkUser() {
            if (localStorage.length > 0) {
                console.log('checkUser() called: user has already registered');
                userIsRegistered = true;
                getUser();
                setInitRegisterBtn();
            }
            else {
                console.log('checkUser() called: user has not registered');
                userIsRegistered = false;
                setInitRegisterBtn();
            }
        }

        function getUser() {
            //get user object from localStorage
            user = localStorage.getItem('user');
            //parse user as a user object
            user = JSON.parse(user);
            //log the user
            console.log(user);
            lastCheckInDate = localStorage.getItem('checkInDate');
            console.log(lastCheckInDate);
            //set this return date
            returnDate = new Date();
            //log return date
            console.log(returnDate);
            localStorage.setItem('returnDate', returnDate);
        }


        function setInitRegisterBtn() {
            console.log('setInitRegisterBtn called');
            if(!userIsRegistered) {
                setRegButtonValue('Register');
                /* register_btn handler */
                regBtn.addEventListener('click', function() {
                    //go to register form page
                    $.mobile.navigate("#registerFormPage", {transition: "flip", info: "register user"});
                    //log button click
                    console.log('clicked register button');
                    FoodPlate.ValidateRegistration.validateForm();
                });
            }
            else if(userIsRegistered) {
                setRegButtonValue('Check In');
                checkTime();
                regBtn.addEventListener('click', function () {
                    $.mobile.navigate("#addFoodPage", {transition: "flip", info: "let user add food"});
                    $('#welcomeHeader').text(user.userName + "'s Food Plate");
                });
            }
        }

        function checkTime() {
            console.log('checkTime called');
            console.log(lastCheckInDate);
            lastCheckInDate = new Date(lastCheckInDate);
            returnDate = new Date(returnDate);
            console.log(returnDate);
            difference = lastCheckInDate.getTime() - returnDate.getTime();
            difference = Math.ceil(difference/(1000*60*60*24));
            console.log("difference: " + difference);
            if(difference >= 1) {
                console.log('same day');
            }
            else if (difference == -1) {
                console.log('day is over');
                //TODO update status
                //TODO clean plate
                alert("It has been more than 24 hours since your last check in. Your plate will be reset for today.");
            }
        }

        function setRegButtonValue(btnValue) {
            regBtn.value = btnValue;
        }

        return {
            checkUser : checkUser
        };
    }
)();
