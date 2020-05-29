/**
 * Created by Kevin Ruse on 7/16/2015.
 */
(function(exports) {
    "use strict";
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
    exports.User = User;
})(this);
















