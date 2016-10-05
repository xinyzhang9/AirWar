/**
* Game
*/
class Game {
    //定义英雄（主战斗机）
    private hero: Role

    constructor() {
        //初始化引擎，设置游戏设计宽高
        Laya.init(480, 852);

        //创建循环滚动的背景
        var bg: BackGround = new BackGround();
        //把背景添加到舞台上显示出来
        Laya.stage.addChild(bg);

        //加载图集资源
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS)
    }

    onLoaded() {
        //创建一个主角（主战斗机）
        this.hero = new Role();
        //设置角色位置
        this.hero.pos(240, 700);
        //把主角添加到舞台上
        Laya.stage.addChild(this.hero);

        //监听舞台的鼠标移动事件
        Laya.stage.on("mousemove", this, this.onMouseMove)
    }

    onMouseMove(e: Laya.Event): void {
        //始终保持影响和鼠标位置一致
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }
}

//启动游戏
new Game();