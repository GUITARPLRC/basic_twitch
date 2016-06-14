var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'comster404', 'RobotCaleb', 'brunofin', 'noobs2ninjas'],
    main = document.getElementById('main');


function getInfo(a) {
  
  var anchor = document.createElement('a'),
      div = document.createElement('div'),
      image = document.createElement('img'),
      name = document.createElement('h3'),
      game = document.createElement('h4'),
      description = document.createElement('h5');
  
  while(main.firstChild) {
    main.removeChild(main.firstChild);
  }
    
  $.getJSON('https://api.twitch.tv/kraken/streams/' + a, function (data){
    
    console.log(data);
    if (data.stream !== null) {
      
      anchor.setAttribute('href', data.stream.channel.url);
      image.src = data.stream.channel.logo;
      name.textContent = data.stream.channel.display_name + ' : ';
      game.textContent = data.stream.game;
      description.textContent = ' - ' + data.stream.channel.status;
      
      div.appendChild(image);
      div.appendChild(name);
      div.appendChild(game);
      div.appendChild(description);
      div.classList.add("online");
      anchor.appendChild(div);
      
      
      main.insertBefore(anchor, main.firstChild);
      
    } else {
      
      name = a;
      description = ' - OFFLINE';
      
      div.textContent = name + description;
      div.classList.add('offline');
      
      main.appendChild(div);
      
    }
    
  
  }).fail( function() { //if fails, response returns error locating profile = closed account
    
    name = a;
    description = ' - ACCOUNT CLOSED';
    
    div.textContent = name + description;
    div.classList.add('offline');
    
    main.appendChild(div);
    
  }) //end getJSON
} // end getInfo

function init() {

  for (var i = 0; i < channels.length; i++) {
    
      var channel = channels[i];

  getInfo(channel);
  
  }
} // end init

init();