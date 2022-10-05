const axios = require('axios')
const { errorHandler } = require('../../harborErrorHandler')
const { getBasicAuthAndHeader } = require('../../basicAuthHandler')
const { api_endpoint } = require('../../config.json')
const { response } = require('express')
const Utils = { ...require('../Utils/utils')}

// This is same logic with grantUserByRoleId with roleId 1
const grantProjectAdmin = async(input, header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Grant Project admin")
    try{
        const {
            userName,
            projectName
        } = input
        const endpoint = `/projects/${projectName}/members`
        const data = {
            "role_id": 1,
            "member_user": {
              "username": `${userName}`,
              "user_id": 0
            }
          }
        const res = await axios.post(`${api_endpoint}${endpoint}`,
        data,
        {
            headers: header
        })
    }catch{
        errorHandler(err)
    }
}

const grantUserByRoleId = async(input ,header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("Grant user via role id")
    try{
        const{
            userName,
            roleId,
            projectName
        } = input
        const endpoint = `/projects/${projectName}/members`
        const data = {
            "role_id": roleId || 5,
            "member_user": {
              "username": `${userName}`,
              "user_id": 0
            }
          }
          const res = await axios.post(`${api_endpoint}${endpoint}`,
          data,
          {
              headers: header
          })
    }catch(err){
        errorHandler(err)
    }
}

// This is same process with grantUserRoleId with roldId : 3
const grantLimitedGuest = async(input, header = getBasicAuthAndHeader()) => {
    // Only add member as "Limited Guest"
    Utils.printStepInformation("Add member to project")
    try{
        const { name,userId } = input
        const harborEndpoint = `/projects/${name}/members`
        const data = {
            "role_id": 5,
            "member_user": {
                "username": `${userId}`,
                "user_id": 0
            }
        }
        await axios.post(`${api_endpoint}${harborEndpoint}`,
        data,
        {
            headers:header
        })
        return { result : true}
    }catch(err){
        errorHandler(err)
    }
}

const getProjectMembers = async(input, header = getBasicAuthAndHeader()) => {
    Utils.printStepInformation("View project members")
    try{
        // project name, member
        const { name,userId } = input
        const harborEndpointGetMemberList = `/projects/${name}/members`
        let memberList = await axios.get(`${api_endpoint}${harborEndpointGetMemberList}`,
        {
            headers: header
        })
        memberList = memberList.data.filter(x => {
            const { entity_name, id:mid } = x
            return {
                entity_name,
                mid
            }
        })
        return memberList
    }catch(err){
        errorHandler(err)
    }
}

module.exports = { grantProjectAdmin,grantLimitedGuest,getProjectMembers,grantUserByRoleId }