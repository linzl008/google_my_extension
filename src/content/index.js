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
    // 注册panel
    console.log('register');
    // chrome.devtools.panels.create("Font Picker",
    //     "FontPicker.png",
    //     "panel.html",
    //     function(panel) {
    //     console.log(panel);
    //     }
    // );
})();

function todoTask(){
    window.chrome.storage.sync.get('lzlGlobalUseCover', function(data) {
        if(data.lzlGlobalUseCover){
            window.chrome.storage.sync.get('lzlGlobalUseCoverOpacity',function(opacity){
                setCover((opacity.lzlGlobalUseCoverOpacity|| 0)/100);
            })
        }
    });
    window.chrome.storage.sync.get('hideBaiDuAdvert', function(data) {
        if(Boolean(data.hideBaiDuAdvert)){
            setBaiDuAdvert(1,true);
        }
    });
}

window.chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    dispatchMyEvent(request, sender, sendResponse)
    sendResponse(request.cmd+' end！-');
});
window.addEventListener("message", function(e)
{
    dispatchMyEvent(e.data);
}, false);
function dispatchMyEvent(request) {
    switch(request.cmd ){
        case 'test':
            alert(request.value);
            break;
        case 'setCover':
            setCover(request.value);
            break;
        case 'checkBaiDuAdvert':
            setBaiDuAdvert(request.value);
            break;
    }
}

/**
 * 设置百度广告
 */
function setBaiDuAdvert(value,onload = true) {
    console.log('enter');
    if(!value) return
    if(window.location.href.indexOf(/www.baidu.com/)>=0){
        if(onload){
            setTimeout(()=>{
                removeAdvert()
            })
        }else{
            removeAdvert()
        }

    }
}
function removeAdvert() {
    var nodes = document.getElementsByClassName('ec_tuiguang_container')
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i].parentNode.parentNode;
        node.style.display = 'none'
    }
}

/**
 * 设置全局蒙层
 * */
function setCover(opacity) {
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
    if(window.location.href.indexOf('www.qianqianxsw.com')>=0){
        window.onload = function(){
                if(document.getElementsByClassName('navbar-fixed-top').length >0){
                    document.getElementsByClassName('navbar-fixed-top')[0].style.display = 'none'
                    document.getElementsByClassName('panel-heading')[0].style.display = 'none'
                }
                // document.getElementById('BookTitle').style.fontWeight = 'normal'
        }
    }
}
