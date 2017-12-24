var dir_driver = require('../driver/dir_driver.js');

module.exports = {

	setup_usb: function(status) {

		dir_driver.get_usb(function(return_data_usb) {
			if(return_data_usb == "0") {
				// handle error
				status("0");
			} else {
				console.log("USB: " + return_data_usb);

				dir_driver.create_mount_folder(function(return_data_folder) {
					if(return_data_folder == "e") {
						// handle error
						status("0");
					} else {
						console.log("Created folder");
						dir_driver.mount_usb(return_data_usb, function(return_data) {
							dir_driver.check_mount(function(return_data) {
								if((return_data.toString()).replace(/(\r\n|\n|\r)/gm,"") == "1") {
									console.log("All good - USB");
									status("1");
								} else {
									console.log("Not mounted");
									status("0");	
								}
							});
						});
					}
				});
			}
		});
	},

	get_usb_dev_path : function(path) {
		dir_driver.get_usb(function(return_path) {
			if(return_path == "0") {
				path("Error");
			} else {
				path(return_path);
			}
		});
	}

}
