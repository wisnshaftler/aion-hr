class validation {

    /**
     * 
     * @param {String} email Email of the user
     * @param {String} password Password of the user
     * @returns  Array. if pass first element will be true;
     */
    credentialCheck(email, password, newAccount = false) {

        try {
            email = String('' + email);
            password = String('' + password);
        } catch (e) {
            return [false, "Email or Password in incorrect"];
        }

        //check is email valid
        const trueMail = email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/);
        if (!trueMail) {
            return [false, "Email is invalid"];
        }

        //check password is valid
        if (password.length < 8) {
            return [false, "Password is invalid"];
        }

        const strength = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        if(!strength && newAccount) {
            return [false, "Password strength is weak"];
        }

        return [true, "Email and password is perfect"];
    }

    emailCheck(email) {
        try {
            email = String('' + email);
            const trueMail = email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/);
            if (!trueMail) {
                return [false, "Email is invalid"];
            }

        } catch (e) {
            return [false, "Email in incorrect"];
        }

        return [true, "Email is valid"];
    }

}

export default validation = new validation();