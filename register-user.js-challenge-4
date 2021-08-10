import { FoodPlate } from './main.js';
import { getUserRequirements } from './user-requirements.js';
import { getUserInitStatus } from './init-status.js';
import { storeUserData, storeDate, setRegBtnValue } from './utils.js';
import { DOMnodes } from './dom-nodes.js';

function onRegisterSubmit() {
    console.log('%c onRegisterSubmit function called', 'color:green');
    if (DOMnodes.userName.checkValidity() === false) {
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
    DOMnodes.registerHeaderH1.innerText = FoodPlate.user.userName + "'s Food Plate";
    DOMnodes.registerConfirmDiv.appendChild(createConfirmMessage());
    DOMnodes.registerForm.hidden = true;
    setRegBtnValue('Check In');
    DOMnodes.registerConfirmDiv.appendChild(createReturnToPlateBtn());
    // jquerymobile navigation method to go to add Food Page. see https://api.jquerymobile.com/navigate/
    $.mobile.navigate("#registerFormPage", {transition: "flip", info: "let user add food"});
    DOMnodes.welcomeHeader.innerText = FoodPlate.user.userName + "'s Food Plate";

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
    // create a constant called confirmDiv. The value of the constant should create a '<div>' element
    const confirmDiv = document.createElement('div');
    // create an attribute of the confirmDiv element that assigns a css class called 'confirmMessage'
    confirmDiv.setAttribute('class', 'confirmMessage');
    // create a constant called confirmH2userName and assign a value that creates a new '<h2>' element
    const confirmH2userName = document.createElement('h2');
    // give the confirmH2userName a child text node  = `You have successfully registered as: ` followed by the FoodPlate user object's userName property
    const childNodeText = document.createTextNode(`You have successfully registered as: ${FoodPlate.user.userName}`);
    confirmH2userName.appendChild(childNodeText);
    // append the new confirmH2userName element to the confirmDiv element
    confirmDiv.appendChild(confirmH2userName);
    // create a constant called confirmPAge and assign the value that creates a new '<p>' element
    let confirmPAge = document.createElement('p');
    // assign the <p> element's a child text node = `Your age group is: ` followed by the FoodPlate user object's ageGroup property
    const pElementsChildText = document.createTextNode(`Your age group is: ${FoodPlate.user.ageGroup}`);
    confirmPAge = pElementsChildText;
    // append the confirmPAge to the confirmDiv
    confirmDiv.appendChild(confirmPAge);
    // create a constant called confirmPGender and assign the value that creates a new <p> element
    let confirmPGender = document.createElement('p');
    // assign the confirmPGender element a child text  node = `Your gender is ` followed by the selectedGender variable declared in the first line of this function
    let genderChildTextNode = document.createTextNode(`Your gender is: ${FoodPlate.user.userGender}`);
    confirmPGender = genderChildTextNode;
    // append the confirmPGender element to the confirmDiv element
    confirmDiv.appendChild(confirmPGender);
    // return the confirmDiv
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

export { onRegisterSubmit, storeUserData, storeDate }
