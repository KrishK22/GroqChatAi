import jwt from 'jsonwebtoken'
import userModel from "../models/user.model.js";



export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized no token provided "
            })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            res.status(401).json({
                message: "unAuthorized - Invalid Token"
            })
            return
        }

        const user = await userModel.findById(decoded.userId).select("-password")

        if (!user) {
            res.status(404).json({
                message: "User not found !"
            })
            return
        }
        req.user = user;
        next()

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error in protectedRoute `, error.message)
            res.status(500).json({
                message: "Internal Server Error!"
            })
        } else {
            res.status(500).json({
                message: "Something went wrong "
            })
        }
    }
}