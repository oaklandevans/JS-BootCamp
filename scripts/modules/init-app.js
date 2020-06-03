import { FoodPlate } from './main.js';
import { onRegisterSubmit } from './registerUser.js';
import { processForm } from './validateReg.js';
import { updateImages } from './plateManagement.js';

function checkUser() {
    console.info('%cinit-app module has loaded', 'color: red');
    console.log('%ccheckUser function has been called', 'color:green');
    if (localStorage.getItem('user')) {
        getUser();
        setRegBtn();
    } else {
        FoodPlate.user.registered = false;
        console.log(`userIsRegistered: ${FoodPlate.user.registered}`);
        setRegBtn();
    }
    console.log('%ccheckUser function called - user registered:', 'color:green',  `${FoodPlate.user.registered}`);
}

function getUser() {
    console.log(`%cgetUser function called`, 'color:green');
    //get user object from localStorage
    if (localStorage.key('user')) {
        FoodPlate.user = JSON.parse(localStorage.getItem('user'));
        console.log('user returned from localstorage');
        console.table(FoodPlate.user);
        welcomeUser();
        updateCheckIn();
    }
}

function updateCheckIn() {
    console.log('%cupdateUser function called', 'color:green');
    FoodPlate.lastCheckInDate = localStorage.getItem('checkInDate');
    console.log(`user's last checkin date was ${FoodPlate.lastCheckInDate}`);
    //set this sessions return date
    FoodPlate.returnDate = new Date();
    //log return date
    console.log(`user returned on ${FoodPlate.returnDate}`);
    localStorage.setItem('returnDate', FoodPlate.returnDate);
}

function welcomeUser() {
    console.log('%cwelcomeUser function called', 'color:green');
    document.querySelector('#staticHeader>h1').innerText = `${FoodPlate.user.userName}'s Food Plate`;
    document.querySelector('#registerHeader>h1').innerText = `${FoodPlate.user.userName}'s Food Plate`;
    document.querySelector('#addFoodHeader>h1').innerText = `${FoodPlate.user.userName}'s Food Plate`;
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
    } else if(FoodPlate.user.registered) {
        setRegBtnValue('Check In');
        checkTime();
        updateImages(FoodPlate.user);
        FoodPlate.regBtn.addEventListener('click', function () {
            // jquerymobile navigation method
            $.mobile.navigate("#addFoodPage", {transition: "flip", info: "let user add food"});
        });
    }
}

function checkTime() {
    console.log('%ccheckTime function called', 'color:green');
    FoodPlate.lastCheckInDate = new Date(FoodPlate.lastCheckInDate);
    // testDate
    // FoodPlate.returnDate = new Date(2020, 6, 5);
    FoodPlate.returnDate = new Date(FoodPlate.returnDate);
    FoodPlate.difference = FoodPlate.lastCheckInDate.getTime() - FoodPlate.returnDate.getTime();
    FoodPlate.difference = Math.ceil(FoodPlate.difference/(1000*60*60*24));
    console.log("difference between register date and check in date is: " + FoodPlate.difference);
    if (FoodPlate.difference >= 0) {
        console.log('user has checked in on the same date as registration date');
    }
    else if (FoodPlate.difference <= -1) {
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

