const axios = require('axios')
const { errorHandler } = require('../../harborErrorHandler')
const { getBasicAuthAndHeader } = require('../../basicAuthHandler')
const { api_endpoint } = require('../../config.json')
const { response } = require('express')
const Utils = { ...require('../Utils/utils')}

const getRepositoryListByProject = async (input, headers = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Get Repository by project list")
    try{
        const {
            project_name
        } = input
        const endpoint = `/projects/${project_name}/repositories`
        const res = await axios.get(`${api_endpoint}${endpoint}`,{
            headers
        })
        console.log(res)
        res.data.map(x => {
            const {
                artifact_count,
                id,
                name,
                pull_count,
                creation_time
            } = x
            console.log(`-------\nRepository Name : ${name}\nID : ${id}\nTotal artifact count : ${artifact_count}\nPull count : ${pull_count}\nCreation Time : ${creation_time}\n-------\n`)
        })
        return res.data
    }catch(err){
        errorHandler(err)
        return false
    }
}

const getRepositoryListAll = async (headers = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Get all repository list")
    try{
        const endpoint = `/repositories`
        const res = await axios.get(`${api_endpoint}${endpoint}`,{
            headers
        })
        res.data.map(x => {
            const {
                artifact_count,
                id,
                name,
                pull_count,
                creation_time
            } = x
            console.log(`-------\nRepository Name : ${name}\nID : ${id}\nTotal artifact count : ${artifact_count}\nPull count : ${pull_count}\nCreation Time : ${creation_time}\n-------\n`)
        })
        return res.data
    }catch(err){
        errorHandler(err)
        return false
    }
}

const deleteRepository = async(input, headers = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Delete repository")
    try{
        const {
            project_name,
            repository_name
        } = input
        const endpoint = `/projects/${project_name}/repositories/${repository_name}`
        const res = await axios.delete(`${api_endpoint}${endpoint}`,{
            headers
        })
        console.log(`Successfully delete repository ${project_name}-${repository_name}`)
        return true
    }catch(err){
        errorHandler(err)
        console.log(`Fail to delete repository`)
        return false
    }
}

const getRepositoryInformation = async(input,headers = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Get repostiory information")
    try{
        const {
            project_name,
            repository_name
        } = input
        const endpoint = `/projects/${project_name}/repositories/${repository_name}`
        const res = await axios.get(`${api_endpoint}${endpoint}`,
        {
            headers: headers
        })
        return res.data
    }catch(err){
        errorHandler(err)
        return false
    }
}


//Unable to use : 정보 Update가 되지 않음
const updateRepository = async (input,data, headers = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Update Repository")
    try{
        const {
            project_name,
            repository_name
        } = input
        const {
            name
        } = data
        const repo_data = await getRepositoryInformation()
        const req_data = repo_data
        ?repo_data
        :(() => {throw new Error()})()
        req_data.name = `${project_name}/${name}`
        const endpoint = `/projects/${project_name}/repositories/${repository_name}`
        const res = await axios.put(`${api_endpoint}${endpoint}`,
        data,
        {
            headers : headers
        })
        return true
    }catch(err){
        errorHandler(err)
        return false
    }
}

module.exports = {
    getRepositoryListAll,
    getRepositoryListByProject,
    deleteRepository,
    updateRepository,
    getRepositoryInformation
}