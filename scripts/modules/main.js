import { checkUser } from './init-app.js';
import { User } from './user.js';
// https://medium.com/@petertumulty/avoiding-the-global-scope-with-the-revealing-module-pattern-6796ae7af1b9
// https://general.support.brightcove.com/developer/concepts-javascript-module-design-pattern.html

const FoodPlate = (function() {
    let user = new User();
    let checkInDate = new Date();
    let returnDate = new Date();
    let ageGroup = null;
    let difference = null;
    let minutesDifference = null;
    let secondsDifference = null;
    let selectedFood = null;
    let userIsRegistered = false;
    // DOM Elements
    const regBtn = document.getElementById('initRegister_btn');
    const firstnameTI = document.getElementById('firstName');

    return { user: user,
             checkInDate: checkInDate,
             returnDate: returnDate,
             difference: difference,
             userCode: User.userCode,
             minutesDifference: minutesDifference,
             secondsDifference: secondsDifference,
             selectedFood: selectedFood,
             userIsRegistered: userIsRegistered,
             regBtn: regBtn,
             ageGroup: ageGroup,
             firstnameTI
    };
}());

function init() {
    console.log('%cinit function called', 'color:green');
    window.addEventListener('load', (event) => {
        console.info(`event occurred - event.type is: ${event.type} event`)
        console.info('%cmain.js module has loaded', 'color: red');
        checkUser();
    });
}

init();

export { FoodPlate }


