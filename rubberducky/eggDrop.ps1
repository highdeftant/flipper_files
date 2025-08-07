$eggUrls = @(
		"https://",
		"https://",
		"https://",
		)

$baseDirs = @("Desktop", "Documents", "Pictures", "Downloads", "Music")
$fullPaths = $baseDirs | ForEach-Object { Join-Path $env: USERPROFILE $_ }

$targetDirs = @()
	foreach ($path in $fullPaths) {
		if (Test-Path $path) {
			$dirs = Get-ChildItem $path -Recurse -Directory -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
			$targetDirs += $dirs
		}
	}

	$chosenDirs = $targetDirs | Get-Random -Count ([Math] ::Min(5, $targetDirs.Count))

$i = 1
foreach ($dir in $chosenDirs) {
	$url = $eggUrls | Get-Random
	$fileName = "egg_$i.jpg"
	$filePath = Join-Path $dir $fileName
	Invoke-WebRequest -Uri $url -OutFile $filePath -ErrorAction SilentlyContinue
	$i++
}
