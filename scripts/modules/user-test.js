import { FoodPlateApp } from './FoodPlateApp.js';

function checkUser() {
    if (localStorage.length > 0) {
        console.log('checkUser() called: user has already registered');
        FoodPlateApp.userIsRegistered = true;
        getUser();
        // FoodPlateApp.setInitRegisterBtn();
    }
    else {
        console.log('checkUser() called: user has not registered');
        FoodPlateApp.userIsRegistered = false;
        console.log(`userIsRegistered: ${FoodPlateApp.userIsRegistered}`);
        setInitRegisterBtn();
    }
}

function getUser() {
    console.log(`getUser() called`);
    //get user object from localStorage
    user = localStorage.getItem('user');
    //parse user as a user object
    user = JSON.parse(user);
    //log the user
    console.log(user);
    FoodPlateApp.lastCheckInDate = localStorage.getItem('checkInDate');
    console.log(FoodPlateApp.lastCheckInDate);
    //set this return date
    returnDate = new Date();
    //log return date
    console.log(returnDate);
    localStorage.setItem('returnDate', returnDate);
}

function setInitRegisterBtn() {
    console.log('setInitRegisterBtn called');
    if(!FoodPlateApp.userIsRegistered) {
        setRegButtonValue('Register');
        /* register_btn handler */
        FoodPlateApp.regBtn.addEventListener('click', function() {
            //go to register form page
            $.mobile.navigate("#registerFormPage", {transition: "flip", info: "register user"});
            //log button click
            console.log('clicked register button');
            // FoodPlateApp.ValidateRegistration.validateForm();
        });
    }
    else if(FoodPlateApp.userIsRegistered) {
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
    console.log(FoodPlateApp.lastCheckInDate);
    FoodPlateApp.lastCheckInDate = new Date(FoodPlateApp.lastCheckInDate);
    FoodPlateApp.returnDate = new Date(FoodPlateApp.returnDate);
    console.log(FoodPlateApp.returnDate);
    FoodPlateApp.difference = FoodPlateApp.lastCheckInDate.getTime() - FoodPlateApp.returnDate.getTime();
    FoodPlateApp.difference = Math.ceil(difference/(1000*60*60*24));
    console.log("difference: " + difference);
    if (FoodPlateApp.difference >= 1) {
        console.log('same day');
    }
    else if (FoodPlateApp.difference == -1) {
        console.log('day is over');
        //TODO update status
        //TODO clean plate
        alert("It has been more than 24 hours since your last check in. Your plate will be reset for today.");
    }
}

function setRegButtonValue(btnValue) {
    FoodPlateApp.regBtn.value = btnValue;
}


export { checkUser }

