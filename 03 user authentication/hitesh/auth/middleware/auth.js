const Auth = (req, res, next) =>{
    
    // we don't have anything to access cookies for that we need cookies parser
    console.log("req.cookies:",req.cookies);
    const token = req.cookies.token     //since we saved cookies with the key named token
    // also const {token, something} = req.cookies
    //  const token = req.cookies
    // const token = req.cookies || req.header (if req.cookies is not present)

    // 1. checking if token is missing
    if (!token) {
       return res.status(403).send("access denied")
    }

    // 2. if present varify the token by jwt since it takes time we will run it in the try catch block
    try {
        const decodeToken = jwt.verify(token, "shhhh")  // we will get {id: user._id, email} object
        console.log("decodeToken:", decodeToken);
        //creating another property in the req object as user and adding decodeToken value
        req.user = decodeToken;

        // extract id from the decodeToken and query the db (will do in the maga project)
    } catch (error) {   
        console.log(error);
        res.status(403).send("invalid token")
    }
    // handover the control to response
    return next()   // or simply next()
}

// export default Auth TODO: difference between these two
module.exports = Auth