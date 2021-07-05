//npm init creates package.json
//npm install uuid to generate random ids so for every specefic room we give different id
//npm install express
//npm install socket.io
//npm install peer

//1)
//this is how we initialize our express application
const express=require('express');
const app=express();
const users = {};
const userI=[];
//2)
//import certain version of uuid
const {v4:uuidv4}=require('uuid');


//3)
//create server
const server=require('http').Server(app);

//4)
//socket setup
//the way to import socket io
const io = require('socket.io')(server);

//5)
//setup peer
//Combining peer with existing express app
const {ExpressPeerServer} = require('peer');//object destructing
const peerServer = ExpressPeerServer(server,{
    debug:true
});


app.set('view engine','ejs');
//to tell the server our public files will be here
app.use(express.static('public'));

//what url we are going to use
app.use('/peerjs',peerServer);

//here our root url is localhost:3030 which then gets redirected and it becomes
//localhost:3030/${uuidv4()}[random uid generated]
app.get('/',(req,res)=>{
    res.redirect(`${uuidv4()}`);
})

//new url so that those unique ids are shown on the link bar
app.get('/:room',(req,res)=>{//'/:room' is a path for which the middleware function is being called and rest is middleware function called as callback
    res.render('room',{roomId:req.params.room});//renders the room
    //we pass the room id to room.ejs
})


//when a particular user visit the site that user join the room then the below code is executed
io.on('connection',socket=>{
    socket.on('join-room',(roomId,{id,name=uuidv4()})=>{//userid to tell which user has joined and roomid to tell where the user has joined
        //console.log('Join room')
        userI.push(id);
        socket.join(roomId);
        console.log(name);
        socket.broadcast.to(roomId).emit('user-connected',{id,name})//to tell everybody which user has joined the room
        
        
        socket.on('message',(message)=>{
            io.to(roomId).emit('createMessage',{message,name})
        })//this will recieve the message
      
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', {id,name})
            
          })
          /*socket.on('seruI', () =>{
	    	socket.emit('all_users_inRoom', userI);
			//console.log(userS);
		    console.log(userI);
	    }); */ 
    })
})
//we call the socket function which is an arrow function when the connection is estabilished
//we listen to the message being sent to server from the client
//the socket written refers to the particular socket between the server and the client that is sending the msg
//the callback fxn which is empty right now recieves the data sent to it
//when we recive the chat message we fire the annonymous fxn and so get our console log.


server.listen(process.env.PORT||3030);
//this tells us that the server is going to be local host and the port is going to be 3030


