$( function() {
	$( "#tabs" ).tabs();
} );

$(document).ready(function() {
	// var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp"];
	var usersArray = [];
	$.each(users, function(index, user) {
		$.ajax( {
			// async: false,
			type: 'GET',
			// json requires {url + '?callback=?'}, but jsonp works standing alone.
			dataType: 'json',
			url: '//wind-bow.gomix.me/twitch-api/users/' + user + '?callback=?',
			// dataType: 'jsonp',
			// url: '//wind-bow.gomix.me/twitch-api/users/' + user,
			success: function(responseData) {
				outsideFunction({
					id: responseData._id,
					display_name: responseData.display_name,
					logo: responseData.logo,
					link: responseData._links.self
				}); // usersArray.push
			} // success
		}); // ajax
	}); // each
	// console.log("usersArray variable:\n", usersArray);
	// console.log("usersArray.length: ", usersArray.length);
	function outsideFunction(res) {
		console.log(res)
		usersArray.push(res);
	}
	// 	console.log()
	// usersArray.forEach(function(element) {
	// 	console.log(element);
	// });
	// $.each(usersArray, function(index, element) {
	// 	console.log(usersArray[index]);
	// });

	// PSUEDOCODE:
	// foreach (user)
	// allusers =
	// IF user is ONLINE:
	// htmlOnline += user
	// else
	// htmlOffline += user


	// // append the tabs-1 (aka ONLINE)
	// $.each(usersArray, function(index, userObj) {
	// 	htmltabs =
	// })
	// // append the tabs-2 (aka OFFLINE)
	// $.each(usersArray, function(index, userObj) {
	// 	htmltabs =
	// })
	// // append the tabs-3 (aka ALL)
	// $.each(usersArray, function(index, userObj) {
	// 	htmltabs =
	// })
});
