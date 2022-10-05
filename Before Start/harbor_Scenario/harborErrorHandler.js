const errorHandler = (err) => {
    try{
        const [
            {
                code,
                message
            }
        ] = err.response.data.errors
        console.log(`Error(${err.response.status}) - ${code} : ${message}`)
    }catch(e){
        console.error(`JavaScript Exception : ${err.message}`)
    }
    
}

module.exports = { errorHandler }