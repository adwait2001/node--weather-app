const request = require('postman-request')


const forecast=(latitude,longitude,callback)=>{
    const url2='http://api.weatherstack.com/current?access_key=f263a88529e2631ed4c6cd2063b6029f&query='+latitude+','+longitude +'-122.4233&units=f'

    request({ url: url2, json: true }, (error, response) => {
            if (error) {
                callback('check your connection',undefined)
            }else if(response.body.error){
                callback('coordinates not specified',undefined)
            }
             else {
                callback(undefined,
            
                    'temp is ' + response.body.current.temperature+ ' but feels like '+ response.body.current.feelslike
                )
            }
        })

}

module.exports= forecast
