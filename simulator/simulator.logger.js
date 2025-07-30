//######ログ出力機能#############################
log = function(action, target, before, after){
    let date = new Date();
    var d1 = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '.' + date.getMilliseconds();
    logMessage = logMessage + d1 + sepChar + action + sepChar + target + sepChar + before + sepChar + after + "\n";
    //sendLog();
}
sendLog = function(){
    if(logServer != ""){
        $.post( logServer, 'step='+step+'&'+'dat='+logMessage );
        logMessage = "";
    }else{
        if (!logMessage) {
            alert("ログが空です");
            return;
        }
        const blob = new Blob([logMessage], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'log_step_'+step+'_'+clientID+'.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        logMessage = "";
    }
}
function getOrCreateClientID() {
    let id = localStorage.getItem('clientID');
    if (!id) {
        id = crypto.randomUUID();  // UUIDv4（例: "e4bde2f2-1234-4aaf-86e5-5a8e50c9842b"）
        localStorage.setItem('clientID', id);
    }
    return id;
}
const clientID = getOrCreateClientID();
window.addEventListener('DOMContentLoaded', () => {
    log("start", "", "", "");
});