const axios = require('axios')
const { errorHandler } = require('../../harborErrorHandler')
const { getBasicAuthAndHeader } = require('../../basicAuthHandler')
const { api_endpoint } = require('../../config.json')
const Utils = { ...require('../Utils/utils')}

/**
 *
 * Scenario : Create user and create project
 *
 */

//Create Project
// POST
const createProject = async (input,header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Create Project")
    try{
        const endpoint = "/projects"
        const res = await axios.post(`${api_endpoint}${endpoint}`,
        input,
        {
            headers: header
        })
        console.log(`Successfully create user : ${input.project_name}`)
        return res.data
    }catch(err){
        errorHandler(err)
    }
}

//View Project List
// GET
const viewProjectList = async (name,header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("View Project List")
    try{
        const endpoint = "/projects"
        let res = await axios.get(`${api_endpoint}${endpoint}?name=${name}`,
        {
            headers: header
        })
        console.log(res)
        res = res.data.map(x => {
            const {
                metadata: {
                    public
                },
                name,
                owner_id,
                owner_name,
                project_id,
            } = x
            return { public, name, owner_id,owner_name,project_id }
        })
        console.log("< Project List >")
        res.map(x => {
            console.log(`---------\nName : ${x.name}\nOwner Name : ${x.owner_name}\nOwner Id : ${x.owner_id}\nProject ID : ${x.project_id}\nIs public : ${x.public}\n---------`)
        })
        return res
    }catch(err){
        errorHandler(err)
    }
}

// Check Project Exist
// HEAD
// Not working yet
const checkProjectExist = async (project_name, header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Check if project exist")
    try{
        const endpoint = "/projects"
        console.log(`${api_endpoint}${endpoint}?project_name=${project_name}`)
        await axios.head(`${api_endpoint}${endpoint}?project_name=${project_name}`,
        {
            headers: header
        })
        return true
    }catch(err){
        errorHandler(err)
        return false
    }
}

// Delete Existing Project
// DELETE
// 프로젝트를 삭제하기 위해서는 프로젝트 안에 아무것도 존재하지 않아야 한다.
const deleteProject = async (project_name, header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Delete Project")
    try{
        const endpoint = "/projects/"
        await axios.delete(`${api_endpoint}${endpoint}${project_name}`,
        {
            headers: header
        })
        console.log(`Successfully delete ${project_name}`)
        return true
    }catch(err){
        console.log(`Unable to delete project ${project_name}`)
        errorHandler(err)
    }
}

// Check project deleteable
// GET
const checkDeletable = async (project_name, header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Check if project deleteable")
    try{
        const endpoint = `projects/${project_name}/_deletable`
        await axios.get(`${api_endpoint}${endpoint}${project_name}`,
        {
            headers: header
        })
        console.log(`Project ${project_name} deletable`)
        return true
    }catch(err){
        console.log(`Project ${project_name} not deletable`)
        return false
    }
}



module.exports = {
    createProject,
    viewProjectList,
    checkProjectExist,
    deleteProject,
    checkDeletable
}