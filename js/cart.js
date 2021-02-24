var u = getCookie("sfdl")
var cart
//已经登录
if(u){
    show()
}else{
    if(confirm("你还没有登录,是否前往登录")){
        location.href = "../html/login.html"
    }else{
        location.href = "../html/shouye.html"
    }
}

$(".cart_goods").click(e=>{
    target = e.target
    var id = target.getAttribute("data-id")
    //全选
    if(target.name == "quanxuan"){
        if(target.checked){
            cart.forEach(i=>{
                i.is_select = 1
            })
        }else{
            cart.forEach(i=>{
                i.is_select = 0
            })
            
        }
        localStorage.setItem("cartlist",JSON.stringify(cart))
        show()
    }
    //单选
    if(target.name == "xuan"){
        cart.forEach(i=>{
            if(i.goods_id == id){
                if(target.checked){
                    i.is_select = 1
                }else{
                    i.is_select = 0
                }
            }
        })
        localStorage.setItem("cartlist",JSON.stringify(cart))
        show()
    }
    //删除
    if(target.innerText == "删除"){
        if(confirm("是否删除该商品？")){
            cart = cart.filter(i=>{
                return i.goods_id != id
            })
            localStorage.setItem("cartlist",JSON.stringify(cart))
            show()
        }
    }
    //+
    if(target.innerText == "+"){
        cart.forEach(i=>{
            if(i.goods_id == id){
                i.cart_number++
            }
        })
        localStorage.setItem("cartlist",JSON.stringify(cart))
        show()
    }
    //-
    if(target.innerText == "-"){
        cart.forEach(i=>{
            if(i.goods_id == id){
                i.cart_number--
            }
        })
        localStorage.setItem("cartlist",JSON.stringify(cart))
        show()
    }
    //数量
    if(target.type == "text"){
        var val = target.value
        target.onchange = function(){
            var v = parseInt(target.value)
            cart.forEach(i=>{
                if(id == i.goods_id){
                    if(v>=1 && v<=i.goods_number){
                        i.cart_number = v
                        localStorage.setItem("cartlist",JSON.stringify(cart))
                        show()
                    }else{
                        target.value = val
                    }
                }
            })
        }
    }
    //批量删除
    if(target.innerText == "批量删除"){
        if(confirm("是否删除选中商品？")){
            cart = cart.filter(i=>{
                return i.is_select == 0
            })
            localStorage.setItem("cartlist",JSON.stringify(cart))
            show()
        }
    }
    //清空购物车
    if(target.innerText == "清空购物车"){
        if(confirm("清空购物车？")){
            localStorage.removeItem("cartlist")
            show()
        }
    }
    //结算
    if(target.innerText == "结算"){
        var n = target.getAttribute("data-n")
        if(n!=0){
            if(confirm("确定支付？")){
                alert("你需要支付:￥"+n+"元")
                cart = cart.filter(i=>{
                    return i.is_select == 0
                })
                localStorage.setItem("cartlist",JSON.stringify(cart))
                show()
            }
        }else{
            alert("您还未选中商品")
        }
    }
})

function show(){
    cart = JSON.parse(localStorage.getItem("cartlist"))
    if(cart != ""){
        //已选中商品个数
        var shu = 0
        //已选中商品价格
        var jia = 0
        //判断是否全选
        var a = cart.every(i=>{
            return i.is_select == 1
        })
        var str = `
        <div class="cart_goods_header">
            <label><input type="checkbox" name="quanxuan" ${a?"checked":""}><span>全选</span></label>
            <span class="spxx">商品信息</span>
            <span class="danjia">单价</span>
            <span class="shuliang">数量</span>
            <span class="zongjia">总价（元）</span>
            <span class="caozuo">交易操作</span>
        </div>
        `
        cart.forEach(item=>{
            if(item.is_select == 1){
                shu += item.cart_number 
                jia += item.goods_price*item.cart_number
            }
            str += `
            <div class="cart_goods_main clear_fix">
                <label>
                    <input type="checkbox" name="xuan" ${item.is_select==1?"checked":""} data-id=${item.goods_id}>
                    <img src="${item.goods_big_logo}" alt="">
                </label>
                <h2><a href="../html/xiangqing.html?${item.goods_id}">${item.goods_name}</a></h2>
                <h3>￥${item.goods_price}<br><span>库存：${item.goods_number}</span></h3>
                <div class="number">
                    <button ${item.cart_number>1?"":"disabled"} data-id=${item.goods_id}>-</button>
                    <input type="text" value="${item.cart_number}" data-id=${item.goods_id}>
                    <button ${item.goods_number>item.cart_number?"":"disabled"} data-id=${item.goods_id}>+</button>
                </div>
                <h4>${(item.goods_price*item.cart_number).toFixed(2)}</h4>
                <h5 data-id=${item.goods_id}>删除</h5>
            </div>
            `
        })
        str+=`
        <div class="cart_goods_footer clear_fix">
            <label><input type="checkbox" name="quanxuan"  ${a?"checked":""}><span>全选</span></label>
            <h2>批量删除</h2>
            <h3>清空购物车</h3>
            <h4>已选商品<span>${shu}</span>件</h4>
            <h5>合计：<span>￥${jia.toFixed(2)}</span></h5>
            <button data-n=${jia.toFixed(2)}>结算</button>
        </div>
        `
        $(".cart_goods").html(str)
    }else{
        var str = `
        <div class="kongkong clear_fix">
            <h2>您的购物车没有添加商品哦</h2>
            <h3>赶快去购物吧</h3>
            <a href="../html/shouye.html">去选购</a>
        </div>`
        $(".cart_goods").html(str)
    }
}