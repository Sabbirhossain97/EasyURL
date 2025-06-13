import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
}


export const adminOnly = (req,res,next)=> {
    if(req.user?.role === "admin"){
        next();
    } else {
        res.status(403).json({error: "Access denied. Admins only"})
    }
}