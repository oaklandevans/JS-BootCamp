FoodPlate.ValidateRegistration = (function($) {
    var un = document.getElementById('firstName');
    var $adultRadioBtn = $('#ageGroupA');
    var $childRadioBtn = $('#ageGroupC');
    var $firstnameTI = $('#firstName');
    function validateForm() {
        console.log('validateForm called');
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

       //todo move to button handler
        if (un.checkValidity() === false) {
            //alert("You did not complete the First Name field.")
        }
        else {
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
    return {
        validateForm : validateForm
    }

})(jQuery);
