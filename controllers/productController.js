const multer = require ('multer');
const {Product, Cattegory, Tipe} = require ('../models')

const getProduct =  async (req, res) =>{
    try{
        const product = await Product.findAll({
            include: [
                {model: Cattegory,vattributes: ["name"]},
                {model: Tipe,vattributes: ["name"]}
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
        const { id } = req.params;
        const product = await Product.findByPk(id, { include: {model:Cattegory,attributes:["name"]} });

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
        const { name, description, price, addressId, roomId, discount, tipeId,categoryId,userId,image } = req.body;

        const newProduct = await Product.create({
            name,
            description,
            price,
            addressId,
            roomId,
            discount,
            tipeId,
            categoryId,
            userId,
            image
        });
        res.status(201).json(newProduct);
    } catch(err){
        console.log(err);

    }   
}

const editProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, description, price, addressId, roomId, discount, tipeId, categoryId, total_price } = req.body;

        console.log("Product ID:", id);
        let product = await Product.findByPk(id);
        console.log("Product:", product);
        if (!Product) {
            return res.status(400).json("produk not found");
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.addressId = addressId || product.addressId;
        product.roomId = roomId || product.roomId;
        product.discount = ValidateDiscount (discount) ? discount : product.discount;
        product.tipeId = tipeId || product.tipeId;
        product.categoryId = categoryId || product.categoryId;
        product.total_price = calculateTotalPrice(total_price);

        await product.save();

        res.status(200).json(product);
    } catch (err){
        console.log(err);
        res.status(404).json('error editing product');
    }
}

const ValidateDiscount =(discount) => {
    return Number.isInteger(discount) && discount >= 0 && discount <= 100;
}

const calculateTotalPrice = (product) => {
    const discountPrice = product.price * ((100 - product.discount) / 100);
    return discountPrice;
}

const deleteProduct =async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.destroy({ where: { id: id}});
        if(!product){
            return res.status(400).json('Id is not valid')
        }
        res.status(200).json({message: 'delete success'})
        
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
