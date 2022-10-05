const axios = require('axios')
const { errorHandler } = require('../../harborErrorHandler')
const { getBasicAuthAndHeader } = require('../../basicAuthHandler')
const { api_endpoint } = require('../../config.json')
const { response } = require('express')
const Utils = { ...require('../Utils/utils')}


const getArtifactsList = async(input, headers = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Get Artifacts List")
    try{
        const {
            project_name,
            repository_name,
        } = input
        const endpoint = `/projects/${project_name}/repositories/${repository_name}/artifacts`
        const res = await axios.get(`${api_endpoint}${endpoint}`,{
            headers
        })
        return res.data
    }catch(err){
        errorHandler(err)
        return false
    }
}


const deleteArtifact = async(input, headers = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Delete Artifact")
    try{
        // reference can be digest or tag
        const {
            project_name,
            repository_name,
            reference
        } = input
        const endpoint = `/projects/${project_name}/repositories/${repository_name}/artifacts/${reference}`
        const res = await axios.delete(`${api_endpoint}${endpoint}`,{
            headers
        })
        console.log(res.data)
        console.log(`Successfully delete artifact : ${reference}`)
        return true
    }catch(err){
        errorHandler(err)
        console.log(`Fail to delete artifact : ${reference}`)
        return false
    }
}


module.exports = {
    getArtifactsList,
    deleteArtifact
}