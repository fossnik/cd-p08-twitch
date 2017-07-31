$( function() {
	$( "#tabs" ).tabs();
} );

$(document).ready(function() {
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	var usersArray = [];
	$.each(users, function (index, user) {
		$.ajax( {
			type: 'GET',
			dataType: 'json',
			// json requires {url + '?callback=?'}, but jsonp works standing alone.
			url: '//wind-bow.gomix.me/twitch-api/users/' + user + '?callback=?',
			success: function(responseData) {
				usersArray.push(responseData);
			}
		});
	})
	console.log(usersArray);
});
