const { Fasilitas } = require ('../models');


const createFasilitasIds = async (req, res) => {
    try {
        const { ids } = req.body; 

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: true, message: 'Please select at least one facility' });
        }

        const createdFasilitas = await Promise.all(ids.map(async (id) => {
            return await Fasilitas.create({ fasilitasId: id });
        }));

        res.status(200).json({ error: false, message: 'Facilities created successfully', data: createdFasilitas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

const createFasilitas = async (req, res) => {
    try{
        const newFasilitas = await Fasilitas.create({
            fasilitas : req.body.fasilitas
        })
        res.status(201).json({message: 'create data success', data : newFasilitas })
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Failed to create a new fasilitas"});
    }
};

const getAllFasilitas = async (req,res)=>{
    try{
        const fasilitas=await Fasilitas.findAll();
        res.status(200).json(fasilitas);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error')
    }
};

const editFasilitas = async (req, res) => {
    try {
        const editFasilitas = await Fasilitas.update({
            name : req.body.name
        },{where:{id : req.params.id}})
        if(editFasilitas[0]==0){
            res.status(404).json({message:"The Category with this id does not exist!"})
        }else{  
           res.status(200).json({message:"Updated Successfully!",data:editFasilitas})  
        }
    } catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'}); 
    }
};

const deleteFasilitas = async (req,res)=>{
    try {
        const fasilitas = await Fasilitas.destroy({ where: { id: req.params.id } });
        if(!fasilitas){
            return res.status(400).json('Id is not valid')
        }
        res.status(200).json({message: 'delete success'})
    } catch (err) {
        console.log(err)
        res.status(500).json({message:' error'})
    }
};
module.exports={
    createFasilitasIds,
    createFasilitas,
    getAllFasilitas,
    deleteFasilitas,
    editFasilitas
}