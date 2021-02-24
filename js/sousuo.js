// 搜索
$(".header_middle input[type=submit]").click(function(){
    var value = $(".header_middle input[type=text]").val() || "面膜"
    $.ajax({
        url: '../php/sousuo.php',   // 必填，请求的地址
        data: {sousuo:value},   // 选填，发送请求是携带的参数
        dataType: 'json',
        success(d){
            var zhibo = $(".zhibo").detach()
            if(d.length == 0){
                var str = `<h2>暂无该商品</h2>`
            }else{
                var str=""
                d.forEach(item=>{
                    str+=`
                    <a href="../html/xiangqing.html?${item.goods_id}" class="goods_box_a">
                        <div class="goods_box">
                            <img src="${item.goods_small_logo}" alt="">
                            <h3>${item.cat_id}</h3>
                            <h4>${item.goods_name}</h4>
                            <h5>￥<span>${item.goods_price}</span></h5>
                        </div>
                    </a>
                    `
                })
            }
            $(".goods_list").html(str)
        }
    })
    return false;
})

$(".header_middle .ss a").click(function(){
    var value = $(this).html()
    $.ajax({
        url: '../php/sousuo.php',   // 必填，请求的地址
        data: {sousuo:value},   // 选填，发送请求是携带的参数
        dataType: 'json',
        success(d){
            var zhibo = $(".zhibo").detach()
            var str=""
            d.forEach(item=>{
                str+=`
                <a href="../html/xiangqing.html?${item.goods_id}" class="goods_box_a">
                    <div class="goods_box">
                        <img src="${item.goods_small_logo}" alt="">
                        <h3>${item.cat_id}</h3>
                        <h4>${item.goods_name}</h4>
                        <h5>￥<span>${item.goods_price}</span></h5>
                    </div>
                </a>
                `
            })
            $(".goods_list").html(str)
        }
    })
})