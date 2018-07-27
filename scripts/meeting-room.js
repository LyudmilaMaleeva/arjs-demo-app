function activateMeetingRoom(buttonId) {
	var calendrBack = document.querySelector('.calendar-back');
	var cancelEventBtn = document.querySelector('.cancelEvent');
	var addEventBtn = document.querySelector('.addEvent');
	var eventNameInput = document.querySelector('.eventNameInput');

	var el = document.getElementById(buttonId);

	el.addEventListener('dragstart', function (evt) {
		eventNameInput.value = '';
		calendrBack.classList.toggle('hidden');
		eventNameInput.focus();
	});
	cancelEventBtn.addEventListener('click', function () {
		calendrBack.classList.toggle('hidden');
	});
	addEventBtn.addEventListener('click', function() {
		var a = el.getAttribute('text');
		el.setAttribute('text', 'value: ' + eventNameInput.value);
		el.removeAttribute('material');
		el.removeAttribute('geometry');
		el.flushToDOM(true);
		calendrBack.classList.toggle('hidden');
	});
}
