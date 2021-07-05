//const { peerServer } = require('peer');

const socket=io('/')//make connection between server and client

const videoGrid=document.getElementById('video-grid');//we put the video there
const myVideo=document.createElement('video');
myVideo.muted=true;

// Create the Peer object
//The Peer object is where we create and receive connections.
//const peer = new Peer([id], [options]);
const peer= new Peer(undefined,{//undefined becoz we don't specify any id of our own,id will automatically get created by peerjs 
    //below are the peer options
    path:'/peerjs',//The path where your self-hosted PeerServer is running. Defaults to '/' but we are using /peer.js.Check server.js
    host:'/',//Server host. Defaults to 0.peerjs.com. Also accepts '/' to signify relative hostname.
    port:'3030'//Server port. Defaults to 443.
});


let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true//when access is given to camera and audio
}).then(stream=>{
//myVideoStream will recieve this stream
    myVideoStream=stream;
    addVideoStream(myVideo,stream);//when a new user connects to our stream,we want to send our stream to
    peer.on('call',call=>{
        call.answer(stream)
    const video=document.createElement('video')
    call.on('stream', userVideoStream=>{//here what is happening is that we are taking this stream from the other user whom we are calling
        addVideoStream(video,userVideoStream)// and adding it to our own custom video element on our page
      })
})


socket.on('user-connected',(user_Id)=>{//that new user
        connecTONewUser(user_Id,stream);
    })
})
//to emit a message or an event so that other clients can recieve the msg.
//we want to send it down the socket
//socket.emit('join-room',ROOM_ID);//io.connect('/').emit('join-room')//this is going to emit a message down the websocket to the server
//emit function takes two parameters and the first one is the name of the message
//so now the message join-room is going to the server down the web socket and send the data to the server
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);//this tells that a particular person with 'id' has joined a particular 'room id'
    //console.log(id)//peer.js provides us the id of an user and uuid gives us the id of a particular room
})





const connecTONewUser = (user_Id,stream)=>{
    const call = peer.call(user_Id, stream);//consist of the stream which we want to send to that user
    const video=document.createElement('video')
    call.on('stream', userVideoStream=>{//here what is happening is that we are taking this stream from the other user whom we are calling
        addVideoStream(video,userVideoStream)// and adding it to our own custom video element on our page
  })
  
   console.log('new user',user_Id);
}


//the below code is used to make sure the video is running continously.
const addVideoStream = (video,stream)=>{
    video.srcObject = stream;
    //when we load all the data for this specefic stream we are going to play this video
    video.addEventListener('loadedmetadata',()=>{//once the video is loaded play it on our page 
        video.play();
    })

videoGrid.append(video)//then just append all the videos on the grid which is the black background
}



/*
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const peer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3030'
})
let myVideoStream;
const myVideo = document.createElement('video')
myVideo.muted = true;
//const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream)
  peer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
  // input value
  //let text = $("input");
  // when press enter send message
  
  
})



peer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = peer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

*/



const socket=io('/')//make connection between server and client

const videoGrid=document.getElementById('video-grid');//we put the video there
const myVideo=document.createElement('video');
myVideo.muted=true;

// Create the Peer object
//The Peer object is where we create and receive connections.
//const peer = new Peer([id], [options]);
const peer= new Peer(undefined,{//undefined becoz we don't specify any id of our own,id will automatically get created by peerjs 
    //below are the peer options
    path:'/peerjs',//The path where your self-hosted PeerServer is running. Defaults to '/' but we are using /peer.js.Check server.js
    host:'/',//Server host. Defaults to 0.peerjs.com. Also accepts '/' to signify relative hostname.
    port:'3030'//Server port. Defaults to 443.
});


let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true//when access is given to camera and audio
}).then(stream=>{
//myVideoStream will recieve this stream
    myVideoStream=stream;
    addVideoStream(myVideo,stream);//when a new user connects to our stream,we want to send our stream to
    peer.on('call',call=>{
        call.answer(stream)
    const video=document.createElement('video')
    call.on('stream', userVideoStream=>{//here what is happening is that we are taking this stream from the other user whom we are calling
        addVideoStream(video,userVideoStream)// and adding it to our own custom video element on our page
      })
})


socket.on('user-connected',(user_Id)=>{//that new user
        connecTONewUser(user_Id,stream);
    })
})
//to emit a message or an event so that other clients can recieve the msg.
//we want to send it down the socket
//socket.emit('join-room',ROOM_ID);//io.connect('/').emit('join-room')//this is going to emit a message down the websocket to the server
//emit function takes two parameters and the first one is the name of the message
//so now the message join-room is going to the server down the web socket and send the data to the server
peer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id);//this tells that a particular person with 'id' has joined a particular 'room id'
    //console.log(id)//peer.js provides us the id of an user and uuid gives us the id of a particular room
})





