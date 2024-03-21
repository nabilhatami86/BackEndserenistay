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

const  updateTipe = async (req,res)=>{
    try{
        const updateTipe = await Tipe.update({
            name : req.body.name
        },{where:{id : req.params.id}})
        if(updateTipe[0]==0){
            res.status(404).json({message:"The Tipe with this id does not exist!"})
        }else{  
           res.status(200).json({message:"Updated Successfully!",data:updateTipe})  
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error!"});
    }
}

const deleteTipe = async(req, res) =>{
    try{
        const { id } = req.params;
        const tipe = await Tipe.destroy({ where: { id: id}});
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
    updateTipe,
    deleteTipe
}