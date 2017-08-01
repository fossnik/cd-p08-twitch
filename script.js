function eachUser(users) {
	$.each(users, function(index, user) {
		doAJAX(user);
	});
};

function doAJAX(user) {
	$.ajax({
		dataType: 'json',
		url: '//wind-bow.gomix.me/twitch-api/users/' + user + '?callback=?',
	}) // ajax outer
	.done(function(kypeUser) {
		$.ajax({
			dataType: 'json',
			url: '//wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?',
		}) // ajax inner
		.done(function(kypeStream) {
			var nls = {
				name: kypeUser.display_name,
				logo: kypeUser.logo,
				stream: kypeStream.stream,
			};
			doHTML(nls);
		}); // ajax inner .done
	}); // ajax outer .done
}; // doAJAX function

function doHTML(kData) {
	var htmlFace = "<div class='flexbox-item'>";
				htmlFace += "<a href="+"'"+"//www.twitch.tv/"+kData.name+"'>";
					htmlFace += "<img class='img-thumbnail img-circle' src=" + "'"+kData.logo+"'" + "</img>";
					htmlFace += "<button type='button' class='btn btn-primary'>"+kData.name;
					htmlFace += "</button>";
				htmlFace += "</a>"
			htmlFace += "</div>";

	if(kData.stream === null) {
		var stateNode = '#userOffline';
		htmlFace = htmlFace.replace(" btn-primary","");
	} else {
		var stateNode = '#userOnline';
		console.log(kData.name, "Streams:\n", kData.stream);
		// TODO: Represent Stream Data
	};

	$(stateNode).append(htmlFace);
	$('#allUser').append(htmlFace);
}; // doHTML function

$(document).ready(function() {
	$( "#tabs" ).tabs();
	eachUser(["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb"]);
});
