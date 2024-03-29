const { Address} = require ('../models');


const createAddress = async (req, res) => {
    try {
        const { negara , provinsi, kota, kecamatan, desa, nama_jalan} =  req.body;

        const newAddress = await Address.create({
            negara,
            provinsi,
            kota,
            kecamatan,
            desa,
            nama_jalan
        });
        res.status(201).json(newAddress);
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'internal server error'});
    }
};

const getAddressById = async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        
        if(!address) return res.status(404).json({ message: "data not found"})

        res.status(200).json(address);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}

const editAddress = async (req, res) => {
    try {
        const { negara, provinsi, kota, kecamatan, desa, nama_jalan } = req.body;

        const [updatedRowCount] = await Address.update({
            negara,
            provinsi,
            kota,
            kecamatan,
            desa,
            nama_jalan
        }, {
            where: { id: req.params.id } 
        });

        if (updatedRowCount === 0) {
            return res.status(404).json({ message: 'Failed to update data.' });
        } else {
            const newData = await Address.findOne({ where: { id: req.params.id } });
            res.status(200).json(newData);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

 const deleteAddress = async(req, res) =>{
    try{
        const address = await Address.destroy({ where: { id: req.params.id}});
        if(!address){
            return res.status(400).json('Id is not valid')
        }
        res.status(200).json({message: 'delete success'})
        
    }catch(err){
        console.log(err);   
        res.status(500).json({message : 'Internal Server Error'})
    
    }
    
}
module.exports = {
    createAddress,
    getAddressById,
    editAddress,
    deleteAddress
};