const connecTONewUser = (user_Id,stream)=>{
    console.log(stream)
    const call = peer.call(user_Id, stream);//consist of the stream which we want to send to that user
    const video=document.createElement('video')
    call.on('stream', userVideoStream=>{//here what is happening is that we are taking this stream from the other user whom we are calling
        addVideoStream(video,userVideoStream)// and adding it to our own custom video element on our page
  })
  
   console.log('new user',user_Id);
}


//the below code is used to make sure the video is running continously.
const addVideoStream = (video,stream)=>{
    video.srcObject = stream;
    //when we load all the data for this specefic stream we are going to play this video
    video.addEventListener('loadedmetadata',()=>{//once the video is loaded play it on our page 
        video.play();
    })

videoGrid.append(video)//then just append all the videos on the grid which is the black background
}


//const { text } = require("express");
const myname=prompt("Please Enter your name")
const socket=io('/')//make connection between server and client
// Create the Peer object
//The Peer object is where we create and receive connections.
//const peer = new Peer([id], [options]);
const peer= new Peer(undefined,{//undefined becoz we don't specify any id of our own,id will automatically get created by peerjs 
    //below are the peer options
    path:'/peerjs',//The path where your self-hosted PeerServer is running. Defaults to '/' but we are using /peer.js.Check server.js
    host:'/',//Server host. Defaults to 0.peerjs.com. Also accepts '/' to signify relative hostname.
    port:'3030'//Server port. Defaults to 443.
});


const videoGrid=document.getElementById('video-grid');//we put the video there
const myVideo=document.createElement('video');
const videoText=document.createElement("div");
videoText.classList.add("video__name");
myVideo.muted=true;
const mypeers={};

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true//when access is given to camera and audio
}).then(stream=>{
//myVideoStream will recieve this stream
            myVideoStream=stream;
            addVideoStream(myVideo,stream,myname);//when a new user connects to our stream,we want to send our stream to

            //we are able to recieve calls by listening to our on call method
            peer.on('call',call=>{
                call.answer(stream)
            const video=document.createElement('video')
            call.on('stream', userVideoStream=>{//here what is happening is that we are taking this stream from the other user whom we are calling
                
                
                addVideoStream(video,userVideoStream)// and adding it to our own custom video element on our page
            })
        })


        socket.on('user-connected', userId => {
            // user is joining
            setTimeout(() => {
            // user joined
            $("ul").append(`<span class="messageHeader"><small>${userId} Joined Meeting</small></span><br>`);
            connecTONewUser(userId, stream)
            }, 1000)
        })
        var text1 = document.getElementById("chat_message");
        console.log(text1.value)

        document.querySelector('html').addEventListener("keyup",function (e) {
            if (e.keyCode === 13 && text1.value.length !== 0) {
            socket.emit('message', text1.value);
            console.log(text1.value)
            text1.value="";
            }
        });

        socket.on('createMessage',message=>{
            console.log('this is coming from server',message)
            $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
            //scrollToBottom()
        })

        
        socket.on('user-disconnected', (userId) => {
            setTimeout(() => {
            $("ul").append(`<span class="messageHeader"><small>${userId} Left Meeting</small></span><br>`);
            if (mypeers[userId]) 
                mypeers[userId].close()
            }, 1000)
        })
})
//to emit a message or an event so that other clients can recieve the msg.
//we want to send it down the socket
//socket.emit('join-room',ROOM_ID);//io.connect('/').emit('join-room')//this is going to emit a message down the websocket to the server
//emit function takes two parameters and the first one is the name of the message
//so now the message join-room is going to the server down the web socket and send the data to the server

peer.on('open',id=>{//automatically generates id
    socket.emit('join-room',ROOM_ID,id);//this tells that a particular person with 'id' has joined a particular 'room id'
    //console.log(id)//peer.js provides us the id of an user and uuid gives us the id of a particular room
})




