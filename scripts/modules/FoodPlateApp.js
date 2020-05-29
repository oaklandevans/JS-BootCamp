
const FoodPlateApp = {
    init: () => {
        window.addEventListener('load', (event) => {
            console.info(`event.type is: ${event.type}`)
            console.info(`FoodPlateApp module loaded`);
            console.info(`InitMainPage module loaded`);
            FoodPlateApp.InitUser.checkUser();
        });
    }
}

/*
const FoodPlateApp = (() => {
    function init() {
        window.addEventListener('load', (event) => {
            console.log(`event: ${event.type}`)
            console.log(`FoodPlateApp module loaded`);
            FoodPlateApp.InitUser.checkUser();
        });
    }
    return {
        init : init
    };
})();
*/
