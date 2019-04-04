// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Config from "../../../Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    publicAlert: cc.Prefab = null;

    @property(cc.Prefab)
    RecoveryGold: cc.Prefab = null;

    @property(cc.Prefab)
    RecoveryItem: cc.Prefab = null;

    @property(cc.Label)
    pageLabel: cc.Label = null;

    @property(cc.Node)
    RecoveryGoldList: cc.Node = null;

    @property
    public results = null;
    public config = null;
    public UrlData: any = [];
    public token: string = '';
    public FormData = new FormData();
    public page = 1;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.config = new Config();
        this.UrlData = this.config.getUrlData();
        this.token = this.config.token;

        this.fetchIndex();
    }

    start() {

    }


    public fetchIndex() {
        this.pageLabel.string = `${this.page} / 10`;
        var url = `${this.UrlData.host}/api/sell_gold/mySellGoldOrderList?&token=${this.token}`;
        fetch(url, {
            method: 'get'
        }).then((data) => data.json()).then((data) => {
            if (data.status == 0) {
                this.results = data;
                cc.log(data);
            } else {

            }
        })
    }


    public showAlert(data) {
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('PublicAlert').init(data);
    }

    updataList(){
        this.RecoveryGoldList.removeAllChildren();
        this.fetchIndex();
    }

    pageUp(){
        if(this.page > 1){
            this.page = this.page - 1;
            this.updataList();
        }
    }

    pageDown(){
        if(this.page < 10){
            this.page = this.page + 1;
            this.updataList();
        }
    }

    removeSelf() {
        this.node.destroy();
        var node = cc.instantiate(this.RecoveryGold);
        var content = cc.find('Canvas/Cash/Content');
        content.addChild(node);
    }

    onClick() {

    }

    // update (dt) {}
}
