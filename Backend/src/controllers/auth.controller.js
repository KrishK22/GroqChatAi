import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../lib/generateToken.js';
import { json } from 'express';


export const signup = async (req, res) => {
    try {
        const { fullName, email, password, lang } = req.body;
        const languages = [lang];
        const userFound = await userModel.findOne({ email });
        if (userFound) {
            res.status(409).json({
                message: "User already Exists"
            });
            return;
        }
        if (password.length < 6) {
            res.status(409).json({
                message: "Password very Short!"
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            language: languages
        });

        if (newUser) {
            generateToken(newUser._id.toString(), res);

            res.status(201).json({
                message: "user Successfully Created ",
                user: {
                    id: newUser._id.toString(),
                    email: newUser.email,
                    fullName: newUser.fullName,
                    profilePic: newUser.profilePic,
                    language: languages
                }
            });

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error in Signup controller:`, error.message);
            res.status(500).json({
                message: "Internal server error"
            });
        } else {
            console.log('Unknown error occurred');
            res.status(500).json({
                message: "Something went wrong"
            });
        }
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await userModel.findOne({ email });
        if (!checkUser) {
            res.status(500).json({
                message: `Invalid Credentials!`
            });
            return;
        }
        const hashPass = checkUser.password;
        const checkPass = await bcrypt.compare(password, hashPass);
        if (!checkPass) {
            res.status(500).json({
                message: "Invalid Credentials !"
            });
            return;
        }

        generateToken(checkUser._id.toString(), res);
        res.status(201).json({
            message: "User found",
            user: {
                id: checkUser._id.toString(),
                email: checkUser.email,
                fullName: checkUser.fullName,
                profilePic: checkUser.profilePic,
                language: checkUser.language,
                selectedLanguage: checkUser.selectedLanguage
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error in login controller`, error.message);
            res.status(500).json({
                message: "Internal Server Error"
            });
        } else {
            console.log("Unknown Error occurred");
            res.status(500).json({
                message: "Something Went Wrong!"
            });
        }
    }
};

export const checkAuth = (req, res) => {
    try {
        const userId = req.user._id;
        const user = req.user;
        if (!userId) {
            res.status(400).json({
                message: "unAuthorized"
            })
        }
        res.status(201).json({
            message: "authenticated",
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 });
        res.status(200).json({
            message: "LoggedOut Successfully "
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error in the logout controller`);
            res.status(500).json({
                message: "Internal Server Error !"
            });
        } else {
            res.status(500).json({
                message: "Something Went Wrong !"
            });
        }
    }
};