class BaseEnemy {
    health: number;
    sprite: string;

    constructor(spritePath: string) {
        this.health = 5;
        this.sprite = spritePath;
    }

    takeDamage(damage: number) {
        this.health -= damage;
    }

    getHealth() {
        return this.health;
    }
}