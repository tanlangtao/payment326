// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Config from "../../Config"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    typeLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    handling_feeLabel: cc.Label = null;

    @property(cc.Label)
    exchangeLabel: cc.Label = null;

    @property(cc.Label)
    arrival_amountLabel: cc.Label = null;

    @property(cc.Label)
    statusLabel: cc.Label = null;
    
    @property(cc.Label)
    created_atLabel: cc.Label = null;

    @property(cc.Label)
    arrival_atLabel: cc.Label = null;

    @property(cc.Label)
    admin_remarkLabel: cc.Label = null;
    
    @property(cc.Node)
    orderBtn: cc.Node = null;

    @property(cc.Prefab)
    publicOrderAlert: cc.Prefab = null;

    @property
    public results = {};
    public config = null;

    onLoad () {
        this.config = new Config();
    }

    public init(data){
        this.typeLabel.string = data.type == 1 ? '支付宝'
            :(data.type == 2 ? '银行卡兑换1'
                :(data.type == 3 ? '银行卡兑换2'
                    :(data.type ==4 ? '人工兑换'
                        :(data.type == 5 ? "人工代提"
                            :(data.type == 6 ?'赠送':'')))));
        this.amountLabel.string = this.config.toDecimal(data.amount);
        // 类型=兑换渠道
        // 当类型=人工兑换时，申请费率为玩家填写费率，实际费率为匹配代提手续费率
        // 当类型=人工代提时，申请费率和实际费率均为0
        // 当类型=银行卡、支付宝时，申请费率为0，实际费率=平台费率+渠道费率
        // 当类型=赠送时，申请费率和实际费率均为0
        if(data.type == 4){
            this.handling_feeLabel.string = `${this.config.toDecimal1(data.handling_fee*100)}%`;
            this.exchangeLabel.string  = `${this.config.toDecimal1(data.exchange*100)}%`;
        }else if(data.type == 5 || data.type == 6){
            this.handling_feeLabel.string = '0.0%';
            this.exchangeLabel.string  = '0.0%';
        }else {
            this.handling_feeLabel.string ='0.0%';
            //平台费率➕渠道费率
            var sum = data.platform_rate + data.channel_rate;
            this.exchangeLabel.string  = `${this.config.toDecimal1(sum*100)}%`;
        }
        this.arrival_amountLabel.string  = this.config.toDecimal1(data.arrival_amount);
        this.statusLabel.string = data.status == 6 ?'已完成':'未成功';
        this.created_atLabel.string = this.config.getTime(data.created_at);
        this.arrival_atLabel.string = data.arrival_at == 0 ? '无' : this.config.getTime(data.arrival_at);
        this.admin_remarkLabel.string = `${!data.user_remark ?"" :data.user_remark }`;
        this.results = data.results;
        data.status == 7? '' : this.orderBtn.removeFromParent();
    }

    start () {

    }

    onClick(){
        var node = cc.instantiate(this.publicOrderAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        var data = {
            data : this.results
        }
        node.getComponent('PublicOrderAlert').init(data)
    }
    // update (dt) {}
}
