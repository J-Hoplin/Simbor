const axios = require('axios')
const { errorHandler } = require('../../harborErrorHandler')
const { getBasicAuthAndHeader } = require('../../basicAuthHandler')
const { api_endpoint } = require('../../config.json')
const Utils = { ...require('../Utils/utils')}

// This function is for OIDC Auth Scenario
const updateUserClientSecret = async(input, header = getBasicAuthAndHeader()) =>{
    Utils.printStepInformation("Update user's client secret")
    try{
        const {
            username,
            secret
        } = input
        const { user_id:userId } = await getUserIntegerId({ username })
        const endpoint = `/users/${userId}/cli_secret`
        const res = await axios.put(`${api_endpoint}${endpoint}`,
        {secret},
        {
            headers: header
        })
        return true
    }catch(err){
        errorHandler(err)
    }
}

// This function is for OIDC Auth Scenario
const getUserCLISecret = async(input, header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Get user's cli secret")
    try{
        const { username } = input
        const { user_id:userId } = await getUserIntegerId({ username })
        const endpoint = `/users/${userId}`
        const res = await axios.get(`${api_endpoint}${endpoint}`,{
            headers:header
        })
        const {
            oidc_user_meta : {
                secret
            }
        } = res.data
        return {
            user_id : userId,
            user_cli_secret : secret
        }
    }catch(err){
        errorHandler(err)
    }
}


// This function is for OIDC Auth Scenario
const getUserIntegerId = async (input,header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Get User's Integer Id")
    try{
        const { username } = input
        const endpoint = `/users/search?username=${username}`
        let res = await axios.get(`${api_endpoint}${endpoint}`,{
            headers: header
        })
        res = res.data.filter(x => {
            return x.username === username
        })
        return res[0]
    }catch(err){
        errorHandler(err)
    }
}

// This API can only be used when auth mode is local DB
// Unable to user in OIDC Auth mode
const createUser = async (input,header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Create User")
    try{
        const endpoint = "/users"  
        const res = await axios.post(`${api_endpoint}${endpoint}`,
        input,
        {
            headers: header
        })
        console.log(`Successfully create user : ${input.username}`)
    }catch(err){
        errorHandler(err)
    }
}

module.exports = {
    createUser,
    getUserIntegerId,
    getUserCLISecret,
    updateUserClientSecret
}