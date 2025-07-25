exports.isDemo = async (req, res, next)=> {
    console.log(req.user.email);
    if (req.user.email === "picak27269@binafex.com" || req.user.email === "abcd@gmail.com") {
        return res.status(401).json({
            success: false,
            message: "This is a Demo User",
        });
    }
    next();
}