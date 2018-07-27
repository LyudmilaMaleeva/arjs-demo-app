function animatePersonInfo(surnames) {
	for (var i = 0; i < surnames.length; i++) {
		var el = document.getElementById('personInfo-' + surnames[i])
		animatePerson(el)
	}

	function animatePerson(element) {
		setInterval(function () {
			element.object3D.rotation.y += Math.PI / 180
		}, 20)
	}
}
