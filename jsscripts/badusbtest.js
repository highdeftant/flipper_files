let badusb = require("badusb");
let notify = require("notification");

function detectOS() {

	let userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macos = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68k'],
		windows =['Win32', 'Win64', 'Windows', 'WinCE'],
		ios = ['iPhone', 'iPad', 'iPod'],
		os = null;

	if (macos.indexOf(platform) !== -1) {
		os = 'Mac OS';
		badusb.setup({
			vid: 0x05ac,
			pid: 0x820a,
			mfrName: "Apple",
			prodName: "Magic Keyboard",
			layoutPath: "/ext/badusb/assets/layouts/en-US.kl"});

	} else if (ios.indexOf(platform) !== -1) {
		os = 'iOS';
		badusb.setup({ 
			vid: 0x05ac, 
			pid: 0x820a,
			mfrName: "Apple",
			prodName: "Magic Keyboard",
			layoutPath: "/ext/badusb/assets/layouts/en-US.kl"});

	} else if (windows.indexOf(platform) !== -1) {
		os = 'Windows';
		badusb.setup({ 
			vid: 0x046d, 
			pid: 0xc529,
			mfrName: "Logitech",
			prodName: "Keyboard",
			layoutPath: "/ext/badusb/assets/layouts/en-US.kl"});

	} else if ("/Android/".test(userAgent)) {
		os = 'Android';
		badusb.setup({ 
			vid: 0x046d, 
			pid: 0xc529, 
			mfrName: "Logitech",
			prodName: "Keyboard",
			layoutPath: "/ext/badusb/assets/layouts/en-US.kl"});

	} else if (!os && "/Linux/".test(platform)) {
		os = 'Linux';
		badusb.setup({
			vid: 0x046d, 
			pid: 0xc529, 
			mfrName: "Logitech",
			prodName: "Keyboard",
			layoutPath: "/ext/badusb/assets/layouts/en-US.kl"});
	}

	return os;

}


if (badusb.isConnected()) {
	notify.blink("green", "short");
	print("USB is connected");
	let userOS = detectOS();
	print("Device type is: " + userOS);
	return
};
