
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;                  
module ui {
    export class GameInfoUI extends View {
		public pauseBtn:Laya.Button;
		public hpLabel:Laya.Label;
		public levelLabel:Laya.Label;
		public scoreLabel:Laya.Label;
		public infoLabel:Laya.Label;
		public bestScoreLabel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":480,"height":852},"child":[{"type":"Button","props":{"y":800,"x":400,"var":"pauseBtn","stateNum":"1","skin":"war/btn_pause.png"}},{"type":"Label","props":{"y":40,"x":60,"var":"hpLabel","text":"Hp:10","fontSize":20,"color":"#10be6a"}},{"type":"Label","props":{"y":40,"x":140,"width":56,"var":"levelLabel","text":"Level:50","height":12,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":40,"x":230,"var":"scoreLabel","text":"Score:100","fontSize":20,"color":"#ff605a"}},{"type":"Label","props":{"y":500,"x":60,"var":"infoLabel","text":"Battle End","fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":40,"x":340,"var":"bestScoreLabel","text":"Best: 100","fontSize":20,"color":"#0660ff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameInfoUI.uiView);
        }
    }
}
