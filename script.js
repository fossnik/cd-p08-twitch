function eachUser(users) {
	$.each(users, function(index, user) {
		doAJAXuser(user);
	});
};

function doAJAXuser(user) {
	$.ajax({
		dataType: 'json',
		url: '//wind-bow.gomix.me/twitch-api/users/' + user + '?callback=?',
		success: function(responseData) {
			console.log("Users: Query Successful");
		} // success
	}) // ajax outer
	.done(function(responseDataUsers) {
		var usersOutput = {
			id: responseDataUsers._id,
			display_name: responseDataUsers.display_name,
			logo: responseDataUsers.logo,
			link: responseDataUsers._links.self
		}; // usersOutput
		$.ajax({
			dataType: 'json',
			url: '//wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?',
			success: function(responseDataStreams) {
				console.log("Streams: Query Successful");
			} // success
		}) // ajax inner
		.done(function(responseDataStreams) {
			var streamsOutput = responseDataStreams.stream
			// console.log(streamsOutput);
			// console.log(usersOutput);
			doHTML(streamsOutput,usersOutput);
		}); // ajax inner .done
	}); // ajax outer .done
};

function doHTML(streams,users) {
	if(streams === null) {
		$('#userOffline').append("<img class='img-thumbnail img-circle img-responsive' src=" + users.logo + ">\n");
	} else {
		$('#userOnline').append("<img class='img-thumbnail img-circle img-responsive' src=" + users.logo + ">\n");
	};

	$('#allUser').append("<img class='img-thumbnail img-circle img-responsive' src=" + users.logo + ">\n");
};

$(document).ready(function() {
	$( "#tabs" ).tabs();
	eachUser(["ESL_SC2", "OgamingSC2", "cretetion"]);
	// eachUser(["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]);
});
