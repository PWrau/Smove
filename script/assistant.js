
// other assistant functions

// void
function drawCircle(ctx, pos, r) {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
    ctx.lineWidth = 0;
    ctx.fill();
}

// float
function distance(pos1, pos2){
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}

// pos
function lineToEnemyBornPosition(line, mode, born){
    var blockSizeX = heroBoxWidth / N;
    var blockSizeY = heroBoxHeight / N;
    var pos_x, pos_y;

    if (mode === 'horizontal'){
        pos_y = blockSizeY / 2 + line * blockSizeY + heroCanvasOffset.y;
        pos_x = (born === 'left') ? 0 : gameAreaWidth;
    }
    else{
        pos_x = blockSizeX / 2 + line * blockSizeX + heroCanvasOffset.x;
        pos_y = (born === 'up') ? 0 : gameAreaHeight;
    }
    return {x: pos_x, y: pos_y};
}

// pos
function blockToRelativePos(block){
    if (heroBoxWidth === undefined || heroBoxHeight === undefined){
        return {x: undefined, y: undefined};
    }
    else{
        var blockSizeX = heroBoxWidth / N;
        var blockSizeY = heroBoxHeight / N;
        return {x: blockSizeX / 2 + block.x * blockSizeX + heroCanvasOffset.x,
            y: blockSizeY / 2 + block.y * blockSizeY + heroCanvasOffset.y};
    }
}

// RGB
function stringToRGB(colorStr){
    return {
        r: parseInt(colorStr.substring(1, 3), 16),
        g: parseInt(colorStr.substring(3, 5), 16),
        b: parseInt(colorStr.substring(5, 7), 16)
    }
}

// string
function RGBToString(color) {
    return '#' + color.r.toString(16) + color.g.toString(16) + color.b.toString(16);
}

// RGB
function colorProportionGenerate(beginColor, endColor, proportion) {
    var delta = {
        r: endColor.r - beginColor.r,
        g: endColor.g - beginColor.g,
        b: endColor.b - beginColor.b
    };
    return {
        r: parseInt(beginColor.r + delta.r * proportion),
        g: parseInt(beginColor.g + delta.g * proportion),
        b: parseInt(beginColor.b + delta.b * proportion)
    }

}

// object {pos, speed}
function keyDownToMovement(event, block, flashSpeed) {
    var key;
    if(window.event) {
        key = event.keyCode;
    }
    else if(event.which){
        key = event.which;
    }
    var speed = {x: 0, y: 0};
    var destination = {x: block.x, y: block.y};
    var still = true;
    switch(key){
        case keyLeft:
            event.preventDefault();
            if (block.x > 0){
                still = false;
                destination = {x: block.x - 1, y: block.y};
                speed = {x: (-1)*flashSpeed, y: 0};
            }
            break;
        case keyRight:
            event.preventDefault();
            if (block.x < N-1){
                still = false;
                destination = {x: block.x + 1, y: block.y};
                speed = {x: flashSpeed, y: 0};
            }
            break;
        case keyUp:
            event.preventDefault();
            if (block.y > 0){
                still = false;
                destination = {x: block.x, y: block.y - 1};
                speed = {x: 0, y: (-1)*flashSpeed};
            }
            break;
        case keyDown:
            event.preventDefault();
            if (block.y < N-1){
                still = false;
                destination = {x: block.x, y: block.y + 1};
                speed = {x: 0, y: flashSpeed};
            }
            break;
        default:
            still = true;
            break;
    }
    return {
        destination: destination,
        speed: speed,
        still: still
    };
}
