const Project = {...require('./Projects/projects.js')}
const User = {...require('./Users/user.js') }
const Repository = { ... require('./Repository/repository')} 
const { getBasicAuthAndHeader } = require('../basicAuthHandler')

/**
 * Scenario 2
 * 
 * - View available repositories
 * - View available repositories by Project
 * 
 * - Repository는 API로 Create하는것을 지원하지 않음
 * - Update API가 정상적으로 작동하지 않는거 같음
 */


const main = async() => {
    const exampleUser = {
        username : 'test_account2',
        password : 'Test1234'
    }
    const exampleUser2 = {
        username : 'test_account6',
        password : 'Test1234'
    }
    const exampleUserHeader = getBasicAuthAndHeader(exampleUser.username,exampleUser.password)
    const exampleUser2Header = getBasicAuthAndHeader(exampleUser2.username,exampleUser2.password)
    // Get all repository : Admin
    await Repository.getRepositoryListAll()
    // Get all repository : example user
    await Repository.getRepositoryListAll(exampleUserHeader)
    // Get repository by project : admin
    await Repository.getRepositoryListByProject("library")
    // Get repository by project : exmaple user
    await Repository.getRepositoryListByProject("library", exampleUserHeader)
    // Delete Repository : exampleUser
    await Repository.deleteRepository({
        project_name : "prj_with_api",
        repository_name : "test_repo2"
    },exampleUserHeader)
    // Get repository information
    let res = await Repository.getRepositoryInformation({
        project_name : "prj_with_api",
        repository_name : "test_repo1"
    })
    console.log(res)
    // Get repository information : Out of scope user
    res = await Repository.getRepositoryInformation({
        project_name : "prj_with_api",
        repository_name : "test_repo1"
    },exampleUser2Header)
    console.log(res)
    

}

main()