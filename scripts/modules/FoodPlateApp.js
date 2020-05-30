import { checkUser } from './user-test.js';

// https://medium.com/@petertumulty/avoiding-the-global-scope-with-the-revealing-module-pattern-6796ae7af1b9
// https://general.support.brightcove.com/developer/concepts-javascript-module-design-pattern.html
const FoodPlateApp = (function() {
    let user = 'default user';
    let req = {};
    let registered = false;
    let checkInDate = new Date();
    let returnDate = new Date();
    let ageGroup = null;
    let difference = null;
    let userCode = null;
    let age = null;
    let gender = null;
    let firstName = null;
    let minutesDifference = null;
    let secondsDifference = null;
    let selectedFood = null;
    let userIsRegistered = false;
    let regBtn = document.getElementById('initRegister_btn');

    return { user: user,
             req: req,
             registered: registered,
             checkInDate: checkInDate,
             returnDate: returnDate,
             difference: difference,
             userCode: userCode,
             gender: gender,
             firstName: firstName,
             minutesDifference: minutesDifference,
             secondsDifference: secondsDifference,
             selectedFood: selectedFood,
             userIsRegistered: userIsRegistered,
             regBtn: regBtn,
             age: age,
             ageGroup: ageGroup
    };
}());

function init() {
    window.addEventListener('load', (event) => {
        console.info(`event.type is: ${event.type}`)
        console.info(`FoodPlateApp module loaded`);
        console.info(`InitMainPage module loaded`);
        checkUser();
    });
}

init();

export { FoodPlateApp }


