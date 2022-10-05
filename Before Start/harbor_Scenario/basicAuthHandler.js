const { id, pw } = require('./config.json')

const getBasicAuthAndHeader = (name = id,password = pw) => { 
    const basicAuth = Buffer.from(`${name}:${password}`,"utf-8").toString('base64')
    return {
        "Content-Type" : "application/json",
        "authorization" : `Basic ${basicAuth}`
    }
}

module.exports = { getBasicAuthAndHeader }