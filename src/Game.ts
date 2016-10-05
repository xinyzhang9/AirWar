// 程序入口
class Game{
    constructor()
    {   
        Laya.init(480,852);
        var bg: Background = new Background();
        Laya.stage.addChild(bg);

        Laya.loader.load('res/atlas/war.json',Laya.Handler.create(this,this.onLoaded),null,Laya.Loader.ATLAS);
    }
    onLoaded(){
        var hero: Role = new Role();
        Laya.stage.addChild(hero);
    }
    
}
new Game();