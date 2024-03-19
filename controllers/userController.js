const { User } = require('../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const allowedEmailDomains = /^(gmail\.com)$/;

const getUserByToken = async (req, res) => {
    try {
        const token = req.cookies['auth-token'];

        if (!token) {
            return res.status(401).json({ error: true, message: 'Authentication token is missing' });
        }

        const decodedToken = jsonwebtoken.verify(token, 'your_secret_key');

        const userId = decodedToken.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        return res.status(200).json({ error: false, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}


const register = async (req, res) => {
    try {
        const { username, email, password, role, alamat, company_name, companyId, no_telpon } = req.body;
        const emailDomain = email.split('@')[1];

        // Validate email domain
        if (!allowedEmailDomains.test(emailDomain)) {
            return res.status(400).json({
                error: true,
                message: 'Invalid email domain. Allowed domains: gmail.com,',
            });
        }

        // Validate role
        const validRoles = ['admin', 'user', 'guest'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                error: true,
                message: 'Invalid role. Allowed roles: admin, user, guest',
            });
        }

        // Validate phone number format
        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
        console.log(no_telpon)
        if (!phoneRegex.test(no_telpon)) {
            return res.status(400).json({
                error: true,
                message: 'Invalid phone number format. It should contain only digits and be 10 to 12 digits long.',
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 8);

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: true, message: 'Email already exists' });
        }

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
            role,
            alamat,
            company_name,
            companyId,
            no_telpon
        });

        return res.status(201).json({
            error: false,
            message: 'User created',
            datas: {
                id: newUser.id,
                name: newUser.username,
                email: newUser.email,
                role : newUser.role,
                alamat : newUser.alamat,
                company_name: newUser.company_name,
                companyId: newUser.companyId,
                telp: newUser.no_telpon
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: true, message: 'Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Checking if data is provided
        if (!email || !password) {
            return res.status(400).json({ error: true, message: 'Please fill all the fields' });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(403).json({ error: true, message: 'Email is incorrect' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(403).json({ error: true, message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jsonwebtoken.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

        res.header('auth-token', token).json({
            auth: true,
            token,
            id: user.id,
            username: user.username,
            email: user.email,
            alamat: user.alamat,
            role : user.role,
            alamat : user.alamat,
            company_name: user.company_name,
            companyId: user.companyId,
            telp: user.no_telpon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { username, email, alamat, company_name, companyId, no_telpon, decription } = req.body;

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        // Update user's profile fields if provided
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (alamat) {
            user.alamat = alamat;
        }
        if (company_name) {
            user.company_name = company_name;
        }
        if (companyId) {
            user.companyId = companyId;
        }
        if (no_telpon) {
            user.no_telpon = no_telpon;
        }
        if (decription) {
            user.decription = decription;
        }

        // Save the updated user
        await user.save();

        // Return success response
        return res.status(200).json({ error: false, message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('auth-token'); 
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}


module.exports = { getUserByToken, register, login, updateProfile, logout };