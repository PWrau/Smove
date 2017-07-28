// void
function keyDownResponse(event) {

    if (event.keyCode === keyUp ||
        event.keyCode === keyDown ||
        event.keyCode === keyLeft ||
        event.keyCode === keyRight){
        event.preventDefault();
    }
    if (gameStatus === 'game'){
        hero.move(event);
    }
}

// void
function restartClickResponse() {
    cRestartDom.style.visibility = 'hidden';
    init();
}

// void
function gameEndResponse(){
    clearInterval(enemyUpdateTimer);
    clearInterval(enemyProduceTimer);
    clearInterval(hero.localTimer);

    var p = 0;
    var delay = setInterval(function () {
        cGameMainDom.style.filter = 'blur(' + p + 'px)';
        p += 0.12;
        if (p > 6){
            clearInterval(delay);
        }
    }, 2000 / fps);
    var re = setTimeout(function(){
        cStartDom.style.backgroundImage = 'url("source/startgame_' + level + '.png")';
        cRestartDom.style.visibility = 'visible';
        cRestartDom.innerHTML = 'RESTART';
    }, 1500);

    //var newBest = Math.max(score, bestScore, (document.cookie.length > 0) ? Number(document.cookie) : 0);
    var newBest = Math.max(score, bestScore);
    //document.cookie = newBest;
    bestScore = newBest;


    if (gameStatus === 'complete'){
        for (var i in enemyList){
            enemyList[i].destroy();
        }
        enemyList = [];
        if (typeof target !== 'undefined'){
            target.destroy();
        }
    }

    cLevel.clearRect(0, 0, gameAreaWidth, gameAreaHeight);

}

// void
function targetCatchResponse() {
    bonusFlash.reset(target.block, target.isSpecial);
    target.update();
    score++;
    cScoreDom.innerHTML = score;

    if (score % targetsPerLevel === 0){
        levelUpResponse();
    }
}

// void
function levelUpResponse() {
    extendBackgroundColor(level);
    level++;
    clearInterval(enemyProduceTimer);

    if (level > maxLevel){
        gameStatus = 'complete';
        gameEndResponse();
        return;
    }

    cLevel.clearRect(0, 0, gameAreaWidth, gameAreaHeight);
    var id = gameId;
    var localTimer = setTimeout(function (){
        if (id === gameId && gameStatus === 'game'){
            enemyProduceTimer = setInterval(enemyProduce, enemyProduceInterval[level]);
            cLevel.fillText('LEVEL ' + level, heroCanvasOffset.x + levelCanvasOffset.x, heroCanvasOffset.y + levelCanvasOffset.y);
        }
    }, levelInterval);

}
