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
    ListItem: cc.Prefab = null;

    @property(cc.Node)
    List: cc.Node = null;
    
    @property()
    results  = {};
    // LIFE-CYCLE CALLBACKS:

    public init(data){
        this.results = data.results;
    }
    // onLoad () {}

    start () {
        console.log(this.results)
    }

    fanhuiClick(){
        this.node.removeFromParent()
    }
    // update (dt) {}
}
