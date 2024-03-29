const { where } = require('sequelize');
const {Product, Cattegory, Tipe, User, Address} = require ('../models')

const getProduct =  async (req, res,) =>{
    try{
        const product = await Product.findAll({
            include: [
                {model: Cattegory,vattributes: ["name"]},
                {model: Tipe,vattributes: ["name"]},
                {model: Address,vattributes: ["negara", "provinsi", "kota", "kecamatan","desa","nama_jalan"]}
            ]
        });
        
        res.status(200).json(product);
    }catch(err){
        console.log(err);
        res.status(400).json('Error getting products');
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, { 
            include: [
                {model: Cattegory,vattributes: ["name"]},
                {model: Tipe,vattributes: ["name"]},
                {model: Address,vattributes: ["negara", "provinsi", "kota", "kecamatan","desa","nama_jalan"]}
            ]
        });

        if (!product) {
            return res.status(404).json({ error: 'The product does not exist' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createProduct = async (req, res) =>{
    try{
        const { name, description, price, addressId, roomId, discount, tipeId,categoryId,image} = req.body;


        const newUser = await User.findByPk(req.user.id);
        if (newUser.role=== 'admin'){
            const newProduct = await Product.create({
                name,
                description,
                price,
                addressId,
                roomId,
                discount,
                tipeId,
                categoryId,
                userId: req.user.id,
                image,
                total_price:  price * (1 - discount/100),
            });
            res.status(201).json(newProduct);

        }else{
            res.status (400).json ({message: 'Invalid role user'})
        }

    } catch(err){
        console.log(err);

    }   
}

const editProduct = async (req, res) => {
    try{
        
        const { name, description, price, addressId, roomId, discount, tipeId, categoryId, image } = req.body;
        
        const newUser = await User.findByPk(req.user.id);
        if (newUser.role=== 'admin'){

        const editProduct = await Product.update({
                name,
                description,
                price,
                addressId,
                roomId,
                discount,
                tipeId,
                categoryId,
                image,
                total_price: price * (1- discount/100)
            },
            {where: {id:req.params.id}});

            res.status(201).json(editProduct);
        } else {
            res.status(401).send({ message: "You are not admin" })
        } 
    } catch (err){
        console.log(err);
        res.status(404).json('error editing product');
    }
}


const deleteProduct =async (req, res) => {
    try{
        const newUser = await User.findByPk(req.user.id);
        if (newUser.role=== 'admin'){
        const product = await Product.destroy({ where: { id: req.params.id}});
        if(!product){
            return res.status(400).json('Id is not valid')
        }
        res.status(200).json({message: 'delete success'})
        
        } else {
            res.status(401).send({ message: "You are not admin" })
        } 
        
    }catch(err){
        console.log(err);   
        res.status(500).json({message : 'Internal Server Error'})
    
    }
}

module.exports ={ 
    getProduct, 
    createProduct, 
    editProduct, 
    deleteProduct, 
    getProductById
};
