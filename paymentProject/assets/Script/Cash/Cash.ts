import Config from "../Config";

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

    @property(cc.Prefab)
    NavToggle: cc.Prefab = null;

    @property(cc.Prefab)
    CashHistory: cc.Prefab = null;

    @property(cc.Node)
    ToggleContainer: cc.Node = null;

    @property(cc.Node)
    Content:cc.Node = null;

    @property()
    public UrlData : any = [];
    public token : string = '';
    public results : any = {};
    public zfbResults : any = {};
    // LIFE-CYCLE CALLBACKS:

    
    onLoad () {
        
        var config = new Config();
        this.UrlData =config.getUrlData();
        this.token = config.token;
        this.fetchIndex();

    }

    start () {


    }
    public exitBtnClick(){
        
    }

    public fetchIndex(){
        var url = `${this.UrlData.host}/api/with_draw/index?user_id=${this.UrlData.user_id}&token=${this.token}`;
        fetch(url,{
            method:'get'
        }).then((data)=>data.json()).then((data)=>{
            if(data.status == 0){
                this.results = data;
                this.addNavToggle()
            }else{
            }
        })
    }

    public historyBtnClick(){
        var node = cc.instantiate(this.CashHistory);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
    }

    public addNavToggle(){
        var arr = [];
        if(this.results.data.withDraw_info.replace_withdraw.is_close == 0){
            arr.push('人工兑换')
        }
        if(this.results.data.withDraw_info.bankcard.is_close == 0){
            arr.push('支付宝兑换')
        }
        if(this.results.data.withDraw_info.alipay.is_close == 0){
            arr.push('银行卡兑换')
        }
        if(this.results.data.withDraw_info.given.is_close == 0){
            arr.push('赠送')
        }
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('DhToggle').init({
                text:arr[i]
            })
        }
    }
    
}
