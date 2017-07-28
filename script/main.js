
//.

// load finish
window.onload = function(){

    // pre load
    prepare();

};
/*****************************************************************************************/

// event response

// void
function loadFonts() {
    try{
        gameFont = new FontFace('Moonlight', 'url(font/Moonlight.ttf)');
        gameFont.load().then(function(font){
            document.fonts.add(font);
            console.info('load font finish');
        });
    }
    catch(err){

    }
}

// void
function loadDom() {
    cScoreDom = document.getElementById('scoreboard');
    cBestDom = document.getElementById('bestboard');
    cHeroDom = document.getElementById('hero');
    cEnemyDom = document.getElementById('enemy');
    cTargetDom = document.getElementById('target');
    cBackgroundDom = document.getElementById('gradient');
    cBackground = cBackgroundDom.getContext('2d');
    cFlashDom = document.getElementById('bonusflash');
    cRestartDom = document.getElementById('restart');
    cGameMainDom = document.getElementById('main');
    cLevelDom = document.getElementById('level');
    cLevel = cLevelDom.getContext('2d');
    cStartDom = document.getElementById('start');
}

// void
function buildReflection() {
    cRestartDom.onclick = restartClickResponse;
    document.onkeydown = keyDownResponse;
}

// void
function createItems() {
    hero = new Hero(cHeroDom);
    var targetOff = setTimeout(function () {
        target = new Target(cTargetDom, targetGenerate(), false);
    }, 800);

    bonusFlash = new BonusFlash(cFlashDom, {x: 0, y: 0}, false);
}

// void
function prepare() {
    gameId++;

    gameStatus = 'wait';
    loadFonts();
    loadDom();
    buildReflection();

    cScoreDom.innerHTML = score;
    if (document.cookie.length > 0){
        cBestDom.innerHTML = 'BEST: ' + document.cookie;
    }
    else{
        cBestDom.innerHTML = 'BEST: 0';
    }

    hero = new Hero(cHeroDom);
    paintSingleBackgroundColor(level);

    if (document.cookie.length > 0){
        bestScore = Number(document.cookie);
    }

    cGameMainDom.style.filter = 'blur(6px)';

    cStartDom.style.backgroundImage = 'url("source/startgame_' + level + '.png")';
}

// void
function init(){

    cRestartDom.style.visibility = 'hidden';
    cGameMainDom.style.filter = '';

    level = 1;
    score = 0;

    cScoreDom.innerHTML = score;
    cBestDom.innerHTML = 'BEST: ' + bestScore;

    cLevel.fillStyle = levelColor;

    cLevel.font = levelTextFontSize + 'px Moonlight';
    cLevel.fillText('LEVEL ' + level, heroCanvasOffset.x + levelCanvasOffset.x, heroCanvasOffset.y + levelCanvasOffset.y);

    cStartDom.style.backgroundImage = '';

    for (var i in enemyList){
        enemyList[i].destroy();
    }
    enemyList = [];

    if (typeof hero !== 'undefined'){
        hero.erase();
    }
    if (typeof target !== 'undefined'){
        target.destroy();
    }

    createItems();

    clearInterval(bgGradientTimer);
    paintSingleBackgroundColor(level);
    enemyProduceTimer = setInterval(enemyProduce, enemyProduceInterval[level]);
    enemyUpdateTimer = setInterval(enemyUpdate, 1000 / fps);

    gameStatus = 'game';
}



