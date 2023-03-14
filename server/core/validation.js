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

    newUserValidate(fname, lname, empid, dob, joindate, departmentid, jobtitleid, contactno, address) {
        if(!fname || !lname || !dob || !joindate || !departmentid || !jobtitleid || !contactno || !address ||
            !Array.isArray(contactno) || !empid) {
            return [false, "Userdata is invalid"];
        }

        if(fname == "" || lname == "" || empid == "", dob == "" || joindate == "" || departmentid == "" || jobtitleid == "" ||
        address == "" || contactno.length == 0) {
            return [false, "user data is invalid"];
        }

        return [true, "valid user data"];
    }

    newDepValidate(departmentName, depheadid) {
        if(departmentName == "" || !departmentName || depheadid == "" || !depheadid) {
            return [false, "department data is incorrect"];
        }
        return [ true, "valid department data"];
    }

    newDashboardUserValidate(email, password, name, accesslevel) {
        const validAccessLevels = ["admin", "hr"];
        if(!email || !password || !name || !accesslevel) {
            return [false, "user data invalid"];
        }
        if(email == "" || password == "" || name == "" || accesslevel == "") {
            return [false, "user data invalid"];
        } 
        if(!validAccessLevels.includes(accesslevel) ) {
            return [false, "invalid access level"];
        }

        //check email 
        if(!this.emailCheck(email)[0]) return [false, "email is invalid"];

        //check password
        if (password.length < 8) {
            return [false, "Password is invalid"];
        }

        const strength = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        if(!strength ) {
            return [false, "Password strength is weak"];
        }

        if(name.trim() == "") {
            return[false, "name is incorrect"]
        }
        
        return [true, "perfect"];
    }
}

export default validation = new validation();