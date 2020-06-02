import {FoodPlate} from './main.js';
import { setRegBtnValue } from './init-app.js';

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
    document.getElementById('registerHeader').innerText = FoodPlate.user.userName + "'s Food Plate";
    const registerConfirmDiv = document.getElementById('registerConfirm');
    registerConfirmDiv.appendChild(createConfirmMessage());
    document.getElementById('registerForm').hidden = true;
    setRegBtnValue('Check In');
    registerConfirmDiv.appendChild(createReturnToPlateBtn());
    $.mobile.navigate("#registerFormPage", {transition: "flip", info: "let user add food"});
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
    console.log(selectedGender);
    //let selectedGender = (FoodPlate.user.userGender === "M") ? "Male" : "Female";
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
    console.log(confirmDiv);
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

function getUserRequirements(ageGroupParam) {
    console.log(`%cgetUserRequirements function called using code: ${ageGroupParam}`,'color:green');
    let requirements;
    if (ageGroupParam === "F19-30") {
        requirements = {
            'fruit' : 2,
            'protein' : 5.5,
            'dairy' : 3,
            'veg' : 2.5,
            'grains' : 6
        }
    }
    else if (ageGroupParam === "M19-30") {
        requirements = {
            "fruit": 2,
            "protein": 5.5,
            "dairy": 3,
            "veg": 2.5,
            "grains": 6
        };
    } else if (ageGroupParam === "M51+") {
        console.log("Match: M51+");
        requirements = {
            "fruit": 2,
            "protein": 5.5,
            "dairy": 3,
            "veg": 2.5,
            "grains": 6
        };
    } else if (ageGroupParam === "F31-50" || "M9-13") {
        requirements = {
            "fruit": 1.5,
            "protein": 5,
            "dairy": 3,
            "veg": 2.5,
            "grains": 6
        };
    } else if (ageGroupParam === "F51+") {
        requirements = {
            "fruit": 1.5,
            "protein": 5,
            "dairy": 3,
            "veg": 2,
            "grains": 5
        };
    } else if (ageGroupParam === "F9-13") {
        requirements = {
            "fruit": 1.5,
            "protein": 5,
            "dairy": 3,
            "veg": 2,
            "grains": 5
        };
    } else if (ageGroupParam === "F14-18") {
        requirements = {
            "fruit": 1.5,
            "protein": 5,
            "dairy": 3,
            "veg": 2.5,
            "grains": 6
        };
    } else if (ageGroupParam === "F2-3" || "M2-3" || "M4-8") {
        requirements = {
            "fruit": 1,
            "protein": 2,
            "dairy": 2,
            "veg": 1,
            "grains": 3
        };
    } else if (ageGroupParam === "M31-50") {
        requirements = {
            "fruit": 2,
            "protein": 6,
            "dairy": 3,
            "veg": 3,
            "grains": 7
        };
    } else if (ageGroupParam === "M14-18") {
        requirements = {
            "fruit": 2,
            "protein": 6.5,
            "dairy": 3,
            "veg": 3,
            "grains": 8
        };
        FoodPlate.user.userReq = {
            "fruit": req.fruit,
            "protein": req.protein,
            "grain": req.grain,
            "veg": req.veg
        };
    }
    //console.log(requirements);
    return requirements;
}

function getUserInitStatus() {
    let fruit = {
        'eaten': 0,
        'met': 'false',
        'left': 0
    };
    let protein = {
        'eaten': 0,
        'met': 'false',
        'left': 0
    };
    let veg = {
        'eaten': 0,
        'met': 'false',
        'left': 0
    };
    let grain = {
        'eaten': 0,
        'met': 'false',
        'left': 0
    };
    let stats = [{'fruit': fruit}, {'protein' : protein}, {'veg': veg}, {'grain' : grain}];
    return stats;
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
