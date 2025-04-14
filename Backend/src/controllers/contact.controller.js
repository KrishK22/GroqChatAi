import UserModel from "../models/user.model.js";

export const addNewContactRoute = async (req, res) => {
    try {
        const userId = req.user._id;
        const email = req.body.email;

        const foundUser = await UserModel.findOne({ email }).select('-password -mycontacts')
        if (!foundUser) {
            res.status(400).json({
                message: "User not found"
            })
            return
        }

        // console.log(foundUser)

        const updatedContact = await UserModel.findByIdAndUpdate(userId, {
            $addToSet: { myContacts: foundUser }
        }, { new: true })

        res.status(200).json({
            updatedContact
        })

    } catch (error) {
        console.log(`Error in contact controller`, error.message)
        res.status(400).json({
            message: "Internal Server Errro"
        })
    }
}


export const contactRoute = async (req, res) => {

    try {
        const userId = req.user._id
        const User = await UserModel.findById(userId)
        const userContacts = User.myContacts


        res.status(200).json({
            userContacts
        })


    } catch (error) {
        console.log(`Error in contactRoute controller ${error.message}`)
        res.status(400).josn({
            message: "Internal Server Error "
        })
    }


}

