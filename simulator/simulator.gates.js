//######論理ゲート(入力2、出力1)のクラス#############################

/**
 * ANDゲートのクラス
 * 入力側の導線(Leadクラスのインスタンス)が2つとも通電状態ならば、
 * 自身を通電状態とした上で後続のオブジェクト(導線や論理ゲート)の通電状態を更新する
 */
class And{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.status = false;
        this.selected = false; //カーソルが当たっているかのフラグ
    }

    connect(in1, in2, out1){
        this.in1 = in1;
        in1.out1 = this;
        this.in2 = in2;
        in2.out1 = this;
        this.out1 = out1;
        out1.in1 = this;
    }
    
    turn(){
        if(this.in1.status && this.in2.status){
            this.status = true;
        }else{
            this.status = false;
        }
        this.out1.turn();
    }
    
    draw(ctx){
        setColor(ctx, this.status);
        if(this.selected){ctx.strokeStyle=selectedStrokeStyle;}

        ctx.beginPath();
        ctx.moveTo((this.x*scale+dx) - 35*scale, (this.y*scale+dy) - 45*scale);
        ctx.lineTo((this.x*scale+dx) - 35*scale, (this.y*scale+dy) + 15*scale);
        ctx.arc(this.x*scale+dx, (this.y*scale+dy) + 15*scale, 35*scale, Math.PI, 2 * Math.PI, true);
        ctx.lineTo((this.x*scale+dx) + 35*scale, (this.y*scale+dy) + 15*scale);
        ctx.lineTo((this.x*scale+dx) + 35*scale, (this.y*scale+dy) - 45*scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        this.counter++;
    }

    hit(x, y){
        if((this.x*scale+dx) - 35*scale < x && x < (this.x*scale+dx) + 35*scale && (this.y*scale+dy) - 45*scale < y && y < (this.y*scale+dy) + 45*scale){
            return true;
        }else{
            return false;
        }
    }
}

/**
 * ORゲートのクラス
 */
