
// const

// key
const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;

// level
const maxLevel = 4;
const targetsPerLevel = 10;
const levelInterval = 1000;
const levelColor = '#ffffff';
const levelTextFontSize = 40;
const levelCanvasOffset = {x: 60, y: -30};

// game
const gameAreaWidth = 600;
const gameAreaHeight = 800;
const fps = 100;

// background
const colorProportion = 0.4;
const bgColorGroup = ['#ff5b46', '#faa755', '#45d07c', '#c880ff', '#6189e1', '#ff5a22'];

// hero
const N = 3;
const heroRadius = 20;
const heroBoxWidth = 240;
const heroBoxHeight = 240;
const blockSizeX = heroBoxWidth / N;
const blockSizeY = heroBoxHeight / N;
const heroCanvasOffset = {x: (gameAreaWidth - heroBoxWidth) / 2, y: (gameAreaHeight - heroBoxHeight) / 2};
const heroColor = '#ffffff';
const heroFlashSpeed = 10;

// enemy
const enemyRadius = 26;
const enemyColor = '#000000';
const enemyProduceInterval = [1000000, 1500, 1800, 1800, 1200, 1000000];

// target
const targetWidth = 20;
const targetHeight = 20;
const targetBornInterval = 400;
const targetBornIntervalSpecial = 2500;
const targetColor = '#4444ff';
const targetSpecialColor = '#ffff22';
const targetRotateCycle = 5; // second

// bonus flash
const bonusFlashStayTime = 80;
const bonusFlashUpdateSpeed = 1;
const bonusFlashFontSize = 28;
