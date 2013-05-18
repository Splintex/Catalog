_dp_stat = {
    // User id
    _stat_uid: '_dp_stat_uid',
    // Session id
    _stat_sid: '_dp_stat_sid',
    // Priveus page id
    _stat_pid: '_dp_stat_pid',
    _stat_act: false,
    _options: {},
    init: function(options) {
        _dp_stat._options = options;
        _dp_stat._options.uid = _dp_stat._readCookie(_dp_stat._stat_uid);
        if (_dp_stat._options.uid != null) {
            _dp_stat._stat_act = true;
            _dp_stat._options.sid = _dp_stat._readCookie(_dp_stat._stat_sid);
            if (_dp_stat._options.sid == null) {
                _dp_stat._options.sid = _dp_stat._generateUniqueId();
                _dp_stat._createCookie(_dp_stat._stat_sid,_dp_stat._options.sid,0); 
            }
            _dp_stat._options.pid = _dp_stat._generateUniqueId();
            _dp_stat._options.path = document.location.href;
            _dp_stat._options.useragent = navigator.userAgent;
            _dp_stat._sendRequest();
        }
    },
    _createCookie: function(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*86400000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+value+expires+"; path=/";
    },    
    _readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
        }
        return null;
    },
    _sendRequest: function() {
        var str = new Array();
        for(var key in _dp_stat._options){
            str.push(key+'='+_dp_stat._rawurlencode(_dp_stat._options[key]));
        }
        str = str.join('&',str);
        var b = document.getElementsByTagName('body');
        var i = document.createElement('img');
        i.setAttribute('src','http://gophotoweb.ru/stat/?'+str);
        i.setAttribute('style', 'width: 0px; height: 0px; paddign: 0; mergin: 0;');
        b[0].appendChild(i);   
        _dp_stat._stat_act = false;
    },
    _rawurlencode: function(str) {
        str = (str + '').toString();
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');    
    },
    _generateUniqueId: function() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
};
_dp_stat.init(_dp_options);