
// void
function paintSingleBackgroundColor(level) {
    var bgGradient = cBackground.createLinearGradient(gameAreaWidth / 2, 0, gameAreaWidth / 2, gameAreaHeight);
    bgGradient.addColorStop(0,bgColorGroup[level]);
    bgGradient.addColorStop(colorProportion,bgColorGroup[level]);
    bgGradient.addColorStop(1,bgColorGroup[level-1]);
    cBackground.fillStyle = bgGradient;
    cBackground.fillRect(0, 0, gameAreaWidth, gameAreaHeight);
}

// void
function extendBackgroundColor(level) {
    var p = 0;
    var targetRGB;
    var bgGradient;
    bgGradientTimer = setInterval(function () {
        targetRGB = colorProportionGenerate(stringToRGB(bgColorGroup[level]), stringToRGB(bgColorGroup[level - 1]),
            1 - p / ((1-colorProportion)*gameAreaHeight));
        bgGradient = cBackground.createLinearGradient(gameAreaWidth / 2, colorProportion*gameAreaHeight, gameAreaWidth / 2, gameAreaHeight);
        bgGradient.addColorStop(0, bgColorGroup[level]);
        bgGradient.addColorStop(p/((1-colorProportion)*gameAreaHeight), bgColorGroup[level]);
        bgGradient.addColorStop(1, RGBToString(targetRGB));
        cBackground.fillStyle = bgGradient;
        cBackground.fillRect(0, colorProportion*gameAreaHeight, gameAreaWidth, gameAreaHeight);
        if (p >= (1-colorProportion)*gameAreaHeight){
            clearInterval(bgGradientTimer);
            console.log('level ' + level + ' extend finish');

            // call next
            overlapBackgroundColor(level + 1);
        }
        p += 4;
    }, 1000 / fps);
}

// void
function overlapBackgroundColor(level) {
    var p = 0;
    var targetRGB;
    var bgGradient;
    bgGradientTimer = setInterval(function () {
        targetRGB = colorProportionGenerate(stringToRGB(bgColorGroup[level - 1]), stringToRGB(bgColorGroup[level]), p/gameAreaHeight);
        bgGradient = cBackground.createLinearGradient(gameAreaWidth / 2, 0, gameAreaWidth / 2, p);
        bgGradient.addColorStop(0, RGBToString(targetRGB));
        bgGradient.addColorStop(colorProportion, RGBToString(targetRGB));
        bgGradient.addColorStop(1, bgColorGroup[level - 1]);
        cBackground.fillStyle = bgGradient;
        cBackground.fillRect(0, 0, gameAreaWidth, p);
        if (p > gameAreaHeight){
            clearInterval(bgGradientTimer);
            console.log('level ' + level + ' overlap finish');
        }
        p += 6;
    }, 1000 / fps);
}
