//######論理回路パーツのクラス#############################

/**
 * 回路の導線を定義したクラス
 * 1つの直線で1つのインスタンスを生成することとする。
 * 線を折れ線としたい場合は、複数のインスタンスを生成し、
 * connect関数で接続していくことでそれを実現する。
 */
class Lead{
    constructor(sx, sy, ex, ey){
        this.sx = sx; //導線の開始位置のx座標
        this.sy = sy; //導線の開始位置のy座標
        this.ex = ex; //動線の終点位置のx座標
        this.ey = ey; //動線の終点位置のy座標
        this.status = false;   //通電状態(trueで通電)
    }
    /**
     * 動線や論理ゲートを接続するメソッド
     * 終端に接続するオブジェクトを指定し、相互に接続する。
     * 開始点側に接続したいオブジェクトがある場合は本メソッドではなく、
     * 開始点側のオブジェクトのconnectメソッドを呼び出し、
     * メソッドの引数に当該オブジェクトを指定することで実現する。
     * @param out1 動線の終端に接続するオブジェクト(動線や論理ゲート)
     */
    connect(out1){
        this.out1 = out1; //自身の終端側の動線や論理ゲートを設定する
        out1.in1 = this;  //終点側の動線や論理ゲートの入力を自身で設定する
    }
    
    /**
     * 通電を制御するメソッド
     * 開始点側の動線や論理ゲートの通電状態に応じて、
     * 当該オブジェクトが電気を通す場合はstatusをtrueとする。
     * 逆に当該オブジェクトが電気を通さない場合はstatusをfalseとする。
     * 終端側に接続したオブジェクトに対してもturnメソッドを呼び出すことで、
     * 後続の回路の通電状態も更新されていき、回路全体の通電状態が更新される。
     */
    turn(){
        if(this.in1.status){
            this.status = true;  //開始点側が通電なら電気を通す
        }else{
            this.status = false; //開始点側が非通電なら電気を通さない
        }
        this.out1.turn();
    }
    
    /**
     * webページのcanvasエリアに描画を行うメソッド
     * @param ctx webページのcanvasエリアへ描画命令を行うための制御オブジェクト
     */
    draw(ctx){
        setColor(ctx, this.status);
        ctx.beginPath();
        ctx.moveTo(this.sx*scale+dx, this.sy*scale+dy);
        ctx.lineTo(this.ex*scale+dx, this.ey*scale+dy);
        ctx.closePath();
        ctx.stroke();
    }
    toText(){
        return "lead, "+ this +", "+this.sx+","+this.sy+","+this.ex+","+this.ey+","+this.status+","+this.in1+","+"(in2)"+","+this.out1+","+"(out2)";
    }
}

/**
 * 回路の導線の分岐点を定義したクラス
 * 1つの導線から2つの導線に分岐する。
 * つまり、connect関数では3つの導線を指定することとなる。
 */
class Branch{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.status = false;
    }

    connect(in1, out1, out2){
        this.in1 = in1;   //分岐点の入力側の導線を設定する
        in1.out1 = this;  //入力側の導線の終点側に自身(分岐点)を設定する
        this.out1 = out1; //分岐点の出力側の導線１つめを設定する
        out1.in1 = this;
        this.out2 = out2; //分岐点の出力側の導線つめを設定する
        out2.in1 = this;
    }
    
    turn(){
        if(this.in1.status){
            this.status = true;
        }else{
            this.status = false;
        }
        this.out1.turn();
        this.out2.turn();
    }
    
    draw(ctx){
        setColor(ctx, this.status);
        ctx.beginPath();
        ctx.arc(this.x*scale+dx, this.y*scale+dy, 6*scale, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

}

