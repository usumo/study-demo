$.ajaxSetup({
  cache: false
});
document.oncontextmenu = function () {
  return false;
}
var jingjiaconstants = {
  JINGJIAFANGSHI_加价: "1",
  JINGJIAFANGSHI_减价: "-1",
  JINGJIAFANGSHI_荷兰式: "2",
  JINGJIAFANGSHI_一次性: "3",
  PROJECTSTATUS_尚未开始: "0",
  PROJECTSTATUS_正在竞价: "1",
  PROJECTSTATUS_延时竞价: "2",
  PROJECTSTATUS_竞价结束: "3",
  PROJECTSTATUS_竞价暂停: "4",
  PROJECTSTATUS_询问期: "5",
  PROJECTSTATUS_熔断价询问期: "6",
  PROJECTSTATUS_熔断价竞价期a: "7",
  BIDPROCESS_公开竞价公司: "1",
  BIDPROCESS_公开竞价价格: "2",
  STEPMODE_按金额: "1",
  STEPMODE_按百分比: "2",
  YES: "1",
  NO: "0"
};
var browsertips = ['fui/js/lib/browsertips_new/browsertips.js'];
SrcBoot.output(browsertips);
// 解决ie8 Object.keys兼容性
var DONT_ENUM = "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(","),
  hasOwn = ({}).hasOwnProperty;
for (var i in {
    toString: 1
  }) {
  DONT_ENUM = false;
}

