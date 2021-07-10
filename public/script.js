const myName = prompt("Please enter your name");

const userlist=[];
//var activeSreen = "";
const socket = io("/");
const peer = new Peer(undefined, {
   path: '/peerjs',
   host: "/",
   port: "443",
});
let currentPeer=[];
const peers = {};
//const userDropDown = document.getElementById('myDropdown');
const videoGrid = document.getElementById("video-grid");
const videoText = document.createElement("div");
const videoItem = document.createElement("div");

videoItem.classList.add("video__item");

videoText.classList.add("video__name");
videoItem.append(videoText);
//videohand.append(videoText);

const video = document.createElement("video");
video.style.border='2px solid white';
video.muted = true;
//const newname=[];
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
        myVideoStream.getAudioTracks()[0].enabled = false;
        myVideoStream.getVideoTracks()[0].enabled = false;
        addVideoStream(video, stream, id, myName);

        peer.on("call", (call) => {
          
            call.answer(stream);

            const video = document.createElement("video");
            video.style.border='2px solid white';
            call.on("stream", (userStream) => {
              const userid = call.peer;
              const userName = call.metadata.name;
              currentPeer.push(call.peerConnection);//----------------------

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
          $("ul").append(`<span class="messageHeader" style="color:blue"><small>${name} has joined the meeting at ${hours}:${minutes}${format}</small></span><br><br>`);
          console.log(name);
          connectToNewUser({ id, name }, stream)
          }, 1000)
        })
     })

  
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
          <div class="message__content" style="font-weight:bold;">
          ${name} <span class="message__time"style="disply:inline;">${hours}:${minutes}${format}</span>
          </div>
          <div cl ass="message__text"><span style="color:white;font-weight:normal;">${message}<br><br></span></div>
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
          $("ul").append(`<span class="messageHeader" style="color:red"><small>${name} has left the meeting at ${hours}:${minutes}${format}</small></span><br><br>`);
          const video = document.getElementById(id);
            if (video) {
                video.parentElement.remove();
                console.log("user left")
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
  currentPeer.push(call.peerConnection);
  console.log(currentPeer);
}
var clonedItem;
function addVideoStream(video, stream, id, name) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  video.setAttribute("id", id);

  clonedItem = videoItem.cloneNode(true);
  clonedItem.children[0].innerHTML = name;
  clonedItem.append(video);
  //clonedItem.append("Check")
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

  var clonedhand;
  
  var hands=true;
  const raisedHand = ()=>{
    const sysbol = "&#9995;";
    //const sysbol1 = "hand lower";
    //socket.emit('message', sysbol,myName );
    
    if(hands==true){
      socket.emit('message', sysbol,myName );
      
     
    unChangeHandLogo();
    hands=false;
    }
    else
    {
      //socket.emit('message', sysbol1,myName );
      
      changeHandLogo();
      hands=true;
    }
  }
  var x = document.getElementById('myDIV');
  const unChangeHandLogo = ()=>{
    const html = `<i class="far fa-hand-paper" style="color:red;"></i>
                  <span>Raised</span>`;
    document.querySelector('.raisedHand').innerHTML = html;
    x.style.visibility="visible";

    console.log("change")
   // changeHandLogo();
  }
  
  const changeHandLogo = ()=>{
    
      const html = `<i class="far fa-hand-paper" style="color:"white"></i>
                  <span>Hand</span>`;
      document.querySelector('.raisedHand').innerHTML = html;
      x.style.visibility="hidden";
  }


const disconnectNow = ()=>{
  window.location = "http://localhost:3000/";   
}

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

    const share =() =>{
      var share = document.createElement('input'),
      text = window.location.href;
      
      console.log(text);
      document.body.appendChild(share);
      share.value = text;
      share.select();
      document.execCommand('copy');
      document.body.removeChild(share);
      alert('Meeting link copied');
     }

     const screenshare = () =>{
      navigator.mediaDevices.getDisplayMedia({ 
          video:{
            cursor:'always'
          },
          audio:{
                 echoCancellation:true,
                 noiseSupprission:true
          }
     
      }).then(stream =>{
          let videoTrack = stream.getVideoTracks()[0];
          
         // video.style.webkitTransform="scaleX(-1)"
         // video.style.transform="scaleX(-1)"
              videoTrack.onended = function(){
                stopScreenShare();
              }
              for (var x=0;x<currentPeer.length;x++){
                
                let sender = currentPeer[x].getSenders().find(function(s){
                   return s.track.kind == videoTrack.kind;
                   
                 })
                // video.style.transform="rotateY(180deg)";
                 //video.style.border="30px solid white";
                 sender.replaceTrack(videoTrack);
            }
           // video.style.border="30px solid white";
       })
       
      }
     
     function stopScreenShare(){
       let videoTrack = myVideoStream.getVideoTracks()[0];
       for (var x=0;x<currentPeer.length;x++){
               let sender = currentPeer[x].getSenders().find(function(s){
                   return s.track.kind == videoTrack.kind;
                 }) 
                 //video.style.transform="rotateY(180deg)";
                 //video.style.border="3px solid white";
               sender.replaceTrack(videoTrack);
       }      
       // video.style.border="3px solid white"; 
     }
     
     /*function stopScreenShare(){
  let videoTrack = myVideoStream.getVideoTracks()[0];
  for (let x=0;x<currentPeer.length;x++){
  let sender = currentPeer[x].getSenders().find(function(s){
  return s.track.kind == videoTrack.kind;
  })
  sender.replaceTrack(videoTrack);
  }
  }
  */
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
  
