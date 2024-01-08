const Project = require('../models/Project');
const User = require('../models/User');
const authModels = require('../models/authModels');
const responseHandler = require('../responseHandler/response_handler');
const { URL } = require('url'); 
const path = require('path');

const getAllProject = async(userId,res)=>{ //projectManagerId
    console.log(userId,"projectManagerId")  ;
    try{
        const userDetails = await authModels.getUserById(userId, res);
        const projects  = await Project.find({projectManagerId: userId});
        console.log(projects,".........");
        responseHandler(res,200,"Fetch all projects",projects,false);

    }catch(err){
        console.log(err,"err");
        responseHandler(res,500,"server error occurred ",null,true);
    }
    
}
//
const addProject = async ( userId, data, res) => {
    console.log(data, "dataa");
    try {
        const userDetails = await authModels.getUserById(userId, res);

        const existUser = await User.find({_id: userId });//, _id: data.projectManagerId
        console.log(existUser, "....")
        if (existUser) {
            const findUser = existUser[0].role;
            console.log(findUser, "findUser");

            if (findUser == "project manager") {
                const newProject = new Project({
                    projectManagerId: data.projectManagerId,
                    projectName: data.projectName,
                    projectPic: data.projectPic,
                    location: data.location,
                    price: data.price,
                    description: data.description
                })
                await newProject.save();
                console.log(newProject, "new project...");
                responseHandler(res, 200, "Project created successfully", newProject, false);

            }
            else {
                return responseHandler(res, 401, "Your role is not matched.So, You can't create a project", null, true);
            }

        }
        else {
            return responseHandler(res, 400, "User not found", null, true);
        }

    } catch (err) {
        console.log(err);
        responseHandler(res, 500, "server error occurred")
    }

}
//
const updateProject = async (userId, projectId, project, res) => {
    console.log(projectId," ++++++")
    try {
        const userDetails = await authModels.getUserById(userId, res);
        const updatedProject = await Project.findByIdAndUpdate({_id:projectId},project);
        console.log(updatedProject,"updated");
        responseHandler(res, 200, "Project updated successfully",updatedProject, false);

    } catch (err) {
        console.log(err, "error");
        responseHandler(res, 500, "Server error", null, true);
    }

}
//
const deleteProject = async (userId, id, res) => {
    try {
        let deleteId = false;
        const userDetails = await authModels.getUserById(userId, res);
        const existProject = await Project.findById({ _id: id });
        if (!existProject) {
            return responseHandler(res, 401, "Invalid Project id. This project is not exist.", null, true);
        }
        deleteId = await Project.deleteOne({ _id: id,projectManagerId:userId });
        console.log(deleteId,"..........")
        responseHandler(res, 200, "Project was deleted successfully", deleteId, false);



    } catch (err) {
        console.log(err, "error");
        responseHandler(res, 500, "Server error", null, true);
    }
}
//upload
const getFileUpload = async (email, projectId, uploadData, res) => {
    console.log("uploadData Path", uploadData.path)
    console.log("uploadData", uploadData)
    console.log("uploadData proManId", projectId)

    try {
        const userDetails = await authModels.fetchUserByEmail(email, res);
        console.log(userDetails, "userDetails....");
        const updatedProject = await Project.findByIdAndUpdate(projectId, {
            $set: { projectPic: uploadData.user_file }
        }, { new: true });
        console.log(updatedProject,"updatedProject....")
        responseHandler(res, 200, "File Uploaded successfully .", updatedProject, false);

    } catch (err) {
        console.log(err, "err..");
        responseHandler(res, 500, "Server error Occurred", null, true);

}
}

const downloadProject = async (userId,projectId, res) => {
    try {

      const project = await Project.findById(projectId);
    //   console.log(project,"proeject");
      if (!project) {
        return responseHandler(res, 404, "Project not found", null, true);
      }
      const projectPicUrl = new URL(project.projectPic);
      const fileName = path.basename(projectPicUrl.pathname); 
      const decodedFileName = decodeURIComponent(fileName);
      const filePath = path.join(__dirname, '..', 'uploads', decodedFileName);      
      console.log(filePath, "file path");
      res.download(filePath, `project_${projectId}.pdf`);
    } 
    catch (err) {
      console.log(err, "error");
      responseHandler(res, 500, "Server error occurred", null, true);
    }
  };

const userService = {
        getAllProject,
        addProject,
        updateProject,
        deleteProject,
        getFileUpload,
       downloadProject
    }
    module.exports = userService;