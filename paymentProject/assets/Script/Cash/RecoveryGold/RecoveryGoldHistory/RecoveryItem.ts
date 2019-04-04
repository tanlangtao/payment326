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
    created_atLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    handling_feeLabel: cc.Label = null;

    @property(cc.Label)
    cancleTimeLabel: cc.Label = null;

    @property(cc.Label)
    cancleAmountLabel: cc.Label = null;

    @property(cc.Label)
    recoveryAmountLabel: cc.Label = null;

    @property(cc.Label)
    statusLabel: cc.Label = null;

    @property
    public results = {};
    public config = null;

    onLoad () {
    }

    public init(data){

    }

    start () {

    }

    onClick(){

    }
    // update (dt) {}
}
