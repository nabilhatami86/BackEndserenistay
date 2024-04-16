const { Cart, User, Product } = require("../models")

const getCartProductById = async (req, res, next) => {
    try {
        const cartProduct = await Cart.findByPk(req.params.id,{
            include:[
                {model: Product,vattributes: ["name", "image", "price", "description", "discount", "roomId", "addressId", "UserId", "categoryId", "tiprId", "total_price"]},
            ]
        });

        if(!cartProduct) return res.status(404).json ({message: 'Cart not found'})

        res.status(200).json(cartProduct);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"server error"})
    }
};

const getCartUserById = async (req, res) => {
    try {
        const cartUser= Cart.await.findByPk(req.params.id,{
            include:[
                {model: User,vattributes: ["username", "email", "image", "address", "role", "no_telpon", "companyId", "company_name", "description"]},
            ]
        });

        if(!cartUser) return res.status(404).json({message:"cart not found"})

        res.status(200).json(cartUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"server error"})
    }
}

module.exports = {
    getCartProductById ,
    getCartUserById
};