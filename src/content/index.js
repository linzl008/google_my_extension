import {
    Message,
    MessageBox
} from 'element-ui';

// 通过Chrome插件的API加载字体文件
(function insertElementIcons() {
    let elementIcons = document.createElement('style')
    elementIcons.type = 'text/css';
    elementIcons.textContent = `
        @font-face {
            font-family: "element-icons";
            src: url('${ window.chrome.extension.getURL("fonts/element-icons.woff")}') format('woff'),
            url('${ window.chrome.extension.getURL("fonts/element-icons.ttf ")}') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        }
    `
    document.head.appendChild(elementIcons);
    todoTask();
    setWorkSite()
})();

function todoTask(){
    window.chrome.storage.sync.get('lzlGlobalUseCover', function(data) {
        if(data.lzlGlobalUseCover){
            window.chrome.storage.sync.get('lzlGlobalUseCoverOpacity',function(opacity){
                setCover((opacity.lzlGlobalUseCoverOpacity|| 0)/100);
            })
        }
    });
}

window.chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    // if(request.cmd == 'test') alert(request.value);
    dispatchMyEvent(request, sender, sendResponse)
    sendResponse(request.cmd+' end！');
});
window.addEventListener("message", function(e)
{
    dispatchMyEvent(e.data);
}, false);
function dispatchMyEvent(request) {
    // Message.info('dispatchMyEvent')
    switch(request.cmd ){
        case 'test':
            alert(request.value);
            break;
        case 'setCover':
            setCover(request.value);
            break;
    }
}
function setCover(opacity) {
    console.log('setCover');
    let myCoverDialog = document.getElementsByClassName('lzl-dialog')[0];
    if(myCoverDialog){
        myCoverDialog.style.outlineColor = 'rgba(0,0,0,' + opacity + ')';
    }else{
        let div = document.createElement('div');
        div.className = 'lzl-dialog'
        div.setAttribute('style', 'position:fixed;top:0;left:0;outline:5000px solid;z-index:99999;');
        document.body.appendChild(div);
        div.style.outlineColor = 'rgba(0,0,0,' + opacity + ')';
    }
}

/**
 * 设置小说网站的背景
 */
function setWorkSite() {
    // https://m.uctxt.com/
    if(window.location.href.indexOf('https://m.uctxt.com/')>=0){
        window.onload = function(){
                document.getElementById('BookBody').style.background = 'none'
                document.getElementById('BookTitle').style.fontWeight = 'normal'
        }
    }
}
