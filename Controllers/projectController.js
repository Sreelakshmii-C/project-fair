const projects = require('../Models/projectSchema')

exports.addProjectAPI = async (req, res) => {
    console.log("Inside and ProjectAPI");

    const { title, language, github, website, overview } = req.body
    const projectImg = req.file.filename
    const userId = req.payload
    console.log(projectImg);

    console.log({ title, language, github, website, overview, userId });



    try {
        const project = await projects.findOne({ github })
        if (project) {
            res.status(401).json("Project Already Existing")
        }
        else {
            const newProject = new projects({ title, language, github, website, overview, projectImg, userId })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        res.status(406).json("Error", err)
    }

}

exports.getHomeProject = async (req, res) => {
    try {
        const response = await projects.find().limit(3)
        res.status(200).json(response)
    }
    catch (err) {
        res.status(406).json("Error", err)
    }
}


exports.getUserProject = async (req, res) => {
    const userId = req.payload
    try {
        const response = await projects.find({ userId })
        res.status(200).json(response)
    }
    catch (err) {
        res.status(406).json("Error", err)
    }
}


exports.getAllUserProject = async (req, res) => {
    try {
        const response = await projects.find()
        res.status(200).json(response)
    }
    catch (err) {
        res.status(406).json("Error", err)
    }
}

exports.editProjectAPI = async (req, res) => {
    console.log("Inside Edit ProjectAPI");

    const { title, language, github, website, overview, projectImg } = req.body
    const updateImg = req.file ? req.file.filename : projectImg
    const userId = req.payload
    const {projectId} = req.params
    console.log(updateImg);

    console.log({ title, language, github, website, overview, userId });



    try {
        const project = await projects.findByIdAndUpdate(
            {_id:projectId},
            { 
                title:title,
                language:language,
                github:github,
                website:website, 
                overview:overview, 
                projectImg:updateImg,
            }
            
        )
        await project.save()
        res.status(200).json(project)
        
    }
    catch (err) {
        res.status(406).json("Error", err)
    }

}

// projectController.js
exports.deleteProjectAPI = async (req, res) => {
    const { projectId } = req.params;
    console.log(projectId);
    
    try {
        const project = await projects.findByIdAndDelete({_id:projectId});
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully", project });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
