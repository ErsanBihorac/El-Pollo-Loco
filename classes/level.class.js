class Level {
    enemies;
    endboss;
    clouds;
    coins;
    salsabottles;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, endboss, clouds, coins, salsabottles, backgroundObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.coins = coins;
        this.salsabottles = salsabottles;
        this.backgroundObjects = backgroundObjects;
    }
}