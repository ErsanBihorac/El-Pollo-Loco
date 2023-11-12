class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    speed = 10;
    dead = false;
    firstContact = false;
    jumpkillable = false;
    win_sound = new Audio('audio/win.mp3');

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_WALKING_RIGHT = [
        'img/4_enemie_boss_chicken/1_walk/G1-r.png',
        'img/4_enemie_boss_chicken/1_walk/G2-r.png',
        'img/4_enemie_boss_chicken/1_walk/G3-r.png',
        'img/4_enemie_boss_chicken/1_walk/G4-r.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_WALKING_RIGHT);
        this.x = 2500
        this.animate();
    }

    /**
     * this function animates the boss depending if the boss is dead or not
     */
    animate() {
        let i = 0;
        let j = 0;
        setInterval(() => {
            if (!this.dead) {
                if (world.character.x > 2000 && i < 10) {
                    this.playAnimation(this.IMAGES_ALERT);
                    this.setBossHealthOnce();
                    i++
                } else if (this.firstContact == true) {
                    if (j > 28) {
                        j = 0;
                    } else if (j > 20) {
                        this.playAnimation(this.IMAGES_ATTACK);
                        if (world.character.x < this.x) {
                            this.moveLeft();
                            this.moveLeft();
                            this.moveLeft();
                        } else {
                            this.moveRight();
                            this.moveRight();
                            this.moveRight();
                        }
                        j++
                    } else if (world.character.x < this.x) {
                        this.moveLeft();
                        this.playAnimation(this.IMAGES_WALKING);
                        j++;
                    } else {
                        this.moveRight();
                        this.playAnimation(this.IMAGES_WALKING_RIGHT);
                        j++;
                    }
                }
            }
        }, 200);
    }

    setBossHealthOnce() {
        if (this.firstContact == false) {
            this.firstContact = true;
            world.bossBar.bossHadFirstContact = true
            world.bossBar.setPercentage(100);
        }
    }

    /**
     * this function plays a winning sound, plays the dying boss animation, displays the winning screen and makes every intervall stop
     */
    deadChicken() {
        this.dead = true;
        this.playAnimation(this.IMAGES_DEAD);
        this.win_sound.volume = 0.2;

        setTimeout(() => {
            this.win_sound.play();
            displayWinScreen();
            clearAllIntervals();
        }, 1000);
    }
}