class Or{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.status = false;
        this.selected = false;
    }

    connect(in1, in2, out1){
        this.in1 = in1;
        in1.out1 = this;
        this.in2 = in2;
        in2.out1 = this;
        this.out1 = out1;
        out1.in1 = this;
    }
    turn(){
        if(this.in1.status || this.in2.status){
            this.status = true;
        }else{
            this.status = false;
        }
        this.out1.turn();
    }
    
    draw(ctx){
        setColor(ctx, this.status);
        if(this.selected){ctx.strokeStyle=selectedStrokeStyle;}

        ctx.beginPath();
        ctx.moveTo((this.x*scale+dx) - 35*scale, (this.y*scale+dy) - 45*scale);
        ctx.lineTo((this.x*scale+dx) - 33*scale, (this.y*scale+dy) +  5*scale);
        ctx.lineTo((this.x*scale+dx) - 28*scale, (this.y*scale+dy) + 15*scale);
        ctx.lineTo((this.x*scale+dx) - 20*scale, (this.y*scale+dy) + 25*scale);
        ctx.lineTo((this.x*scale+dx) - 10*scale, (this.y*scale+dy) + 35*scale);
        ctx.lineTo((this.x*scale+dx) -  0*scale, (this.y*scale+dy) + 45*scale);
        ctx.lineTo((this.x*scale+dx) + 10*scale, (this.y*scale+dy) + 35*scale);
        ctx.lineTo((this.x*scale+dx) + 20*scale, (this.y*scale+dy) + 25*scale);
        ctx.lineTo((this.x*scale+dx) + 28*scale, (this.y*scale+dy) + 15*scale);
        ctx.lineTo((this.x*scale+dx) + 33*scale, (this.y*scale+dy) +  5*scale);
        ctx.lineTo((this.x*scale+dx) + 35*scale, (this.y*scale+dy) - 45*scale);
        ctx.lineTo((this.x*scale+dx) + 22*scale, (this.y*scale+dy) - 40*scale);
        ctx.lineTo((this.x*scale+dx) + 10*scale, (this.y*scale+dy) - 37*scale);
        ctx.lineTo((this.x*scale+dx) -  0*scale, (this.y*scale+dy) - 35*scale);
        ctx.lineTo((this.x*scale+dx) - 10*scale, (this.y*scale+dy) - 37*scale);
        ctx.lineTo((this.x*scale+dx) - 22*scale, (this.y*scale+dy) - 40*scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    
    hit(x, y){
        if((this.x*scale+dx) - 35*scale < x && x < (this.x*scale+dx) + 35*scale && (this.y*scale+dy) - 45*scale < y && y < (this.y*scale+dy) + 45*scale){
            return true;
        }else{
            return false;
        }
    }

}

/**
 * XORゲートのクラス
 */
class Xor{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.status = false;
        this.selected = false;
    }

    connect(in1, in2, out1){
        this.in1 = in1;
        in1.out1 = this;
        this.in2 = in2;
        in2.out1 = this;
        this.out1 = out1;
        out1.in1 = this;
    }
    turn(){
        if((this.in1.status && !this.in2.status ) || (!this.in1.status && this.in2.status)){
            this.status = true;
        }else{
            this.status = false;
        }
        this.out1.turn();
    }
    
    draw(ctx){
        setColor(ctx, this.status);
        if(this.selected){ctx.strokeStyle=selectedStrokeStyle;}

        ctx.beginPath();
        ctx.moveTo((this.x*scale+dx) - 35*scale, (this.y*scale+dy) - 35*scale);
        ctx.lineTo((this.x*scale+dx) - 33*scale, (this.y*scale+dy) +  5*scale);
        ctx.lineTo((this.x*scale+dx) - 28*scale, (this.y*scale+dy) + 15*scale);
        ctx.lineTo((this.x*scale+dx) - 20*scale, (this.y*scale+dy) + 25*scale);
        ctx.lineTo((this.x*scale+dx) - 10*scale, (this.y*scale+dy) + 35*scale);
        ctx.lineTo((this.x*scale+dx) -  0*scale, (this.y*scale+dy) + 45*scale);
        ctx.lineTo((this.x*scale+dx) + 10*scale, (this.y*scale+dy) + 35*scale);
        ctx.lineTo((this.x*scale+dx) + 20*scale, (this.y*scale+dy) + 25*scale);
        ctx.lineTo((this.x*scale+dx) + 28*scale, (this.y*scale+dy) + 15*scale);
        ctx.lineTo((this.x*scale+dx) + 33*scale, (this.y*scale+dy) +  5*scale);
        ctx.lineTo((this.x*scale+dx) + 35*scale, (this.y*scale+dy) - 35*scale);
        ctx.lineTo((this.x*scale+dx) + 22*scale, (this.y*scale+dy) - 30*scale);
        ctx.lineTo((this.x*scale+dx) + 10*scale, (this.y*scale+dy) - 27*scale);
        ctx.lineTo((this.x*scale+dx) -  0*scale, (this.y*scale+dy) - 25*scale);
        ctx.lineTo((this.x*scale+dx) - 10*scale, (this.y*scale+dy) - 27*scale);
        ctx.lineTo((this.x*scale+dx) - 22*scale, (this.y*scale+dy) - 30*scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo((this.x*scale+dx) + 35*scale, (this.y*scale+dy) - 45*scale);
        ctx.lineTo((this.x*scale+dx) + 22*scale, (this.y*scale+dy) - 40*scale);
        ctx.lineTo((this.x*scale+dx) + 10*scale, (this.y*scale+dy) - 37*scale);
        ctx.lineTo((this.x*scale+dx) -  0*scale, (this.y*scale+dy) - 35*scale);
        ctx.lineTo((this.x*scale+dx) - 10*scale, (this.y*scale+dy) - 37*scale);
        ctx.lineTo((this.x*scale+dx) - 22*scale, (this.y*scale+dy) - 40*scale);
        ctx.lineTo((this.x*scale+dx) - 35*scale, (this.y*scale+dy) - 45*scale);
        ctx.stroke();
    }
    
    hit(x, y){
        if((this.x*scale+dx) - 35*scale < x && x < (this.x*scale+dx) + 35*scale && (this.y*scale+dy) - 45*scale < y && y < (this.y*scale+dy) + 45*scale){
            return true;
        }else{
            return false;
        }
    }

}

/**
 * 論理ゲートの代わりにはてなマークを表示するクラス
 * 通電はしない
 */
class Question{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.status = false;
        this.selected = false;
    }

    connect(in1, in2, out1){
        this.in1 = in1;
        in1.out1 = this;
        this.in2 = in2;
        in2.out1 = this;
        this.out1 = out1;
        out1.in1 = this;
    }
    turn(){
        this.status = false;
        this.out1.turn();
    }
    
    draw(ctx){
        ctx.strokeStyle = '#333';
        ctx.fillStyle = '#DDD';
        ctx.lineWidth = 3*scale;
        if(this.selected){ctx.strokeStyle=selectedStrokeStyle;}

        ctx.beginPath();
        ctx.arc((this.x*scale+dx), (this.y*scale+dy), 45*scale, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.moveTo((this.x*scale+dx) - 15*scale, (this.y*scale+dy));
        ctx.lineTo((this.x*scale+dx) - 20*scale, (this.y*scale+dy) - 10*scale);
        ctx.lineTo((this.x*scale+dx) - 12*scale, (this.y*scale+dy) - 25*scale);
        ctx.lineTo((this.x*scale+dx) -  0*scale, (this.y*scale+dy) - 32*scale);
        ctx.lineTo((this.x*scale+dx) + 12*scale, (this.y*scale+dy) - 25*scale);
        ctx.lineTo((this.x*scale+dx) + 20*scale, (this.y*scale+dy) - 10*scale);
        ctx.lineTo((this.x*scale+dx) +  0*scale, (this.y*scale+dy) + 10*scale);
        ctx.lineTo((this.x*scale+dx) +  0*scale, (this.y*scale+dy) + 20*scale);
        ctx.moveTo((this.x*scale+dx) +  0*scale, (this.y*scale+dy) + 20*scale);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc((this.x*scale+dx), (this.y*scale+dy) + 32*scale, 5*scale, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.stroke();
    }

    hit(x, y){
        if((this.x*scale+dx) - 35*scale < x && x < (this.x*scale+dx) + 35*scale && (this.y*scale+dy) - 45*scale < y && y < (this.y*scale+dy) + 45*scale){
            return true;
        }else{
            return false;
        }
    }
}


//######論理ゲート(入力1、出力1)のクラス#############################

/**
 * NOTゲートのクラス
 */
class Not{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.status = false;
        this.selected = false;
    }

    connect(in1, out1){
        this.in1 = in1;
        in1.out1 = this;
        this.out1 = out1;
        out1.in1 = this;
    }
    turn(){
        if(this.in1.status){
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
        ctx.moveTo((this.x*scale+dx) - 35*scale, (this.y*scale+dy) - 40*scale);
        ctx.lineTo((this.x*scale+dx), (this.y*scale+dy) + 40*scale);
        ctx.lineTo((this.x*scale+dx) + 35*scale, (this.y*scale+dy) - 40*scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    hit(x, y){
        if((this.x*scale+dx) - 35*scale < x && x < (this.x*scale+dx) + 35*scale && (this.y*scale+dy) - 45*scale < y && y < (this.y*scale+dy) + 45*scale){
            return true;
        }else{
            return false;
        }
    }

}

/**
 * 論理ゲートの代わりにはてなマークを表示するクラス
 * 通電はしない
 */
class NotQuestion{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.status = false;
        this.selected = false;
    }

    connect(in1, out1){
        this.in1 = in1;
        in1.out1 = this;
        this.out1 = out1;
        out1.in1 = this;
    }
    turn(){
        this.status = false;
        this.out1.turn();
    }
    
    draw(ctx){
        ctx.strokeStyle = '#333';
        ctx.fillStyle = '#DDD';
        ctx.lineWidth = 3*scale;
        if(this.selected){ctx.strokeStyle=selectedStrokeStyle;}

        ctx.beginPath();
        ctx.arc((this.x*scale+dx), (this.y*scale+dy), 45*scale, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.moveTo((this.x*scale+dx) - 15*scale, (this.y*scale+dy) -  0*scale);
        ctx.lineTo((this.x*scale+dx) - 20*scale, (this.y*scale+dy) - 10*scale);
        ctx.lineTo((this.x*scale+dx) - 12*scale, (this.y*scale+dy) - 25*scale);
        ctx.lineTo((this.x*scale+dx) -  0*scale, (this.y*scale+dy) - 32*scale);
        ctx.lineTo((this.x*scale+dx) + 12*scale, (this.y*scale+dy) - 25*scale);
        ctx.lineTo((this.x*scale+dx) + 20*scale, (this.y*scale+dy) - 10*scale);
        ctx.lineTo((this.x*scale+dx) +  0*scale, (this.y*scale+dy) + 10*scale);
        ctx.lineTo((this.x*scale+dx) +  0*scale, (this.y*scale+dy) + 20*scale);
        ctx.moveTo((this.x*scale+dx) +  0*scale, (this.y*scale+dy) + 20*scale);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc((this.x*scale+dx), (this.y*scale+dy) + 32*scale, 5*scale, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.stroke();
    }

    hit(x, y){
        if((this.x*scale+dx) - 35*scale < x && x < (this.x*scale+dx) + 35*scale && (this.y*scale+dy) - 45*scale < y && y < (this.y*scale+dy) + 45*scale){
            return true;
        }else{
            return false;
        }
    }

}
