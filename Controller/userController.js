const User = require("../Model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// getData by id

exports.getDataById = async (req, res) => {
    try {
        const data = await User.findById(req.params.id)
        return res.json({ errors: false, data: data })

    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message });
    }
}


// post
exports.postUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) return res.status(400).json({ errors: true, message: "User Already Exists" })


        //    password
        const salt = await bcrypt.genSalt(10)

        req.body.password = await bcrypt.hash(req.body.password, salt)

        const newUser = new User(req.body)

        const data = await newUser.save()

        return res.json({ errors: false, data: data })

    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// login
exports.postLogins = async (req, res) => {
    try {
        // user already exist or not
        const userExists = await User.findOne({ email: req.body.email })
        if (!userExists) return res.status(400).json({ errors: true, message: "E-mail or Password is Invalid" })

        // password compare
        const checkpassword = await bcrypt.compare(req.body.password, userExists.password)
        if (!checkpassword) return res.status(400).json({ errors: true, message: "E-mail or Password is Invalid" })

        const token = await jwt.sign({ _id: userExists._id }, process.env.SEC)

        return res.json({ error: false, token: token, user: userExists })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// get
exports.getUser = async (req, res) => {
    try {
        const data = await User.find()
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// put
exports.putUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByIdAndUpdate(id, req.body, { new: true })
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

// 
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByIdAndDelete(id)
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

