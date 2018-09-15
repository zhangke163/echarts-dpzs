$(document).ready(function () {
  let [i, videoArr] = [0, []];
  let dataVideo = [];
  var indexs = 0;
  //获取左侧列表内容
  $.ajax({
    type: "get",
    url: "./js/nodes.json",
    async: true,
    success: function (data) {
      console.log(data.data);
      $.each(data.data, function (index, value) {
        console.log(value)
        var liHtml = `<li><div class="titles"><span></span><i>${value.name}</i></div>
                <div class="content" vhref="${value.children[0].vhref}" id="${value.children[0].id}">${value.children[0].name}</div>
              </li>`;
        $('#videoList').append(liHtml);
      });
    }
  });
  //设置左侧列表滚动条
  $('#videoList').niceScroll({
    cursorcolor: " #0085ff", //滚动条的颜色
    cursoropacitymax: 1, //滚动条的透明度，从0-1
    background: "#004e96",
    touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
    cursorwidth: "5px", //滚动条的宽度
    cursorborder: "0", // 游标边框css定义
    cursorborderradius: "5px", //以像素为光标边界半径  圆角
    //autohidemode最好设置为true，这样切换的时候会自动隐藏滚动条
    autohidemode: true, //是否隐藏滚动条  true的时候默认不显示滚动条，当鼠标经过的时候显示滚动条
    zindex: "auto", //给滚动条设置z-index值
    railpadding: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    } //滚动条的位置
  });
  //左侧列表点击事件
  $('#videoList').delegate(".titles", "click", function () {
    $(this).parent().css({
      'color': '#0cd7fc',
      'background': 'rgba(0,133,255,0.6)'
    });
    $(this).parent().siblings().css({
      'color': '#0086ff',
      'background': 'rgba(0,149,255,0.2)'
    });
    $(this).parent().find('span').toggleClass('rotates');
    $(this).parent().siblings().find('span').removeClass('rotates');
    $(this).parent().find('.content').toggleClass('show');
    $(this).parent().siblings().find('.content').removeClass('show');
  })
  //点击视频列表获取视频信息
  $('#videoList').delegate(".content", "click", function () {
    aquireVideo($(this).attr("id"), $(this).html(), $(this).attr("vhref"));

  })
  //视频盒子被点击
  function aquireVideo(vid, vname, vhref) {
    if (vhref) {
      let flag = false;
      videoArr.forEach(val => {
        if (val.id == vid) {
          flag = true;
        }
      })
      videoArr.push({
        id: vid,
        name: vname,
        vhref: vhref
      })
      var vivHtml = `<video
              id="my-player${i}"
              class="video-js"
              style="width:100%; height:100%; object-fit:fill"
              controls
              preload="auto"
              data-setup='{}'>
              <source src='${vhref}' type='rtmp/flv'/>  
          </video>`;
      $('.small-box .video-box').eq(indexs).html(vivHtml);
      $('.small-box .title').eq(indexs).css('display', 'block').html(vname);
      startPlay('my-player' + i);
      i++;
    }

  }
  //播放视频方法
  function startPlay(id) {
    var myPlayer = videojs(id);
    videojs(id, {}, function onPlayerReady() {
      videojs.log('Your player is ready!');
      this.play();
      this.on('ended', function () {
        videojs.log('Awww...over so soon?!');
      });
    });
  }
  //视频盒子选中事件
  $('.small-box').click(function () {
    indexs = $(this).index();
    $(this).siblings().css({
      'border': '1px solid rgba(12,215,252,0.2)',
      'border-top': '0'
    });
    $(this).css({
      'border': '1px solid #0095ff',
      'cursor': 'pointer'
    });
  })
  //画面切换按钮
  function btnclick() {
    $('.setIcon').find('#oneImage img').attr("src", './images/left/one.png');
    $('.setIcon').find('#fourImage img').attr("src", './images/left/four.png');
    $('.setIcon').find('#sixImage img').attr("src", './images/left/six.png');
    $('.setIcon').find('#nineImage img').attr("src", './images/left/nine.png');
  }
  $('#oneImage').click(function () {
    btnclick();
    $(this).find('img').attr("src", './images/left/one-hover.png');
    $('.small-box').removeClass('four-box six-big-box six-small-box').addClass('one-box');
  })
  $('#fourImage').click(function () {
    btnclick();
    $(this).find('img').attr("src", './images/left/four-hover.png');
    $('.small-box').removeClass('one-box six-big-box six-small-box').addClass('four-box');
  })
  $('#sixImage').click(function () {
    btnclick();
    $(this).find('img').attr("src", './images/left/six-hover.png');
    $('.small-box').removeClass('one-box four-box').addClass('six-small-box').eq(0).removeClass('six-small-box').addClass('six-big-box');
  })
  $('#nineImage').click(function () {
    btnclick();
    $(this).find('img').attr("src", './images/left/nine-hover.png');
    $('.small-box').removeClass('one-box six-big-box four-box').addClass('six-small-box');
  })
});