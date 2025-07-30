/**
論理回路シミュレーター
*/

//######グローバル変数宣言#########################
var debug_msg = ""; //デバッグメッセージ
var falseStrokeStyle = '#333'; //通電してない論理ゲートの線の色
var falseLineWidth = 3*scale;  //通電してない論理ゲートの線の太さ
var falseFillStyle = '#666';   //通電してない論理ゲートの塗りつぶしの色
var trueStrokeStyle = '#666';  //通電してる論理ゲートの線の色
var trueLineWidth = 3*scale;   //通電してる論理ゲートの線の太
var trueFillStyle = '#666';    //通電してる論理ゲートの塗りつぶしの色
var selectedStrokeStyle = '#33F';  //カーソルが当たっている論理ゲートの線の色
var checkFlg = false;


//######ログ出力機能#############################

/**
 * ファイル形式をCSVかTSVから選択可能
 * いずれかをコメントアウトする
 */
var sepChar = ",";  //区切り文字(カンマ-CSV)
//var sepChar = "\t";  //区切り文字(タブ-TSV)

/**
 * ログサーバーによるリアルタイムログの出力機能
 * (サーバーにperlCGIによるファイル出力機能を動作させることで、
 *  操作ログはチェックボタンを押下したタイミングでサーバーに送信され、
 *  サーバーが全操作者のログを1ファイルに統合し、操作者の情報として端末IP列が追加される。)
 * 利用する場合は、logフォルダ内のcgiを機能させ、以下の変数に稼働させているURLを記述する。
 * 何も記述が無ければステップをクリアしたタイミングで、各クライアントが操作ログをダウンロードする動作となる。
 */
var logServer = ''
//var logServer = 'http://midori-st-sv/web/logic_circuit/log/'

/**
 * ヘッダ行の有無を選択可能
 * いずれかをコメントアウトする
 */
var logMessage = ""; //ヘッダ無し
//var logMessage = "time" + sepChar + "action" + sepChar + "target" + sepChar + "before" + sepChar + "after"; //ヘッダ有り
if(logServer!=""){logMessage="";}

