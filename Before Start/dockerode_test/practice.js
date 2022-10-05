const Docker = require('dockerode')
const { utimes } = require('fs-extra')
const { resolve } = require('path')
const path = require('path')
/**
 * 
 * Docker Pull / Build / Push test via dockerode
 * 
 * Dockerode Github : https://github.com/apocas/dockerode
 * 
 * Docerfile used in this example code located at ../exampleDockerFile
 * 
 */

const dockerImageBuildTest = async() => {
    const docker = new Docker({socketPath: '/var/run/docker.sock'})
    const imageName = `0.0.0.0/library/buildwithdirectory`
    const stream = await docker.buildImage({
        context: path.join(__dirname, "../exampleDockerFile"),
        src: ['Dockerfile']
    },{t:imageName})
    await new Promise((resolve,reject) => {
        docker.modem.followProgress(stream,(err,res) => {
            if(err){
                console.error(err)
            }else{
                resolve(res)
            }
        })
    })
}

const pushTest = async() => {
    try{
        const docker = new Docker({socketPath: '/var/run/docker.sock'})
        const imageName = `harbor.192.168.64.2.nip.io:30940/test/testingtag2`
        
        const stream = await docker.buildImage('../exampleDockerFile/example.tar',{ t: imageName })
        await new Promise((resolve,reject) => {
            docker.modem.followProgress(stream,(err,res) => {
                if(err){
                    console.error(err)
                }else{
                    resolve(res)
                }
            })
        })
        
        const image = await docker.getImage(imageName)
        const imgPushStream = await image.push({
            authconfig : {
                serveraddress: "harbor.192.168.64.2.nip.io:30940",
                username: "keycloak",
                password: "Abcdefg123"
            }
        })
        await new Promise((resolve, reject) => {
            docker.modem.followProgress(imgPushStream,(err,res) => {
                if(err || (res && res.some((e) => e.error))){
                    reject(res)
                }else{
                    resolve(res)
                }
            })
        })
    }catch(err){
        console.error(err)
    }
}


const pullTest = async() => {
    try{
        const docker = new Docker()
        const imageName = `harbor.192.168.64.2.nip.io:30940/test/testingtag2`
        const imgPullStream = await docker.pull(imageName,{
            authconfig : {
                serveraddress: "harbor.192.168.64.2.nip.io:30940",
                username: "keycloak",
                password: "Abcdefg123"
            }
        })
        await new Promise((resolve,reject) => {
            docker.modem.followProgress(imgPullStream,(err,res) => {
                if(err){
                    console.error(err)
                    reject(res)
                }else{
                    resolve(res)
                }
            })
        })
    }catch(err){
        console.error(err)
    }
    
}

pullTest()

