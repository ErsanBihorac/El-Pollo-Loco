class Character extends MovableObject {
    world;
    height = 300;
    y = 0;
    speed = 10;
    lose_sound_played = false;

    lose_sound = new Audio('audio/lose.mp3');
    walking_sound = new Audio('audio/walking.mp3');
    throwing_sound = new Audio('audio/throw.mp3');

    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * this function checks if a button is pressed that makes the character move
     */
    checkCharacterMovement() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * this function plays different animations for the character, if it's dead, hurt, jumping or walking
     */
    displayAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (this.lose_sound_played == false) {
                    setTimeout(() => {
                        this.lose_sound_played = true;
                        this.lose_sound.play();
                        displayLoseScreen();
                    }, 1000);
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    /**
     * this function checks if a button is being pressed that makes the character move, if nothing is being pressed within 5 seconds an idle animation starts playing 
     */
    idleAnimation() {
        let i;
        setInterval(() => {
            i++;
            if (this.world.keyboard.SPACE || this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.D) {
                i = 0;
            }
        }, 100);

        setInterval(() => {
            if (i > 25) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        }, 100);
    }

    /**
     * this function mutes the sounds in the character class
     */
    muteSounds() {
        this.lose_sound.muted = true;
        this.walking_sound.muted = true;
        this.throwing_sound.muted = true;
    }

    /**
     * this function unmutes the sounds in the character class
     */
    unmuteSounds() {
        this.lose_sound.muted = false;
        this.walking_sound.muted = false;
        this.throwing_sound.muted = false;
    }

    /**
     * this function runs the other functions every couple miliseconds
     */
    animate() {
        this.checkCharacterMovement();
        this.displayAnimations();
        this.idleAnimation();
    }
}