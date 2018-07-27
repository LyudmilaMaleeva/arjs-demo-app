function renderPeopleListMarkup() {
	var columnStep = 0.9
	var rowStep = 0.4
	var peopleList = document.getElementById('people-list')
	var people = [
		[
			{
				name: 'Evgeniya Polyakova',
				whatIDo: 'Developer',
				img: 'polyakova'
			},
			{
				name: 'Oleg Plotnikov',
				whatIDo: 'Frontend',
				img: 'plotnikov'
			}
		],
		[
			{
				name: 'Eugene Olisevich',
				whatIDo: 'Frontend developer',
				img: 'olisevich'
			},
			{
				name: 'Anton Kuliapin',
				whatIDo: 'Developer',
				img: 'kuliapin'
			}
		],
		[
			{
				name: 'Alexander Kataev',
				whatIDo: 'Lead Web Developer',
				img: 'kataev'
			},
			{
				name: 'Aleksandr Orlov',
				whatIDo: '...',
				img: 'orlov'
			},
			{
				name: 'Yuris Rizvanov',
				whatIDo: '...',
				img: 'rizvanov'
			}
		],
		[
			{
				name: 'Andrey Churakov',
				whatIDo: '...',
				img: 'churakov'
			},
			{
				name: 'Mikhail Belyakov',
				whatIDo: '...',
				img: 'belyakov'
			},
			{
				name: 'Igor Moskalenko',
				whatIDo: 'Server Side Developer',
				img: 'moskalenko'
			}
		]
	]
	var firstColumnX = -(people.length - 1) * columnStep / 2

	var listHTML = ''

	for (var colIdx = 0; colIdx < people.length; colIdx++) {
		var column = people[colIdx]

		var columnHTML = '<a-entity position="' + (firstColumnX + (colIdx * columnStep)) +' 0 0">'

		for (var row = 0; row < column.length; row++) {
			var person = column[row]

			var personHTML = '<a-entity scale="0.2 0.2 0.2" position="0 -' + (rowStep * row) + ' 0">'

			personHTML +=
				'<a-image src="#' + person.img + '"></a-image>'
				+ '<a-entity position="0 -0.75 0">'
				+ '<a-entity text="value: ' + person.name + '; align: center; wrapCount: 15; width: 2"></a-entity>'
				+ '</a-entity>'
				+ '<a-entity position="0 -1.1 0">'
				+ '<a-entity text="value: ' + person.whatIDo + '; align: center; wrapCount: 25; width: 2"></a-entity>'
				+ '</a-entity>'

			personHTML += '</a-entity>'

			columnHTML += personHTML
		}

		columnHTML += '</a-entity>'
		listHTML += columnHTML
	}

	peopleList.innerHTML = listHTML
}
