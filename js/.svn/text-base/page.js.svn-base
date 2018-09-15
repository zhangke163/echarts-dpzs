function drawChart(argument) {
  var myChart_monitor = echarts.init(document.getElementById('monitor'));
  option_monitor = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color: ["#00ffff", "#0cd7fc", "#00a6ff", "#7f50ff", "#576fff"],
    series : [
      {
        name:'半径模式',
        type:'pie',
        radius : [70, 100],
        center : ['50%', '50%'],
        roseType : 'radius',
        label: {
            normal: {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        },
        labelLine: {
            normal: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            }
        },
        data:[]
      }
    ]
  };
  myChart_monitor.setOption(option_monitor);
  myChart_monitor.resize();

  //监测点类型统计
  $.get('http://47.100.247.54:8080/jhzhps-back/checkPoint/countByType?origin=1', function(data) {
    var data_type = [],
        data_data = JSON.stringify(data.data).replace(/type/g, "name").replace(/COUNT/g, "value");
    data_type = JSON.parse(data_data);
    
    var _sum = 0, _flood, _flow, _water, _contentGage, _video;
    var monitor_legend = $('#monitor_legend');
    data.data.forEach( function(element, index) {
      _sum += element.COUNT;
      if (element.type == '易涝监测点') {
        _flood = element.COUNT;
        monitor_legend.find('.details-num.flood .num').html(_flood);
      } else if (element.type == '流量监测点') {
        _flow = element.COUNT;
        monitor_legend.find('.details-num.flow .num').html(_flow);
      } else if (element.type == '水质监测点') {
        _water = element.COUNT;
        monitor_legend.find('.details-num.water .num').html(_water);
      } else if (element.type == '检查井液位计') {
        _contentGage = element.COUNT;
        monitor_legend.find('.details-num.content-gage .num').html(_contentGage);
      } else if (element.type == '视频监控点') {
        _video = element.COUNT;
        monitor_legend.find('.details-num.video-monitor .num').html(_video);
      }
    })
    monitor_legend.find('.bar-width.flood').css('width', _flood / _sum * 100 + '%');
    monitor_legend.find('.bar-width.flow').css('width', _flow / _sum * 100 + '%');
    monitor_legend.find('.bar-width.water').css('width', _water / _sum * 100 + '%');
    monitor_legend.find('.bar-width.content-gage').css('width', _contentGage / _sum * 100 + '%');
    monitor_legend.find('.bar-width.video-monitor').css('width', _video / _sum * 100 + '%');

    myChart_monitor.setOption({
      series: [{
        name: '监测点类型',
        data: data_type,
      }]
    });
  })

  var myChart_alarm = echarts.init(document.getElementById('alarm_type'));
  option_alarm = {
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
          show: false,
          min: 0,
          max: 10,
          inRange: {
              colorLightness: [0, 1]
          }
      },
      series : [
          {
              name:'报警类型',
              type:'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data:[].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                  normal: {
                      textStyle: {
                          color: 'rgba(255, 255, 255, 0.3)'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      lineStyle: {
                          color: 'rgba(255, 255, 255, 0.3)'
                      },
                      smooth: 0.2,
                      length: 10,
                      length2: 20
                  }
              },
              itemStyle: {
                  normal: {
                      color: '#c23531',
                      shadowBlur: 200,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };
  myChart_alarm.setOption(option_alarm);
  myChart_alarm.resize();

  $.get('http://47.100.247.54:8080/jhzhps-back/alarm/countByType?origin=1', function(data) {
    var data_arr = [];
    data.data.forEach( function(element, index) {
      data_arr.push(element.COUNT);
    });
    // console.log(data_arr)
    var _max = Math.max.apply(null, data_arr);
    // console.log(_max)

    var data_type = [],
        data_data = JSON.stringify(data.data).replace(/ALARM_TYPE/g, "name").replace(/COUNT/g, "value");

    data_type = JSON.parse(data_data);

    myChart_alarm.setOption({
      visualMap: {
          max: parseInt(_max + _max * 2 / 3)
      },
      series: [{
        name: '报警类型',
        data: data_type.sort(function (a, b) { return a.value - b.value; }),
      }]
    });
  })

  var alarm_chart = setInterval(function (argument) {
    $.get('http://47.100.247.54:8080/jhzhps-back/alarm/countByType?origin=1', function(data) {
      var data_arr = [];
      data.data.forEach( function(element, index) {
        data_arr.push(element.COUNT);
      });
      // console.log(data_arr)
      var _max = Math.max.apply(null, data_arr);
      // console.log(_max)

      var data_type = [],
          data_data = JSON.stringify(data.data).replace(/ALARM_TYPE/g, "name").replace(/COUNT/g, "value");

      data_type = JSON.parse(data_data);

      myChart_alarm.setOption({
        visualMap: {
            max: parseInt(_max + _max * 2 / 3)
        },
        series: [{
          name: '报警类型',
          data: data_type.sort(function (a, b) { return a.value - b.value; }),
        }]
      });
    })
  }, 1000 * 30)
}

$(document).ready(function() {
  var update_time = $('.update-time');
  var myDate = new Date();
  for (var i = 0; i < update_time.length; i++) {
    update_time.eq(i).html('数据更新至' + myDate.getFullYear() + '年' + parseInt(myDate.getMonth() + 1) + '月' + myDate.getDate() + '日');
  }

  drawChart();
  $.get('http://47.100.247.54:8080/jhzhps-back/alarm/getList?origin=1', function(data) {
    var curent_data_box = $('.curent-data-box');
    curent_data_box.html('');
    for (var i = 0; i < 4; i++) {
      var alarmTime = data.data[i].alarmTime;
      var unit = data.data[i].unit;
      if (unit == 'm3/s') {
        unit = 'm³/s';
      } else if (unit == null) {
        unit = '';
      }
      var curent_data = `<div>
                          <div class="curent-data name-time">
                            <div class="data-top">${data.data[i].location}</div>
                            <div class="data-botom">${alarmTime.substring(5, 16)}</div>
                          </div>
                          <div class="curent-data val-attr">
                            <div class="data-top">${data.data[i].dataValue + unit}</div>
                            <div class="data-botom">${data.data[i].alarmType}</div>
                          </div>
                        </div>`;
      curent_data_box.append(curent_data);
    }
  })

  var alarm_data = setInterval(function (argument) {
    $.get('http://47.100.247.54:8080/jhzhps-back/alarm/getList?origin=1', function(data) {
      var curent_data_box = $('.curent-data-box');
      curent_data_box.html('');
      for (var i = 0; i < 4; i++) {
        var alarmTime = data.data[i].alarmTime;
        var unit = data.data[i].unit;
        if (unit == 'm3/s') {
          unit = 'm³/s';
        } else if (unit == null) {
          unit = '';
        }
        var curent_data = `<div>
                            <div class="curent-data name-time">
                              <div class="data-top">${data.data[i].location}</div>
                              <div class="data-botom">${alarmTime.substring(5, 16)}</div>
                            </div>
                            <div class="curent-data val-attr">
                              <div class="data-top">${data.data[i].dataValue + unit}</div>
                              <div class="data-botom">${data.data[i].alarmType}</div>
                            </div>
                          </div>`;
        curent_data_box.append(curent_data);
      }
    })
  }, 1000 * 30)
});
