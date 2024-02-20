const adminmiddleware = async (req, res, next) => {
    try {
        const adminRole = req.user.isAdmin 
        if(!adminRole){
            return res.status(403).json({ message: "Access denied. User is not an admin." });
        }
        next();  // if user is admin
    } catch (error) {
        next(error);
    }
}

module.exports = adminmiddleware;