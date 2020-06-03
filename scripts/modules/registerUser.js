import {FoodPlate} from './main.js';
import { setRegBtnValue } from './init-app.js';
import { getUserRequirements } from './userRequirements.js';
import { getUserInitStatus } from './initStatus.js';

function onRegisterSubmit() {
    console.log('%c onRegisterSubmit function called', 'color:green');
    let username = document.getElementById('firstName');
    if (username.checkValidity() === false) {
        alert("You did not complete the First Name field.")
    } else {
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
        setUserCode(FoodPlate.user.userGender, FoodPlate.user.ageGroup);
        createUser();
        //store the user data in local storage
        // storeUserData(user);
        //store the check in date and the return date (user has registered with checkin date and simultaneously returns
        storeDate('checkInDate', FoodPlate.checkInDate);
        storeDate('returnDate', FoodPlate.returnDate);
    }
}

function createUser() {
    console.log('%ccreateUser function called', 'color:green');
    FoodPlate.user.userReq = getUserRequirements(FoodPlate.user.userCode);
    console.table(FoodPlate.user);
    FoodPlate.user.userStatus = getUserInitStatus();
    console.table(FoodPlate.user);
    //set registered to true
    FoodPlate.user.registered = true;
    console.table(FoodPlate.user);
    confirmUser(FoodPlate.user);
    storeUserData(FoodPlate.user);
}

function confirmUser(user) {
    console.log('%cconfirmUser function called', 'color:green');
    document.querySelector('#registerHeader>h1').innerText = FoodPlate.user.userName + "'s Food Plate";
    const registerConfirmDiv = document.getElementById('registerConfirm');
    registerConfirmDiv.appendChild(createConfirmMessage());
    document.getElementById('registerForm').hidden = true;
    setRegBtnValue('Check In');
    registerConfirmDiv.appendChild(createReturnToPlateBtn());
    $.mobile.navigate("#registerFormPage", {transition: "flip", info: "let user add food"});
    document.querySelector('#welcomeHeader').innerText = FoodPlate.user.userName + "'s Food Plate";

}

function createReturnToPlateBtn() {
    const addFoodPageLink = document.createElement('a');
    addFoodPageLink.setAttribute('href', '#addFoodPage');
    const returnToFoodPlateBtn = document.createElement('input');
    returnToFoodPlateBtn.setAttribute('type', 'button');
    returnToFoodPlateBtn.setAttribute('name', 'returnToPlate_btn');
    returnToFoodPlateBtn.setAttribute('id', 'returnToPlate_btn');
    returnToFoodPlateBtn.setAttribute('value', 'Return to Plate');
    returnToFoodPlateBtn.setAttribute('class', 'fpButton');
    addFoodPageLink.appendChild(returnToFoodPlateBtn);
    return addFoodPageLink;
}

function createConfirmMessage() {
    let selectedGender = formatGender(FoodPlate.user.userGender);
    const confirmDiv = document.createElement('div');
    confirmDiv.setAttribute('class', 'confirmMessage');
    const confirmH2userName = document.createElement('h2');
    confirmH2userName.innerText = `You have successfully registered as: ${FoodPlate.user.userName }`;
    confirmDiv.appendChild(confirmH2userName);
    const confirmPAge = document.createElement('p');
    confirmPAge.innerText = `Your age group is: ${FoodPlate.user.ageGroup}`;
    confirmDiv.appendChild(confirmPAge);
    const confirmPGender = document.createElement('p');
    confirmPGender.innerText = `Your gender is: ${selectedGender}`;
    confirmDiv.appendChild(confirmPGender);
    return confirmDiv;
}

function formatGender(gender) {
    let formattedGender;
    if (gender === "M") {
        formattedGender = "Male";
    } else {
        formattedGender = "Female"
    }
    return formattedGender;
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

export { onRegisterSubmit, storeUserData }
