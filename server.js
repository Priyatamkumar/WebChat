const express= require('express')
const app = express()
const http =require('http').createServer(app)

const PORT=process.env.PORT||3000
http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname+'/public'))
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
}) 

// socket
const io=require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
})
app.use(require('cors')())
io.on('connection',(socket)=>{
    console.log('connected...')
    socket.on('massage',(msg) =>{
        //console.log(msg)
        socket.broadcast.emit('massage', msg)
    })
})