Object.keys = Object.keys || function (obj) {
  var result = [];
  for (var key in obj)
    if (hasOwn.call(obj, key)) {
      result.push(key);
    }
  if (DONT_ENUM && obj) {
    for (var i = 0; key = DONT_ENUM[i++];) {
      if (hasOwn.call(obj, key)) {
        result.push(key);
      }
    }
  }
  return result;
};
var jingjiacore = function (args) {
  var that = this;
  this.g = {
    timeformat: "yyyy-MM-dd HH:mm:ss",
    numberprecision: 2, // 现竞价表中新增了金额精度字段,如果页面前台传了numberprecision参数，则会覆写这边的数值；如果没有，则取这边的默认值
    // edit by czy 2018-01-15
    pushmessage: true,
    noinput: true,
    finalAlertCount: 0
  };
  this.controls = {
    $endtimetitle: $('#endtimetitle'),
    $biddercount: $('#biddercount'),
    $inter: $('.inter'),
    $servertimeControl: $('#servertime'),
    $endingtimeControl: $('.ending-time'),
    $showjingjiastatus: $('#showjingjiastatus'),
    $shade9: $("#shade9")
  };
  // 初始化时间控件
  this.initTimeControl = function () {
    // 倒计时控件全部缓存，提高效率
    var $day = that.controls.$endingtimeControl.find('.day'),
      $hour = that.controls.$endingtimeControl.find('.hour'),
      $minute = that.controls.$endingtimeControl.find('.minute'),
      $second = that.controls.$endingtimeControl
      .find('.second');
    (that.g.srvClock.onZeroTick || (that.g.srvClock.onZeroTick = function () {
      if (that.g.projectstatus == '3')
        return;
      window.setTimeout(function () {
        var endingtime = that.g.srvClock.get_DaoJiTime(that.g.projectstatus, that.g.starttime, that.g.planendtime, that.g.pausetime);
        if (that.g.projectstatus != jingjiaconstants.PROJECTSTATUS_竞价结束 && that.g.projectstatus != jingjiaconstants.PROJECTSTATUS_竞价暂停 && endingtime && endingtime.d == '00' &&
          endingtime.h == '00' && endingtime.m == '00' && endingtime.s == '00') {
          window.location.reload();
        }
      }, 3000);
    }));

    // 显示倒计时和服务器时间
    (function showEndingtime() {
      that.controls.$servertimeControl.text(that.g.srvClock.get_ServerTime(that.g.timeformat));
      var endingtime = that.g.srvClock.get_DaoJiTime(that.g.projectstatus, that.g.starttime, that.g.planendtime, that.g.pausetime);
      $day.text(endingtime.d);
      $hour.text(endingtime.h);
      $minute.text(endingtime.m);
      $second.text(endingtime.s);
      window.setTimeout(showEndingtime, 500);
    })();
  };

  // add by wxf 2017/09/23 保持session连接
  this.keepConnection = function () {
    (function talk() {
      epoint.execute('keepConnection', null, null, function (ret) {}, true);
      console.log("keepConnection:talk");
      window.setTimeout(talk, 5 * 60 * 1000);
    })();
  }
  var onError = false;
  var postStart = {},
    postQueue = 0;
  $.extend(that.g, args);
  if (!that.g.numberprecision && that.g.numberprecision != 0) {
    that.g.numberprecision = 2;
  }
  this.init = function () {
    // 初始化状态区域
    this.changeStatus(that.g.projectstatus);
    // 初始化时间控件
    that.initTimeControl();
    this.keepConnection();
    epoint.showLoading();
    var isfrmclose = false;
    window.onbeforeunload = function () {
      isfrmclose = true;
    };
    var transport = 'websocket';
    // 注册request
    var request = {
      url: window.location.protocol + "//" + window.location.host + _rootPath + "/websocket/ztb/jingjia",
      contentType: "application/json",
      logLevel: 'info',
      transport: 'websocket',
      fallbackTransport: 'long-polling',
      headers: {
        "danWeiGuid": that.g.danweiguid,
        "clientGuid": that.g.clientguid
      }
    };
    // 监听连接打开
    request.onOpen = function (response) {
      transport = response.transport;
      // 用于唯一标识本次连接，有些消息只需要单独发给客户端，不需要广播的，用此进行标识
      that.uuid = response.request.uuid;
      // add by wxf 低概率出现uuid未获取到的情况，导致无法收到握手广播，此处需要重新订阅一下
      if (!that.uuid) {
        isfrmclose = true;
        socket.unsubscribe();
        that.subSocket = socket.subscribe(request);
        return;
      }
      isfrmclose = false;
      // 发送初始信息
      that.heartBeat('Enter');
      onError = false;
    };
    // 监听连接关闭
    request.onClose = function (response) {
      if (!isfrmclose) {
        epoint.alert("您已断线，请尝试重新刷新页面！");
      }
    };
    request.onError = function (response) {
      if (!onError) {
        epoint.alert('您与服务器的连接已中断，请尝试重新刷新页面！');
        onError = true;
      }
    };
    // 监听服务端发送的数据
    request.onMessage = function (response) {
      var msg = response.responseBody;
      if (!msg)
        return;
      // 注意：在正常WebSocket连接中，一个json服务端会推送一次，所以msgStr一定是个json格式的字符串；
      // 在长轮询中，一次请求可能会取到多个json，但是并不是以数组格式返回，而是简单的拼接
      // eg:在服务端推送了{"text","你好"}和{"text","谢谢"}两个json，如果在同一次轮需被获取到msgStr的格式是{"text","你好"}{"text","谢谢"}
      // 在下面需要对长轮询取到的消息做处理，转成数组格式的字符串，然后进行操作。
      if (transport == "long-polling") {
        // 对长轮询消息重新处理，防止意料之外的消息格式导致解析失败 by wxf 2019年1月
        msg = that.dealPollingMsg(msg);
      }
      msg = JSON.parse(msg);
      if (!(msg instanceof Array)) {
        msg = [msg];
      }
      for (var i = 0; i < msg.length; i++) {
        onMessage(msg[i]);
      }
    };
    // websocket客户端
    var socket = atmosphere;
    // 建立连接，异步执行
    that.subSocket = socket.subscribe(request);
    var onMessage = function (msg) {
      if (msg.uuid && msg.uuid != that.uuid)
        return;
      if (msg.flag == 0) {
        // 表示服务器端接收到客户端标识信息后推送的响应
        that.onConnected && that.onConnected();
        window.setTimeout(function () {
          that.heartBeatEnd(msg, that.g.bdguid);
        }, 1000);
        // that.heartBeatEnd(msg, that.g.bdguid);
        // 每15秒发一次心跳检测包
        window.setInterval(function () {
          that.heartBeat('Check');
        }, 15000);
        return;
      } else if (msg.flag == 8) {
        that.controls.$biddercount.text(msg.t);
      } else if (msg.flag == 99) {
        window.setTimeout(function () {
          that.heartBeatEnd(msg, that.g.bdguid);
        }, 1000);
        // that.heartBeatEnd(msg, that.g.bdguid);
        return;
      }
      // modify by wxf 2017/09/22
      // 消息通过clientguid过滤
      if (that.g.clientguid.indexOf(msg.clientGuid) < 0) {
        return; // 非本项目的消息，不接受处理
      }
      // 竞价服务异常通知
      if (msg.flag == 9) {
        var message = msg.t;
        // 根据tip来判断是否接收过消息
        var tip9 = $(".mini-tips-tip9");
        if (message == 'disconnect') {
          if (tip9.length <= 0) {
            that.controls.$shade9.show();
            epoint.showTips('检测到竞价服务连接断开，正在尝试重新连接。', {
              state: "tip9",
              x: "center",
              y: "center",
              timeout: 0
            });
          }
        }
        if (message == 'reconnect') {
          if (tip9.length > 0) {
            that.controls.$shade9.hide();
            tip9.remove();
            epoint.showTips('竞价服务连接成功。', {
              state: "default",
              x: "center",
              y: "center",
              timeout: 3000
            });
          }
        }
        return;
      }
      if (msg.danWeiGuid && msg.danWeiGuid != that.g.danweiguid && "led_frame" != that.g.danweiguid)
        return; // 非本单位消息，不接受处理
      that.onMessage(msg);
    }
  };
  // 报价历史行
  this.getBaoJiaRowData = function (bj) {
    var BJTime = fullTime = time = bj.baojiadate;
    if (time && (time = new Date(time)) && time != 'Invalid Date') {
      var a = BJTime.toString().substring(BJTime.toString().length - 3);
      if (a < 100) {
        a = '.' + a;
        BJTime = time.format("HH:mm:ss") + a;
        fullTime = time.format("yyyy-MM-dd HH:mm:ss") + a;
      } else {
        BJTime = time.format("HH:mm:ss.SSS");
        fullTime = time.format("yyyy-MM-dd HH:mm:ss.SSS");
      }
    }
    // modify by wxf 新增一个标识符：toubiaorenno + bjtime 作为过滤重复报价时的判断条件
    var li = '<li liflag="' + bj.toubiaorenno + BJTime + '" class="' + (bj.toubiaorenguid == that.g.danweiguid ? 'cur ' : '') + 'clearfix"><span class="num" title=' +
      (bj.toubiaorenguid == that.g.danweiguid ? (bj.toubiaorenname || '') : '') + '>' + bj.toubiaorenno + '</span> <span class="price">' +
      commafy(bj.toubiaorenprice, that.g.numberprecision) + '</span> <span class="time" title="' + fullTime + '">' + BJTime + '</span></li>';
    return li;
  };
  this.calculate = function (num, precision) {
    precision || (precision = (that.g.numberprecision ? that.g.numberprecision : 2));
    return commonPrecision(num, precision);
  };
  this.heartBeat = function (type) {
    // 断线刷新功能（判断心跳数组长度） by wxf
    if (postStart && Object.keys(postStart).length > 1) {
      window.location.reload(false);
      return;
    }

    postStart["heartBeat" + postQueue] = new Date();
    that.subSocket.push(JSON.stringify({
      "postQueue": postQueue,
      "Type": type,
      "biaoDiGuids": that.g.biaodiguid,
      "danWeiGuid": that.g.danweiguid,
      "clientGuid": that.g.clientguid,
      "uuid": that.uuid
    }));
    postQueue++;
  };

  this.heartBeatEnd = function (msg, bdguid) {
    // 接收在线用户数量 by wxf 2017年8月31日
    that.controls.$biddercount.text(msg.biddercount);
    // 修复总人数超过10人，在线人数不足10人时右上角人数显示错误的问题 by wxf 2019年1月
    if (that.controls.$allcount && parseInt(that.controls.$biddercount.html()) > parseInt(that.controls.$allcount.html())) {
      // 这样好像就不用请求后台了.. 先这样
      that.controls.$allcount.html(that.controls.$biddercount.html());
    }
    // 本地竞价信息与缓存竞价信息作比较 by wxf
    var topDataArr = null;
    var proinfolist = msg.proinfolist;
    // 轮次报价不做判定
    // add by wxf 荷兰式和一次性不做判定
    if (that.g.delayedtype != '2' && that.g.jingjiafangshi != jingjiaconstants.JINGJIAFANGSHI_荷兰式 && that.g.jingjiafangshi != jingjiaconstants.JINGJIAFANGSHI_一次性 && msg.topData &&
      msg.topData.length > 0) {
      topDataArr = msg.topData;
      var topData;
      for (var i = 0; i < topDataArr.length; i++) {
        if (topDataArr[i].biaodiguid == bdguid) {
          topData = topDataArr[i];
        }
      }
      if (topData && topData.toubiaorenprice && topData.toubiaorenguid && '' != that.g.danweiguid) {
        // 1.如果服务器当前最高报价与本地不同步 则需要刷新
        // 加价 判断客户端小于服务端时刷新
        // 减价 判断客户端大于服务端时刷新
        if ((that.calculate(topData.toubiaorenprice) > that.g.maxquoteprice && that.g.jingjiafangshi == jingjiaconstants.JINGJIAFANGSHI_加价) ||
          (that.calculate(topData.toubiaorenprice) < that.g.maxquoteprice && that.g.jingjiafangshi == jingjiaconstants.JINGJIAFANGSHI_减价)) {
          window.location.reload(false);
          return;
        }
        // 2.如果服务器当前最高报价与本地同步 但是报价的danweiguid不一致 则需要刷新
        else if (that.calculate(topData.toubiaorenprice) == that.g.maxquoteprice && topData.toubiaorenguid != that.g.toppricedanweiguid) {
          window.location.reload(false);
          return;
        }
      }
    }
    if (proinfolist && '' != that.g.danweiguid) {
      var proinfo;
      for (var i = 0; i < proinfolist.length; i++) {
        if (proinfolist[i].biaodiguid == bdguid) {
          proinfo = proinfolist[i];
        }
      }
      if (proinfo && proinfo.planendtime && proinfo.projectstatus) {
        var timestr = that.g.planendtime instanceof Date ? that.g.planendtime.getTime() : new Date(that.g.planendtime).getTime();
        timestr = timestr.toString();
        var timestr2 = proinfo.planendtime.toString();
        if (timestr.substring(0, timestr.length - 3) < timestr2.substring(0, timestr2.length - 3)) {
          window.location.reload(false);
          return;
        }
        if (that.g.projectstatus != proinfo.projectstatus) {
          window.location.reload(false);
          return;
        }
      }
    }
    // 因为heartBeatEnd在一秒后才执行，所以应该减去1000毫秒 by wxf
    var postEnd = new Date(new Date().getTime() - 1000);
    var serverTime = msg.t;
    var delay = (postEnd - postStart["heartBeat" + msg.q]) / 2; // 假设发送和接收两个过程各占一半时间，服务器时间到达客户端的延时实际是接收过程的时间。
    var serverNow = serverTime + delay; // 这样算出来的服务器时间是没有延时的，that.g.srvClock中delay设为0
    var diff = serverNow - postEnd.getTime();
    that.g.srvClock.set_ServerTime(serverNow, diff, 0); // delay设为0
    delete postStart["heartBeat" + msg.q];

    // 设置网络状况，5格信号
    var width;
    if (delay <= 50) {
      width = '100%';
    } else if (delay <= 100) {
      width = '80%';
    } else if (delay <= 150) {
      width = '60%';
    } else if (delay <= 200) {
      width = '40%';
    } else {
      width = '20%';
    }
    that.controls.$inter.width(width);
  };
  this.changeStatus = function (projectstatus) {
    if (projectstatus == "3" || projectstatus == "竞价结束") {
      that.controls.$endtimetitle.text("剩余时间：");
    } else {
      if (projectstatus == "0" || projectstatus == "尚未开始") {
        that.controls.$endtimetitle.text("距竞价开始：");
      } else if (projectstatus == "2" || projectstatus == "延时竞价") {
        that.controls.$endtimetitle.text("距延时竞价结束：");
      } else if (projectstatus == "6" || projectstatus == "熔断价询问期") {
        that.controls.$endtimetitle.text("距新指标竞价开始：");
      } else {
        if (!(that.g.jingjiafangshi == '2' || that.g.jingjiafangshi == '3')) {
          if (projectstatus == '4' && that.g.orgprojectstatus == '0') {
            that.controls.$endtimetitle.text("距竞价开始：");
          } else if (projectstatus == '4' && that.g.orgprojectstatus == '6') {
            that.controls.$endtimetitle.text("距新指标竞价开始：");
          } else {
            if ((projectstatus == '1' || (projectstatus == '4' && that.g.orgprojectstatus == '1')) &&
              (that.g.projectjiaoyitype == 'T' || that.g.projectjiaoyitype == 'KQ')) {
              that.controls.$endtimetitle.text("距询问期开始：");
            } else {
              that.controls.$endtimetitle.text("距竞价结束剩余时间：");
            }
          }
        } else {
          if (that.g.orgprojectstatus == '0' && projectstatus == '4') {
            that.controls.$endtimetitle.text("距竞价开始：");
          } else {
            that.controls.$endtimetitle.text("距竞价结束：");
          }
        }
      }
    }
  };
  this.RefreshHistory_CS = function (callback) { // 刷新历史数据
    if (!that.controls.$recordUl.length) {
      callback();
      return;
    }
    var biaodiguid = that.g.biaodiguid;
    if (that.g.bdguid) {
      biaodiguid = that.g.bdguid;
    }
    var requestData = JSON.stringify({
      biaodiguid: biaodiguid,
      num: that.g.baojiahistorysize
    });

    epoint.execute("GetBaoJiaHistroy", null, [requestData], function (data) {
      if (data.status) {
        that.RefreshHistory(data.userArea);
        callback();
      } else {
        // epoint.alert(data.description);
      }
    });
  };
  this.maskingout = function () {
    that.controls.$shade.hide();
    // 要先取消蒙版
    if (that.g.projectstatus == "3") {
      that.controls.$endtimetitle.text('距竞价结束时间：');
      // 已经弹出提示后不再处理
      if (that.g.finalAlertCount < 0)
        return;
      if (that.g.isliubiao) {
        that.controls.$shade.filter('.thankfor').show();
        that.g.finalAlertCount = -1;
      } else if (that.g.lasttoubiaorenguid) {
        if (that.g.lasttoubiaorenguid == that.g.danweiguid) {
          that.controls.$shade.filter('.dealfor').show();
        } else {
          that.controls.$shade.filter('.thankfor').show();
        }
        that.g.finalAlertCount = -1;
      } else {
        if (that.g.finalAlertCount++ > 5) {
          // 如果重计了5次，说明与服务器断开连接了，未收到竞价结果消息，重新刷新页面
          window.location = window.location;
        }
        setTimeout(function () {
          that.maskingout;
        }, 1000);
      }
    } else if (that.g.projectstatus == "4" && !(that.g.orgprojectstatus == '5') && !(that.g.orgprojectstatus == '6')) {
      that.controls.$shade.filter('.pausefor').show();
    } else if (that.g.projectstatus == '2') {
      that.controls.$endtimetitle.text('距延时竞价结束：');
    } else if (that.g.projectstatus == '1') {
      // 荷兰式一次性竞价没有延时竞价
      if (that.g.jingjiafangshi == '3' || that.g.jingjiafangshi == '2') {
        that.controls.$endtimetitle.text('距竞价结束：');
      } else {
        if ((that.g.projectstatus == '1' || (that.g.projectstatus == '4' && that.g.orgprojectstatus == '1')) &&
          (that.g.projectjiaoyitype == 'T' || that.g.projectjiaoyitype == 'KQ')) {
          that.controls.$endtimetitle.text("距询问期开始：");
        } else {
          that.controls.$endtimetitle.text('距竞价结束剩余时间：');
        }
      }
    } else if (that.g.projectstatus == '0') {
      that.controls.$endtimetitle.text('距竞价开始：');
    } else if (that.g.projectstatus == '5' || (that.g.projectstatus == '4' && that.g.orgprojectstatus == '5')) {
      that.controls.$showjingjiastatus.text('询问期');
      if (!that.g.myprice) {
        // 委托报价时 myprice不会有值，所以需要再次确认下是否报过价
        epoint.execute('getIsBaoJia', null, [that.g.biaodiguid], function (data) {
          if (data == '1') {
            window.location.replace('./delay-bidding?BiaoDiGuid=' + that.g.biaodiguid + '&DanWeiGuid=' + that.g.danweiguid);
          } else {
            epoint.alertAndClose("由于您在自由竞价阶段未报过价，无法进入延时竞价");
            return;
          }
        });
      } else if (that.g.isfail) {
        epoint.alertAndClose("因竞价人数不足规定，项目流拍");
        return;
      } else {
        window.location.replace('./delay-bidding?BiaoDiGuid=' + that.g.biaodiguid + '&DanWeiGuid=' + that.g.danweiguid);
      }
    } else if (that.g.projectstatus == '6' || (that.g.projectstatus == '4' && that.g.orgprojectstatus == '6')) {
      that.controls.$showjingjiastatus.text('熔断价询问期');
      that.controls.$endtimetitle.text('距熔断价竞价期开始：');
      window.location.replace('./delay-fusebidding?BiaoDiGuid=' + that.g.biaodiguid + '&DanWeiGuid=' + that.g.danweiguid);
    } else if (that.g.projectstatus == '7') {
      that.controls.$endtimetitle.text('距熔断价竞价期结束：');
      that.controls.$showjingjiastatus.text('熔断价竞价期');
    }
  };
  this.pushBaojiaEvent = function (e) {
    if (that.g.jingjiafangshi == '2') {
      that.g.myprice = that.g.maxquoteprice;
      that.SendPrice();
      return;
    }
    if (that.g.jingjiafangshi == '3') {
      checkValid(that.controls.$myprice[0], that.g.numberprecision, function (val) {
        that.g.myprice = val;
        //[start] %报价的报价必须大于零小于等于100 Mod By JunLee 2019-03-01
        if (that.g.currencyunit && that.g.currencyunit == '%') {
          if (that.g.myprice <= 0 || that.g.myprice > 100) {
            epoint.alert('报价必须大于0且不能超过100。');
            return;
          }
        }
        //[end]
        that.SendPrice();
      });
      return;
    }
    if (!checkValid(that.controls.$myprice[0], that.g.numberprecision, function (val) {
        that.g.myprice = val;
      })) {
      return;
    }
    var $this = $(this),
      isUsePriority = 0;
    if ($this.hasClass('btnpriority')) {
      // 先判定是否具备优先权。
      if (!that.g.isyouxian) {
        epoint.alert('您不能使用优先权报价。');
        return;
      } else if (that.g.toppricedanweiguid == that.g.danweiguid) {
        epoint.alert('您已经是最' + that.g.toppricetitle + '报价了，请在竞价时间内待其他单位报价后再尝试报价。');
        return;
      } else if (!that.controls.$topprice.text()) {
        epoint.alert('首次报价不能行使优先权。');
        return;
      }
      isUsePriority = 1;
      that.setMyPrice(0);
    } else {
      if (that.g.toppricedanweiguid == that.g.danweiguid && !that.g.maxallow) {
        epoint.alert('您已经是最' + that.g.toppricetitle + '报价了，请在竞价时间内待其他单位报价后再尝试报价。');
        return;
      }
      if ($this.hasClass('btnfast')) {
        that.setMyPrice(1);
      }
    }

    //[start] %报价的报价必须大于零小于等于100 Mod By JunLee 2019-03-01
    if (that.g.currencyunit && that.g.currencyunit == '%') {
      if (that.g.myprice <= 0 || that.g.myprice > 100) {
        epoint.alert('报价必须大于0且不能超过100。');
        return;
      }
    } else {
      if (that.g.myprice <= 0) {
        epoint.alert('报价不能小于零。');
        return;
      }
    }
    //[end]

    epoint.confirm("您出价：" + commafy(that.g.myprice, that.g.numberprecision) + that.g.currencyunit + "，一旦提交不能撤回。", null, function () {
      that.SendPrice(isUsePriority);
    });
  };
  this.setMyPrice = function (step) {
    var myprice = typeof (that.g.maxquoteprice) != 'number' ? that.g.fromprice : that.g.maxquoteprice;
    if (step != 0 && step != '0') {
      // 减价方式需要换成负数计算
      if (that.g.jingjiafangshi == '-1') {
        step = 0 - step;
      }
      if (that.g.stepmode == jingjiaconstants.STEPMODE_按百分比) {
        myprice += step * that.g.jingjiastep * myprice / 100;
      } else {
        myprice += step * that.g.jingjiastep;
      }
    }
    that.controls.$myprice.val(commafy(myprice, that.g.numberprecision));
    that.g.myprice = parseFloat(myprice).toFixed(that.g.numberprecision); // 去除浮点处理
  };
  this.PushBaoJiaInfo = function (requestData) {
    epoint.execute("PushBaoJiaInfo", null, [requestData], function (data) {
      if (data) {
        if (data.status) {
          if (that.g.jingjiafangshi == '2') {
            // 注释掉，不合理，pushbaojia成功不代表dealbaojia能成功，可能由于网络等原因导致失败
            // by wxf
            // that.g.toppricedanweiguid = that.g.danweiguid;
          } else if (that.g.jingjiafangshi == '3') {
            that.controls.$topprice.text(commafy(that.g.myprice, that.g.numberprecision));
            epoint.alert('报价提交成功！');
          }
          if (that.g.pushmessage && data.description) {
            epoint.showTips(data.description, {
              state: "default",
              x: "center",
              y: "center",
              timeout: 3000
            });
          }
        } else {
          epoint.showTips(data.description, {
            state: "default",
            x: "center",
            y: "center",
            timeout: 3000
          });
        }
      } else {
        epoint.alert('报价发送失败，请联系管理人员。');
      }
    });
  };
  this.dealPollingMsg = function (msg) {
    // 长轮询模式消息处理,兼容{}[]都存在的情况 by wxf
    // 重写替换规则，新规则如下:
    // 一、}{ ==> },{
    // 二、}[ ==> },
    // 三、][ ==> ,
    // 四、]{ ==> ,{
    // 替换完毕后继续处理字符串，确认首字符是[,末尾字符是]，如果不符合的话就需要手动拼接
    msg = msg.replace(/\}\{/g, '},{').replace(/\}\[/g, '},').replace(/\]\[/g, ',').replace(/\]\{/g, ',{');
    if (msg.indexOf('[') != 0) {
      // 此时首位缺字符
      msg = '[' + msg;
    }
    if (msg.lastIndexOf(']') != (msg.length - 1)) {
      // 此时末尾缺字符
      msg = msg + ']';
    }
    return msg;
  }
};
// 检查输入的报价是否有效
function checkValid(obj, n, callback) {
  try {
    obj.value = replaceAll(obj.value, ",", "");
    // 如果输入不是有效数字，进行float转换后提示替换
    if (!/^\d+(\.\d+)?$/.test(obj.value)) {
      if (obj.value == '' || obj.value == 'NaN') {
        obj.value = '';
        epoint.alert("请输入您的报价！");
        return false;
      }
      var val = parseFloat(obj.value);
      //
      if (!/^[+-]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/.test(val)) {
        epoint.alert("请输入您的报价金额！");
        return false;
      }
      if (val <= 0) {
        epoint.alert("您输入的报价必须大于0！");
        return false;
      }
      epoint.confirm('您是否想输入 ' + val, '', function (index) {
        // layer.close(index);
        obj.value = commafy(val, n);
        callback && callback(val);
        return true;
      }, function (index) {
        // layer.close(index);
        return false;
      });
    } else {
      // 如果输入是有效数字，检查小数位数是否合法，如果不合法提示替换
      if (obj.value > 999999999999.99) {
        epoint.alert("您输入的报价过大！");
        return false;
      }
      var val = parseFloat(obj.value);
      // [start] 兼容精度为0的情况 Modify By JunLee 2018-09-27
      if (n != 0) {
        var reg = new RegExp('^\\d+(\\.\\d{1,' + n + '})?$');
        if (!reg.test(obj.value)) {
          epoint.confirm('您输入的报价最多只能有' + n + '位小数。您是否想输入 ' + val.toFixed(n), '', function (index) {
            // layer.close(index);
            obj.value = commafy(val, n);
            // 修复bug：callback(val) -->
            // callback(parseFloat(obj.value))
            callback && callback(commonPrecision(val, n));
            return true;
          }, function (index) {
            // layer.close(index);
            return false;
          });
        }
      }

      obj.value = commafy(val, n);
      callback && callback(val);
      return true;
      // [end]
    }
  } catch (e) {
    epoint.alert('您输入的报价不是有效的数字，请确认。');
    return false;
  }
}

