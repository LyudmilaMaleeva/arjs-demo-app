function registerTestDevices() {
	var devices = []
	var myDevices = []
	var FADE_DURATION = 500

	$(document).ready(function () {
		$.getJSON("data/devices.json", function (data) {
			devices = data
			devices.forEach(function(device) {
				createAsset(device)
			})
			updateDevices()
		})
	})

	function updateDevices() {
		var centerIndex = Math.floor(devices.length / 2)
		var count = devices.length
		for (var i = 0; i < centerIndex; i++) {
			var device = devices[i]
			createDeviceElement(device, 0 - (i + 1) * 0.3)
			createMyDeviceElement(device)
		}
		createDeviceElement(devices[centerIndex], 0)
		createMyDeviceElement(devices[centerIndex])
		for (var i = centerIndex + 1; i < count; i++) {
			var device = devices[i]
			createDeviceElement(device, 0 + (i - centerIndex) * 0.3)
			createMyDeviceElement(device)
		}
	}

	function createAsset(device) {
		var assetChild = $(`<img id="${device.id}" src="${device.image}">`)
		$('#assets').append(assetChild)
	}

	function createDeviceElement(device, position) {
		var containerId = `${device.id}parent`
		var entity = $(`
			<a-entity id="${containerId}" position="${position} 0 0" rotation="-90 0 0" visible="true" opacity="1" clickable="true" geometry="primitive: box; height: 0.5; width: 0.21; depth: 0.05" material="opacity: 0;">
				<a-image id="${device.id}img" scale="0.25 0.5 0.5" src="#${device.id}" opacity="1">
					<a-animation attribute="opacity" dur="${FADE_DURATION}" from="1" to="0.25" begin="fade" direction="alternate"></a-animation>
				</a-image>
			</a-entity>
		`)
		var entityText = $(`
			<a-entity position="${position} 0 -0.3" rotation="-90 0 0">
				<a-entity text="value: ${device.name}; align: center; wrapCount: 75; width: 2"></a-entity>
			</a-entity>
		`)
		entity.on('dragstart', function() {
			takeDevice(device.id)
		})
		$('#devicesMarker').append(entity)
		$('#devicesMarker').append(entityText)
	}

	function createMyDeviceElement(device) {
		var deviceDiv = $(`<div id="${device.id}my"><img src="${device.image}"></div>`)
		deviceDiv.on('click', function() {
			returnDevice(device.id)
		})
		$('#myDevices').append(deviceDiv)
	}

	function takeDevice(deviceId) {
		var index = myDevices.findIndex(function(device) {
			return device.id === deviceId
		})
		if(index === -1){
			var device = devices.find(function(device) {
				return device.id === deviceId
			})
			myDevices.push(device)
			updateAvailableDevices(deviceId)
		}
	}

	function returnDevice(deviceId) {
		myDevices = myDevices.filter(function (device) {
			return device.id !== deviceId
		})
		updateAvailableDevices(deviceId)
	}

	function updateAvailableDevices(deviceId) {
		var inStock = myDevices.findIndex(function(myDevice) {return myDevice.id === deviceId}) === -1
		var element = document.getElementById(`${deviceId}img`)
		var deviceDiv = $(`#${deviceId}my`);
		if (inStock) {
			element.emit('fade')
			deviceDiv.fadeOut(FADE_DURATION)
		} else {
			element.emit('fade')
			deviceDiv.fadeIn(FADE_DURATION)
		}
	}
}