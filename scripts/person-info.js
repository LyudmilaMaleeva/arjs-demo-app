function injectPersonsInfo() {
	var people = [
		{
			name: 'Anton Necheukhin',
			whatIDo: 'Manual QA Lead',
			img: 'necheukhin',
			barCode: 46
		},
		{
			name: 'Anton Kuliapin',
			whatIDo: 'Developer',
			img: 'kuliapin',
			barCode: 59
		},
		{
			name: 'Eugene Olisevich',
			whatIDo: 'Frontend developer',
			img: 'olisevich',
			barCode: 58
		},
		{
			name: 'Alexander Kalikov',
			whatIDo: 'Server Developer',
			img: 'kalikov',
			barCode: 57
		},
		{
			name: 'Lyudmila Maleeva',
			whatIDo: 'QA Engineer',
			img: 'maleeva',
			barCode: 10
		},
		{
			name: 'Catherine Lazchenko',
			whatIDo: 'Customer Support Advocate',
			img: 'lazchenko',
			barCode: 11
		},
		{
			name: 'Dmitry Danilov',
			whatIDo: 'Javascript Developer',
			img: 'danilov',
			barCode: 12
		},
		{
			name: 'Ilia Sretenskii',
			whatIDo: 'business backend',
			img: 'sretenskii',
			barCode: 13
		}
	]

	var scene = $('#scene')
	people.forEach(function (person) {
		var personHTML =
		'<a-marker type="barcode" value="' + person.barCode + '">\n'
		+ '        <a-entity rotation="-90 0 0">\n'
		+ '            <a-entity position="0 0.1 0" geometry="primitive: plane; width: 1; height: 0.8" material="shader: flat; color: #f6c038;"></a-entity>\n'
		+ '            <a-entity position="-0.1 0 0" geometry="primitive: plane; width: 0.8; height: 1" material="shader: flat; color: #f6c038;"></a-entity>\n'
		+ '            <a-entity position="0.3 -0.3 0" rotation="0 0 45" geometry="primitive: plane; width: 0.28284; height: 0.28284" material="shader: flat; color: #f6c038;"></a-entity>\n'
		+ '        </a-entity>\n'
		+ '        <a-entity id="personInfo-' + person.img + '" position="0 1.2 0">\n'
		+ '            <a-image src="#' + person.img + '"></a-image>\n'
		+ '            <a-entity position="0 -0.75 0">\n'
		+ '                <a-entity text="value: ' + person.name + '; align: center; wrapCount: 15; width: 2"></a-entity>\n'
		+ '                <a-entity rotation="0 180 0" text="value: ' + person.name +  '; align: center; wrapCount: 15; width: 2"></a-entity>\n'
		+ '            </a-entity>\n'
		+ '            <a-entity position="0 -1 0">\n'
		+ '                <a-entity text="value: ' + person.whatIDo + '; align: center; width: 2"></a-entity>\n'
		+ '                <a-entity rotation="0 180 0" text="value: ' + person.whatIDo + '; align: center; width: 2"></a-entity>\n'
		+ '            </a-entity>\n'
		+ '        </a-entity>\n'
		+ '    </a-marker>'
		scene.append($(personHTML))
	})

	setTimeout(function() {
		people.forEach(function (person) {
			animatePersonInfo(person.img)
		})
	}, 100)

}

function animatePersonInfo(person) {
	var el = document.getElementById('personInfo-' + person)
	animatePerson(el)

	function animatePerson(element) {
		setInterval(function () {
			element.object3D.rotation.y += Math.PI / 180
		}, 20)
	}
}
