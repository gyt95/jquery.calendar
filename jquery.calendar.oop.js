/*
 * @Author: gyt95.kwan 
 * @Date: 2018-02-24 17:10:33 
 * @Last Modified by: gyt95.kwan
 * @Last Modified time: 2018-02-26 18:07:31
 */

(function ($, doc, win) {
    var arr = [
        { name: 'Sun.', num: 7 },
        { name: 'Mon.', num: 1 },
        { name: 'Tues.', num: 2 },
        { name: 'Wed.', num: 3 },
        { name: 'Thur.', num: 4 },
        { name: 'Fri.', num: 5 },
        { name: 'Sat.', num: 6 },
    ]

    $.fn.calendar = function (opts) {

        function Calendar(element, opts) {
            // 这个构造函数作用：获取选中的DOM元素、window的宽高、设置默认值和获取options
            this.cal = element; // 获取了$('.calendar')
            this.defaults = {  // 看底部备注1
                // 默认样式写在这里
                'borderBottom': '2px solid lightseagreen'
            }
            this.settings = $.extend({}, this.defaults, opts); // 看底部备注2
            this.init();
        }

        Calendar.prototype = {
            init: function () {
                // 获取Calendar整个对象，包含上面的所有属性。并新增本插件需要用到的新东西
                var c = this;

                c.d = new Date();
                c.currentYear = c.d.getFullYear();
                c.currentMonth = c.d.getMonth() + 1;
                c.currentDate = c.d.getDate();
                c.currentDay = c.d.getDay(); // 星期几

                c.dateList = $('<ul class="date-list">');
                c.weekList = $('<ul class="week-list">');
                c.yearDom = $(this.cal).find('.year');
                c.monthDom = $(this.cal).find('.month');
                c.prevBtn = $(this.cal).find('.prev-btn');
                c.nextBtn = $(this.cal).find('.next-btn');

                c.insertList(c);
                c.insertData(c);
                c.bindEvent(c);
            },
            insertList: function (c) {
                // 遍历arr数组，插入到weekList中
                for (var i = 0; i < arr.length; i++) {
                    c.weekList.append('<li>' + arr[i].name + '</li>')
                }
                c.weekList.children('li').css({
                    marginRight: '4.7px'
                });

                // 最后将两个List依次插入到DOM中
                c.cal.append(c.weekList);
                c.cal.append(c.dateList);
            },
            insertData: function (c) {
                // 插入年份和月份数据
                c.yearDom.html(c.currentYear)
                c.monthDom.html(c.currentMonth)

                // 插入当前月份所有日期：先清空原有list -> 获取当月第一天是星期几 -> 遍历插入到DOM中
                if (c.dateList != null) c.dateList.html('')

                var firstDay = c.getFirstDayInMonth(c.currentYear, c.currentMonth, 1);
                var totalDays = c.getTotalDaysInMonth(c.currentYear, c.currentMonth)

                c.addBlankPlace(c, firstDay, totalDays) // 参考addFrontBlank
            },
            addBlankPlace: function (c, fd, td) { // 添加前后空格占位
                // 这是添加到前面
                for (var i = 0; i < fd; i++) {
                    c.dateList.append('<li style="border: 0;margin-left: 3px;"> </li>')
                }
                // 这是添加到后面
                for (var i = 1; i < td; i++) {
                    c.dateList.append('<li><div><span>' + i + '</span></div></li>')
                }
            },
            bindEvent: function (c) {  // 事件绑定
                c.prevBtn.on('click', c.btnClick(c))
                c.nextBtn.on('click', c.btnClick(c))
                c.dateList.on('click', 'li', function () {
                    $(this).children('div').css({
                        borderBottom: c.settings.borderBottom
                    })
                })
            },
            btnClick: function (c) {  // click事件切换月份
                return function () {
                    var domName = $(this)[0].className; // 获取DOM的类名，判断是prev还是next

                    // 先获取当前年份和月份，再传入new Date()中
                    domName == 'prev-btn'
                        ? c.getNewDate(c, c.currentYear, c.currentMonth - 1, 0)
                        : c.getNewDate(c, c.currentYear, c.currentMonth + 1, 0)

                    var totalDays = c.getTotalDaysInMonth(c.currentYear, c.currentMonth)

                    c.insertData(c)
                }
            },
            getNewDate: function (c, cYear, cMonth, cDay) {  // 更新实例c中的年月日
                var newT = new Date(cYear, cMonth, cDay)
                c.currentYear = newT.getFullYear();
                c.currentMonth = newT.getMonth() + 1;
                c.currentDate = newT.getDate();
                c.currentDay = newT.getDay();
            },
            getTotalDaysInMonth: function (year, month) {  // 获取当月总天数
                return new Date(year, month, 0).getDate() + 1;
            },
            getFirstDayInMonth: function (year, month, day) {  // 获取当月某一天
                return new Date(year, month - 1, day).getDay();
            }
        };

        return this.each(function () {
            new Calendar($(this), opts)
        });
    };

})(jQuery, document, window)




/** 备注0
 * 
 *  哪个元素调用这个插件，插件中的this就指向它
 *  如$('a').calendar() this指向所有a标签
 *  当前选中的元素是$('.calendar')
 * 
 */


/** 备注1
 *  var settings = $.extend(defaults, opts) 
    
    $.extend只有一个参数时，合并到jQuery上，如$.extend({ hello:function(){} })
    然后$.hello()就可以调用方法
    多个参数时，后面的合并到第一个参数中
*/

/** 备注2
 *      有缺点。如果用户自定义了同名属性的值，opts就覆盖了defaults.

        那么后续想用回defaults的值时就不行了

        解决办法：
            创建一个新的空对象{}。将defaults和opts全部合并到空对象上。
                就能保护到插件里面的defaults了！
        代码如下：
            $.extend({}, defaults, opts);
 */