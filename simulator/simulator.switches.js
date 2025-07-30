//######入力電球パーツのクラス#############################

class InSwitch{
    constructor(x, y, label){
        this.x = x;
        this.y = y;
        this.label = label;
        this.status = false;
        this.selected = false;
    }

    connect(out1){
        this.out1 = out1;
        out1.in1 = this;
    }
    
    turn(){
        if(this.status){
            this.status = false;
        }else{
            this.status = true;
        }
        this.out1.turn();
    }
    
    draw(ctx){
        setColor(ctx, this.status);
        if(this.selected){ctx.strokeStyle=selectedStrokeStyle;}

        ctx.beginPath();
        ctx.moveTo((this.x*scale+dx) -  0*scale, (this.y*scale+dy) - 45*scale);
        ctx.lineTo((this.x*scale+dx) -  8*scale, (this.y*scale+dy) - 45*scale);
        ctx.lineTo((this.x*scale+dx) -  8*scale, (this.y*scale+dy) - 32*scale);
        ctx.lineTo((this.x*scale+dx) - 28*scale, (this.y*scale+dy) - 32*scale);
        ctx.lineTo((this.x*scale+dx) - 28*scale, (this.y*scale+dy) + 45*scale);
        ctx.lineTo((this.x*scale+dx) + 28*scale, (this.y*scale+dy) + 45*scale);
        ctx.lineTo((this.x*scale+dx) + 28*scale, (this.y*scale+dy) - 32*scale);
        ctx.lineTo((this.x*scale+dx) +  8*scale, (this.y*scale+dy) - 32*scale);
        ctx.lineTo((this.x*scale+dx) +  8*scale, (this.y*scale+dy) - 45*scale);
        ctx.lineTo((this.x*scale+dx) +  0*scale, (this.y*scale+dy) - 45*scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.moveTo((this.x*scale+dx) - 28*scale, (this.y*scale+dy) +  16*scale);
        ctx.lineTo((this.x*scale+dx) - 12*scale, (this.y*scale+dy) +  0*scale);
        ctx.stroke();
        ctx.moveTo((this.x*scale+dx) - 28*scale, (this.y*scale+dy) +  32*scale);
        ctx.lineTo((this.x*scale+dx) +  4*scale, (this.y*scale+dy) +  0*scale);
        ctx.stroke();
        ctx.moveTo((this.x*scale+dx) - 25*scale, (this.y*scale+dy) +  45*scale);
        ctx.lineTo((this.x*scale+dx) + 20*scale, (this.y*scale+dy) +   0*scale);
        ctx.stroke();
        
        ctx.fillStyle = '#000';
        ctx.fillText(this.label,(this.x*scale+dx)-ctx.measureText(this.label).width/2,(this.y*scale+dy)-55*scale);
    }
    /**
     * 当たり判定を行うメソッド
     * 自身の座標とマウスカーソルの座標を比較し、カーソルが当たっているのかを判定する。
     * @param x マウスカーソル(スマホの場合はタップ位置)のx座標
     * @param y マウスカーソル(スマホの場合はタップ位置)のy座標
     * @return 判定結果。当たっていたらtrue、当たっていなかったらfalseを返す。
     */
    hit(x, y){
        if((this.x*scale+dx) - 35*scale < x && x < (this.x*scale+dx) + 35*scale && (this.y*scale+dy) - 50*scale < y && y <(this.y*scale+dy) + 45*scale){
            return true;
        }else{
            return false;
        }
    }
    
}


//######出力電球パーツのクラス#############################

class OutSwitch{
    constructor(x, y, label){
        this.x = x;
        this.y = y;
        this.label = label;
        this.status = false;
    }

    connect(in1){
        this.in1 = in1;
        in1.out1 = this;
    }
    
    turn(){
        if(this.in1.status){
            this.status = true;
        }else{
            this.status = false;
        }
    }
    
    draw(ctx){
        setColor(ctx, this.status);

        ctx.beginPath();
        ctx.arc((this.x*scale+dx), (this.y*scale+dy) - 18*scale , 32*scale, 2*Math.PI/6, -Math.PI/6*8, true);
        ctx.lineTo((this.x*scale+dx) - 15*scale, (this.y*scale+dy) + 38*scale);
        ctx.lineTo((this.x*scale+dx) + 15*scale, (this.y*scale+dy) + 38*scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo((this.x*scale+dx) - 15*scale, (this.y*scale+dy) + 45*scale);
        ctx.lineTo((this.x*scale+dx) + 15*scale, (this.y*scale+dy) + 45*scale);
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo((this.x*scale+dx) - 12*scale, (this.y*scale+dy) + 50*scale);
        ctx.lineTo((this.x*scale+dx) + 12*scale, (this.y*scale+dy) + 50*scale);
        ctx.closePath();
        ctx.stroke();
        
        ctx.fillStyle = '#000';
        ctx.fillText(this.label,(this.x*scale+dx)-ctx.measureText(this.label).width/2 ,(this.y*scale+dy)+80*scale);
    }

}

