function activateMeetingRoom(buttonId, upBtnId) {
    var el;
    var calendrBack = document.querySelector('.calendar-back');
    var cancelEventBtn = document.querySelector('.cancelEvent');
    var addEventBtn = document.querySelector('.addEvent');
    var eventNameInput = document.querySelector('.eventNameInput');

    var dragStartListener = function (evt) {
        if (calendrBack.classList.contains('hidden')) {
            el = evt.target;
            eventNameInput.value = '';
            calendrBack.classList.toggle('hidden');
            eventNameInput.focus();
        }
    };

    cancelEventBtn.addEventListener('click', function () {
        calendrBack.classList.toggle('hidden');
    });
    addEventBtn.addEventListener('click', function (event) {
        el.setAttribute('text', 'value: ' + eventNameInput.value);
        el.setAttribute('text', 'color: ' + '#fff');
        el.removeAttribute('material');
        el.removeAttribute('geometry');
        el.flushToDOM(true);
        calendrBack.classList.toggle('hidden');
    });

    window.step1 = function(visible) {
      if (visible) {
        document.addEventListener('dragstart', dragStartListener);
      } else {
        document.removeEventListener('dragstart', dragStartListener);
      }
    }
}
