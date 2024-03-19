const multer = require ('multer');
const {Product, Cattegory} = require ('../models')

const getProduct =  async (req, res) =>{
    try{
        const product = await Product.findAll({
            include: [{
                model: Cattegory,
                attributes: ["name"]
                
            }]
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
        const { name, description, price, alamat, ruangan, kamarmandi, luastanah,kategoriId,userId,image } = req.body;

        const imageFile = req.files.image;

        const imagePath = 'uploads/' + imageFile.name;
        imageFile.mv(imagePath);

        const newProduct = await Product.create({
            name,
            description,
            price,
            alamat,
            ruangan,
            kamarmandi,
            luastanah,
            kategoriId,
            userId,
            image:imagePath
        });
        res.status(201).json(newProduct);
    } catch(err){
        console.log(err);

    }   
}

const editProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, description, price, alamat, ruangan, kamarmandi, luastanah, kategoriId } = req.body;

        console.log("Product ID:", id);
        let product = await Product.findByPk(id);
        console.log("Product:", product);
        if (!Product) {
            return res.status(400).json("produk tidak ditemukan");
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (alamat) product.alamat = alamat;
        if (ruangan) product.ruangan= ruangan;
        if (kamarmandi) product.kamarmandi= kamarmandi;
        if (luastanah) product.luastanah= luastanah;
        if (kategoriId) product.kategoriId = kategoriId;

        await product.save();

        res.status(200).json(product);
    } catch (err){
        console.log(err);
        res.status(404).json('error editing product');
    }
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

module.exports ={ getProduct, createProduct, editProduct, deleteProduct, getProductById};
