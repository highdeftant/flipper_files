# Download URLs (royalty-free egg pics)
$eggUrls = @(
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/White_egg.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0f/Chicken_eggs_white_and_brown.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/Egg_in_a_nest.jpg"
)

# Get random folders in user's profile
$baseDirs = @("Desktop", "Documents", "Pictures", "Downloads", "Music")
$fullPaths = $baseDirs | ForEach-Object { Join-Path $env:USERPROFILE $_ }

# Collect subfolders
$targetDirs = @()
foreach ($path in $fullPaths) {
    if (Test-Path $path) {
        $dirs = Get-ChildItem $path -Recurse -Directory -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
        $targetDirs += $dirs
    }
}

# Pick a few random folders
$chosenDirs = $targetDirs | Get-Random -Count ([Math]::Min(5, $targetDirs.Count))

# Drop eggs
$i = 1
foreach ($dir in $chosenDirs) {
    $url = $eggUrls | Get-Random
    $fileName = "egg_$i.jpg"
    $filePath = Join-Path $dir $fileName
    Invoke-WebRequest -Uri $url -OutFile $filePath -ErrorAction SilentlyContinue
    $i++
}

