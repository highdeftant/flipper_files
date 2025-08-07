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
    delay(250); // Check every 0.5 seconds
}

print("USB connected!");
notify.blink("green", "short");
notify.success();

delay(500);
bad.press("GUI", "d);
delay(500);
badusb.press("GUI", "r");
delay(500);
badusb.println("cmd")
delay(700);
badusb.println("echo THIS IS A SCRIPT DEMONSTRATING THE DANGERS OF LEAVING YOUR PC OPEN");
badusb.println("YOU WERE HACKED BY AMA");


badusb.quit();
