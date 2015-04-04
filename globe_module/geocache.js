
				//The callback function executed when the location is fetched successfully.
				function onGeoSuccess(location) {
						console.log(location);
						homecode = location.address.countryCode;
						home = location.address.country;
						console.log(homecode);
						console.log(home)
				}
				//The callback function executed when the location could not be fetched.
				function onGeoError(error) {
						console.log(error);
				}

				window.onload = function () {
						geolocator.locate(onGeoSuccess);
				}
