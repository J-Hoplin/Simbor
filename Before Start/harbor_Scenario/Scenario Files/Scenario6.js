const Project = {...require('./Projects/projects.js')}
const User = {...require('./Users/user.js') }
const Member = {... require('./Member/member.js')}
const { getBasicAuthAndHeader } = require('../basicAuthHandler')

/**
 * 
 * This scenario is based on OIDC Auth
 * This scenario is invalid if you are using Local DB Auth
 * 
 * - Get user's CLI Secret
 * - Change user's CLI Secret
 * - Get user's Changed CLI Secret
 * 
 */

const main = async () => {
    // Example User name
    const username = "keycloak"
    // Example User's changed secret
    const secret = "ExampleSecret1234"

    let res = await User.getUserCLISecret({username})
    console.log(`user_id : ${res.user_id} | user_cli_secret : ${res.user_cli_secret}`)
    res = await User.updateUserClientSecret({
        username,
        secret
    })
    res = await User.getUserCLISecret({username})
    console.log(`user_id : ${res.user_id} | user_cli_secret : ${res.user_cli_secret}`)
}

main()
