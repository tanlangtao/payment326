// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Config from "../../Config";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    publicAlert: cc.Prefab =null;

    @property(cc.Prefab)
    PublicInputAlert : cc.Prefab = null;

    @property(cc.Prefab)
    PublicOrderAlert : cc.Prefab = null;

    @property(cc.Label)
    selectLabel: cc.Label = null;

    @property(cc.Prefab)
    SelectItem: cc.Prefab =null;

    @property(cc.Node)
    selectContent: cc.Node =null;

    @property(cc.EditBox)
    amountInput : cc.EditBox = null;

    @property(cc.Label)
    gold1: cc.Label =null;

    @property(cc.Label)
    gold2: cc.Label =null;

    @property(cc.Label)
    gold3: cc.Label =null;

    @property(cc.Label)
    gold4: cc.Label =null;

    @property(cc.Label)
    gold5: cc.Label =null;

    @property(cc.Label)
    gold6: cc.Label =null;


    @property(cc.Label)
    czArea: cc.Label = null;

    @property()
    public UrlData : any = [];
    public token : string = '';
    public results : any = {};
    public  showSelect = false;
    public current : any = {};
    public config  = null;
    FormData  = new FormData();
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.config = new Config();
        this.UrlData =this.config.getUrlData();
        this.token = this.config.token;
        //请求首页
        this.fetchZfb()

        this.getPublicInput()
    }

    start () {

    }
    public fetchZfb(){
        var url = `${this.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.UrlData.user_id}&token=${this.token}`;
        fetch(url,{
            method:'get'
        }).then((data)=>data.json()).then((data)=>{
            if(data.status == 0){
                this.results = data.data.bankcard_transfer;
                this.current = this.results[0];
                this.initRender();
            }else{
                this.showAlert(data.msg)
            }
        })
    }

    public initRender(){
        this.selectLabel.string = this.current.name;
        var span_amount = this.current.span_amount.split(',');
        this.czArea.string = `充值范围:(${this.current.min_amount}-${this.current.max_amount})`;
        this.gold1.string = span_amount[0];
        this.gold2.string = span_amount[1];
        this.gold3.string = span_amount[2];
        this.gold4.string = span_amount[3];
        this.gold5.string = span_amount[4];
        this.gold6.string = span_amount[5];
    }

    public showAlert(data){
        var node = cc.instantiate(this.publicAlert);
        var canvas = cc.find('Canvas');
        canvas.addChild(node);
        node.getComponent('PublicAlert').init(data)
    }

    public getPublicInput(){
        var PublicInputAlert = cc.instantiate(this.PublicInputAlert);
        var canvas = cc.find('Canvas');
        this.amountInput.node.on('editing-did-began',(e)=>{
            canvas.addChild(PublicInputAlert);
            PublicInputAlert.getComponent('PublicInputAlert').init({
                text:e.string,
                input:this.amountInput
            })
        })
        this.amountInput.node.on('text-changed',(e)=>{
            //验证input 不能以0开头的整数
            this.amountInput.string = e.string.replace(/[^\d]/g,'').replace(/^0{1,}/g,'');
            PublicInputAlert.getComponent('PublicInputAlert').init({
                text:e.string,
                input:this.amountInput
            })
        })
    }
    public deleteAmount(){
        this.amountInput.string = '';
    }

    //确认充值按钮回调
    public onClick(){
        var amount = Number(this.amountInput.string);
        var min_amount = Number(this.current.min_amount);
        var max_amount = Number(this.current.max_amount);
        if(this.amountInput.string ==''){
            this.showAlert('充值金额不能为空!')
        }else if(amount < min_amount || amount > max_amount){
            this.showAlert('不符合充值范围！')
        }else{
            this.fetchOrder()
        }
    }

    fetchOrder(){
        var url = `${this.UrlData.host}/api/payment/bankCardTransfer`;
        this.FormData = new FormData();
        this.FormData.append('user_id',this.UrlData.user_id);
        this.FormData.append('user_name',decodeURI(this.UrlData.user_name));
        this.FormData.append('amount',this.amountInput.string);
        this.FormData.append('channel_id',this.current.channel_id);
        this.FormData.append('pay_type',this.current.pay_type);
        this.FormData.append('client',this.UrlData.client);
        this.FormData.append('proxy_user_id',this.UrlData.proxy_user_id);
        this.FormData.append('proxy_name',decodeURI(this.UrlData.proxy_name));
        this.FormData.append('package_id',this.UrlData.package_id);
        this.FormData.append('order_type','1');
        this.FormData.append('token',this.token);
        fetch(url,{
            method:'POST',
            body:this.FormData
        }).then((data)=>data.json()).then((data)=>{
            if(data.status == 0){
                var node = cc.instantiate(this.PublicOrderAlert);
                var canvas = cc.find('Canvas');
                canvas.addChild(node);
                node.getComponent('PublicOrderAlert').init(data)
            }else{
                this.showAlert(data.msg)
            }
        })
    }

    addGold(e){
        var string = e.currentTarget.children[1].getComponent(cc.Label).string;
        var sum = Number(this.amountInput.string)+Number(string)
        this.amountInput.string = `${sum}`;
    }

    selectClick(){
        if(!this.showSelect){
            for( var i = 0 ; i < this.results.length ; i++){
                var node = cc.instantiate(this.SelectItem);
                this.selectContent.addChild(node);
                node.getComponent('SelectItem').init({
                    text:this.results[i].name,
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
    // update (dt) {}
}
