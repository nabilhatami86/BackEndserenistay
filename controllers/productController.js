const { where, NUMBER } = require('sequelize');
const {Product, Cattegory, Tipe, User, Address, Fasilitas} = require ('../models')



const getProduct =  async (req, res,) =>{
    try{
        const product = await Product.findAll({
            include: [
                {model: Cattegory,vattributes: ["name" ]},
                // {model: Tipe,vattributes: ["name"]},
                {model: Address,vattributes: ["negara", "provinsi", "kota", "kecamatan","desa","nama_jalan"]}
            ]
        });
        
        let dataProduct = [];
        let fasilitas = [];

        for (const element of product) {
            const fasilitasId = element.fasilitasId.split(",")

            for ( const isi of fasilitasId) {
                const fasilitasId = await Fasilitas.findByPk(Number(isi))
                console.log(fasilitasId)

                fasilitas.push(fasilitasId.fasilitas);

                const data ={
                    id: element.id,
                    name: element.name,
                    description: element.description,
                    price: element.price,
                    image : element.image,
                    category: element.Cattegory.name,
                    luas_ruangan: element.luas_ruangan,
                    status: element.status,
                    discount: element.discount,
                    total_price: element.total_price,
                    userId: element.userId,
                    addressId: element.addressId,
                    fasilitas
    
                }
    
              dataProduct.push(data)
            }

            
            

            // for (const idArray of dataIdFasilitas) {
            //     const dataFasilitas = await Fasilitas.findByPk(Number(idArray));
            //     fasilitas.push(dataFasilitas);
            // }

            // const data = {
            //     element
            // };
            // console.log(data)
            // dataProduct.push(data); 
        }
        // console.log(dataProduct)
        res.status(200).json(dataProduct);
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
                // {model: Fasilitas,vattributes: ["fasilitas"]},
                // {model: Tipe,vattributes: ["name"]},
                {model: Address,vattributes: ["negara", "provinsi", "kota", "kecamatan","desa","nama_jalan"]}
            ],
            attributes: { exclude: ["createdAt", "updatedAt"] }
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
        const { name, description, price, addressId, fasilitasId, discount, tipeId,categoryId,image, luas_ruangan, tipe_kos, tipe_ruangan, status} = req.body;
        
        const total_price = Number(price) * (1 - discount/100)


        const newUser = await User.findByPk(req.user.id);
        if (newUser.role=== 'admin'){
            const newProduct = await Product.create({
                name,
                description,
                price: price.toString(),
                image,
                luas_ruangan,
                tipe_kos,
                tipe_ruangan,
                status,
                addressId,
                fasilitasId,
                discount,
                tipeId,
                categoryId,
                userId: req.user.id,
                total_price:  total_price.toString()
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
        
        const { name, description, price, addressId, fasilitasId, discount, tipeId, categoryId, image, tipe_kos, tipe_ruangan, status, luas_ruangan } = req.body;
        
        const total_price = Number(price) * (1- discount/100)
        const newUser = await User.findByPk(req.user.id);
        if (newUser.role=== 'admin'){

        const editProduct = await Product.update({
                name,
                description,
                price,
                image,
                luas_ruangan,
                tipe_kos,
                tipe_ruangan,
                status,
                addressId,
                fasilitasId,
                discount,
                tipeId,
                categoryId,
                total_price: total_price.toString()
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
