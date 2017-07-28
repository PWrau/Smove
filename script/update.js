// void
function enemyUpdate(){
    var i;
    for (i in enemyList){
        enemyList[i].erase();
    }
    for (i in enemyList){
        enemyList[i].update();
    }
}

// void
function enemyProduce(){
    var ne = enemyGenerate(level);
    for (var i in ne){
        var e = new Enemy(cEnemyDom, ne[i].x, ne[i].y, ne[i].speed_x, ne[i].speed_y);
        enemyList.push(e);
    }
    for (var i in enemyList){
        if (enemyList[i].active === false){
            enemyList.splice(i, 1);
        }
    }
}
