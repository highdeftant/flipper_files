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

// Set wallpaper to solid color (black) as reset
badusb.println("$code = @'\nusing System.Runtime.InteropServices;\npublic class Wallpaper {\n[DllImport(\"user32.dll\", SetLastError = true)]\npublic static extern bool SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);\n}'@");
badusb.println("Add-Type $code");
badusb.println("[Wallpaper]::SystemParametersInfo(20, 0, '', 3)");

// Restore taskbar visibility
badusb.println("$path = 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StuckRects3'");
badusb.println("$settings = (Get-ItemProperty -Path $path).Settings");
badusb.println("$settings[8] = 0x03");
badusb.println("Set-ItemProperty -Path $path -Name Settings -Value $settings");
badusb.println("Stop-Process -f -ProcessName explorer");

// Restore desktop files
badusb.println("$desktop = [Environment]::GetFolderPath('Desktop')");
badusb.println("$prank = Join-Path $desktop 'Prank'");
badusb.println("if (Test-Path $prank) {");
badusb.println("    attrib -h $prank");
badusb.println("    Get-ChildItem $prank | ForEach-Object { Move-Item $_.FullName $desktop -Force }");
badusb.println("    Remove-Item $prank -Recurse -Force");
badusb.println("}");

// Remove downloaded image if it exists
badusb.println("$img = \"$env:TEMP\\bg.png\"");
badusb.println("if (Test-Path $img) { Remove-Item $img -Force }");

badusb.println("Write-Host 'Reversal complete.'");

badusb.quit();

