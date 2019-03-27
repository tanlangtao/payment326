// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    amountLabel: cc.Label = null;
    
    @property(cc.EditBox)
    amountInput: cc.EditBox = null;

    @property(cc.Label)
    czArea: cc.Label = null;

    @property(cc.Label)
    selectLabel: cc.Label = null;

    @property(cc.Prefab)
    SelectItem: cc.Prefab =null;

    @property(cc.Node)
    selectContent: cc.Node =null;

    @property(cc.Label)
    accountLabel: cc.Label = null;

    @property(cc.Label)
    passworldLabel: cc.Label = null;

    @property(cc.Label)
    btn1: cc.Label = null;

    @property(cc.Label)
    btn2: cc.Label = null;

    @property
    showSelect = false;
    results = [1,2];
    current = 1;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initRender();
    }

    start () {

    }

    selectClick(){
        if(!this.showSelect){
            for( var i = 0 ; i < this.results.length ; i++){
                var node = cc.instantiate(this.SelectItem);
                this.selectContent.addChild(node);
                node.getComponent('SelectItem').init({
                    text:this.results[i] == 1?'支付宝' : '银行卡',
                    parentComponent:this,
                    index:i
                })
            }
            this.showSelect = true;
        }else{
            this.selectContent.removeAllChildren();
            this.showSelect = false;
        }
    }
    initRender(){
        this.selectLabel.string = this.current ==1 ?'支付宝' : '银行卡'
    }
    deleteAmount(){

    }

    btn1Click(){

    }

    btn2Click(){
        
    }

    onClick(){

    }
    // update (dt) {}
}
