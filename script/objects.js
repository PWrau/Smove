/**
 * Created by lenovo on 2017/7/22.
 */


function Hero(dom){
    // store
    var _this = this;

    // property
    this.Dom = dom;
    this.context = this.Dom.getContext('2d');
    this.block = {
        x: parseInt(N / 2),
        y: parseInt(N / 2)
    };
    this.localTimer = null;
    this.active = false;
    this.pos = blockToRelativePos(this.block);
    this.paint = function(){
        drawCircle(_this.context, _this.pos, heroRadius);
    };
    this.erase = function () {
        _this.context.clearRect(_this.pos.x - heroRadius - 1, _this.pos.y - heroRadius - 1,
            2 * heroRadius + 2, 2 * heroRadius + 2);
    };
    this.moveFlash = function (movement) {
        _this.erase();
        _this.pos.x += movement.speed.x;
        _this.pos.y += movement.speed.y;
        if (distance(_this.pos, blockToRelativePos(movement.destination)) < heroFlashSpeed){
            _this.block = movement.destination;
            _this.pos = blockToRelativePos(_this.block);
            clearInterval(_this.localTimer);
            _this.active = true;
            if (_this.targetDetect()){
                targetCatchResponse();
            }
        }
        _this.paint();
    };
    this.move = function (event) {
        if (!_this.active){
            return;
        }
        var movement = keyDownToMovement(event, _this.block, heroFlashSpeed);

        if (!movement.still){
            _this.active = false;
            _this.localTimer = setInterval(function(){_this.moveFlash(movement);}, 1000 / fps);
        }
    };
    this.targetDetect = function () {
        if (typeof target === 'undefined'){
            return false;
        }
        if (target.active === false){
            return false;
        }
        else{
            return (_this.block.x === target.block.x && _this.block.y === target.block.y);
        }
    };


    // init
    this.context.fillStyle = heroColor;

    this.paint();
    this.active = true;
    ///.
    return this;
}


function Enemy(dom, pos_x, pos_y, speed_x, speed_y){
    // store
    var _this = this;

    // property
    this.Dom = dom;
    this.context = this.Dom.getContext('2d');
    this.pos = {
        x: pos_x,
        y: pos_y
    };
    this.speed = {
        x: speed_x,
        y: speed_y
    };
    this.active = true;
    this.paint = function () {
        drawCircle(_this.context, _this.pos, enemyRadius);
    };
    this.collisionDetect = function () {
        // only with the global variable hero
        if (hero === undefined){
            return false;
        }
        return (distance(_this.pos, hero.pos) < heroRadius + enemyRadius);
    };
    this.outOfGameArea = function () {
        return (_this.pos.x - enemyRadius > gameAreaWidth ||
        _this.pos.x + enemyRadius < 0 ||
        _this.pos.y - enemyRadius > gameAreaHeight ||
        _this.pos.y + enemyRadius < 0);
    };
    this.destroy = function () {
        _this.erase();
    };
    this.move = function () {
        _this.pos.x += _this.speed.x;
        _this.pos.y += _this.speed.y;
        _this.paint();
    };
    this.erase = function () {
        _this.context.clearRect(_this.pos.x - enemyRadius -1 , _this.pos.y - enemyRadius - 1,
            2 * enemyRadius + 2, 2 * enemyRadius + 2);
    };
    this.update =  function () {
        _this.move();
        if (_this.collisionDetect()){
            gameStatus = 'over';
            gameEndResponse();
        }
        if (_this.outOfGameArea()){
            _this.active = false;
            _this.destroy();
        }
    };

    // init
    this.context.fillStyle = enemyColor;
    this.paint();
    return this;
}


function Target(dom, block, isSpecial) {
    // store
    var _this = this;

    // property
    this.Dom = dom;
    this.context = this.Dom.getContext('2d');
    this.block = block;
    this.isSpecial = isSpecial;
    this.active = false;
    this.angle = 2*Math.PI / (targetRotateCycle*fps);
    this.localTimer = null;
    this.rotateRepaint = function () {
        _this.localTimer = setInterval(_this.rotateSingle, 1000 / fps);
    };
    this.erase = function () {
        _this.context.clearRect(-(targetWidth/2)-1, -(targetHeight/2)-1, targetWidth+2, targetHeight+2);
    };
    this.rotateSingle = function () {
        // assume that this has been translated to its block's center
        _this.erase();
        _this.context.rotate(_this.angle);
        _this.paint();
    };
    this.pos = blockToRelativePos(_this.block);
    this.paint = function(){
        _this.context.fillStyle = _this.isSpecial ? targetSpecialColor : targetColor;
        _this.context.fillRect(-(targetWidth/2), -(targetHeight/2), targetWidth, targetHeight);
    };
    this.destroy = function () {
        _this.erase();
        _this.active = false;
        clearInterval(_this.localTimer);
        _this.context.setTransform(1, 0, 0, 1, 0, 0);
    };
    this.update = function () {
        _this.destroy();
        _this.localTimer = setTimeout(function () {
            var newBlock = targetGenerate();
            _this.reborn(newBlock);
        }, _this.isSpecial ? targetBornIntervalSpecial: targetBornInterval);
    };
    this.reborn = function (block) {
        _this.isSpecial = false;
        _this.block = {
            x: block.x,
            y: block.y
        };
        _this.pos = blockToRelativePos(_this.block);
        _this.context.translate(_this.pos.x, _this.pos.y);
        if ((score + 1) % targetsPerLevel === 0){
            _this.isSpecial = true;
        }
        _this.rotateRepaint();
        _this.active = true;

    };

    // init
    // reset
    this.context.translate(this.pos.x, this.pos.y);
    this.rotateRepaint();
    this.active = true;
    ///.
    return this;
}

function BonusFlash(dom, block, isSpecial) {
    // store
    var _this = this;

    // property
    this.dom = dom;
    this.context = this.dom.getContext('2d');
    this.block = block;
    this.pos = blockToRelativePos(this.block);
    this.isSpecial = isSpecial;
    this.localTimer = null;
    this.reset = function (block, isSpecial) {
        _this.block = block;
        _this.isSpecial = isSpecial;
        _this.context.fillStyle = _this.isSpecial ? targetSpecialColor : targetColor;
        _this.pos = blockToRelativePos(_this.block);
        _this.paint();
    };
    this.erase = function () {
        _this.context.clearRect(_this.pos.x - blockSizeX, _this.pos.y - blockSizeY, 2*blockSizeX, 2*blockSizeY);
    };
    this.paint = function () {
        var p = 0;
        _this.localTimer = setInterval(function () {
            _this.erase();
            _this.context.globalAlpha = p / (blockSizeY / 2);
            _this.context.fillText('+1', _this.pos.x - heroRadius, _this.pos.y - p);

            p += bonusFlashUpdateSpeed;
            if (p >= (blockSizeY / 2)){
                clearInterval(_this.localTimer);
                var t = setTimeout(_this.erase, bonusFlashStayTime);
            }
        }, 1000 / fps);
    };

    // init
    _this.context.font = 'bold ' + bonusFlashFontSize + 'px Moonlight';
    _this.context.fillStyle = _this.isSpecial ? targetSpecialColor : targetColor;
    this.erase();

    return this;
}
