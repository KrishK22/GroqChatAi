import jwt from 'jsonwebtoken'


export const generateToken = (userId, res) => {
    const payload = { userId }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: false
    })

    return token;

}