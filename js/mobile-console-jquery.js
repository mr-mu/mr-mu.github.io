/*
* mobile-console 0.0.1
* by mr-mu
* https://github.com/mr-mu/mobile-console.git
*
* */
const mconsole = {
    init:function () {
        //init
        var html=
            '<div class="mconsole" style="position: fixed;z-index: 9999;bottom: 1px;left: 1px;">'+
                '<div class="mconsole-layer" style="width: 80px;height: 25px;background: #fff;border: 2px solid #0a94e3;border-radius:5px;">'+
                    '<div class="mconsole-icon" style="font-size: 0 ;margin-top: 3px;margin-left:5px;display: inline-block;vertical-align:middle;">'+
                        '<i style="box-sizing: border-box;border: 2px solid #0a94e3;border-radius:2px;width: 6px;height: 12px;background: #fff;display: inline-block;margin-top:2px;margin-left:2px;"></i>'+
                        '<i style="box-sizing: border-box;border: 2px solid #0a94e3;border-radius:2px;width: 6px;height: 14px;background: #fff;display: inline-block;margin-left:2px;"></i>'+
                        '<i style="box-sizing: border-box;border: 2px solid #0a94e3;border-radius:2px;width: 6px;height: 16px;background: #fff;display: inline-block;margin-left:2px;"></i>'+
                    '</div>'+
                    '<div class="mconsole-time" style="display: inline-block;font-size: 14px;vertical-align:middle;margin-top:3px;color: #0a94e3">'+
                    '   <span style="display: block;margin-left:4px;"></span>'+
                    '</div>'+
                '</div>'+
                '<div class="mconsole-main" style="display: none;width: 260px;background: #fff;position: absolute;bottom: 30px;left: 1px;border: 1px solid #0a94e3;border-radius:3px;">'+
                    '<div class="mconsole-tab-head" style="width: 100%;font-size: 0;border-bottom: 1px solid #0a94e3;">'+
                        '<span class="head-item" style="box-sizing: border-box;display: inline-block;font-size: 14px;width: 50%;text-align: center;color: #66afe9;padding: 5px 0;border-right: 1px solid #0a94e3;">信息输出</span>'+
                        '<span class="head-item" style="box-sizing: border-box;display: inline-block;font-size: 14px;width: 50%;text-align: center;color: #0a94e3;padding: 5px 0;">页面选项</span>'+
                    '</div>'+
                    '<div class="mconsole-tab-foot" style="width: 100%;padding: 5px;height: 200px;">'+
                        '<div class="mconsole-msg item" style="font-size:12px;height: 100%;overflow-y: auto;overflow-x: hidden;color: #666;width: 100%;word-break: break-all;"></div>'+
                        '<div class="item" style="height: 100%;overflow-y: auto;overflow-x: hidden;color: #666;width: 100%;display: none;">'+
                            '<p style="margin-top:5px;" ><span style="font-size: 16px;vertical-align:middle;line-height:1em;">布局线：</span><input type="checkbox" id="layoutline" style="vertical-align:middle;width: 16px;height: 16px"></p>'+
                            '<p style="margin-top:10px;" ><span style="font-size: 16px;vertical-align:middle;line-height:1em;">修改文字：</span><input type="checkbox" id="changetext" style="vertical-align:middle;width: 16px;height: 16px"></p>'+
                            '<p style="margin-top:10px;" ><span style="font-size: 16px;vertical-align:middle;line-height:1em;">点击监控：</span><input type="checkbox" id="onclick" style="vertical-align:middle;width: 16px;height: 16px"></p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        //loadtime
        var time=[0,0];
        var setTime=setInterval(function () {
            time[1]++;
            if(time[1]==60){
                time[1]=0;
                time[0]++;
            }
        },100)
        // layoutline
        function layoutLine(bool) {
            if (bool){
                $('body *').each(function (index) {
                    if($(this).hasClass('mconsole') || $(this).parents('.mconsole').length > 0) return false;
                    var i =index+1
                    color='ff0000';
                    if((i % 2) == 0){
                        color='00e765'
                    }else if((i % 3) == 0){
                        color='4A90E2'
                    }
                    $(this).css('border','1px solid #'+color)
                })
            }else{
                $('body *').each(function (index) {
                    if($(this).hasClass('mconsole') || $(this).parents('.mconsole').length > 0) return false;
                    $(this).css('border','')
                })
            }
        }
        //changetext
        function changeText(bool) {
            if(bool){
                $('body *').each(function () {
                    if($(this).hasClass('mconsole') || $(this).parents('.mconsole').length > 0) return false;
                    $(this).attr('contenteditable','true');
                })
            }else{
                $('body *').attr('contenteditable','false');
            }
        }
        //onclick
        function onclick(bool) {
           if(bool){
               $('body').click(function (e) {
                   if($(e.currentTarget).hasClass('mconsole') || $(e.target).parents('.mconsole').length > 0) return false;
                   var text =  '<p>标签：'+e.target.nodeName+'| class: '+e.target.className+'| style: '+$(e.target).attr('style')+"</p>";
                   $('.mconsole-msg').append(text)
               })
           }else{
               $('body').unbind()
           }
        }
        //ready
        $(document).ready(function () {
            if(!$('html').hasClass('test')) return false;
            $('body').append(html)

            $('.mconsole-layer').click(function () {
                $('.mconsole-main').show(1,function () {
                    $('html').click(function (e) {
                        $('.mconsole-main').hide();
                        $(this).unbind()
                    })
                });
            })
            $('.mconsole-main').click(function (e) {
                e.stopPropagation();
                //switch
                if(e.target.className == 'head-item'){
                    var index=$(e.target).index();
                    $(e.target).parent().find('span').css('color','#0a94e3')
                    $(e.target).css('color','#66afe9')
                    $('.mconsole-tab-foot .item').hide()
                    $('.mconsole-tab-foot .item:eq('+index+')').show()
                }
                if(e.target.nodeName == 'INPUT'){
                    if(e.target.id=='layoutline'){
                        if($(e.target).is(':checked')){
                            layoutLine(true)
                        }else{
                            layoutLine(false)
                        }
                    }
                    if(e.target.id=='changetext'){
                        if($(e.target).is(':checked')){
                            changeText(true)
                        }else{
                            changeText(false)
                        }
                    }
                    if(e.target.id=='onclick'){
                        if($(e.target).is(':checked')){
                            onclick(true)
                        }else{
                            onclick(false)
                        }
                    }
                }

            })
            
        })
        $(window).load(function () {
            clearInterval(setTime);
            $('.mconsole-time span').text(time[0]+'.'+time[1]+'s')
        })
        //
    },
    log:function (e) {
       $(document).ready(function () {
           $('.mconsole-msg').append("<p>"+e+"</p>")
       })
    }
}
mconsole.init();

