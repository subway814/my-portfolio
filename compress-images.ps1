$publicDir = "d:/subway/Documents/my-portfolio/public"
$logFile = "d:/subway/Documents/my-portfolio/rename-log.txt"
$maxSide = 1920
$jpegQuality = 80L

Add-Type -AssemblyName System.Drawing

$processedCount = 0
$originalTotalSize = 0L
$newTotalSize = 0L
$renameEntries = New-Object System.Collections.Generic.List[string]

$files = Get-ChildItem -Path $publicDir -Recurse -File | Where-Object {
    $ext = $_.Extension.ToLower()
    $ext -eq ".jpg" -or $ext -eq ".jpeg" -or $ext -eq ".png"
}

$jpgEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }

foreach ($file in $files) {
    $originalSize = $file.Length
    $originalTotalSize += $originalSize

    $oldPath = $file.FullName
    $oldRelPath = $oldPath.Substring($publicDir.Length).TrimStart('\', '/').Replace('\', '/')
    $newPath = [System.IO.Path]::ChangeExtension($oldPath, ".jpg")
    $newRelPath = $oldRelPath -replace '\.(jpg|jpeg|png)$', ".jpg"

    $extensionChanged = -not ($oldPath -ieq $newPath)

    try {
        $image = [System.Drawing.Image]::FromFile($oldPath)
        try {
            $width = $image.Width
            $height = $image.Height

            $newWidth = $width
            $newHeight = $height

            if ($width -gt $maxSide -or $height -gt $maxSide) {
                if ($width -ge $height) {
                    $newWidth = $maxSide
                    $newHeight = [int][math]::Round($height * ($maxSide / [double]$width))
                } else {
                    $newHeight = $maxSide
                    $newWidth = [int][math]::Round($width * ($maxSide / [double]$height))
                }
            }

            $bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            try {
                $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
                try {
                    $graphics.Clear([System.Drawing.Color]::White)
                    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                    $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
                } finally {
                    $graphics.Dispose()
                }

                $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
                try {
                    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                        [System.Drawing.Imaging.Encoder]::Quality,
                        $jpegQuality
                    )
                    $bitmap.Save($newPath, $jpgEncoder, $encoderParams)
                } finally {
                    $encoderParams.Dispose()
                }
            } finally {
                $bitmap.Dispose()
            }
        } finally {
            $image.Dispose()
        }

        if ($extensionChanged) {
            Remove-Item $oldPath -Force
        }

        $newFileInfo = Get-Item $newPath
        $newTotalSize += $newFileInfo.Length
        $processedCount++

        if ($extensionChanged) {
            $renameEntries.Add("$oldRelPath|$newRelPath")
        }

        $saved = [math]::Round(($originalSize - $newFileInfo.Length) / 1KB, 2)
        Write-Host ("[{0}] {1} ({2}x{3} -> {4}x{5}, {6} KB)" -f $processedCount, $oldRelPath, $width, $height, $newWidth, $newHeight, $saved)
    } catch {
        Write-Host ("[ERROR] {0}: {1}" -f $oldRelPath, $_.Exception.Message)
    }
}

if ($renameEntries.Count -gt 0) {
    [System.IO.File]::WriteAllLines($logFile, $renameEntries)
}

$savedSize = $originalTotalSize - $newTotalSize
if ($originalTotalSize -gt 0) {
    $savedPercent = [math]::Round(($savedSize / $originalTotalSize) * 100, 2)
} else {
    $savedPercent = 0
}

Write-Host ""
Write-Host "=== 处理完成 ==="
Write-Host ("处理文件数: {0}" -f $processedCount)
Write-Host ("原始总大小: {0:N2} MB" -f ($originalTotalSize / 1MB))
Write-Host ("新总大小:   {0:N2} MB" -f ($newTotalSize / 1MB))
Write-Host ("节省大小:   {0:N2} MB ({1}%)" -f ($savedSize / 1MB), $savedPercent)
Write-Host ("重命名记录: {0} 条 -> {1}" -f $renameEntries.Count, $logFile)
