/**
論理回路シミュレーター
*/

/**
 * 描画色を設定する関数
 * @param ctx 描画用コンテキスト
 * @param status 通電時はtrue、非通電時はfalse
 */
setColor = function(ctx, status){
        if(status){                             //＜通電時＞
            ctx.strokeStyle = trueStrokeStyle;  //線の色
            ctx.lineWidth = trueLineWidth;      //線の太さ
            ctx.fillStyle = trueFillStyle;      //塗りつぶしの色
        }else{                                  //＜非通電時＞
            ctx.strokeStyle = falseStrokeStyle; //線の色
            ctx.lineWidth = falseLineWidth;     //線の太さ
            ctx.fillStyle = falseFillStyle;     //塗りつぶしの色
        }
}

//######メイン関数（主処理）#############################


//＜初期処理・変数等の定義＞

$(function() {
    var a_canvas = $("#a_canvas")[0];    //WebページのHTMLからcanvas(描画エリア)を取得する。※おまじない
    var ctx = a_canvas.getContext("2d"); //canvas(描画エリア)の描画を制御するオブジェクト(コンテキスト)を取得する。※おまじない
    var fontSize = parseInt(24*scale);   //入力・出力の文字のサイズを定義
    ctx.font = "bold "+fontSize+"px Arial, meiryo, sans-serif" ; //入力・出力の文字のフォントを定義
    var counter = 0;   //通電時のチカチカアニメーションを制御するためのフレーム数のカウンタ
    
    var mx = 0; //マウスX座標
    var my = 0; //マウスY座標

    var {input, output, lead, branch, semiconductor} = buildCircuit();

    
//＜毎フレーム行う描画に関する処理＞

    var anime = function(){  //animeという名前で関数を定義(後に定期的にanime関数を呼び出す制御を行う)

        // canvasを消去する
        ctx.clearRect(0, 0, a_canvas.width, a_canvas.height);
        
        // 以降、描画する処理
        
        //通電時の線の色・太さ・塗りつぶしの色をanimeのフレームカウンタに応じて設定
        //ここではグローバル変数に設定だけして、あとで通電か否かを判定しながら
        //各クラスのdrawメソッドの中でcanvasのコンテキストに設定していく。
        //スピード調整のためカウンタ/2で判定、2フレームごとに色が変わる
        if(parseInt(counter/2) % 4 == 1){       //1フレーム目(カウンタの剰余で処理を分ける)
            trueStrokeStyle = '#DD0';           //線の色
            trueFillStyle = '#FFC';             //塗りつぶしの色
            trueLineWidth = 4*scale;            //線の太さ
        }else if(parseInt(counter/2) % 4 == 2){ //2フレーム目
            trueStrokeStyle = '#EE0';
            trueFillStyle = '#FFC';
            trueLineWidth = 5*scale;
        }else if(parseInt(counter/2) % 4 == 3){ //3フレーム目
            trueStrokeStyle = '#FF0';
            trueFillStyle = '#FFC';
            trueLineWidth = 6*scale;
        }else{                                  //4フレーム目
            trueStrokeStyle = '#EE0';
            trueFillStyle = '#EEC';
            trueLineWidth = 5*scale;
        }

        
        //導線すべてに対して描画処理(drawメソッド)を命令
        lead.forEach(function(value){
            value.draw(ctx);
        });
        //導線の分岐点すべてに対して描画処理(drawメソッド)を命令
        branch.forEach(function(value){
            value.draw(ctx);
        });
        //論理ゲートすべてに対して描画処理(drawメソッド)を命令
        semiconductor.forEach(function(value){
            value.draw(ctx);
        });
        //入力電球すべてに対して描画処理(drawメソッド)を命令
        input.forEach(function(value){
            value.draw(ctx);
        });
        //出力電球すべてに対して描画処理(drawメソッド)を命令
        output.forEach(function(value){
            value.draw(ctx);
        });
        //debug_msg="hoge";
        //最後にデバッグメッセージの描画
        ctx.fillText(debug_msg,50,100);
        ctx.fill();
        counter++;

        calculation_draw(ctx, input, output);

    }
    
    //setInterval() を使って、設定した繰り返しの待ち時間の後にanime関数を呼び出す。
    //anime()を呼び出す処理をanime関数最後に入れることで、設定時間ごとに描画が行われる。
    setInterval(anime, 30);

    
    
//＜マウスやタップの操作に対する処理＞

    //マウスがクリックされたときの処理
    a_canvas.onmousedown = function(event) {
        
        
        //入力電球の当たり判定
        input.forEach(function(value){
            if(value.hit(mx, my)){
                var before = value.status;
                value.turn();
                var after = value.status;
                log("turn", value.label, before, after);
            } //クリックされた入力電球のturnメソッドを呼び出して通電状態を更新
        });
        //論理ゲートの当たり判定
        //クリックされた論理ゲートは？⇒AND⇒OR⇒XOR⇒？、？⇒NOT⇒？で切り替わる
        //これは配列上のオブジェクトを作り直すことによって実現している。
        for(var i=0; i<semiconductor.length; i++){  //すべての配列の要素に対して処理していく
            if(semiconductor[i].hit(mx, my)){       //当たり判定
                var before = semiconductor[i].constructor.name;
                if(semiconductor[i] instanceof Question){ //当たったのが？オブジェクトなら
                    var w = semiconductor[i];             //？オブジェクトをいったん退避し、
                    semiconductor[i] = new And(w.x, w.y);  //同一座標にANDオブジェクトを生成
                    semiconductor[i].connect(w.in1, w.in2, w.out1);  //接続をしなおして、
                    semiconductor[i].turn();   //通電状態も更新する
                }else if(semiconductor[i] instanceof And){ //当たったのがANDオブジェクトなら・・・以下、同様
                    var w = semiconductor[i];
                    semiconductor[i] = new Or(w.x, w.y);
                    semiconductor[i].connect(w.in1, w.in2, w.out1);
                    semiconductor[i].turn();
                }else if(semiconductor[i] instanceof Or){
                    var w = semiconductor[i];
                    semiconductor[i] = new Question(w.x, w.y);
                    semiconductor[i].connect(w.in1, w.in2, w.out1);
                    semiconductor[i].turn();
                }else if(semiconductor[i] instanceof Not){
                    var w = semiconductor[i];
                    semiconductor[i] = new NotQuestion(w.x, w.y);
                    semiconductor[i].connect(w.in1, w.out1);
                    semiconductor[i].turn();
                }else if(semiconductor[i] instanceof NotQuestion){
                    var w = semiconductor[i];
                    semiconductor[i] = new Not(w.x, w.y);
                    semiconductor[i].connect(w.in1, w.out1);
                    semiconductor[i].turn();
                }
                var after = semiconductor[i].constructor.name;
                log("toggle",i,before,after);
            }
        };
        
        //入力電球や論理ゲートは操作で切り替えられるということを明示したいため、
        //カーソルが当たっている場合は選択されているとし色を変える
        //そのための当たり判定と選択状態の設定を行う処理。
        input.forEach(function(value){
            if(value.hit(mx, my)){value.selected = true;}else{value.selected = false;}
        });
        semiconductor.forEach(function(value){
            if(value.hit(mx, my)){value.selected = true;}else{value.selected = false;}
        });

    };

    //マウスカーソルが動いたときの処理
    a_canvas.onmousemove = function(event) {
        // Canvas上のマウス座標を保存する
        var bb = a_canvas.getBoundingClientRect();
        mx = (event.clientX - bb.left);
        my = (event.clientY - bb.top);

        //入力電球や論理ゲートは操作で切り替えられるということを明示したいため、
        //カーソルが当たっている場合は選択されているとし色を変える
        //そのための当たり判定と選択状態の設定を行う処理。
        input.forEach(function(value){
            if(value.hit(mx, my)){value.selected = true;}else{value.selected = false;}
        });
        semiconductor.forEach(function(value){
            if(value.hit(mx, my)){value.selected = true;}else{value.selected = false;}
        });
    };

    $('#check-button').on('click', e => {
        if(!checkFlg){
            checkFlg = true;
	        log("check","","","");
	        sendLog();
	        check(0,input, output);
        }
    });

});
