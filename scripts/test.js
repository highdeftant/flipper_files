let badusb = require("badusb");
let notify = require("notification");

badusb.setup({
    vid: 0xAAAA,
    pid: 0xBBBB,
    mfrName: "Flipper",
    prodName: "Zero",
    layoutPath: "/ext/badusb/assets/layouts/en-US.kl"
});

print("Waiting for USB connection...");

while (!badusb.isConnected()) {
    delay(500); // Check every 0.5 seconds
}

print("USB connected!");
notify.blink("green", "short");

badusb.quit();

