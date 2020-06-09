
function checkUser() {
    console.log('FoodPlateApp InitUser module loaded');
    let userIsRegistered;
    let user;
    let difference;
    let lastCheckInDate;
    let returnDate;
    const regBtn = document.getElementById('initRegister_btn');
    if (localStorage.length > 0) {
        console.log('checkUser() called: user has already registered');
        getUser();
        setInitRegisterBtn();
    }
    else {
        console.log('checkUser() called: user has not registered');
        userIsRegistered = false;
        setInitRegisterBtn();
    }
}

export { checkUser }
