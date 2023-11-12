class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 80;
    dead = false;
    jumpkillable = true;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.75;
        this.animate();
    }

    /**
     * this function plays a walking chicken animation if the chicken isn't dead and makes the chicken move to the left
     */
    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 250);
    }

    /**
     * this functions sets the status of the chicken to dead and plays a dying animation
     */
    deadChicken() {
        this.dead = true;
        this.playAnimation(this.IMAGES_DEAD);
    }
}