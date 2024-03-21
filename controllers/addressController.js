const { Address, User} = require ('../models');
const jwt = require('jsonwebtoken');

const createAddress = async (req, res) => {
    try {
        const { negara , provinsi, kabupaten, kecamatan, desa, nama_jalan} =  req.body;

        const newAddress = await Address.create({
            negara,
            provinsi,
            kabupaten,
            kecamatan,
            desa,
            nama_jalan
        });
        res.status(201).json(newAddress);
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'internal server error'});
    }
}

const getAddressById = async (req, res) => {
    try {
        const{ id } = req.params;
        const address = await Address.findByPk(id);
        
        if(!address) return res.status(404).json({ message: "data not found"})

        res.status(200).json(address);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}

const getAddressByToken = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if(!token) {
            return res.status(401).json({ error : "token is missing" });
        }

        const decodedToken = jwt.verify( token, 'your_secret_key' );
        const userId = decodedToken.userId;
        const addresses = await Address.findAll({ where: { userId } });

        if (!addresses || addresses.length === 0) {
            return res.status(404).json({ error: "User has no address data." })
        } else {
            res.status(200).send(addresses);
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebToken Error') {
            res.status(401).json({ error: 'Invalid Token!' });
            } 
            res.status(500).json({ error: 'Internal Server Error' }); 
    }
}
module.exports = {
    createAddress,
    getAddressById,
    getAddressByToken
};