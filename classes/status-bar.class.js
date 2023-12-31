class Statusbar extends DrawableObject {
    percentage = 100;

    HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.HEALTH_IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * this function sets the percentage for the status bar
     * @param {number} percentage - is the current percentage (health) of the character
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.HEALTH_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * this function selects the correct image that displays the status bar
     * @returns - the function returns the number of the location in the array for the correct image
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}