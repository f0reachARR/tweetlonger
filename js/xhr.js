// XHR書き換えｺｺｶﾗ
var _original = window.XMLHttpRequest;
var target = [
    'onabort',
    'onerror',
    'onload',
    'onloadend',
    'onloadstart',
    'onreadystatechange',
    'onprogress',
    'ontimeout',
    'status',
    'statusText',
    'timeout',
    'readyState',
    'response',
    'responseText',
    'responseBody',
    'responseType',
    'responseURL',
    'responseXML',
    'withCredentials'
];

var methodTarget = [
    'removeEventListener',
    'addEventListener',
    'overrideMimeType',
    'getResponseHeader',
    'getAllResponseHeaders',
    'setRequestHeader',
    'abort'
];

var newXhr = function () {
    var xhr = new _original();
    var self = this;
    target.forEach(item => Object.defineProperty(self, item, {
        get: function () { return xhr[item]; },
        set: function (val) { xhr[item] = val; },
        enumerable: true,
        configurable: true
    }));
    self.open = function (method, url) {
        self._isTweetUrl = url.match(/\/i\/tweet\/create/);
        return xhr.open.apply(xhr, arguments);
    };
    self.send = function (fd) {
        if (self._isTweetUrl) {
            fd += '&weighted_character_count=true';
            return xhr.send.apply(xhr, [fd]);
        } else {
            return xhr.send.apply(xhr, arguments);
        }
    };
    methodTarget.forEach(function (m) {
        self[m] = xhr[m].bind(xhr);
    });
    self.UNSEND = 0;
    self.OPENED = 1;
    self.HEADER_RECEIVED = 2;
    self.LOADING = 3;
    self.DONE = 4;
};
newXhr.UNSEND = 0;
newXhr.OPENED = 1;
newXhr.HEADER_RECEIVED = 2;
newXhr.LOADING = 3;
newXhr.DONE = 4;

window.XMLHttpRequest = newXhr;


// XHR書き換えｺｺﾏﾃﾞ
// ツイートボタン書き換えｺｺｶﾗ
function setObserver() {
    let target = document.querySelector('.tweet-counter');
    if (!target) {
        setTimeout(setObserver, 1000);
        return;
    }
    new MutationObserver(items => {
        console.log(items);
        if (parseInt(document.querySelector('.tweet-counter').innerText, 10) >= -140) {
            let btn = document.querySelector('.tweet-action.js-tweet-btn');
            btn.removeAttribute('disabled');
            btn.classList.remove('disabled');
        }
    }).observe(target, { characterData: true, characterDataOldValue: true, subtree: true, childList: true });
}

setObserver();
// ツイートボタン書き換えｺｺﾏﾃﾞ