const Project = {...require('./Projects/projects.js')}
const User = {...require('./Users/user.js') }
const Member = {... require('./Member/member.js')}
const { getBasicAuthAndHeader } = require('../basicAuthHandler')

/**
 * add member to project
 * 
 * filter user's mid 
 * 
 * delete member of project
 * 
 * <role id>
 * project admin : 1
 * limitedGuest : 5
 * developer : 2
 * maintainer : 4
 * guest : 3
 */

const main = async () => {
    const username = "keycloak2"
    const projectName = "test"
    const roleId = {
        project_admin : 1,
        maintainer : 4,
        developer : 2,
        guest : 3,
        limited_guest : 5
    }
    // grant user role
    await Member.grantUserByRoleId({
        userName : username,
        roleId : roleId.developer,
        projectName : projectName,
    })
    // get project memebers info
    const memberRes = await Member.getProjectMembers({
        name : projectName,
        userId : username
    })
    console.log(memberRes)
    // get user's mid
    const memberUid = await User.getUserIntegerId({
        username
    })
    console.log(memberUid)
}

main()