/*
 * @Author: gyt95.kwan 
 * @Date: 2018-02-24 17:10:33 
 * @Last Modified by: gyt95.kwan
 * @Last Modified time: 2018-02-26 17:40:07
 */

(function ($, doc, win) {

    var body = doc.body; // 貌似没用到

    var d = new Date();
    var currentYear = d.getFullYear();
    var currentMonth = d.getMonth() + 1;
    var currentDate = d.getDate();
    var currentDay = d.getDay(); // 星期几


    var $cal = $('.calendar')
    var $dateList = $('<ul/>').addClass('date-list');
    var $weekList = $('<ul class="week-list">');

    var arr = [
        { name: 'Sun.', num: 7 },
        { name: 'Mon.', num: 1 },
        { name: 'Tues.', num: 2 },
        { name: 'Wed.', num: 3 },
        { name: 'Thur.', num: 4 },
        { name: 'Fri.', num: 5 },
        { name: 'Sat.', num: 6 },
    ]


    insertList()  // 插入 星期list && 空的日期list

    var totalDays = getTotalDaysInMonth(currentYear, currentMonth)

    insertData();

    function insertList() {
        // 遍历数组，插入到星期list中，并添加样式
        for (var i = 0; i < arr.length; i++) {
            $weekList.append('<li>' + arr[i].name + '</li>')
        }
        $weekList.children('li').css({
            marginRight: '4.7px'
        });

        // 最后将两个list依次插入到DOM中
        $cal.append($weekList); 
        $cal.append($dateList);
    }
    
    function getTotalDaysInMonth(year, month) {  // 获取当月总天数
        // month = parseInt(month,10)+1;
        return new Date(year, month, 0).getDate() + 1;
    }

    function getFirstDayInMonth(year, month, day) {  // 获取当月某一天
        // month = parseInt(month,10)+1;
        return new Date(year, month - 1, day).getDay();
    }

    function insertData() {
        // 插入年份和月份数据
        $('.year').html(currentYear)
        $('.month').html(currentMonth)

        // 插入当前月份所有日期：先清空原有list -> 获取当月第一天是星期几 -> 遍历插入到DOM中
        if ($dateList != null) $dateList.html('')

        var firstDay = getFirstDayInMonth(currentYear, currentMonth, 1);

        addFrontBlank(firstDay) // 如firstDay对应的不是星期日，如星期三，则星期三前的位置都要加上空格占位
        addLastBlank() // 参考addFrontBlank
    }

    function addFrontBlank(firstDay) {
        console.log('em...')
        for (var i = 0; i < firstDay; i++) {
            $dateList.append('<li style="border: 0;margin-left: 3px;"> </li>')
        }
    }

    function addLastBlank() {
        console.log('haha...')
        for (var i = 1; i < totalDays; i++) {
            $dateList.append('<li><div><span>' + i + '</span></div></li>')
        }
    }

    function getNewDate(cYear, cMonth, cDay) {
        var newT = new Date(cYear, cMonth, cDay)
        currentYear = newT.getFullYear();
        currentMonth = newT.getMonth() + 1;
        currentDate = newT.getDate();
        currentDay = newT.getDay();
        return {
            currentYear, currentMonth, currentDate, currentDay
        }
    }

    function btnClick() {  // 两个按钮的点击事件
        var domName = $(this)[0].className; // 获取DOM的类名，判断是prev还是next

        // 先获取当前年份和月份，再传入new Date()中
        domName == 'prev-btn' 
        ? getNewDate(currentYear, currentMonth - 1, 0)
        : getNewDate(currentYear, currentMonth + 1, 0)

        totalDays = getTotalDaysInMonth(currentYear, currentMonth)

        insertData()
    }


    // 点击prev按钮，看上一月份
    $('.prev-btn').on('click', btnClick)
    // 点击next按钮，看下一月份
    $('.next-btn').on('click', btnClick)

    // 鼠标点击某个li时，增加类名，改变样式。
    $dateList.on('click', 'li', function () {
        $(this).children('div').css({
            borderBottom: '2px solid lightseagreen'
        })
        console.log('你选中了：' + currentYear + '年 ' + currentMonth + '月 ' + $(this).text() + '日')
    })


})(jQuery, document, window)