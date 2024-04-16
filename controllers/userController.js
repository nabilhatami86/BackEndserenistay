const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

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
        const { username, email, password, role, address,image ,company_name, companyId, no_telpon } = req.body;
        const emailDomain = email.split('@')[1];

        if (!allowedEmailDomains.test(emailDomain)) {
            return res.status(400).json({
                error: true,
                message: 'Invalid email domain. Allowed domains: gmail.com,',
            });
        }


        const validRoles = ['admin', 'user', 'guest'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                error: true,
                message: 'Invalid role. Allowed roles: admin, user, guest',
            });
        }

        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
        console.log(no_telpon)
        if (!phoneRegex.test(no_telpon)) {
            return res.status(400).json({
                error: true,
                message: 'Invalid phone number format. It should contain only digits and be 10 to 12 digits long.',
            });
        }

        const hashPassword = await bcrypt.hash(password, 8);

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: true, message: 'Email already exists' });
        }

        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
            role,
            address,
            image,
            company_name,
            companyId,
            no_telpon
        });

        return res.status(201).json({
            error: false,
            message: 'User created',
            datas: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role : newUser.role,
                address : newUser.address,
                image: newUser.image,
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

        if (!email || !password) {
            return res.status(400).json({ error: true, message: 'Please fill all the fields' });
        }

        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(403).json({ error: true, message: 'Email is incorrect' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(403).json({ error: true, message: 'Invalid password' });
        }

        const tokenjwt = {
            id:user.id,
            username:user.username,
            email: user.email,
            role: user.role,
            address: user.password,
            image: user.image,
            companyId: user.companyId,
            company_name: user.company_name,
            telp: user.no_telpon            
    }

    const token = jwt.creteToken(tokenjwt)
    return res.status(201).json({
        error: false,
        message: 'User created',
        datas: {
            id: user.id,
            username: user.username,
            email: user.email,
            role : user.role,
            address : user.address,
            image: user.image,
            company_name: user.company_name,
            companyId: user.companyId,
            telp: user.no_telpon,
            token
        }
    });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id; 
        const { username, email, address, company_name, companyId, no_telpon, decription } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (address) {
            user.address = address;
        }
        if (company_name) {
            user.company_name = company_name;
        }
        if (companyId) {
            user.companyId = companyId;
        }
        if (image){
            user.image = image;
        }
        if (no_telpon) {
            user.no_telpon = no_telpon;
        }
        if (decription) {
            user.decription = decription;
        }

        await user.save();

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

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }
        await User.destroy({ where: { id: userId } });

        return res.status(200).json({ error: false, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}

module.exports = { 
    getUserByToken, 
    register, 
    login, 
    updateProfile, 
    logout,
    deleteUser
};
