const { Cattegory } = require ('../models')
const cattegory = require('../models/cattegory')

const getCattegory = async (req, res) => {
    try{
        const cattegories = await Cattegory.findAll() 
        
        if(cattegories.length === 0){
            return res.status(404).json({message: 'No categories found'})
            }
            res.status(200).json(cattegories)
            
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Error getting the data from the database'})
    }
} 

const createCattegory = async (req, res) => {
    try{
        const newCattegory = await Cattegory.create({
            name : req.body.name
        })
        res.status(201).json({message: 'create data success', data : newCattegory })
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Failed to create a new category"});
    }
}

const  updateCattegory = async (req,res)=>{
    try{
        const updateCategory = await Cattegory.update({
            name : req.body.name
        },{where:{id : req.params.id}})
        if(updateCategory[0]==0){
            res.status(404).json({message:"The Category with this id does not exist!"})
        }else{  
           res.status(200).json({message:"Updated Successfully!",data:updateCategory})  
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error!"});
    }
}

const deleteCattegory = async(req, res) =>{
    try{
        const { id } = req.params;
        const cattegory = await Cattegory.destroy({ where: { id: id}});
        if(!cattegory){
            return res.status(400).json('Id is not valid')
        }
        res.status(200).json({message: 'delete success'})
        
    }catch(err){
        console.log(err);   
        res.status(500).json({message : 'Internal Server Error'})
    
    }
    
}

module.exports={getCattegory, updateCattegory, deleteCattegory, createCattegory};