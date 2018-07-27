export function getLocation() {
	return new Promise((resolve, reject) => {
		const geolocation = navigator.geolocation;

	    if (!geolocation) {
	        reject(new Error('Not Supported'));
	    }

	    navigator.geolocation.getCurrentPosition((position) => {
	    	resolve({
	    		latitude : position.coords.latitude,
	    		longitude : position.coords.longitude
	    	});
	    }, () => {
	    	reject(new Error('Permission denied'));
	    });
	});

}