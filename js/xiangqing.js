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

//获取地址栏参数
var search = location.search.split("?")[1]
if(search>=13 && search<=926){
    // search = search.split("?")[1]
    $.ajax({
        url:"../php/xiangqing.php",
        data:{xiangqing:search},
        dataType: 'json',
        success(dd){
            var str = `
            <div class="location">
                <a href="javascript:;">${dd[0].cat_one_id}</a><span>&gt;</span>
                <a href="javascript:;">${dd[0].cat_two_id}</a><span>&gt;</span>
                <a href="javascript:;">${dd[0].cat_three_id}</a><span>&gt;</span>
                <span>${dd[0].goods_name}</span>
            </div>
            <div class="goods_details_content clear_fix">
                <div class="goods_details_content_left">
                    <div class="box">
                        <img src="${dd[0].goods_big_logo}" alt="">
                        <div class="zhedang"></div>
                    </div>
                    <div class="div_imgs clear_fix">
                        <img src="${dd[0].goods_small_logo}" alt="" class="imgborder">
                        <img src="../img/2.jpg" alt="">
                        <img src="../img/3.jpg" alt="">
                        <img src="../img/4.jpg" alt="">
                        <img src="../img/5.jpg" alt="">
                    </div>
                    <div class="box_right">
                        <img src="${dd[0].goods_big_logo}" alt="">
                    </div>
                </div>
                <div class="goods_details_content_right">
                    <h2>${dd[0].goods_name}</h2>
                    <div class="jiage"><b>快乐价</b><span>￥<em>${dd[0].goods_price}</em></span></div>
                    <div class="yunfei"><b>运费</b><span>包邮</span></div>
                    <div class="yanse"><b>颜色</b>
                        <div class="xuanzhong">默认<span class="iconfont icon-xuanzhongjiaobiao"></span></div>
                    </div>
                    <div class="chima"><b>尺码</b>
                        <div class="xuanzhong">默认<span class="iconfont icon-xuanzhongjiaobiao"></span></div>
                    </div>
                    <button class="jrgwc">加入购物车</button>
                    <div class="two_ewm clear_fix">
                        <div class="two_ewm_1">
                            <img id="ewm_image" src="https://ecimg.happigo.com/data/upload/shop/store/1/288/WxLite_247788.png?v=1.14">
                            <div class="txt">
                                <span>微信扫描</span><br>
                                <span>立即订购</span><br>
                                <span>一键直达</span>
                            </div>
                        </div>
                        <div class="two_ewm_2">
                            <img src="https://ecimg.happigo.com/resource/web/images/download_app.png?v=1" alt="">
                            <div class="txt">
                                <span>下载APP</span><br>
                                <span>看直播</span><br>
                                <span>享优惠</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="xq">
                    <div class="recommend">
                        <h2>推荐商品</h2>
            `
            for(var i=1; i<dd.length ;i++){
                str+=`
                <a href="../html/xiangqing.html?${dd[i].goods_id}">
                    <img src="${dd[i].goods_big_logo}">
                    <h3>${dd[i].goods_name}</h3>
                    <h4>￥${dd[i].goods_price}</h4>
                </a>
                `
            }
            str+=`
                    </div>
                    <div class="spxxxx">
                        <h2>商品详细信息</h2>
                        <div class="spxxxx-box">${dd[0].goods_introduce}</div>
                    </div>
                </div>
            </div>
            `

            $(".goods_details").html(str)

            // 放大镜
            //获取操作对象
            var box = $(".goods_details_content_left .box")
            var zhedang = $(".goods_details_content_left .box .zhedang")
            var box_right = $(".goods_details_content_left .box_right")
            var right_img = $(".goods_details_content_left .box_right img")
            box.mouseover(function(){//移入
                zhedang.css("display","block")
                box_right.css("display","block")
            })
            box.mousemove(function(e){//移动
                move(e)
            })
            box.mouseout(function(){//移出
                zhedang.css("display","none")
                box_right.css("display","none")
            })
            //移动
            function move(e){
                //获取当前移动距离
                var x1 = e.pageX - Math.floor(box.offset().left) - zhedang.width()/2
                var y1 =e.pageY - Math.floor(box.offset().top) - zhedang.height()/2
                //设置移动范围
                var maxX=box[0].offsetWidth-zhedang[0].offsetWidth
                var maxY=box[0].offsetHeight-zhedang[0].offsetHeight
                //右边图片的移动
                var rightX,rightY
                //水平判断
                if(x1<=0){
                    zhedang[0].style.left="0px"
                    rightX=0
                }else if(x1>=maxX){
                    zhedang[0].style.left=maxX+"px"
                    rightX=maxX
                }else{
                    zhedang[0].style.left=x1+"px"
                    rightX=x1
                }
                //垂直方式
                if(y1<=0){
                    zhedang[0].style.top="0px"
                    rightY=0
                }else if(y1>=maxY){
                    zhedang[0].style.top=maxY+'px'
                    rightY=maxY
                }else{
                    zhedang[0].style.top=y1+'px'
                    rightY=y1
                }
                //让右边图片进行移动
                right_img[0].style.top=-2*rightY+'px'
                right_img[0].style.left=-2*rightX+'px'
            }
            //给下面五张小图片绑定点击事件
            var imgs=document.querySelectorAll(".goods_details_content_left .div_imgs img")
            for(var i=0;i<imgs.length;i++){
                imgs[i].onclick=function(){
                    //先把所有的图片边框去掉
                    for(var j=0;j<imgs.length;j++){
                        imgs[j].className=''
                    }
                    //给当前选中对象添加边框
                    this.className='imgborder'
                    //获取当前点击的图片地址
                    var url1=this.getAttribute("src")
                    //分别修改左右两个盒子中的图片路径
                    box[0].querySelector("img").setAttribute('src',url1)
                    right_img[0].setAttribute('src',url1)
                }
            }


            //加入购物车
            $(".jrgwc").click(function(e){
                if(u){
                    clearInterval(t)
                    var y = $(".icon-top01").offset().top-$(window).scrollTop()
                    var w = e.clientX - 25
                    var h = e.clientY - 25
                    var i = 1
                    var t = setInterval(function(){
                        var img = $(`<img class="jrgwc_img" src="${dd[0].goods_small_logo}">`)
                        img.css({"left":w+"px","top":h+"px"})
                        $(".jrgwc_box").html(img)
                        w += 10 * i
                        h += 10
                        i *= 0.9 
                        if(h-25 >= y){
                            clearInterval(t)
                            $(".jrgwc_box").html(" ")
                            // 添加到localStorage中
                            var cart =  localStorage.getItem("cartlist")
                            if(cart){
                                cart = JSON.parse(cart)
                                var a=0
                                cart.forEach(item=>{
                                    if(item.goods_id == dd[0].goods_id){
                                        a++;
                                        item["cart_number"]++
                                    }
                                })
                                if(a == 0){
                                    dd[0].cart_number = 1
                                    cart.push(dd[0])
                                }
                                localStorage.setItem("cartlist",JSON.stringify(cart))
                            }else{
                                dd[0].cart_number = 1
                                localStorage.setItem("cartlist",JSON.stringify([dd[0]]))
                            }
                        }
                    },20)
                }else{
                    if(confirm("你还没有登录,是否前往登录")){
                        location.href = "../html/login.html"
                    }
                }
            })


        }
    })
}else{
    location.href = "../html/shouye.html"
}
