const { Tipe } = require ('../models');

const getTipe = async (req, res) => {
    try{
        const tipes = await Tipe.findAll() 
        
        if(cattegories.length === 0){
            return res.status(404).json({message: 'No categories found'})
            }
            res.status(200).json(tipes)
            
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Error getting the data from the database'})
    }
}

const createTipe = async ( req, res ) => {
    try{
        const newTipe = await Tipe.create({
            name: req.body.name
        })
        res.status (200).json ({message: 'create data success a new tipe', data: newTipe})
    } catch(err){
        console.log(err);
        res.status(500).json ({ message: 'failed create new tipe'})
    }
}

const editTipe = async (req, res) => {
    try {
        const { name } = req.body;

        const updatedRowCount = await Tipe.update(
            { name },
            { where: { id: req.params.id } }
        );

        if (updatedRowCount[0] === 0) {
            return res.status(404).json({ message: 'Failed to update tipe.' });
        }

        const editedTipe = await Tipe.findByPk(req.params.id);
        res.status(200).json(editedTipe);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const deleteTipe = async(req, res) =>{
    try{
        const tipe = await Tipe.destroy({ where: { id: req.params.id } });
        if(!tipe){
            return res.status(400).json('Id is not valid')
        }
        res.status(200).json({message: 'delete success'})
        
    }catch(err){
        console.log(err);   
        res.status(500).json({message : 'Internal Server Error'})
    
    }
    
}

module.exports = {
    getTipe,
    createTipe,
    editTipe,
    deleteTipe
}