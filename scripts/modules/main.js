import { checkUser } from './init-app.js';
import { User } from './user.js';
import { activateFoodIcons } from './plateManagement.js';

const FoodPlate = (function() {
    let user = new User();
    let checkInDate = new Date();
    let returnDate = new Date();
    let ageGroup = null;
    // let difference;
    let minutesDifference = null;
    let secondsDifference = null;
    let selectedFood = null;
    // let userIsRegistered = false;
    // DOM Elements
    const regBtn = document.getElementById('initRegister_btn');
    const firstnameTI = document.getElementById('firstName');

    return { user: user,
             checkInDate: checkInDate,
             returnDate: returnDate,
             // difference: difference,
             userCode: User.userCode,
             minutesDifference: minutesDifference,
             secondsDifference: secondsDifference,
             selectedFood: selectedFood,
             // userIsRegistered: userIsRegistered,
             regBtn: regBtn,
             ageGroup: ageGroup,
             firstnameTI
    };
}());

function init() {
    console.info('%cmain.js module has loaded', 'color: red');
    console.log('%cinit function called', 'color:green');
    window.addEventListener('load', (event) => {
        console.info(`event occurred - event.type is: ${event.type} event`)
        checkUser();
        activateFoodIcons();
    });
}


init();

export { FoodPlate }


