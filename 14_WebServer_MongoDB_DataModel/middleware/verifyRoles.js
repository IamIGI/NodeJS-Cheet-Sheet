const verifyRoles = (...allowedRoles) => {
    // take all args that function will get
    return (req, res, next) => {
        // if not req or req is but, don't have roles key, return 401
        if (!req?.roles) return res.sendStatus(401); //unauthorize
        const rolesArray = [...allowedRoles];
        console.log('Credentials: ' + rolesArray);
        console.log('Account credentials:  ' + req.roles);
        const result = req.roles.map((role) => rolesArray.includes(role)).find((val) => val === true);
        if (!result) return res.sendStatus(401);
        next();
    };
};

module.exports = verifyRoles;
