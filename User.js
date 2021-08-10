function User(name, gender, age, registered, req, userStatus) {
    this.userName = name || 'Unregistered User';
    this.userGender = gender || 'unknown';
    this.userAge = age || 'unknown';
    this.userCode = this.userGender + this.userAge || 'unknownunknown';
    this.registered = false || false;
    this.userReq = req || 'unknown';
    this.userStatus = null || 0;
}

export { User }

















