function registerTestDevices() {
	var API = `https://192.168.188.50:3000/api/`
	//var API = `https://f0c390d8.ngrok.io/api/`
	var devices = []
	var myDevices = []
	var usedDevices = []
	var FADE_DURATION = 500

	$(document).ready(function () {
		$.ajax(
			{
				crossDomain: true,
				dataType: 'json',
				type: 'GET',
				url: `${API}devices`,
				success: function (data) {
					devices = data.devices
					usedDevices = data.usedDevices
					devices.forEach(function (device) {
						createAsset(device)
					})
					updateDevices()
				},
				error: function () {
					$.getJSON("data/devices.json", function (data) {
						devices = data
						devices.forEach(function(device) {
							createAsset(device)
						})
						updateDevices()
					})
				}
			})
		setInterval(function () {
			$.ajax({
				crossDomain: true,
				dataType: 'json',
				type: 'GET',
				url: `${API}devices`,
				success: function (data) {
					var newUsedDevices = data.usedDevices
					newUsedDevices.forEach(function (newUsedDevice) {
						var index = usedDevices.findIndex(function (usedDevice) {
							return usedDevice.id === newUsedDevice.id
						})
						if (index === -1) {
							usedDevices.push(newUsedDevice)
							updateAvailableDevices(newUsedDevice.id, false)
						}
					})
					var deleteDevices = []
					usedDevices.forEach(function (usedDevice) {
						var index = newUsedDevices.findIndex(function (newUsedDevice) {
							return usedDevice.id === newUsedDevice.id
						})
						if (index === -1) {
							deleteDevices.push(usedDevice.id)
							updateAvailableDevices(usedDevice.id, false)
						}
					})
					usedDevices = usedDevices.filter(function (usedDevice) {
						return deleteDevices.indexOf(usedDevice.id) === -1
					})
				},
				error: function () {
					
				}
			})
		}, 1000)
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
		var fromOpacity = '1'
		var toOpacity = '0.25'
		var isUsed = usedDevices.findIndex(function (usedDevice) {
			return usedDevice.id === device.id
		}) > -1
		if (isUsed) {
			fromOpacity = '0.25'
			toOpacity = '1'
		}
		var entity = $(`
			<a-entity id="${containerId}" position="${position} 0 0" rotation="-90 0 0" visible="true" opacity="1" clickable="true" geometry="primitive: box; height: 0.5; width: 0.21; depth: 0.05" material="opacity: 0;">
				<a-image id="${device.id}img" scale="0.25 0.5 0.5" src="#${device.id}" opacity="${fromOpacity}">
					<a-animation attribute="opacity" dur="${FADE_DURATION}" from="${fromOpacity}" to="${toOpacity}" begin="fade" direction="alternate"></a-animation>
				</a-image>
			</a-entity>
		`)
		var entityText = $(`
			<a-entity position="${position} 0 -0.3" rotation="-90 0 0">
				<a-entity text="value: ${device.name}; align: center; wrapCount: 75; width: 2"></a-entity>
			</a-entity>
		`)
		entity.on('dragstart', function () {
			takeDevice(device.id)
		})
		$('#devicesMarker').append(entity)
		$('#devicesMarker').append(entityText)
	}

	function createMyDeviceElement(device) {
		var deviceDiv = $(`<div id="${device.id}my"><img src="${device.image}"></div>`)
		deviceDiv.on('click', function () {
			returnDevice(device.id)
		})
		$('#myDevices').append(deviceDiv)
	}

	function takeDevice(deviceId) {
		var index = myDevices.findIndex(function (device) {
			return device.id === deviceId
		})
		var usedIndex = usedDevices.findIndex(function (device) {
			return device.id === deviceId
		})
		if (index === -1 && usedIndex === -1) {
			var device = devices.find(function (device) {
				return device.id === deviceId
			})
			$.post(`${API}device/take`, {deviceId: deviceId}, function (data) {
				myDevices.push(device)
				usedDevices = data.usedDevices
				updateAvailableDevices(deviceId, true)
			}).fail(function(response) {
				myDevices.push(device)
				usedDevices.push(device)
				updateAvailableDevices(deviceId, true)
			});
		}
	}

	function returnDevice(deviceId) {
		$.post(`${API}device/return`, {deviceId: deviceId}, function (data) {
			myDevices = myDevices.filter(function (device) {
				return device.id !== deviceId
			})
			usedDevices = data.usedDevices
			updateAvailableDevices(deviceId, true)
		}).fail(function(response) {
			myDevices = myDevices.filter(function (device) {
				return device.id !== deviceId
			})
			usedDevices = usedDevices.filter(function (device) {
				return device.id !== deviceId
			})
			updateAvailableDevices(deviceId, true)
		});
	}

	function updateAvailableDevices(deviceId, isMyActivity) {
		var inStock = myDevices.findIndex(function (myDevice) {return myDevice.id === deviceId}) === -1 &&
			usedDevices.findIndex(function (myDevice) {return myDevice.id === deviceId}) === -1

		var element = document.getElementById(`${deviceId}img`)
		var deviceDiv = $(`#${deviceId}my`);
		if (inStock) {
			element.emit('fade')
			if (isMyActivity) {
				deviceDiv.fadeOut(FADE_DURATION)
			}
		} else {
			element.emit('fade')
			if (isMyActivity) {
				deviceDiv.fadeIn(FADE_DURATION)
			}
		}
	}
}