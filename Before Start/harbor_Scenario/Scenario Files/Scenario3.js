const Project = {...require('./Projects/projects.js')}
const User = {...require('./Users/user.js') }
const Repository = { ... require('./Repository/repository')} 
const Artifacts = {...require('./Artifacts/artifact')}
const { getBasicAuthAndHeader } = require('../basicAuthHandler')

/**
 * Scenario 3
 * 
 * - Get Artifacts
 * - Delete Specific artifacts
 * 
 * 
 */

async function main(){
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
    const getList = await Artifacts.getArtifactsList({
        project_name : "prj_with_api",
        repository_name : "test_repo1"
    },exampleUserHeader)
    console.log(getList)
    await Artifacts.deleteArtifact({
        project_name : "prj_with_api",
        repository_name : "test_repo1",
        reference : "sha256:44f98f4dd825a945d2a6a4b7b2f14127b5d07c5aaa07d9d232c2b58936fb76dc"
    })
}

main()