const jwt = require('jsonwebtoken')
const user = require('../collection')

const Authentication = async (req, res, next) => {
    try {
        if (typeof(req.cookies.jwtToken) === "undefined") {
            console.log("Token is not found...")
            res.json(false)
        } else {
            const cookieToken = req.cookies.jwtToken;
            const verifyToken = jwt.verify(cookieToken, "BearcatStudyBuddyProject")

            const verifyUser = await user.findOne({ _id: verifyToken._id, token: cookieToken })
            if (!verifyUser) {
                res.json(false)
            }
            req.user = verifyUser
            next()
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = Authentication