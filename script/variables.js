
// game
var gameId = 0;

var gameFont;

var score = 0;
var bestScore = 0;
var enemyUpdateTimer = null;
var enemyProduceTimer = null;
var level = 1;
var gameStatus = 'wait';

var cGameMainDom;
var cRestartDom;

// background
var cBackgroundDom;
var cBackground;
var cStartDom;
var bgGradientTimer;

// score
var cScoreDom;
var cBestDom;

// hero
var cHeroDom;
var hero;

// enemy
var cEnemyDom;
var enemyList = [];

// target
var cTargetDom;
var target;

// target flash
var cFlashDom;
var bonusFlash;
