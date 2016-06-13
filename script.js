var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'comster404', 'RobotCaleb', 'brunofin', 'noobs2ninjas'],
    main = document.getElementById('main'),
    userAll = document.getElementById('all'),
    userOnline = document.getElementById("online"),
    userOffline = document.getElementById('offline');
    
userAll.addEventListener('click', init, false);
userOnline.addEventListener('click', getLive, false);
userOffline.addEventListener('click', getOffline, false);

    

function getInfo(a) {
  
  var div = document.createElement('div'),
      image = document.createElement('img'),
      name = document.createElement('h3'),
      game = document.createElement('h4'),
      description = document.createElement('h5');
      
  userAll.classList.remove('none');
  userAll.classList.add('active');
  userOnline.classList.remove('active');
  userOnline.classList.add('none');
  userOffline.classList.remove('active');
  userOffline.classList.add('none');
  
  while(main.firstChild) {
    main.removeChild(main.firstChild);
  }
    
  $.getJSON('https://api.twitch.tv/kraken/streams/' + a, function(data){
    
    console.log(data);
    if (data.stream !== null) {
      
      image.src = data.stream.channel.logo;
      name.textContent = data.stream.channel.display_name + ' : ';
      game.textContent = data.stream.game;
      description.textContent = ' - ' + data.stream.channel.status;
      
      div.appendChild(image);
      div.appendChild(name);
      div.appendChild(game);
      div.appendChild(description);
      div.classList.add("online");
      
      main.insertBefore(div, main.firstChild);
      
    } else {
      
      name = a;
      description = ' - OFFLINE';
      
      div.textContent = name + description;
      div.classList.add('offline');
      
      main.appendChild(div);
      
    }
    
  
  }) // end getJSON
}// end getInfo

function init() {

  for (var i = 0; i < channels.length; i++) {
    
      var channel = channels[i];

  getInfo(channel);
  
  }
}// end init


function getLive() {
  
  var list = document.getElementsByName('div');
  
  while(main.firstChild) {
    main.removeChild(main.firstChild);
  }
  
  userAll.classList.remove('active');
  userAll.classList.add('none');
  userOnline.classList.remove('none');
  userOnline.classList.add('active');
  userOffline.classList.remove('active');
  userOffline.classList.add('none');
  
  for (var i = 0; i < list.length; i++) {
    
    if (list[i].classList.indexOf('online')) {
      
      main.appendChild(div);
      
    }
    
  }
  
}

function getOffline() {
  
  var list = document.getElementsByName('div');
  
  while(main.firstChild) {
    main.removeChild(main.firstChild);
  }
  
  userAll.classList.remove('active');
  userAll.classList.add('none');
  userOnline.classList.remove('active');
  userOnline.classList.add('none');
  userOffline.classList.remove('none');
  userOffline.classList.add('active');
  
  for (var i = 0; i < list.length; i++) {
    
    if (list[i].classList.indexOf('offline')) {
      
      main.appendChild(div);
      
    }
    
  }
  
}

init();