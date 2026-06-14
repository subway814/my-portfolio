$ErrorActionPreference = 'Continue'
$pwd = Get-Location
$thumbDir = Join-Path $pwd 'docs\thumbs'
if (!(Test-Path $thumbDir)) { New-Item -ItemType Directory -Path $thumbDir | Out-Null }

$pp = New-Object -ComObject PowerPoint.Application
$pp.Visible = $false

$docsDir = Join-Path $pwd 'docs'
$files = Get-ChildItem -Path $docsDir -Filter '*.pptx' -File
if ($files.Count -eq 0) {
    Write-Output 'No PPTX files found.'
    exit
}

foreach ($f in $files) {
    $file = $f.FullName
    try {
        Write-Output "Opening: $file"
        $pres = $pp.Presentations.Open($file, $true, $true, $false)
        Start-Sleep -Milliseconds 200
        $slide = $pres.Slides.Item(1)
        $base = [IO.Path]::GetFileNameWithoutExtension($file)
        $safeName = ($base -replace '[\\/:*?"<>|]','_')
        $out = Join-Path $thumbDir ($safeName + '.jpg')
        $slide.Export($out, 'JPG', 1280, 720)
        $pres.Close()
        Write-Output "Exported: $out"
    } catch {
        Write-Output "Error exporting $file : $_"
    }
}

$pp.Quit()
Write-Output 'Done.'