const connecTONewUser = (user_Id,stream)=>{
    console.log(stream)
    //we are also able to make calls when new user connect to our rooms
    const call = peer.call(user_Id, stream);//consist of the stream which we want to send to that user
    const video=document.createElement('video')
    call.on('stream', userVideoStream=>{//here what is happening is that we are taking this stream from the other user whom we are calling
        addVideoStream(video,userVideoStream)// and adding it to our own custom video element on our page
  })
   console.log('new user',user_Id);
   call.on('close', () => {
    video.remove()
  })

  mypeers[user_Id] = call
}


//the below code is used to make sure the video is running continously.
const addVideoStream = (video,stream)=>{
    video.srcObject = stream;
    //when we load all the data for this specefic stream we are going to play this video
    video.addEventListener('loadedmetadata',()=>{//once the video is loaded play it on our page 
        video.play();
    })

videoGrid.append(video)//then just append all the videos on the grid which is the black background
}

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  }
  
  const playStop = () => {
    console.log('object')
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }
  
  const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
  }
  
  const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }
  
  const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }


  const myName = prompt("Please enter your name");


  var activeSreen = "";
  const socket = io("/");
  const peer = new Peer(undefined, {
     path: '/peerjs',
     host: "/",
     port: "3030",
  });
  var currentPeer;
  const peers = {};
  const videoGrid = document.getElementById("video-grid");
  const videoText = document.createElement("div");
  const videoItem = document.createElement("div");
  videoItem.classList.add("video__item");
  videoText.classList.add("video__name");
  videoItem.append(videoText);
  
  const video = document.createElement("video");
  video.style.border='2px solid white';
  video.muted = true;
  const newname=[];
  let myVideoStream;
  if(myName!=""){
    peer.on("open", (id) => {
      //if (loading) loading.remove();
      socket.emit("join-room", ROOM_ID, { id, name: myName });
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      }).then((stream) => {
          //addClickListeners(stream);
          myVideoStream=stream;
          addVideoStream(video, stream, id, myName);
  
          peer.on("call", (call) => {
            
              call.answer(stream);
  
              const video = document.createElement("video");
              video.style.border='2px solid white';
              call.on("stream", (userStream) => {
                const userid = call.peer;
                const userName = call.metadata.name;
                currentPeer=call.peerConnection;
  
                log(`User connected - ID: ${userid}, Name: ${userName}`);
                addVideoStream(video, userStream, userid, userName);
            });
          });
  
        
          socket.on('user-connected', ({ id, name }) => {
            // user is joining
            setTimeout(() => {
            // user joined
            const date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            const format = hours >= 12 ? "PM" : "AM";
            hours %= 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            $("ul").append(`<span class="messageHeader"><small>${name} has joined the meeting at ${hours}:${minutes}${format}</small></span><br><br>`);
            console.log(name);
            connectToNewUser({ id, name }, stream)
            }, 1000)
          })
       })
       document.getElementById("screenshare").addEventListener('click',(e)=>{
        navigator.mediaDevices.getDisplayMedia({
          video:{
            cursor:"always"
          },
          audio:{
            echoCancellation:true,
            noiseSuppression:true
          }
        }).then((stream)=>{
          let videoTrack = stream.getVideoTracks()[0];
          videoTrack.onended = function(){
          stopScreenShare();
        }
        
          let sender = currentPeer.getSenders().find(function(s){  //replace video track 
            return s.track.kind == videoTrack.kind;
          })
          sender.replaceTrack(videoTrack);
        
      });
    });
           //= function()
          //{
           
         // }
          
       
    
            var text1 = document.getElementById("chat_message");
            console.log(text1.value)
            const lists = document.getElementById("messages");
            document.querySelector('html').addEventListener("keyup",function (e) {
                if (e.keyCode === 13 && text1.value.length !== 0) {
                socket.emit('message', text1.value);
                console.log(text1.value)
                text1.value="";
                }
            });
            
          socket.on('createMessage',({message,name})=>{
            const date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            const format = hours >= 12 ? "PM" : "AM";
            hours %= 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            const container= document.querySelector(".main_chat_window");
            const list = document.createElement("li");
            list.innerHTML = `
            <div class="message__content" style="font-weight:bold; font-size: xx-large;">
            ${name} <span style="disply:inline;font-size:medium">${hours}:${minutes}${format}</span>
            </div>
            <div cl ass="message__text"><span style="color:white;font-weight:normal; font-size: x-large;">${message}<br><br></span></div>
            `
            lists.append(list);
            container.scrollTop = container.scrollHeight;
          })
  
          socket.on("user-disconnected", ({ id, name }) => {
            log(`User disconnected - ID: ${id}, Name: ${name}`);
            const date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            const format = hours >= 12 ? "PM" : "AM";
            hours %= 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            $("ul").append(`<span class="messageHeader"><small>${name} has left the meeting at ${hours}:${minutes}${format}</small></span><br><br>`);
            const video = document.getElementById(id);
              if (video) {
                  video.parentElement.remove();
                  console.log("user left @113")
                }
              if (peers[id]) peers[id].close();
                });
             
            });
  
  }
  else
  {
    alert("Please refresh and enter your Name")
  }
  
  /*function stopScreenShare(){
    let videoTrack  = stream.getVideoTracks()[0];
    var sender = currentPeer.getSenders().find(function(s){
      return s.track.kind === videoTrack.kind;
    })
    sender.replaceTrack(videoTrack);
  }
  */
  
  function connectToNewUser({ id, name }, stream) {
    const call = peer.call(id, stream, { metadata: { name: myName } });
  
    const video = document.createElement("video");
    video.style.border='2px solid white';
    call.on("stream", (userStream) => {
      addVideoStream(video, userStream, id, name);
      console.log(name);
    });
    
    call.on("close", ()=> {
      video.remove();
      console.log("person left")
    });
  
  
    peers[id] = call;
  }
  
  function addVideoStream(video, stream, id, name) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    video.setAttribute("id", id);
  
    const clonedItem = videoItem.cloneNode(true);
    clonedItem.children[0].innerHTML = name;
    clonedItem.append(video);
  
    videoGrid.append(clonedItem);
  
    // weird error cleanup
    const nodes = document.querySelectorAll(".video__item") || [];
    nodes.forEach((node) => {
      if (node.children && node.children.length < 2) {
        node.remove();
      }
    });
  }
  
  /*function addClickListeners(stream) {
    
  }
  */
  function log(text) {
    console.info(text);
  }
  
  const muteUnmute = () => {
      const enabled = myVideoStream.getAudioTracks()[0].enabled;
      if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
      } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
      }
    }
    
    const playStop = () => {
      console.log('object')
      let enabled = myVideoStream.getVideoTracks()[0].enabled;
      if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo()
      } else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        setStopVideo()
      }
    }
    
    const setMuteButton = () => {
      const html = `
        <i class="fas fa-microphone"></i>
        <span>Mute</span>
      `
      document.querySelector('.main__mute_button').innerHTML = html;
    }
    
    const setUnmuteButton = () => {
      const html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
      `
      document.querySelector('.main__mute_button').innerHTML = html;
    }
    
    const setStopVideo = () => {
      const html = `
        <i class="fas fa-video"></i>
        <span>Stop Video</span>
      `
      document.querySelector('.main__video_button').innerHTML = html;
    }
    
    const setPlayVideo = () => {
      const html = `
      <i class="stop fas fa-video-slash"></i>
        <span>Play Video</span>
      `
      document.querySelector('.main__video_button').innerHTML = html;
    }
    const handleInvite = () => {
      alert(`Invite people to your room:\n\nRoom ID: ${ROOM_ID}\nCopy this link to join: ${window.location.href}`);
  };
  
  
  const hidechat = ()=>{
    var x = document.getElementById('chat-screen');
    //var y = document.getElementById('check_left');
    if (x.style.display === 'none') {
      x.style.display = 'flex';
     // y.style.flex=1;
    } else {
      x.style.display = 'none';
     
      //y.style.flexGrow=1000;
     
    }
  }
  function stopScreenShare(){
    let videoTrack = myVideoStream.getVideoTracks()[0];
    for (let x=0;x<currentPeer.length;x++){
    let sender = currentPeer[x].getSenders().find(function(s){
    return s.track.kind == videoTrack.kind;
    })
    sender.replaceTrack(videoTrack);
    }
    }
  //const chatScreen = document.getElementById("chat-screen");
  
  /*document.getElementById("screenshare").addEventListener('click',(e)=>{
        navigator.mediaDevices.getDisplayMedia({
          video:{
            cursor:"always"
          },
          audio:{
            echoCancellation:true,
            noiseSuppression:true
          }
        }).then((stream)=>{
          let videoTrack = stream.getVideoTracks()[0];
          let sender = currentPeer.getSenders().find(s=>s.track.kind === videoTrack.kind);
          sender.replaceTrack(videoTrack);
          videoTrack.onended = function()
          {
            let videoTrack = stream.getVideoTracks()[0];
            let sender = currentPeer.getSenders().find(s=>s.track.kind === videoTrack.kind);
            sender.replaceTrack(videoTrack);
          }
          
        })
      })*/
