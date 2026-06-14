Add-Type -AssemblyName System.Drawing
$pwd = Get-Location
$thumbDir = Join-Path $pwd 'docs\thumbs'
if (!(Test-Path $thumbDir)) { New-Item -ItemType Directory -Path $thumbDir | Out-Null }
$docsDir = Join-Path $pwd 'docs'
$files = Get-ChildItem -Path $docsDir -Filter '*.pptx' -File
if ($files.Count -eq 0) { Write-Output 'No PPTX files found.'; exit }
foreach ($f in $files) {
    $base = [IO.Path]::GetFileNameWithoutExtension($f.Name)
    $safeName = ($base -replace '[\\/:*?"<>|]','_')
    $out = Join-Path $thumbDir ($safeName + '.jpg')

    $width = 1280; $height = 720
    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::FromArgb(10,10,10))
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Title font
    try {
        $font = New-Object System.Drawing.Font('Segoe UI',48,[System.Drawing.FontStyle]::Bold)
    } catch {
        $font = New-Object System.Drawing.Font('Arial',48,[System.Drawing.FontStyle]::Bold)
    }
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230,230,230))

    $rect = New-Object System.Drawing.RectangleF(60,180, $width - 120, 360)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

    $g.DrawString($base, $font, $brush, $rect, $sf)

    # small footer
    $font2 = New-Object System.Drawing.Font('Segoe UI',16)
    $brush2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(150,150,150))
    $g.DrawString('PPTX Preview • 学术作业', $font2, $brush2, 60, $height - 60)

    $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose(); $bmp.Dispose()
    Write-Output "Generated thumbnail: $out"
}
Write-Output 'Text thumbnail generation complete.'
