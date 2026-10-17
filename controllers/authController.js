// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// registerUser
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name, 
            email,
            password: hashedPassword
        });

        await user.save();

        user.password = undefined;

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error( 'registerUser error', error );
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

//loginUser
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if(!user) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ token })
        } catch (error) {
            console.error( 'loginUser error', error );
            return res.status(500).json({
                success: false,
                message: 'Something went wrong'
        });
    }
}

//deleteUser
const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;

        if(req.user.userId.toString() !== id) {
            return res.status(403).json({
                message: "You can only delete your own account"
            })
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'User deleted successfully'
        })
    } catch (error) {
        console.error( 'deleteUser error', error );
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

// getMe 
const getMe = async (req, res) => {
    try {
        const user = await User.findById( req.user.userId );

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({ user });
    } catch(error) {
        console.error( 'getMe error:', error );
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

module.exports = { registerUser, loginUser, deleteUser, getMe }

