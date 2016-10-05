/**
 * Role
 */
class Role extends Laya.Sprite {
    private body: Laya.Animation;

    constructor() {
        super();
        //初始化
        this.init();
    }

    init(): void {
        Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
        Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");

        this.body = new Laya.Animation();
        this.addChild(this.body);

        //test action
        this.playAction("hero_down");
    }

    playAction(action: string): void {
        this.body.play(0, true, action);
        //get bounds of animation
        var bound: Laya.Rectangle = this.body.getBounds();
        //set center position 
        this.body.pos(-bound.width / 2, -bound.height / 2);
    }
}