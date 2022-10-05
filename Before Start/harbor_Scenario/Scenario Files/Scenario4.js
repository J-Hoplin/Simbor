const Project = {...require('./Projects/projects.js')}
const User = {...require('./Users/user.js') }
const Member = {... require('./Member/member.js')}
const { getBasicAuthAndHeader } = require('../basicAuthHandler')

/**
 * create new user
 * 
 * create user's project with admin header
 * 
 * grant user permission as project admin
 */


const main = async () => {
    const newUser = {
        comment : "string",
        username : "test500",
        password : "Test1234",
        email : "eqewradfasdadsff@adfsda.com",
        realname : "Test"
    }   
    const exampleUser = {
        username : 'test_account2',
        password : 'Test1234'
    }
    const exampleUserHeader = getBasicAuthAndHeader(exampleUser.username,exampleUser.password)

    const newUserHeader = getBasicAuthAndHeader(newUser.username,newUser.password)
    // Create new User
    await User.createUser(newUser)
    // Get user's id
    const id = await User.getUserId(exampleUserHeader)
    // Create new project with system account
    const projectName = `${newUser.username}_exampleimage`
    const makeProjectWithUserAccount = await Project.createProject({project_name : projectName,public : false})
    // Grant user permission as project admin
    const grantProjectAdminToUser = await Member.grantProjectAdmin({
        userName : newUser.username,
        projectName
    })
}

main()