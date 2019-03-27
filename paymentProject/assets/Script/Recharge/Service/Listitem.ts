// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Config from '../../Config'
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    labelID: cc.Label = null;

    @property(cc.Label)
    labelName: cc.Label = null;

    @property(cc.Label)
    labelNumber: cc.Label = null;

    @property()
    config  = null;

    @property()
    public number  = null;

    // LIFE-CYCLE CALLBACKS:
    public init(data){
        this.labelID.string = data.id;
        this.labelName.string = data.name;
        this.labelNumber.string = `${data.type} : ${data.number}`;
        this.number = data.number;
    }
    onLoad () {
        this.config = new Config();
    }

    start () {

    }

    onClick(){
        this.config.copyToClipBoard(this.number)
    }
    // update (dt) {}
}