function checkKey(obj) {
  var keycode = event.keyCode;
  // 数字0-9可以任意输入；当输入框中不存在小数点的话，小数点可以输入，否则不能输入。
  return (keycode >= 48 && keycode <= 57) || (obj && obj.value.indexOf('.') < 0 && keycode == 46);
}

function commafy(num, precision) {
  var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
  if (num == null) {
    return "";
  }
  precision || (precision = 2);
  num = commonPrecision(num, precision);
  return num.toFixed(precision).replace(re, "$1,");
}

function showTip() {
  var tip = new mini.ToolTip();
  tip.set({
    target: document,
    selector: '.showtip',
    onbeforeopen: function (e) {
      e.cancel = false;
    },
    onopen: function (e) {
      var el = e.element;
      var o = $(el).attr("data-o");
      tip.setContent(o);
    }
  });
}

var agreeDialog;
// 检查是否同意竞价协议
function checkisAgree(isagree, danweiguid, biaodiguid) {
  if (isagree != '1' && !agreeDialog) {
    agreeDialog = top.epoint.openDialog('阅读协议', '../cqjyjingjia/agree?DanWeiGuid=' + danweiguid + '&BiaoDiGuid=' + biaodiguid, function (ret) {
      agreeDialog = null;
      if (ret == 'disagree') {
        epoint.closeDialog();
      }
    }, {
      showCloseButton: false
    });
  }
}

var replaceAll = function (s0, s1, s2) {
  return s0.toString().replace(new RegExp(s1, "gm"), s2);
}

//通用精度处理方法，本方法返回Number类型,请确保precision参数正确
var commonPrecision = function (num, precision) {
  precision = Math.pow(10, precision);
  return Math.round(Number(num) * precision) / precision;
}