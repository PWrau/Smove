// strategy

// block
function targetGenerate() {
    var availableList = [];
    for (var i = 0; i < N; i++){
        for (var j = 0; j < N; j++){
            if (distance({x: i, y: j}, hero.block) > 1){
                availableList.push({x: i, y: j});
            }
        }
    }
    return availableList[parseInt(Math.random() * (availableList.length))];
}

// [object {x, y, speed_x, speed_y}]
function enemyGenerate(){
    var speed = [0, 2, 2, [3, 1.8], 2, 0];
    var isHorizontal;
    var isPositive;
    var line;
    var nextLine;
    var el = [];
    switch (level){
        case 1:
            isHorizontal = parseInt(Math.random()*2);
            isPositive = parseInt(Math.random()*2);
            line = parseInt(Math.random()*N);
            el.push(positionInfoGenerate(isHorizontal, isPositive, line, speed[1]));
            break;
        case 2:
            isHorizontal = parseInt(Math.random()*2);
            isPositive = parseInt(Math.random()*2);
            line = parseInt(Math.random()*N);
            el.push(positionInfoGenerate(isHorizontal, isPositive, line, speed[2]));
            // mirror
            isPositive = 1 - isPositive;
            line = N - 1 - line;
            el.push(positionInfoGenerate(isHorizontal, isPositive, line, speed[2]));
            break;
        case 3:
            isHorizontal = parseInt(Math.random()*2);
            isPositive = parseInt(Math.random()*2);
            line = parseInt(N / 2);
            el.push(positionInfoGenerate(isHorizontal, isPositive, line, speed[3][0]));
            nextLine = (parseInt(Math.random()*2) === 0) ? (line - 1) : (line + 1);
            el.push(positionInfoGenerate(isHorizontal, isPositive, nextLine, speed[3][1]));
            break;
        case 4:
            isHorizontal = parseInt(Math.random()*2);
            isPositive = parseInt(Math.random()*2);
            line = parseInt(Math.random()*N);
            el.push(positionInfoGenerate(isHorizontal, isPositive, line, speed[4]));
            nextLine = parseInt(Math.random()*N);
            while(nextLine === line){
                nextLine = parseInt(Math.random()*N);
            }
            el.push(positionInfoGenerate(isHorizontal, isPositive, nextLine, speed[4]));
            break;
    }
    return el;
}

// object {x, y, speed_x, speed_y}
function positionInfoGenerate(isHorizontal, isPositive, line, speed){
    var mode = ['vertical', 'horizontal'];
    var direction = [['down', 'up'], ['right', 'left']];
    var pos = lineToEnemyBornPosition(line, mode[isHorizontal], direction[isHorizontal][isPositive]);
    return {
        x: pos.x,
        y: pos.y,
        speed_x: isHorizontal ? (isPositive ? speed : -speed) : 0,
        speed_y: isHorizontal ? 0 : (isPositive ? speed : -speed)
    };
}

