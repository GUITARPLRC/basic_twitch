var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'comster404', 'RobotCaleb', 'brunofin', 'noobs2ninjas'],
		main = document.getElementById('main');

function getInfo(a) {
  
  var anchor = document.createElement('a'),
      div = document.createElement('div'),
      image = document.createElement('img'),
      name = document.createElement('h3'),
      game = document.createElement('h4'),
      description = document.createElement('p');
	
	anchor.setAttribute('target', '_blank')
  
  while(main.firstChild) {
    main.removeChild(main.firstChild);
  }
	
   
  var request = $.ajax({
    method: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/' + a,
		dataType: 'json',
    headers: {
       'Client-ID': '82g0c4vl8dda4q11grwws763oxlpdk0'
     }
	});
	request.done(function(data) {
     
			if (data.stream !== null) {

				anchor.setAttribute('href', data.stream.channel.url);
				image.src = data.stream.channel.logo;
				name.textContent = data.stream.channel.display_name;
				game.textContent = data.stream.game;
				description.textContent = data.stream.channel.status;

				div.appendChild(image);
				div.appendChild(name);
				div.appendChild(game);
				div.appendChild(description);
				div.classList.add('online');
				anchor.appendChild(div);

				main.insertBefore(anchor, main.firstChild);

			} else {

				name.textContent = a;
				description.textContent = 'OFFLINE';

				div.appendChild(name); 
				div.appendChild(description);
				div.classList.add('offline');

				main.appendChild(div);

			}
    
  	}); //end success/done
		request.fail(function() { //if fail locating profile = closed account
    
        name.textContent = a;
        description.textContent = 'ACCOUNT CLOSED';

        div.appendChild(name);
				div.appendChild(description);
        div.classList.add('offline');

        main.appendChild(div);
      
    });// end fail
} // end getInfo
	
function init() {

  for (var i = 0; i < channels.length; i++) {
    
    var channel = channels[i];
  	getInfo(channel);
  
  }
} // end init

init();