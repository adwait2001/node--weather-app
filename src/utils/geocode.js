const request=require('postman-request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3BlY3RhZHUiLCJhIjoiY2tjY3JvZnVuMDdqNTJwcG1lczJoaTRybSJ9.5NWsfbxdIfEmdihL8DfJTg&limit=1'

    request({ url, json: true }, (error, {body}) => {
            if (error) {
                callback('check your connection',undefined)
            }else if(body.features.length===0){
                callback('coordinates not specified',undefined)
            }
             else {
                callback(undefined,{
                     latitude :body.features[0].center[1],
                     longitude :body.features[0].center[0],
                     location:body.features[0].place_name
                })
            }
        })

}

module.exports=geocode

