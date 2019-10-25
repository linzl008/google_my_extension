
function regex() {
    // 匹配邮箱
    let mail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$

    // (新)匹配手机号
    let phone = /^1[0-9]{10}$/;

    // 匹配8-16位数字和字母密码的正则表达式
    let passwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

    // 匹配国内电话号码 0510-4305211
    let telephone = /\d{3}-\d{8}|\d{4}-\d{7}/;

    // 匹配身份证号码
    let ID =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

    // 匹配腾讯QQ号
    let QQ = /[1-9][0-9]{4,}/;

    // 匹配ip地址
    let IP = /\d+\.\d+\.\d+\.\d+/;

    // 匹配中文
    let Chinese = /^[\u4e00-\u9fa5]*$/;
}

function navigatorTest() {
    let isWechat = /micromessenger/i.test(navigator.userAgent),
        isWeibo = /weibo/i.test(navigator.userAgent),
        isQQ = /qq\//i.test(navigator.userAgent),
        isIOS = /(iphone|ipod|ipad|ios)/i.test(navigator.userAgent),
        isAndroid = /android/i.test(navigator.userAgent);
}
/**
 * 节流函数--规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
 */
function throttle(fun, delay) {
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
            last = now
            fun.apply(that,_args)
        }
    }
}

/**
 * 防抖函数--在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 */
function debounce(fun, delay) {
    return function (args) {
        let that = this
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, args)
        }, delay)
    }
}