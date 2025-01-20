//const router = require('../routes/tools');
const utilities = require('../utilities/utility');
const db = require('../models');
const Category = db.category;

getAll = async (req, res) =>{
    const category = await Category.findAll();
    res.status(200).json(category);
}

getByDesc = async (req, res) =>{
    const desc =req.params.value;
    try{
        const category = await Category.findAll(
            {where: {description: desc}});
        if(category.length==0){
            throw new Error("Unable to find Category with description " + desc);
        }
        res.status(200).json(tool);
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

getById = async (req, res) =>{
    const id =req.params.id;
    try{
        const category = await Category.findByPk(id);
        if(category==null || category.length==0){
            throw new Error("Unable to find Category with id " + id);
        }
        res.status(200).json(category);
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

create = async (req, res) =>{
    var category = {
        name: req.body.name,
        description: req.body.description   
    };

    try {
        if (category.name==null || category.name.length < 1 || category.description == null) {
            throw new Error ("Esssential fields missing");
        }
        category = await Category.create(category);
        res.status(201).json(category);
    }
    catch (error) {
        utilities.formatErrorResponse(res,400,error.message);
    }
}


deleting = async (req, res) =>{
    const id =req.body.id;
    
    try{
        const deleted = await Category.destroy({where: { id: id }});
    
    if (deleted==0) {
        throw new Error("Id not found");
    }
    
    res.status(200).send("Category deleted");
    }
    catch(error){
    utilities.formatErrorResponse(res,404,error.message);
    }
    }
    
    editing = async (req, res) =>{
    const id =req.body.id;
    
    const category = {
        name: req.body.name,
        description: req.body.description

    };

    try{
    if (id==null || 
        category.name==null || 
        category.description==null){
        throw new Error("Missing essential fields");
    }

    await Category.update(category, 
                        {where: { id: id }}
    );
    res.status(200).json(category);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }  
    }


module.exports = {getAll, getByDesc, getById, create, deleting, editing};