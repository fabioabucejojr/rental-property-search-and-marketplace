module.exports = (req, res, next) => {
    const { first_name, last_name, bdate, user_email, user_password, user_type } = req.body;

    function validEmail(user_email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email);
    }

    // Define validInfo object
    const validInfo = {
        first_name: {
            required: true,
            type: 'string',
            minLength: 3,
            maxLength: 30
        },
        last_name: {
            required: true,
            type: 'string',
            minLength: 3,
            maxLength: 30
        },
        bdate: {
            required: true,
            type: 'date',
            pattern: /\d{4}-\d{2}-\d{2}/ // Use appropriate date format pattern
        },
        user_email: {
            required: true,
            type: 'string',
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        user_password: {
            required: true,
            type: 'string',
            minLength: 8,
            maxLength: 50
        },
        user_type: {
            required: true,
            type: 'string',
            enum: ['admin', 'user']
        }
    };

    if (req.path === "/register") {
        // Check if all required fields are present and valid
        for (let field in validInfo) {
            if (validInfo[field].required && !req.body[field]) {
                return res.status(401).json(`Missing ${field} field`);
            }
            if (validInfo[field].type === 'string' && req.body[field] && typeof req.body[field] !== 'string') {
                return res.status(401).json(`${field} field must be a string`);
            }
            if (validInfo[field].type === 'number' && req.body[field] && typeof req.body[field] !== 'number') {
                return res.status(401).json(`${field} field must be a number`);
            }
            if (validInfo[field].minLength && req.body[field] && req.body[field].length < validInfo[field].minLength) {
                return res.status(401).json(`${field} field must be at least ${validInfo[field].minLength} characters`);
            }
            if (validInfo[field].maxLength && req.body[field] && req.body[field].length > validInfo[field].maxLength) {
                return res.status(401).json(`${field} field cannot be longer than ${validInfo[field].maxLength} characters`);
            }
            if (validInfo[field].pattern && req.body[field] && !validInfo[field].pattern.test(req.body[field])) {
                return res.status(401).json(`Invalid ${field}`);
            }
            if (validInfo[field].enum && req.body[field] && !validInfo[field].enum.includes(req.body[field])) {
                return res.status(401).json(`Invalid ${field}`);
            }
        }
    }

    else if (req.path === "/login") {
        if (![user_email, user_password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(user_email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    // if (req.path === "/register") {
    //     //console.log(!user_email.length);
    //     if (![first_name, last_name, bdate, user_email, user_password, user_type].every(Boolean)) {
    //         return res.status(401).json("Missing Credentials");
    //     } else if (!validEmail(user_email)) {
    //         return res.status(401).json("Invalid Email");
    //     }
    // }

    // else if (req.path === "/login") {
    //     if (![user_email, user_password].every(Boolean)) {
    //         return res.status(401).json("Missing Credentials");
    //     } else if (!validEmail(user_email)) {
    //         return res.status(401).json("Invalid Email");
    //     }
    // }

    next();
};