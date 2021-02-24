//已经登录
var u = getCookie("sfdl")
if(u){
    $(".header_top_left").html(`
        <li style="margin-right:5px">欢迎您<span style="color: pink;margin-left:5px">${u}</span></li>
        <a class="tuichu" style="display: inline-block; line-height:40px; cursor: pointer;">【退出登录】</a>
    `)
    $(".tuichu").click(function(){
        delCookie("sfdl")
        location.reload()
    })
}

var data
$.ajax({
    url:"../php/shouye.php",
    dataType: 'json',
    async: false,
    success(d){
        data = d
    }
})
// console.log(data)

// 分页器
var num = 20//一页显示的条数
var fy = $(".pagination")[0];
var pagination = new Pagination(fy,{
    pageInfo:{
        pagenum:1, //当前页
        pagesize:num, //一页显示的条数
        totalsize:900,//总条数
        totalpage:46 //总页数
    },
    //页面文本信息的参数
    textInfo:{
        first:'首页',
        prev:"上一页",
        next:"下一页",
        last:"尾页"
    },cb(d){
        var ds = data.slice((d-1)*num,d*num)
        var str = ""
        ds.forEach(item=>{
            str+=`
            <a href="../html/xiangqing.html?${item.goods_id}">
                <div class="goods_box">
                    <img src="${item.goods_small_logo}" alt="">
                    <h3>${item.cat_id}</h3>
                    <h4>${item.goods_name}</h4>
                    <h5>￥<span>${item.goods_price}</span></h5>
                </div>
            </a>
            `
        })
        $(".goods_wrap").html(str)
    }
})


// 轮播图
var isnum = 0
$(".icon-zuojiantou").click(function(){//左
    var L1 = parseInt($(this).prevAll().eq(1).css("left"))
    var L0 = parseInt($(this).prevAll().eq(0).css("left"))
    if(L0 == 0){
        a($(this).prevAll().eq(0),$(this).prevAll().eq(1))
    }else{
        a($(this).prevAll().eq(1),$(this).prevAll().eq(0))
    }
})
$(".icon-youjiantou1").click(function(){//右
    var L1 = parseInt($(this).prevAll().eq(1).css("right"))
    var L2 = parseInt($(this).prevAll().eq(2).css("right"))
    if(L1 == 0){
        b($(this).prevAll().eq(1),$(this).prevAll().eq(2))
    }else{
        b($(this).prevAll().eq(2),$(this).prevAll().eq(1))
    }
})
function b(ele0,ele1){
    clearInterval(time)
    clearInterval(time2)
    if(isnum == 0){
        ele1.css("left","220px")
        var time = setInterval(()=>{
            var l = parseInt(ele1.css("left"))
            if(l<=5){
                clearInterval(time)
                clearInterval(time2)
                ele1.css("left","0px")
                isnum = 0
            }else{
                ele1.css("left",l-5+"px")
            }
        },10)
        var time2 = setInterval(()=>{
            var l = parseInt(ele0.css("left"))
            ele0.css("left",l-5+"px")
        },10)
    }
    isnum++
}
function a(ele0,ele1){
    clearInterval(time)
    clearInterval(time2)
    if(isnum == 0){
        ele1.css("left","-220px")
        var time = setInterval(()=>{
            var l = parseInt(ele1.css("left"))
            if(l>=-5){
                clearInterval(time)
                clearInterval(time2)
                ele1.css("left","0px")
                isnum = 0
            }else{
                ele1.css("left",l+5+"px")
            }
        },10)
        var time2 = setInterval(()=>{
            var l = parseInt(ele0.css("left"))
            ele0.css("left",l+5+"px")
        },10)
    }
    isnum++
}
// 移入/移出，显示/隐藏 二维码
$(".a_buy_phone").mouseenter(function(){
    $(this).find(".a_buy_phone_div").stop().show(500, 'linear')
})
$(".a_buy_phone").mouseleave(function(){
    $(this).find(".a_buy_phone_div").stop().hide(500, 'linear')
})