function eachUser(users) {
	$.each(users, function(index, user) {
		doAJAX(user);
	});
};

function doAJAX(user) {
	$.ajax({
		dataType: 'json',
		url: '//wind-bow.gomix.me/twitch-api/users/' + user + '?callback=?',
		success: function() {	console.log("Users: Query Successful");	}
	}) // ajax outer
	.done(function(kypeUser) {
		$.ajax({
			dataType: 'json',
			url: '//wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?',
			success: function() { console.log("Streams: Query Successful"); }
		}) // ajax inner
		.done(function(kypeStream) {
			var userData = {
				id: kypeUser._id,
				display_name: kypeUser.display_name,
				logo: kypeUser.logo,
				link: kypeUser._links.self
			}; // usersOutput
			var streamData = kypeStream.stream;
			doHTML(userData, streamData);
		}); // ajax inner .done
	}); // ajax outer .done
};

function doHTML(users, streams) {
	if(streams === null) {
		$('#userOffline').append("<img class='img-thumbnail img-circle img-responsive' src=" + users.logo + ">\n");
	} else {
		$('#userOnline').append("<img class='img-thumbnail img-circle img-responsive' src=" + users.logo + ">\n");
	};
	$('#allUser').append("<img class='img-thumbnail img-circle img-responsive' src=" + users.logo + ">\n");
};

$(document).ready(function() {
	$( "#tabs" ).tabs();
	eachUser(["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb"]);
});
