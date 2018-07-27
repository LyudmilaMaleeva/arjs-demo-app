//import deepEqual from 'deep-equal';

var COMPONENT_NAME = 'click-drag';
var DRAG_START_EVENT = 'dragstart';
var DRAG_MOVE_EVENT = 'dragmove';
var DRAG_END_EVENT = 'dragend';

var componentName = COMPONENT_NAME;

var scene = document.getElementById('scene');

var camera;
var marker;

function forEachParent(element, lambda) {
	while (element.attachedToParent) {
		element = element.parentElement;
		lambda(element);
	}
}

function run() {
	camera = scene.camera.el;

	marker = document.getElementById('marker');
	console.log(camera.components.camera.camera);
	console.log(marker.components);

	document.addEventListener('mousedown', onMouseDown);
	document.addEventListener('touchstart', onTouchStart);

	setInterval( function () {
		var hot = document.getElementById('hot');

		var object = document.getElementById('button');
		var a = new THREE.Vector3(), b = new THREE.Vector3();
		a.setFromMatrixPosition(object.object3D.matrixWorld);
		b.setFromMatrixPosition(object.object3D.matrixWorld);
		a.x -= 0.125;
		a.y += 0.05;
		b.x += 0.125;
		b.y -= 0.05;

		a.project(camera.components.camera.camera);
		b.project(camera.components.camera.camera);
		a.y -= 0.2;
		b.y -= 0.2;
		var width = window.innerWidth, height = window.innerHeight;
		a.x = ( a.x * width / 2 ) + width / 2;
		a.y = -( a.y * height / 2 ) + height / 2;
		b.x = ( b.x * width / 2 ) + width / 2;
		b.y = -( b.y * height / 2 ) + height / 2;

		hot.style.cssText = `background-color: #F00; position: absolute; width: ${b.x - a.x}px; height: ${b.y - a.y}px; top: ${a.y}px; left: ${a.x}px;`;
	}, 100);
}

function onTouchStart({changedTouches: [touchInfo]}) {
	onMouseDown(touchInfo);
}

function onMouseDown({clientX, clientY}) {
	var object = document.getElementById('button');
	var a = new THREE.Vector3(), b = new THREE.Vector3();
	a.setFromMatrixPosition(object.object3D.matrixWorld);
	b.setFromMatrixPosition(object.object3D.matrixWorld);
	a.x -= 0.125;
	a.y += 0.05;
	b.x += 0.125;
	b.y -= 0.05;

	a.project(camera.components.camera.camera);
	b.project(camera.components.camera.camera);
	a.y -= 0.2;
	b.y -= 0.2;
	var width = window.innerWidth, height = window.innerHeight;
	a.x = ( a.x * width / 2 ) + width / 2;
	a.y = -( a.y * height / 2 ) + height / 2;
	b.x = ( b.x * width / 2 ) + width / 2;
	b.y = -( b.y * height / 2 ) + height / 2;

	if (clientX >= a.x && clientX <= b.x && clientY >=  a.y  && clientY <=  b.y) {

		var clickInfo = {
			element: object,
			clientX: clientX,
			clientY: clientY
		};

		object.emit(DRAG_START_EVENT, clickInfo);
	}
}

if (scene.hasLoaded) {
	run();
} else {
	scene.addEventListener('loaded', run);
}
