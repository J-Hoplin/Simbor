const Project = {...require('./Projects/projects.js')}
const User = {...require('./Users/user.js') }
const Member = {... require('./Member/member.js')}
const { getBasicAuthAndHeader } = require('../basicAuthHandler')

/**
 *
 * - Create Project
 * - Create new project
 * - Delete Project
 * - Check if project deletable
 *
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
    // List user's project list
    const listProjectList = await Project.viewProjectList()
    // Create Empty Project
    await Project.createProject({project_name : "test_delete_project2222",public : true})
    // Delete Project : Not Existing
    await Project.deleteProject("not_existing_project2222", exampleUserHeader) 
    // Delete Project : Existing
    //await Project.deleteProject("test_delete_project2222", exampleUserHeader)
    // Delete Project : With some repository exist : admin header
    await Project.deleteProject("library")
    // Check if Project Deletable
    await Project.checkDeletable("library")
}


main()