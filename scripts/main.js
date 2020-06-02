/* global vars */
var user;
//var requirements;
var req;
var registered;
var checkInDate;
var returnDate;
var fruitLeft;
var ageGroup;
var difference;
var userCode;
var age;
var gender;
var firstName;
var minutesDifference;
var secondsDifference;
var hoursDifference;
var daysDifference;
var selectedFood;
$(document).ready(function() {
    "use strict";
    /* dom elements */
    var $registerBtn = $('#initRegister_btn');
    var $adultRadioBtn = $('#ageGroupA');
    var $childRadioBtn = $('#ageGroupC');
    var $firstnameTI = $('#firstName');
    var $status = $('#status');

    console.log('app started at jquery doc.ready()');
    //get the user from localStorage
    getUser();
    initUser();

    function getUser() {
        //if user has already registered
        if (localStorage.length > 0) {
            console.log('getUser called: user has already registered');
            //get user object from local storage as string
            user = localStorage.getItem('user');
            //parse user as a user object
            user = JSON.parse(user);
            //get registration status
            registered = user.registered;
            //log the user
            console.log(user);
            //set return date
            returnDate = new Date();
            //log return date
            console.log(returnDate);
            updateImages(user.userStatus);
        }
        else {
            //user has not registered
            console.log('user has not registered');
            registered = false;
            //initUser();
        }
        //log register status
        console.log("register status = " + registered);
    }

    function initUser() {
        console.log('InitUser called');
        if (registered === true) {
            console.log("welcomeUser called");
            welcomeUser();
        }
        else {
            setRegistrationBtn();
        }
    }

    function welcomeUser() {
        console.log("welcomeUser called. User has already registered");
        document.getElementById('initRegister_btn').removeEventListener('click', registerUser);
        $.mobile.navigate("#homePage", {transition: "flip", info: "check in user"});
        $('#homeHeader').html(user.userName + "'s Food Plate");
        document.getElementById('initRegister_btn').value = 'Check In';
        checkInUserBtn();
        //set return date
        returnDate = new Date();
        //store the returnDate
        storeDate("returnDate", returnDate);
        //get checkInDate
        checkInDate = window.localStorage.getItem('checkInDate');
        checkInDate = new Date(checkInDate);
        storeDate('checkInDate', checkInDate);
    }

    function setRegistrationBtn() {
        console.log('setRegistrationBtn called');
        /* register_btn handler */
        $registerBtn.click(function () {
            //go to register form page
            $.mobile.navigate("#registerFormPage", {transition: "flip", info: "register user"});
            //log button click
            console.log('clicked register button');
            //add listener for register button
            document.getElementById('register_user').addEventListener('click', registerUser);
        });
    }

    function registerUser() {
        console.log('registerUsed called');
        validateForm();
    }

    function validateForm() {
        console.log('validateForm called');
        var un = document.getElementById('firstName');
        if (un.checkValidity() === false) {
            alert("You did not complete the First Name field.")
        } else {
            //get form data
            console.log("getting user data from form");
            //get and log userName
            var userName = $firstnameTI.val();
            console.log("user name: " + userName);
            //get and log userGender
            var userGender = $('input[name="gender"]:checked').val();
            console.log("user gender: " + userGender);
            //get and log age group
            if (age === "adult") {
                ageGroup = document.querySelector('#adultAgeGroups span.ui-selectmenu-text').textContent;
                console.log('registered age: ' + ageGroup);
            }
            else if (age === "child") {
                ageGroup = document.querySelector('#childAgeGroups span.ui-selectmenu-text').textContent;
                console.log('registered age: ' + ageGroup);
            }
            //set check in date to a new date object and log
            checkInDate = new Date();
            console.log(checkInDate);
            //set a return date to a new date object and log
            returnDate = new Date();
            console.log(returnDate);
            createUser();
            //store the user data in local storage
            storeUserData(user);
            //store the check in date and the return date (user has registered with checkin date and simultaneously returns
            storeDate('checkInDate', checkInDate);
            storeDate('returnDate', returnDate);
        }
    }

    function createUser() {
        console.log('createUser called');
        //create the user code
        getUserCode(gender, ageGroup);
        console.log("userCode created: " + userCode);
        //create a new user object
        user = new User(firstName, gender, ageGroup, registered, getUserRequirements(userCode), getUserInitStatus());
        console.log('new User() called; creating new user');
        console.log(user);
        //set registered to true
        user.registered = true;
        console.log("user registered: " + user.registered);
        confirmUser(user);
        storeUserData(user);
    }
    function confirmUser(user) {
        console.log("confirmUser called");
        //set the header to display the user name
        $('#registerHeader').text(user.userName + "'s Food Plate");
        $('#addFoodHeader').text(user.userName + "'s Food Plate");
        //confirm the users registration information
        var selectedGender = (user.userGender === "M") ? "Male" : "Female";
        $("<div id='confirmMsg' style='text-align:center; border: 1px solid #000; background-color: #fff; border-radius: 1em; padding: 8px; width: 80%; margin: 12px auto;'><h2>You have successfully registered as: " + user.userName + "</h2><p>Your age group is: " + user.userAge + "</p><p>Your sex is: " + selectedGender + "</p></div>").appendTo('#registerConfirm');
        $("<a href='#addFoodPage'><input style='margin-bottom: 24px' type='button' name='returnToPlate_btn' id='returnToPlate_btn' value='Return to Plate' class='fpButton'></a>").appendTo('#confirmMsg');
        $('#registerForm').hide();
        $('#register_btn').val("Check In");
        $.mobile.navigate("#registerFormPage", {transition: "flip", info: "let user add food"});
    }

    function checkTime() {
        console.log('checking time');
        console.log(checkInDate);
        console.log(returnDate);
        difference = checkInDate.getTime() - returnDate.getTime();
        difference = Math.ceil(difference/(1000*60*60*24));
        console.log("difference: " + difference);
        if(difference >= 1) {
            console.log('same day');
        }
        else if (difference == -1) {
            console.log('day is over');
            alert("It has been more than 24 hours since your last check in. Time to reset your plate for today.");
            loadImage('fruitempty', 'fruitempty.png');
            loadImage('grainempty', 'graindairyempty.png');
            loadImage('vegempty', 'vegempty.png');
            loadImage('proteinempty', 'proteinempty.png');
            user.userStatus = getUserInitStatus();
            //welcomeUser();
            resetUserDay();

        }
    }

    function resetUserDay() {
        user.userStatus = getUserInitStatus();
        //set check in date to a new date object and log
        checkInDate = new Date();
        console.log(checkInDate);
        //set a return date to a new date object and log
        returnDate = new Date();
        console.log(returnDate);
        storeDate("returnDate", returnDate);
        storeDate("checkInDate", checkInDate);
        storeUserData(user);
    }

    function checkInUserBtn() {
        $('#initRegister_btn').click(function () {
            checkTime();
            $.mobile.navigate("#addFoodPage", {transition: "flip", info: "let user add food"});
            $('#addFoodHeader').text(user.userName + "'s Food Plate");
            console.log("clicked Check In button");
        });
    }

    function storeDate(name, date) {
        localStorage.setItem(name, date);
    }

    function storeUserData(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    function getUserCode(gender, ageGroup) {
        console.log('getUserCode called');
        userCode = gender + ageGroup;
        return userCode;
    }

    function getUserInitStatus() {
        var fruit = {
            'eaten': 0,
            'met': 'false',
            'left': 0
        };
        var protein = {
            'eaten': 0,
            'met': 'false',
            'left': 0
        };
        var veg = {
            'eaten': 0,
            'met': 'false',
            'left': 0
        };
        var grain = {
            'eaten': 0,
            'met': 'false',
            'left': 0
        };
        var stats = [{'fruit': fruit}, {'protein' : protein}, {'veg': veg}, {'grain' : grain}];
        return stats;
    }

    function getUserRequirements(ageGroupParam) {
        //console.log(ageGroupParam);
        var requirements;
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
            user.userReq = {
                "fruit": req.fruit,
                "protein": req.protein,
                "grain": req.grain,
                "veg": req.veg
            };
        }
        //console.log(requirements);
        return requirements;
    }

    /*********************************************************REG FORM : event listeners */
//enable age buttons to display combobox for adults
    $adultRadioBtn.click(function () {
        console.log('clicked adultAgeGroup');
        $("#adultAgeGroups").css("display", "block");
        age = "adult";
    });
//enable age buttons to display combobox for children
    $childRadioBtn.click(function () {
        console.log('clicked childAgeGroup');
        $("#childAgeGroups").css("display", "block");
        age = "child";
    });
//set users sex
    $("#sexM, #sexF").click(function () {
        gender = $("input:radio:checked").val();
        console.log('clicked ' + gender);
    });

//set users first name
    $firstnameTI.blur(function () {
        firstName = $('#firstName').val();
        console.log("entered first name: " + firstName);
    });

    //drag the foodIcons
    $('#fruitIcon').draggable({opacity: ".75", revert: 'invalid', helper: 'clone', cursor: 'pointer'});
    $('#vegIcon').draggable({opacity: ".75", revert: 'invalid', helper: 'clone', cursor: 'pointer'});
    $('#proteinIcon').draggable({opacity: ".75", revert: 'invalid', helper: 'clone', cursor: 'pointer'});
    $('#grainIcon').draggable({opacity: ".75", revert: 'invalid', helper: 'clone', cursor: 'pointer'});
    $('#dairyIcon').draggable({opacity: ".75", revert: 'invalid', helper: 'clone', cursor: 'pointer'});
    $('#fruitempty').droppable({accept: "#fruitIcon",
        drop: foodDropEvent
    });
    $('#vegempty').droppable({accept: "#vegIcon",
        drop: foodDropEvent
    });
    $('#grainempty').droppable({accept: "#grainIcon",
        drop: foodDropEvent
    });
    $('#proteinempty').droppable({accept: "#proteinIcon",
        drop: foodDropEvent
    });

    function foodDropEvent(evt, ui) {
        var foodDropEvt = evt;
        selectedFood = ui.draggable.attr('id');
        console.log('event: ' + foodDropEvt + ": " + selectedFood);
        //checkDate();
        diaryUpdate(selectedFood);
    }

/*    function checkDate() {
        difference = returnDate.getTime() - checkInDate.getTime();
        daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24;
        hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60;
        minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60;
        secondsDifference = Math.floor(difference/1000);
        console.log(difference);
        if( daysDifference >= 1) {
            alert("It's been more than 24 hours since your last check-in. Would you like to start a new day?");
        }
        else {
            console.log('same day');
            diaryUpdate(selectedFood);
        }
    }*/

    function diaryUpdate(foodAdded) {
        //get user object from local storage as string
        user = localStorage.getItem('user');
        console.log(user);
        //parse user as a user object
        user = JSON.parse(user);
        console.log('diary update called');
        var measure;
        //if you added a piece of fruit
        if (foodAdded == "fruitIcon") {
            measure = "cup";
            console.log('you ate fruit');
            //if you haven't eaten any fruit yet
            if (user.userStatus[0].fruit.eaten == 0) {
                //console.log(localStorage.getItem('fruits'));
                user.userStatus[0].fruit.eaten = 1;
                user.userStatus[0].fruit.left = Number(user.userReq.fruit) - Number(user.userStatus[0].fruit.eaten);
                user.userStatus[0].fruit.met = 'false';
                $status.removeClass('visually-hidden');
                $status.html("<p>You have eaten " + user.userStatus[0].fruit.eaten + " " + measure + " of Fruit. You need to eat " + user.userStatus[0].fruit.left + " more " + measure + "s.</p>");
            }
            else {
                user.userStatus[0].fruit.eaten++;
                fruitLeft = user.userReq.fruit - user.userStatus[0].fruit.eaten;
                user.userStatus[0].fruit.met = false;
                if (Number(user.userStatus[0].fruit.eaten) < Number(user.userReq.fruit)) {
                    $status.removeClass('visually-hidden');
                    $status.html("<p>You have eaten " + user.userStatus[0].fruit.eaten + " " + measure + " of Fruit. You need to eat " + fruitLeft + " more " + measure + "</p>");
                }
                else {
                    $status.removeClass('visually-hidden');
                    $status.html('<p>You have eaten all the fruit you need to eat today!</p>');
                        user.userStatus[0].fruit.met = 'true';
                        console.log("ate all your fruit");
                        loadImage('fruitempty', 'fruit-full.png');
                    }
                }
            }
        if (foodAdded == "proteinIcon") {
            measure = "cup";
            console.log('you ate protein');
            //if you haven't eaten any protein yet
            if (user.userStatus[1].protein.eaten == 0) {
                //console.log(localStorage.getItem('protein'));
                user.userStatus[1].protein.eaten = 1;
                user.userStatus[1].protein.left = Number(user.userReq.protein) - Number(user.userStatus[1].protein.eaten);
                user.userStatus[1].protein.met = 'false';
                $status.removeClass('visually-hidden');
                $status.html("<p>You have eaten " + user.userStatus[1].protein.eaten + " " + measure + " of protein. You need to eat " + user.userStatus[1].protein.left + " more " + measure + "s.</p>");
            }
            else {
                user.userStatus[1].protein.eaten++;
                var proteinLeft = Number(user.userReq.protein) - Number(user.userStatus[1].protein.eaten);
                user.userStatus[1].protein.met = false;
                if (Number(user.userStatus[1].protein.eaten) < Number(user.userReq.protein)) {
                    $status.removeClass('visually-hidden');
                    $status.html("<p>You have eaten " + user.userStatus[1].protein.eaten + " " + measure + " of protein. You need to eat " + proteinLeft + " more " + measure + "</p>");
                }
                else {
                    $status.removeClass('visually-hidden');
                    $status.html('<p>You have eaten all the fruit you need to eat today!</p>');
                    user.userStatus[1].protein.met = 'true';
                    console.log("ate all your protein");
                    loadImage('proteinempty', 'protein-full.jpg');
                }
            }
        }
        if (foodAdded == "vegIcon") {
            measure = "cup";
            console.log('you ate veg');
            //if you haven't eaten any protein yet
            if (user.userStatus[2].veg.eaten == 0) {
                //console.log(localStorage.getItem('veg'));
                user.userStatus[2].veg.eaten = 1;
                user.userStatus[2].veg.left = Number(user.userReq.veg) - Number(user.userStatus[2].veg.eaten);
                user.userStatus[2].veg.met = 'false';
                $status.removeClass('visually-hidden');
                $status.html("<p>You have eaten " + user.userStatus[2].veg.eaten + " " + measure + " of vegetables. You need to eat " + user.userStatus[2].veg.left + " more " + measure + "s.</p>");
            }
            else {
                user.userStatus[2].veg.eaten++;
                var vegLeft = Number(user.userReq.veg) - Number(user.userStatus[2].veg.eaten);
                user.userStatus[2].veg.met = false;
                if (Number(user.userStatus[2].veg.eaten) < Number(user.userReq.veg)) {
                    $status.removeClass('visually-hidden');
                    $status.html("<p>You have eaten " + user.userStatus[2].veg.eaten + " " + measure + " of vegetable. You need to eat " + vegLeft + " more " + measure + "</p>");
                }
                else {
                    $status.removeClass('visually-hidden');
                    $status.html('<p>You have eaten all the vegetables you need to eat today!</p>');
                    user.userStatus[2].veg.met = 'true';
                    console.log("ate all your vegetables");
                    loadImage('vegempty', 'veg-full.jpg');
                }
            }
        }
        if (foodAdded == "grainIcon") {
            measure = "cup";
            console.log('you ate grain');
            //if you haven't eaten any protein yet
            if (user.userStatus[3].grain.eaten == 0) {
                //console.log(localStorage.getItem('veg'));
                user.userStatus[3].grain.eaten = 1;
                user.userStatus[3].grain.left = Number(user.userReq.grains) - Number(user.userStatus[3].grain.eaten);
                user.userStatus[3].grain.met = 'false';
                $status.removeClass('visually-hidden');
                $status.html("<p>You have eaten " + user.userStatus[3].grain.eaten + " " + measure + " of grains. You need to eat " + user.userStatus[3].grain.left + " more " + measure + "s.</p>");
            }
            else {
                user.userStatus[3].grain.eaten++;
                var grainLeft = Number(user.userReq.grains) - Number(user.userStatus[3].grain.eaten);
                user.userStatus[3].grain.met = false;
                if (Number(user.userStatus[3].grain.eaten) < Number(user.userReq.grains)) {
                    $status.removeClass('visually-hidden');
                    $status.html("<p>You have eaten " + user.userStatus[3].grain.eaten + " " + measure + " of grains. You need to eat " + grainLeft + " more " + measure + "</p>");
                }
                else {
                    $status.removeClass('visually-hidden');
                    $status.html('<p>You have eaten all the grains you need to eat today!</p>');
                    user.userStatus[3].grain.met = 'true';
                    console.log("ate all your vegetables");
                    loadImage('grainempty', 'grain-full.png');
                }
            }
        }
        storeUserData(user);
    }
    function loadImage(origImg, newImg) {
        document.getElementById(origImg).src = "assets/images/plateImages/" + newImg;
    }

    function updateImages(userStatus) {
        console.log("updateImages called");
            if(userStatus[0].fruit.met == "true") {
                console.log("met fruit");
                loadImage('fruitempty', 'fruit-full.png');
            }
        if(userStatus[1].protein.met == "true") {
            console.log("met protein");
            loadImage('proteinempty', 'protein-full.jpg');
        }
        if(userStatus[2].veg.met == "true") {
            console.log("met veg");
            loadImage('vegempty', 'veg-full.jpg');
        }
        if(userStatus[3].grain.met == "true") {
            console.log("met grain");
            loadImage('grainempty', 'grain-full.png');
        }
    }
});


