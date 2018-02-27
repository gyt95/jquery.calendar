## 前言

> 这是一个用jQuery写的日历插件。

> 很少用jQuery写插件，这次想认真写并规范化。

> 初衷是上周某一天突然想用日历来记录平时日常生活的一些小事，例如晚上睡觉时间、当天有无看书、有无坚持运动等等。在用手机系统自带的日历时做记录时突然灵机一动，不如自己实现一个吧。反正之前一直不想接触日历相关的东西，觉得很多坑，这次就尝试一下自己写吧。

> 所以写成插件只是第一步，重点是后续记事本的实现及数据保存。

> 后续考虑改用vue/react写。

## 索引
* [快速开始](#快速开始)
* [选项](#选项)
* [说明](#说明)

## 快速开始

css部分

```
<link rel="stylesheet" href="./index.css">
```

html部分

```
<div class="calendar">
    <div class="nav">
        <button class="prev-btn">prev</button>
        <div class="mid">
            <span class="year"></span>年
            <span class="month"></span>月
        </div>
        <button class="next-btn">next</button>
    </div>
</div>
```

引入js文件

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="jquery.calendar.oop.js"></script>
```

调用插件(目前仅能定制点击时样式)
```
<script type="text/javascript">
    $('.calendar').calendar({
        'borderBottom': '2px solid red'
    })
</script>
```

运行查看效果。

## 选项

您可以在调用插件时通过传递选项来自定义，下面列出了所有可用的选项。
```
$('.calendar').calendar({
    option: value,
    option2: value2,
    ...
})
```

| Option          | type          | default          | Description                                 |
|-----------------|---------------|------------------|---------------------------------------------|
| borderBottom    | string        | `'2px solid lightseagreen'`       |   选中日期时标记的颜色      |

## 说明

jquery.calendar.origin.js 是最开始的版本(目前已删去)  
jquery.calendar.oop.js 是规范化后的js，正式调用也是用的这个  
