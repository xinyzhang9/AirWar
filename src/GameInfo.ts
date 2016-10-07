/** 
 * UI
 */
class GameInfo extends ui.GameInfoUI {
    constructor(){
        super();
        this.pauseBtn.on('click',this,this.onPauseBtnClick);
        //initialize UI
        this.reset();
    }
    public reset(): void{
        this.infoLabel.text = "";
        this.hp(5);
        this.level(0);
        this.score(0);
        
    }
    onPauseBtnClick(e: Laya.Event): void{
        e.stopPropagation();
        //pause game
        this.infoLabel.text = 'Game paused.\nPress ESC to resume';
        gameInstance.pause();
        Laya.stage.once('click',this,this.onStageClick);
    }
    onStageClick(e: Laya.Event): void{
        this.infoLabel.text = "";
        gameInstance.resume();
    }
    //display hp
    public hp(value: number): void{
        this.hpLabel.text = 'HP:' + value;
    }
    //display level
    public level(value: number): void{
        this.levelLabel.text = 'Level:' + value;
    }
    //display score
    public score(value: number): void{
        this.scoreLabel.text = 'Score:' + value;
    }
    //best score
    public bestScore(value: number): void{
        this.bestScoreLabel.text = 'Best:' + value;
    }
}