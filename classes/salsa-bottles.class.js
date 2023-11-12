class SalsaBottle extends MovableObject {
    y = 370;
    width = 50;
    height = 50;

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = Math.random() * 1700;
    }
}