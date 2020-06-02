import {FoodPlate} from './main.js';
import { onRegisterSubmit } from './registerUser.js';

function processForm() {
    console.log('%cvaildateReg module has loaded', 'color:red');
    console.log('%cvalidateForm function called', 'color:green');
    console.table(FoodPlate.user);
    const un = document.getElementById('firstName');
    const adultRadioBtn = document.getElementById('ageGroupA');
    const childRadioBtn = document.getElementById('ageGroupC');
    const firstnameTI = document.getElementById('firstName');
    const register_user_btn = document.getElementById('register_user_btn');

    /*********************************************************REG FORM : event listeners */
    // show age adult and child age groups
    document.querySelector('label[for=ageGroupC]').addEventListener('click', showChildAgeGroups);
    document.querySelector('label[for=ageGroupA]').addEventListener('click', showAdultAgeGroups);
    // set users gender
    document.querySelector('label[for=sexM]').addEventListener('click', setGender);
    document.querySelector('label[for=sexF]').addEventListener('click', setGender);
    //set users first name
    firstnameTI.addEventListener('blur', setUserName);
    // submit registration form
    register_user_btn.addEventListener('submit', onRegisterSubmit);
}

    //enable age buttons to display combobox for adults
    function showAdultAgeGroups() {
        console.log('user clicked adultAgeGroup');
        document.getElementById('adultAgeGroups').style.display = 'block';
        document.getElementById('childAgeGroups').style.display = 'none';
        FoodPlate.user.age = 'adult';
        console.table(FoodPlate.user);
    }

    //enable age buttons to display combobox for children
    function showChildAgeGroups() {
        console.log('user clicked childAgeGroup');
        document.getElementById('childAgeGroups').style.display = 'block';
        document.getElementById('adultAgeGroups').style.display = 'none';
        FoodPlate.user.age = 'child';
        console.table(FoodPlate.user);
    }

    function setGender(evt) {
        console.log(`setGender is called: ${evt.target.nextElementSibling.value}`);
        let selectedRadio = evt.target.nextElementSibling.value;
        FoodPlate.user.userGender = selectedRadio;
        console.table(FoodPlate.user);
    }

    function setUserName(evt) {
        FoodPlate.user.userName = evt.target.value;
        console.log(`user entered username: ${FoodPlate.user.userName}`);
        console.table(FoodPlate.user);
    }

export { processForm }

