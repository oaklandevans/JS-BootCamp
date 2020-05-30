(function() {
function User(name, gender, age, registered, req, userStatus) {
    this.userName = name || "anonUser";
    this.userGender = gender;
    this.userAge = age;
    this.userCode = this.userGender + this.userAge;
    this.registered = registered;
    this.userReq = req;
    this.userStatus = userStatus;
    this.registered = false;
    }
    return {
        user: user,
    }
})();
















