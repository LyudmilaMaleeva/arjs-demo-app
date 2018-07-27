function animateKitchenInfo(ids) {
	var elements = []
	for (var i = 0; i < ids.length; i++) {
		elements.push(document.getElementById(ids[i]))
	}

	function animate() {
		// TODO: what for private food?
		var c = 0
		var steps = 25
		var step = 0.003
		var reverse = false
		setInterval(function () {
			if (reverse) {
				c--
			} else {
				c++
			}
			for(var i = 0; i < elements.length; i++) {
				var el = elements[i]
				el.object3D.position.y = el.object3D.position.y + (reverse ? -step : step);
			}

			if (c > steps) {
				c = steps
				reverse = true
			} else if (c < 0) {
				c = 0
				reverse = false
			}
		}, 20)
	}

	animate()
}