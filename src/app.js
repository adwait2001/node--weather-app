const express =require('express')
const path = require('path')
const hbs =require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const request = require('postman-request')


homepage=path.join(__dirname,'../public')
viewpage=path.join(__dirname,'../templates/views')
partialspath=path.join(__dirname,'../templates/partials')


const app =express()

app.use(express.static(homepage))
app.set('view engine','hbs')
app.set('views',viewpage)
hbs.registerPartials(partialspath)

app.get('',(req,res)=>{
    res.render('index',{
        name:'created by adwait',
        title:'home'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'created by adwait',
        title:'about'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        background:'helpful text',
        name:'created by adwait',
        title:'help'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
    return res.send({
        error:'unable to access address'
    })}

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
   
    if (req.query.search) {
        return res.send({
            products:[]
         })
    }
    
    res.send({
        error:'unable to access'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        content:'help not provided'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        content:'page not found'
        })
})

app.listen(3000,()=>{
    console.log('server started')
})