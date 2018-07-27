function subscribeToClicks() {
	var DRAG_START_EVENT = 'dragstart';
	var scene = document.getElementById('scene');
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	function run() {
		document.addEventListener('mousedown', onMouseDown);
		document.addEventListener('touchstart', onTouchStart, {
			passive: false
		});
	}
	function onTouchStart(event) {
		//event.preventDefault();
		var changedTouches = event.changedTouches;
		onMouseDown(changedTouches[0]);
	}
	function onMouseDown(event) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera( mouse, scene.camera );
		var intersects = raycaster.intersectObjects( scene.object3D.children, true );

		for ( var i = 0; i < intersects.length; i++ ) {
			if (intersects[i].object.el.getAttribute('clickable')) {
				var el = intersects[i].object.el;
                var clickInfo = { element: el, clientX: event.clientX, clientY: event.clientY };
				el.emit(DRAG_START_EVENT, clickInfo);
			}
		}
	}
	if (scene.hasLoaded) {
		run();
	} else {
		scene.addEventListener('loaded', run);
	}
}
