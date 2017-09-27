(function(){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('/js/xhr.js');
    document.head.appendChild(s);
})();
