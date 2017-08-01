function eachUser(users) {
	$.each(users, function(index, user) {
		doAJAXuser(user);
		userOnline(user);
	});
};

function doAJAXuser(user) {
	$.ajax({
		dataType: 'json',
		url: '//wind-bow.gomix.me/twitch-api/users/' + user + '?callback=?',
		success: function(responseData) {
			usersOutput({
				id: responseData._id,
				display_name: responseData.display_name,
				logo: responseData.logo,
				link: responseData._links.self
			}); // usersOutput
		} // success
	}); // ajax
};

function userOnline(user) {
	$.ajax({
		dataType: 'json',
		url: '//wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?',
		success: function(responseData) {
			if(responseData.stream === null) {
				console.log(user + ": No Active Streams");
			} else {
				console.log(user + ": Steaming!");
			};
		} // success
	}); // ajax
};

function usersOutput(idNameLogoLink) {
	console.log(idNameLogoLink.logo);
	$('#tabs-1').html(idNameLogoLink.id + "\n" + idNameLogoLink.display_name);
};

$(document).ready(function() {
	$( "#tabs" ).tabs();
	eachUser(["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]);
});
