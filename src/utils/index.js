/*
 * @data 需要下载的数据
 * @filename 文件名
 * @type 下载的类型（现在的是json类型）
 */
export function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
//根据路径地址下载文件
export function downloadUrl(url) {
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.href = url;
  link.download = "template.xlsx";
  link.click();
  setTimeout(() => {
    if (link.remove) {
      link.remove();
    } else if (link.removeNode) {
      link.removeNode();
    }
  }, 20000);
}

//深度克隆
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

//万能时间格式转化封装
export function dateFormat(format, times) {
  //两个参数format是格式，times是时间戳
  var ret = "";
  var a,
    jsdate = times ? new Date(times) : new Date(); //获取时间戳
  var pad = function (n, c) {
    if ((n = n + "").length < c) {
      return new Array(++c - n.length).join("0") + n;
    } else {
      return n;
    }
  };
  var txt_weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var txt_ordin = {
    1: "st",
    2: "nd",
    3: "rd",
    21: "st",
    22: "nd",
    23: "rd",
    31: "st",
  };
  var txt_months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var f = {
    //获取天
    // Day
    d: function () {
      return pad(f.j(), 2);
    },
    D: function () {
      return f.l().substr(0, 3);
    },
    j: function () {
      return jsdate.getDate();
    },
    l: function () {
      return txt_weekdays[f.w()];
    },
    N: function () {
      return f.w() + 1;
    },
    S: function () {
      return txt_ordin[f.j()] ? txt_ordin[f.j()] : "th";
    },
    w: function () {
      return jsdate.getDay();
    },
    z: function () {
      return ((jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5) >> 0;
    },

    // Week
    W: function () {
      //获取周
      var a = f.z(),
        b = 364 + f.L() - a;
      var nd2,
        nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
      if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
        return 1;
      } else {
        if (a <= 2 && nd >= 4 && a >= 6 - nd) {
          nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
          return date("W", Math.round(nd2.getTime() / 1000));
        } else {
          return (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0;
        }
      }
    },

    // Month
    F: function () {
      return txt_months[f.n()];
    },
    m: function () {
      return pad(f.n(), 2);
    },
    M: function () {
      return f.F().substr(0, 3);
    },
    n: function () {
      return jsdate.getMonth() + 1;
    },
    t: function () {
      var n;
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L();
      } else {
        if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
          return 31;
        } else {
          return 30;
        }
      }
    },

    // Year
    L: function () {
      var y = f.Y();
      return !(y & 3) && (y % 1e2 || !(y % 4e2)) ? 1 : 0;
    },
    //o not supported yet
    Y: function () {
      return jsdate.getFullYear();
    },
    y: function () {
      return (jsdate.getFullYear() + "").slice(2);
    },

    // Time
    a: function () {
      return jsdate.getHours() > 11 ? "pm" : "am";
    },
    A: function () {
      return f.a().toUpperCase();
    },
    B: function () {
      // peter paul koch:
      var off = (jsdate.getTimezoneOffset() + 60) * 60;
      var theSeconds =
        jsdate.getHours() * 3600 +
        jsdate.getMinutes() * 60 +
        jsdate.getSeconds() +
        off;
      var beat = Math.floor(theSeconds / 86.4);
      if (beat > 1000) beat -= 1000;
      if (beat < 0) beat += 1000;
      if (String(beat).length == 1) beat = "00" + beat;
      if (String(beat).length == 2) beat = "0" + beat;
      return beat;
    },
    g: function () {
      return jsdate.getHours() % 12 || 12;
    },
    G: function () {
      return jsdate.getHours();
    },
    h: function () {
      return pad(f.g(), 2);
    },
    H: function () {
      return pad(jsdate.getHours(), 2);
    },
    i: function () {
      return pad(jsdate.getMinutes(), 2);
    },
    s: function () {
      return pad(jsdate.getSeconds(), 2);
    },
    O: function () {
      var t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4);
      if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
      else t = "+" + t;
      return t;
    },
    P: function () {
      var O = f.O();
      return O.substr(0, 3) + ":" + O.substr(3, 2);
    },
    c: function () {
      return (
        f.Y() +
        "-" +
        f.m() +
        "-" +
        f.d() +
        "T" +
        f.h() +
        ":" +
        f.i() +
        ":" +
        f.s() +
        f.P()
      );
    },
    U: function () {
      return Math.round(jsdate.getTime() / 1000);
    },
  };

  return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
    if (t != s) {
      ret = s;
    } else if (f[s]) {
      ret = f[s]();
    } else {
      ret = s;
    }
    return ret;
  });
}

// 禁止右键和检查
export const forbiddenRightClick = () => {
  //禁止F12
  document.onkeydown = function (event) {
    var winEvent = window.event;
    if (winEvent && winEvent.keyCode == 123) {
      event.keyCode = 0;
      event.returnValue = false;
    }
    if (winEvent && winEvent.keyCode == 13) {
      winEvent.keyCode = 505;
    }
  };

  //屏蔽右键菜单
  document.oncontextmenu = function (event) {
    if (window.event) {
      event = window.event;
    }
    try {
      var the = event.srcElement;
      if (
        !(
          (the.tagName == "INPUT" && the.type.toLowerCase() == "text") ||
          the.tagName == "TEXTAREA"
        )
      ) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };
};

export const getItem = (key) => {
  const value = localStorage.getItem(key);
  if (!value) return;
  const obj = JSON.parse(value);
  if (obj["expires"] && new Date().getTime() > obj["expires"]) {
    // 如果设置了有效期，且已过期，直接清楚
    localStorage.removeItem(key);
    return;
  }
  // 未设置有效期或设置了有效期但没有过期，直接将存储的数据返回
  return obj.value;
};