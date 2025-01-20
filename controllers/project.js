//const router = require('../routes/tools');
const utilities = require('../utilities/utility');
const db = require('../models');
const Project = db.project;



//YOU HAVE EDITS YOU NEED TO MAKE HERE YOU NUMPTY

getAll = async (req, res) =>{
    const project = await Project.findAll();
    res.status(200).json(project);
}

getByDesc = async (req, res) =>{
    const desc =req.params.value;
    try{
        const project = await Project.findAll(
            {where: {description: desc}});
        if(project.length==0){
            throw new Error("Unable to find Project with description " + desc);
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
        const project = await Project.findByPk(id);
        if(project==null || project.length==0){
            throw new Error("Unable to find Project with id " + id);
        }
        res.status(200).json(project);
    }
    catch(error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

create = async (req, res) =>{
    var project = {
        name: req.body.name,
        description: req.body.description   
    };

    try {
        if (project.name==null || project.name.length < 1 || project.description == null) {
            throw new Error ("Esssential fields missing");
        }
        project = await Project.create(project);
        res.status(201).json(project);
    }
    catch (error) {
        utilities.formatErrorResponse(res,400,error.message);
    }
}


deleting = async (req, res) =>{
    const id =req.body.id;
    
    try{
        const deleted = await Project.destroy({where: { id: id }});
    
    if (deleted==0) {
        throw new Error("Id not found");
    }
    
    res.status(200).send("Project deleted");
    }
    catch(error){
    utilities.formatErrorResponse(res,404,error.message);
    }
    }
    
    editing = async (req, res) =>{
    const id =req.body.id;
    
    const project = {
        name: req.body.name,
        description: req.body.description

    };

    try{
    if (id==null || 
        project.name==null || 
        project.description==null){
        throw new Error("Missing essential fields");
    }

    await Project.update(project, 
                        {where: { id: id }}
    );
    res.status(200).json(project);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }  
    }


module.exports = {getAll, getByDesc, getById, create, deleting, editing};