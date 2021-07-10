var bidder = function (jingjiacore) {
  var that = jingjiacore;
  var args = {
    controls: {
      $btnpriority: $('.btnpriority'),
      $btnfast: $('.btnfast'),
      $btncommit: $('.btncommit'),
      $jingjiastep: $('#jingjiastep'),
      $allowfromprice: $('#allowfromprice'),
      $topprice: $('#topprice'),
      $isuseyouxian: $('#isuseyouxian'),
      $recordUl: $('.recordUl'),
      $msgUl: $('.msgUl'),
      $myprice: $('#myprice'),
      $footerleft: $('.box-footer .left span'),
      $footerright: $('.box-footer .right span'),
      $shade: $('.shade'),
      $topbidder: $('#topbidder'),
      $endingtimeControl: $('.ending-time'),
      $allcount: $('#allcount'),
      // [start]眉山个性化加入,手动输入倍数框
      $beishu: $('#beishu')
      // [end]
    },
    // [strat]眉山个性化,加入手动输入倍数,倍数控制在1~100 Add By JunLee 2018-03-01
    checkinput: function (obj) {
      obj.value = obj.value.replace(/[^0-9]+/, '');
      if (obj.value.substring(0, 1) == 0) {
        obj.value = obj.value.substring(1);
      } else if (obj.value > 100) {
        if (obj.value.substring(0, 3) == 100) {
          obj.value = 100;
        } else {
          obj.value = obj.value.substring(0, 2);
        }
      }
      if (obj.value >= 1 && obj.value <= 100) {
        that.setMyPrice(obj.value);
      }
    },
    // [end]
    onConnected: function () { // 连接后初始化
      that.RefreshHistory_CS(that.initControl);
    },
    initControl: function () { // 初始化页面控件操作
      if (that.g.isyouxian) {
        that.controls.$btnpriority.show();
        that.controls.$btnfast.removeClass('first2');
      } else {
        that.controls.$btnpriority.remove();
      }
      if (that.g.noinput) {
        that.controls.$myprice.attr('readonly', 'true');
      }
      epoint.hideLoading();
      that.maskingout();
      if (that.g.projectstatus != '1' && that.g.projectstatus != '2') {
        $('.price-multiple').off('click');
        $('.three-btn').on('click', 'button', function () {
          epoint.alert("竞价尚未开始，请竞价开始后报价！");
        });
        // $('.three-btn').off('click');
        return;
      }
      // 竞价阶梯点击事件
      $('.price-multiple').off('click').on('click', 'li', function (e) {
        that.setMyPrice($(this).attr('data-step'));
      });
      // 报价按钮点击事件
      $('.three-btn').off('click').on('click', 'button', that.pushBaojiaEvent);
      // [strat]眉山个性化,加入手动输入倍数,倍数控制在1~100 Add By JunLee 2018-03-01
      // 设置倍数输入框可输入
      if (that.controls.$beishu[0]) {
        that.controls.$beishu[0].readOnly = "";
      }
      // 倍数框输入事件
      that.controls.$beishu.keyup(function () {
        that.checkinput(this);
      });

      // 焦点移出倍数框事件,防止用键盘或输入法输入
      that.controls.$beishu.blur(function () {
        that.checkinput(this);
      });

      // 鼠标移出倍数框事件
      that.controls.$beishu.mouseout(function () {
        that.checkinput(this);
      });

      // 鼠标点击倍数框事件
      that.controls.$beishu.click(function () {
        that.checkinput(this);
      });
      // [end]
    },
    onMessage: function (msg) {
      if (msg.flag == "1") {
        // 项目基本信息
        epoint.refresh('@all', function (data) {
          that.g.callback(data);
          that.initControl();
        });
        // 初始化狀態區域
        // that.changeStatus(msg.t.info);
      } else if (msg.flag == "2") {
        // 最新报价
        var BaoJiaNewInfo = msg.t;
        if (BaoJiaNewInfo) {
          if (that.g.jingjiafangshi == '2') {
            that.g.maxquoteprice = BaoJiaNewInfo.info;
            that.controls.$topprice.text(commafy(that.g.maxquoteprice, that.g.numberprecision));
          } else {
            that.g.maxquoteprice = BaoJiaNewInfo.toubiaorenprice;
            that.controls.$topprice.text(commafy(that.g.maxquoteprice, that.g.numberprecision));
            that.controls.$topbidder.text(BaoJiaNewInfo.toubiaorenno);
            BaoJiaNewInfo.isuseyouxian == "1" ? that.controls.$isuseyouxian.show() : that.controls.$isuseyouxian.hide();
            that.g.toppricedanweiguid = BaoJiaNewInfo.toubiaorenguid;
            // 需要重绘竞价阶梯，剔除0倍的阶梯
            that.InitJingjiaStep();
            if (that.controls.$recordUl.length) {
              var str = that.getBaoJiaRowData(BaoJiaNewInfo);
              if (that.controls.$recordUl.children('li').length > 0) {
                // add by wxf 根据liflag是否相同来过滤掉重复数据
                var liflag = that.controls.$recordUl.children('li').first().attr('liflag');
                if (liflag && str.indexOf(liflag) > -1)
                  return;
              }
              that.controls.$recordUl.prepend(str);
              var lis = that.controls.$recordUl.children('li');
              if (lis.length > that.g.baojiahistorysize) {
                lis.last().remove();
              }
            }
          }
        }
      } else if (msg.flag == "3") {
        // 最新消息
        var SysMessage = msg.t;
        if (SysMessage) {
          // 目前只显示针对不同客户端的单条信息，如果需要显示多条信息，则需要重新写方法
          if (SysMessage.opicode == that.g.danweiguid || !SysMessage.opicode) {
            if (!that.controls.$footerleft.text()) {
              that.controls.$footerleft.text(SysMessage.operatecontent);
              that.controls.$footerleft.attr('title', SysMessage.operatecontent);
              that.controls.$msgUl.attr('title', SysMessage.operatecontent);
              that.controls.$msgUl.text(SysMessage.operatecontent);
              that.controls.$footerright.fadeOut(700).fadeIn(300).fadeOut(700).fadeIn(300);
            } else if (!that.controls.$footerright.text()) {
              that.controls.$footerright.text(SysMessage.operatecontent);
              that.controls.$footerright.attr('title', SysMessage.operatecontent);
              that.controls.$msgUl.attr('title', SysMessage.operatecontent);
              that.controls.$msgUl.text(SysMessage.operatecontent);
              that.controls.$footerright.fadeOut(700).fadeIn(300).fadeOut(700).fadeIn(300);
            } else {
              that.controls.$footerleft.text(that.controls.$footerright.text());
              that.controls.$footerleft.attr('title', that.controls.$footerright.text());
              that.controls.$footerright.text(SysMessage.operatecontent);
              that.controls.$footerright.attr('title', SysMessage.operatecontent);
              that.controls.$msgUl.attr('title', SysMessage.operatecontent);
              that.controls.$msgUl.text(SysMessage.operatecontent);
              that.controls.$footerright.fadeOut(700).fadeIn(300).fadeOut(700).fadeIn(300);
            }
          }
        }
      } else if (msg.flag == "5") {
        // 计划结束时间
        var planendtime = msg.t;
        if (planendtime) {
          that.g.planendtime = new Date(planendtime.timenow);
        }
      } else if (msg.flag == "7") {
        // 竞价阶梯
        var JingJiaStepInfo = msg.t;
        if (JingJiaStepInfo) {
          that.g.jingjiastep = JingJiaStepInfo.info;
          that.controls.$jingjiastep.text(commafy(JingJiaStepInfo.info, that.g.numberprecision));
        }
      }
    },
    InitJingjiaStep: function () {
      if (!that.controls.$allowfromprice.length)
        return;
      if (that.g.allowfromprice && !that.controls.$topprice.text()) {
        that.controls.$allowfromprice.show();
        $('.price-multiple ul>li:eq(5)').addClass('mr0');
        $('.price-multiple ul>li:last').hide();
      } else {
        $('.price-multiple ul>li').removeClass('mr0');
        that.controls.$allowfromprice.remove();
        $('.price-multiple ul>li:last').addClass('mr0').show();
      }
    },
    SendPrice: function (isUsePriority) { // 发送报价
      var requestData = JSON.stringify({
        baoJiaPrice: that.g.myprice,
        touBiaoRenNo: that.g.toubiaorenno,
        isUsePriority: isUsePriority,
        clientip: that.g.clientip
      });
      that.PushBaoJiaInfo(requestData);
      return false;
    },
    RefreshHistory_CS: function (callback) { // 刷新历史数据
      if (!that.controls.$recordUl.length) {
        callback();
        return;
      }
      var requestData = JSON.stringify({
        biaodiguid: that.g.biaodiguid
      });
      epoint.execute("GetBaoJiaHistroy", null, [requestData], function (data) {
        if (data.status) {
          that.RefreshHistory(data.userArea);
          callback();
        } else {
          // epoint.alert(data.description);
        }
      });
    },
    RefreshHistory: function (strJson) { // 刷新历史记录
      var retStr = '';
      var bjObj = JSON.parse(strJson);
      var bjList = bjObj.baojiahistroy;
      var myBaoJia = bjObj.mybaojia;
      var MyPrice;
      // by fjx 兼容减价会出现myBaoJia.toubiaorenprice为0
      if (myBaoJia.toubiaorenprice || myBaoJia.toubiaorenprice == 0) {
        MyPrice = myBaoJia.toubiaorenprice;
      } else {
        if (that.g.allowfromprice) {
          MyPrice = that.g.fromprice;
        } else {
          if (that.g.jingjiafangshi == '-1') {
            MyPrice = that.g.fromprice - that.g.jingjiastep;
          } else if (that.g.jingjiafangshi == '1') {
            MyPrice = that.g.fromprice + that.g.jingjiastep;
          } else
            MyPrice = "0";
        }
      }
      // 我的报价
      that.g.myprice = MyPrice;
      that.controls.$myprice.val(commafy(that.g.myprice, that.g.numberprecision));
      if (bjList.length > 0) {
        that.controls.$topbidder.text(bjList[0].toubiaorenno); // 当前最高报价人
        that.g.toppricedanweiguid = bjList[0].toubiaorenguid; // 当前最高报价人唯一标识
        that.g.maxquoteprice = that.calculate(bjList[0].toubiaorenprice); // 当前价格
        that.controls.$topprice.text(commafy(that.g.maxquoteprice, that.g.numberprecision));
        "1" == bjList[0].isuseyouxian ? that.controls.$isuseyouxian.show() : that.controls.$isuseyouxian.hide();
        // 只取前6条
        var i;
        for (i = 0; i < bjList.length && i < that.g.baojiahistorysize; i++) {
          retStr += that.getBaoJiaRowData(bjList[i]);
        }
        that.controls.$recordUl.empty();
        that.controls.$recordUl.append(retStr);
      }
      that.InitJingjiaStep();
    }
  };
  $.extend(true, that, args);
  that.init();
}