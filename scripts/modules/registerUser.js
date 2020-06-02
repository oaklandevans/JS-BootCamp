import {FoodPlate} from './main.js';

function onRegisterSubmit() {
    let username = document.getElementById('firstName');
    if (username.checkValidity() === false) {
        alert("You did not complete the First Name field.")
    } else {
        //get form data
        // console.log("getting user data from form");
        //get and log userName
        // let userName = document.getElementById('firstName').value;
        //console.log("user name: " + userName);
        //get and log userGender
        //let userGender = document.querySelector('input[name]=gender::checked').value;
        //console.log("user gender: " + userGender);
        //get and log age group
        if (FoodPlate.user.age === "adult") {
            let ageGroup = document.querySelector('#adultAgeGroups span.ui-selectmenu-text').textContent;
            console.log('registered age: ' + ageGroup);
            FoodPlate.user.ageGroup = ageGroup;
        } else if (FoodPlate.user.age === "child") {
            let ageGroup = document.querySelector('#childAgeGroups span.ui-selectmenu-text').textContent;
            console.log('registered age: ' + ageGroup);
            FoodPlate.user.ageGroup = ageGroup;
        }
        //set check in date to a new date object and log
        FoodPlate.checkInDate = new Date();
        console.log(`checkInDate: ${FoodPlate.checkInDate}`);
        //set a return date to a new date object and log
        FoodPlate.returnDate = new Date();
        console.log(`returnDate: ${FoodPlate.returnDate}`);
        setUserCode(FoodPlate.user.gender, FoodPlate.user.ageGroup);
        // createUser();
        //store the user data in local storage
        // storeUserData(user);
        //store the check in date and the return date (user has registered with checkin date and simultaneously returns
        storeDate('checkInDate', FoodPlate.checkInDate);
        storeDate('returnDate', FoodPlate.returnDate);
    }
}

function setUserCode(gender, ageGroup) {
    console.log('%csetUserCode function called', 'color:green');
    FoodPlate.user.userCode = gender + ageGroup;
    console.table(FoodPlate.user);
}

function storeDate(name, date) {
    localStorage.setItem(name, date);
}

function storeUserData(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

export { onRegisterSubmit }
