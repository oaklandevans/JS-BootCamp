import { FoodPlate } from './main.js';
import { onRegisterSubmit } from './registerUser.js';
import { processForm } from './validateReg.js';
import { User } from './user.js';

function checkUser() {
    console.info('%cinit-app module has loaded', 'color: red');
    if (localStorage.getItem('user')) {
        User.registered = true;
        getUser();
        console.log('%cgetUser called function', 'color:green');
        setRegBtn();
        console.log('%csetRegistrationBtn function called', 'color:green');
    } else {
        FoodPlate.user.registered = false;
        console.log(`userIsRegistered: ${FoodPlate.userIsRegistered}`);
        setRegBtn();
    }
    console.log('%ccheckUser function called - user registered:', 'color:green',  `${FoodPlate.user.registered}`);
}

function getUser() {
    console.log(`getUser() called`);
    //get user object from localStorage
    let user = localStorage.getItem('user');
    //parse user as a user object
    user = JSON.parse(user);
    //log the user
    console.log(user);
    FoodPlate.lastCheckInDate = localStorage.getItem('checkInDate');
    console.log(FoodPlate.lastCheckInDate);
    //set this return date
    FoodPlate.returnDate = new Date();
    //log return date
    console.log(FoodPlate.returnDate);
    localStorage.setItem('returnDate', FoodPlate.returnDate);
}

function setRegBtn() {
    console.log('%csetRegistrationBtn function called', 'color: green');
    if (!FoodPlate.user.registered) {
        setRegBtnValue('Register');
        /* register_btn handler */
        FoodPlate.regBtn.addEventListener('click', function() {
            //jquerymobile go to register form page
            $.mobile.navigate("#registerFormPage", {transition: "flip", info: "register user"});
            //log button click
            console.log('user clicked register button');
            document.getElementById('register_user_btn').addEventListener('click', onRegisterSubmit);
            processForm();
        });
    } else if(FoodPlate.userIsRegistered) {
        setRegBtnValue('Check In');
        checkTime();
        FoodPlate.regBtn.addEventListener('click', function () {
            $.mobile.navigate("#addFoodPage", {transition: "flip", info: "let user add food"});
            $('#welcomeHeader').text(user.userName + "'s Food Plate");
        });
    }
}

function checkTime() {
    console.log('checkTime called');
    console.log(FoodPlate.lastCheckInDate);
    FoodPlate.lastCheckInDate = new Date(FoodPlate.lastCheckInDate);
    FoodPlate.returnDate = new Date(FoodPlate.returnDate);
    console.log(FoodPlate.returnDate);
    FoodPlate.difference = FoodPlate.lastCheckInDate.getTime() - FoodPlate.returnDate.getTime();
    FoodPlate.difference = Math.ceil(difference/(1000*60*60*24));
    console.log("difference: " + difference);
    if (FoodPlate.difference >= 1) {
        console.log('same day');
    }
    else if (FoodPlate.difference == -1) {
        console.log('day is over');
        //TODO update status
        //TODO clean plate
        alert("It has been more than 24 hours since your last check in. Your plate will be reset for today.");
    }
}

// TODO categorize as a utility function and move to utils library
function setRegBtnValue(btnValue) {
    console.log(`%csetRegBtnValue function called and set registration button to ${btnValue}`, 'color:green');
    FoodPlate.regBtn.value = btnValue;
}


export { checkUser, setRegBtnValue }

