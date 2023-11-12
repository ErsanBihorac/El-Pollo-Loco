let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = []

background_music = new Audio('audio/background_music.mp3');
background_music.volume = 0.2;

/**
 * this function creates a new world, it's necessary to make the game playable
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.draw();
    this.background_music.play();
}

/**
 * this function mutes all sounds and switches to the other icon
 */
function muteAll() {
    if (!background_music.muted) {
        background_music.muted = true;
        world.muteSounds();
        world.character.muteSounds();
        document.getElementById('btn-mute').src = 'img/icons/volume_off.png';
        document.getElementById('btn-mute-mobile').src = 'img/icons/volume_off.png';
    }
    else if (background_music.muted) {
        background_music.muted = false;
        world.unmuteSounds();
        world.character.unmuteSounds();
        document.getElementById('btn-mute').src = 'img/icons/volume_on.png';
        document.getElementById('btn-mute-mobile').src = 'img/icons/volume_on.png';
    }
}

/**
 * this function displays the mobile controls
 */
function displayControls() {
    document.getElementById('settings').classList.remove('d-none');
}

/**
 * this function hides the mobile controls
 */
function disableControls() {
    document.getElementById('settings').classList.add('d-none');
}

/**
 * this function creates a new level after losing 
 */
function replayGameAfterLoss() {
    document.getElementById('endscreen').classList.add('d-none');
    document.getElementById('btn-replay-loss').classList.add('d-none');
    this.background_music.pause();
    initLevel();
    init();
}

/**
 * this function restarts the game, after winning. it creates a new level
 */
function replayGameAfterWin() {
    document.getElementById('winscreen').classList.add('d-none');
    document.getElementById('btn-replay-win').classList.add('d-none');
    this.background_music.pause();
    initLevel();
    init();
}

/**
 * this functions displays the loss screen, stops the background music, and clears all intervals
 */
function displayLoseScreen() {
    document.getElementById('endscreen').classList.remove('d-none');
    document.getElementById('btn-replay-loss').classList.remove('d-none');
    clearAllIntervals();
    this.background_music.pause();
}

/**
 * this function displays the win screen and stops the background music
 */
function displayWinScreen() {
    document.getElementById('winscreen').classList.remove('d-none');
    document.getElementById('btn-replay-win').classList.remove('d-none');
    this.background_music.pause();
}

/**
 * this function enables the start screen
 */
function enableStartScreen() {
    document.getElementById('startscreen').classList.add('startscreen');
}

/**
 * this function makes the start screen disappear and starts the level
 */
function disableStartScreen() {
    initLevel();
    init();
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('btn-play').classList.add('d-none');
}

/**
 * this function clears all intervals
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * this function puts the startscreen into the fullscreen mode if the fullscreen button is pressed
 */
function setToFullscreen() {
    let canvas = document.getElementById('canvas');
    canvas.requestFullscreen();
}

/**
 * everything below is part of the mobile controls
 */
let btn_left = document.getElementById('btn-move-left');
let btn_right = document.getElementById('btn-move-right');
let btn_jump = document.getElementById('btn-move-up');
let btn_throw = document.getElementById('btn-throw');

btn_throw.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
});

btn_throw.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});

btn_jump.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
});

btn_jump.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
});

btn_left.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

btn_left.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

btn_right.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

btn_right.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;

});

/**
 * this event listener chcks if the key is being pressed, and sets the key to true, if that's true
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * this even listener checks if the key is not being pressed, and sets the key to false, if that's true
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});
