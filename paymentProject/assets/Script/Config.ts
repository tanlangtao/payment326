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
export default class Config extends cc.Component {

    @property()
    public token:string=''

    public getUrlData(){
        var path = location.search;
        var arr:any = {};
        path.slice(1).split('&').map(e => e.split('=')).forEach(e => arr[e[0]] = e[1]);
        if(arr.env=='dev'){
            this.token = 'e40f01afbb1b9ae3dd6747ced5bca532'
        }else if(arr.env =='pre'){
            this.token = '93059400a426129770e606b6de68fca5'
        }else if(arr.env =='online'){
            this.token = '93059400a426129770e606b6de68fca5'
        }
        return arr;
    }
    
    public copyToClipBoard(value) {
    }
    
    public toDecimal(num) {
        var result = parseFloat(num);
        if (isNaN(result)) {
        alert('传递参数错误，请检查！');
        return false;
        }
        result = Math.round(num * 100) / 100;
        var s_x = result.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
        }
        return s_x;
    }
    
    onLoad () {

    }
}
