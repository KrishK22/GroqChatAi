import Message from "../models/message.model.js"
import userModel from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js";



export const languageUpdate = async (req, res) => {
    try {
        const lang = req.body.lang;
        const user = req.user;
        const userId = user?._id;
        if (!user) {
            res.status(400).json({
                message: "something went wrong"
            })
            return
        }

        await userModel.findByIdAndUpdate(userId, {
            $addToSet: { language: lang }
        },
            {
                new: true,
                runValidators: true
            }
        )


        res.status(200).json({
            message: "Language updated successfully",
        });



    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error in languageUpadte controller`, error.message)

            res.status(400).json({
                Message: "Internal Server Error !" + error.message
            })
        } else {
            res.status(400).json({
                Message: "Something went wrong "
            })
        }
    }

}


export const profilePicUpdate = async (req, res) => {
    try {

        const { profilePic } = req.body;
        const userId = req.user?._id
        if (!profilePic) {
            res.status(400).json({
                message: "profilePic is required!"
            })
        }

        const uploadImage = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await userModel.findByIdAndUpdate(userId, { profilePic: uploadImage.secure_url }, { new: true })
        res.status(200).json({
            updatedUser
        })


    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error in profileUpdate controller`, error.message)
            res.status(400).json({
                Message: "Internal Server Error !"
            })
        } else {
            res.status(400).json({
                Message: "Something went wrong !" + error
            })
        }
    }


}