var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx',
                'comster404', 'RobotCaleb', 'brunofin', 'noobs2ninjas'],
                content = document.getElementById('content');




function getInfo(a) {
  
  var anchor = document.createElement('a'),
      div = document.createElement('div'),
      image = document.createElement('img'),
      name = document.createElement('h3'),
      game = document.createElement('h4'),
      description = document.createElement('h5');
  
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }			//if there is content, remove all before adding / clear the board
    
  $.getJSON('https://api.twitch.tv/kraken/streams/' + a).done( function (data){
    
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
      
      
      content.insertBefore(anchor, content.firstChild);
      
    } else {
      
      name = a;
      description = ' - OFFLINE';
      
      div.textContent = name + description;
      div.classList.add('offline');
      
      content.appendChild(div);
      
    }
    
  
  }).fail( function() {				//if fails, response returns error locating profile = closed account
    
    name = a;
    description = ' - ACCOUNT CLOSED';
    
    div.textContent = name + description;
    div.classList.add('offline');
    
    content.appendChild(div);
    
  }); //end getJSON
} // end getInfo

function init() {
	 var channel;

  for (var i = 0; i < channels.length; i++) {
    
      channel = channels[i];

  getInfo(channel);
  
  }
} // end init

document.load = init();