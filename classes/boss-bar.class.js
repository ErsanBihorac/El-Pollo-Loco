class Bossbar extends DrawableObject {
    bosshealth = 100;
    bossHadFirstContact = false;

    HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/4_statusbar_boss/bossbar1.png',
        'img/7_statusbars/1_statusbar/4_statusbar_boss/bossbar2.png',
        'img/7_statusbars/1_statusbar/4_statusbar_boss/bossbar3.png',
        'img/7_statusbars/1_statusbar/4_statusbar_boss/bossbar4.png',
    ];

    INVISIBLE_IMAGE = [
        'img/7_statusbars/1_statusbar/4_statusbar_boss/blank.png'
    ];

    constructor() {
        super();
        this.loadImages(this.HEALTH_IMAGES);
        this.loadImages(this.INVISIBLE_IMAGE);
        this.x = 420;
        this.y = 5;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * this function sets the percentage for the status bar
     * @param {number} percentage - is the current percentage (health) of the character
     */
    setPercentage(percentage) {
        if (this.bossHadFirstContact == true) {
            this.percentage = percentage;
            let path = this.HEALTH_IMAGES[this.resolveImageIndex()];
            this.img = this.imageCache[path];
        } else {
            let path = this.INVISIBLE_IMAGE[0];
            this.img = this.imageCache[path];
        }
    }

    /**
     * this function selects the correct image that displays the status bar
     * @returns - the function returns the number of the location in the array for the correct image
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage == 60) {
            return 1;
        } else if (this.percentage == 20) {
            return 2;
        } else if (this.percentage < 0) {
            return 3;
        }
    }
}