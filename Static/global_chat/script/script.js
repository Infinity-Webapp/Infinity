function loaded() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('header').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
}

function showChatSetting(){
   var popup = document.getElementById("setting-window");
  popup.classList.toggle("show");
}

function toggleTheme(theme){
  const chatContainer = document.getElementById("chat-container");
  const settingWindow = document.getElementById("setting-window");
  const messageSnderWrapper = document.getElementById("message-sender-wrapper");

  chatContainer.classList.toggle("chat-container-dark");
  settingWindow.classList.toggle("setting-window-dark");
  messageSnderWrapper.classList.toggle("message-sender-wrapper-dark");

  if(theme == "toDark"){
    document.getElementById("light").style.display = "none";
    document.getElementById("dark").style.display = "inline-block";
  }else if(theme == "toLight"){
    document.getElementById("light").style.display = "inline-block";
    document.getElementById("dark").style.display =  "none";
  }
}

const clearChatBtn = document.getElementById('btn-clear-chat');

clearChatBtn.addEventListener('click', (e) =>{
  document.getElementById('chat-container').innerHTML = "";  
});