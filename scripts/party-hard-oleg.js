function letsDanceOleg() {
	var rotationStep = 70
	var rotationTime = 20
	var bug = 0;
	var el = document.getElementById('personInfo-plotnikov');
	var sticker = document.getElementById('sticker-plotnikov');

	var colors = ['#f6c038', '#FF00CC', '#33FF33', '#FFFF00', '#66FFFF', '#99FFCC', '#FF0000', '#FF0033', '#3333FF', '#33FFFF', '#66FF66', '#FFFF33']

	var yy = 1
	setInterval(function () {
		if (bug % 5 === 0) {
			var color = colors[Math.random() * (colors.length - 1) | 0]
			for (var i = 0; i < sticker.children.length; i++) {
				var child = sticker.children[i]
				child.setAttribute('material', 'shader: flat; color: ' + color + ';')
			}
		}

		el.object3D.rotation.y += 4 * Math.PI / 180;
		if (bug > 10) {
			el.object3D.rotation.x = 0;
			el.object3D.rotation.z = 0;
			el.object3D.position.y = yy;
		}
		bug++;
		if (bug >= rotationTime) {
			el.object3D.rotation.y -= rotationStep * Math.random() * Math.PI / 180;
			bug = 0;
			if (Math.random() < 0.5) {
				el.object3D.rotation.x = rotationStep * Math.random() * Math.PI / 180
			}
			if (Math.random() < 0.5) {
				el.object3D.rotation.z = rotationStep * Math.random() * Math.PI / 180
			}
			el.object3D.position.y = yy + 0.5
		}
	}, 4);
}