/**
 * 半加算器
 */
class HalfAddr{
    constructor(x, y){
        this.semiconductor = new Array( //論理ゲートの配置
            new Question(x-100,y+270),
            new Question(x+100,y+270),
        );
        this.lead = new Array( //導線の配置
            new Lead(x-100, y+130, x-100, y+180),//0
            new Lead(x-100, y+180, x-100, y+270),
            new Lead(x-100, y+180, x+80,  y+180),
            new Lead(x+80,  y+180, x+80,  y+270),
            
            new Lead(x+100, y+130, x+100, y+200),//4
            new Lead(x+100, y+200, x+100, y+270),
            new Lead(x+100, y+200, x-80,  y+200),
            new Lead(x-80,  y+200, x-80,  y+270),
            
            
            new Lead(x-90,  y+270, x-90,  y+700),//8
            
            new Lead(x+100, y+270, x+100, y+700),//9

        );
        this.branch = new Array( //導線の分岐点の配置
            new Branch(x-100,y+180),
            new Branch(x+100,y+200),
        );
        this.branch[0].connect(this.lead[0],this.lead[1],this.lead[2]);
        this.lead[2].connect(this.lead[3]);

        this.branch[1].connect(this.lead[4],this.lead[5],this.lead[6]);
        this.lead[6].connect(this.lead[7]);
        
        this.semiconductor[0].connect(this.lead[1],this.lead[7],this.lead[8]);
        this.semiconductor[1].connect(this.lead[5],this.lead[3],this.lead[9]);
    }

    connect(in1, in2, c, s){
        in1.connect(this.lead[0]);
        in2.connect(this.lead[4]);
        this.lead[8].connect(c);
        this.lead[9].connect(s);
    }
    connect_out_c(obj){
        this.lead[8].connect(obj);
    }
    get_out_c(){
        return this.lead[8];
    }
    connect_out_s(obj){
        this.lead[9].connect(obj);
    }
    get_out_s(){
        return this.lead[9];
    }
    connect_in(cin, x0, x1){
        cin.connect(this.lead[0]);
        x0.connect(this.lead[4]);
        x1.connect(this.lead[12]);
    }
}


/**
 * 全加算器
 */
class FullAddr{
    constructor(x, y){
        this.semiconductor = new Array( //論理ゲートの配置
            new Question(x-160, y+260),
            new Question(x-30,  y+260),
            new Question(x-20,  y+430),
            new Question(x+120, y+430),
            new Question(x-150, y+580)
        );
        this.lead = new Array( //導線の配置
            new Lead(x-170, y+130, x-170, y+170  ),//0
            new Lead(x-170, y+170, x-170, y+240  ),
            new Lead(x-170, y+170, x-40,  y+170  ),
            new Lead(x-40,  y+170, x-40,  y+240  ),

            new Lead(x-20,  y+130, x-20,  y+190  ),//4
            new Lead(x-20,  y+190, x-20,  y+270  ),
            new Lead(x-20,  y+190, x-150, y+190  ),
            new Lead(x-150, y+190, x-150, y+240  ),

            new Lead(x-30,  y+240, x-30,  y+340  ),//8
            new Lead(x-30,  y+340, x-30,  y+430  ),
            new Lead(x-30,  y+340, x+110, y+340  ),
            new Lead(x+110, y+340, x+110, y+430  ),

            new Lead(x+175, y+360, x+130, y+360  ),//12
            new Lead(x+130, y+360, x+130, y+430  ),
            new Lead(x+130, y+360, x-10,  y+360  ),
            new Lead(x-10,  y+360, x-10,  y+430  ),

            new Lead(x-160, y+240, x-160, y+550  ),//16

            new Lead(x-20,  y+430, x-20,  y+500  ),//17
            new Lead(x-20,  y+500, x-140, y+500  ),
            new Lead(x-140, y+500, x-140, y+550  ),

            new Lead(x+120, y+430, x+120, y+700  ),//20

            new Lead(x-150, y+550, x-150, y+700  ),//21

        );
        this.branch = new Array( //導線の分岐点の配置
            new Branch(x-170, y+170),
            new Branch(x-20,  y+190),
            new Branch(x-30,  y+340),
            new Branch(x+130, y+360),
        );
        this.branch[0].connect(this.lead[0],this.lead[1],this.lead[2]);
        this.branch[1].connect(this.lead[4],this.lead[5],this.lead[6]);
        this.branch[2].connect(this.lead[8],this.lead[9],this.lead[10]);
        this.branch[3].connect(this.lead[12],this.lead[13],this.lead[14]);

        this.lead[2].connect(this.lead[3]);
        this.lead[6].connect(this.lead[7]);
        this.lead[10].connect(this.lead[11]);
        this.lead[14].connect(this.lead[15]);
        this.lead[17].connect(this.lead[18]);
        this.lead[18].connect(this.lead[19]);
        
        this.semiconductor[0].connect(this.lead[1],this.lead[7],this.lead[16]);
        this.semiconductor[1].connect(this.lead[3],this.lead[5],this.lead[8]);
        this.semiconductor[2].connect(this.lead[9],this.lead[15],this.lead[17]);
        this.semiconductor[3].connect(this.lead[11],this.lead[13],this.lead[20]);
        this.semiconductor[4].connect(this.lead[16],this.lead[19],this.lead[21]);
    }

    connect(cin, x0, x1, c, s){
        cin.connect(this.lead[0]);
        x0.connect(this.lead[4]);
        x1.connect(this.lead[12]);
        this.lead[21].connect(c);
        this.lead[20].connect(s);
    }
    connect_out_c(obj){
        this.lead[21].connect(obj);
    }
    get_out_c(){
        return this.lead[21];
    }
    connect_out_s(obj){
        this.lead[20].connect(obj);
    }
    get_out_s(){
        return this.lead[20];
    }
    connect_in(cin, x0, x1){
        cin.connect(this.lead[0]);
        x0.connect(this.lead[4]);
        x1.connect(this.lead[12]);
    }
}



