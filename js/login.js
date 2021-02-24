//快捷登录
if(getCookie("sfdl")){   //是否登录
    alert("你已登录")
    location.href="../html/shouye.html"
}else{
    info()
}
//初始化
function info(){
    a()
    kuaiji()
    $(".main_form").on("click","#radio_one",function(){
        kuaiji()
    })
    $(".main_form").on("click","#radio_two",function(){
        putong()
        if(getCookie("uname")){
            $("input[name=uname]").prop("value",getCookie("uname"))
        }
        if(getCookie("pwd")){
            $("input[name=pwd]").prop("value",getCookie("pwd"))
        }
    })
}
function a(){
    let yzm = "."
    $(".main_form").on("click","input",function(e){
        if($("#radio_one").prop("checked")){//快捷登录
            // console.log("aa")
            if(e.target.value=="获取验证码"){
                yzm = get_yzm(4)
                $("input[name=yzm]").prop("placeholder",yzm)
                $("input[name=yzm]").prop("value","")
            }
            if(e.target.value=="立即登录"){
                // console.log($("input[name=yzm]").prop("value").toLowerCase())
                // console.log(yzm.toLowerCase())
                if(yzm.toLowerCase() == $("input[name=yzm]").prop("value").toLowerCase() && $("input[name=phone]").prop("value").length==11){
                    var a = $("input[name=phone]").prop("value")
                    $.ajax({
                        url: '../php/login.php',
                        type: 'post', 
                        data: {
                            phone:a
                        },
                        success (res) {
                            if(res == "存在"){
                                alert("登录成功")
                                setCookie("sfdl",a)
                                location.href = "../html/shouye.html"
                            }else{
                                alert("登录失败,号码不存在")
                            }
                    },
                    })
                }
                
                // 阻止表单提交
                $(".main_form").submit(function(){
                    return false
                })
            }
        }
        //普通账号密码登录
        if($("#radio_two").prop("checked")){
            // console.log("bb")
            if(e.target.value=="立即登录"){
                var u = $("input[name=uname]").prop("value")
                var p = $("input[name=pwd]").prop("value")
                if(u != "" && p != ""){
                    $.ajax({
                        url: '../php/login.php',
                        type: 'post', 
                        data: {
                            uname:u,
                            pwd:p
                        },
                        success (res) {
                            console.log(res)
                            if(res == "存在"){
                                alert("登录成功")
                                if($(".checkbox_jizhu").prop("checked")){
                                    setCookie("uname",u)
                                    setCookie("pwd",p)
                                }else{
                                    delCookie("uname")
                                    delCookie("pwd")
                                }
                                setCookie("sfdl",u)
                                location.href = "../html/shouye.html"
                            }else{
                                alert("登录失败,用户名或密码错误")
                            }
                    },
                    })
                }

                // 阻止表单提交
                $(".main_form").submit(function(){
                    return false
                })
            }
        }
    })
}
//快捷登录
function kuaiji(){
    var str = `
        <label>
            <input type="radio" name="xuan" checked id="radio_one"><span>快捷登录</span>
        </label>
        <label>
            <input type="radio" name="xuan" id="radio_two"><span>普通账号密码登录</span>
        </label>
        <input type="text" placeholder="请输入手机号码" name="phone">
        <label id="phone-error" class="error" for="phone"></label>
        <input type="text" placeholder="请输入短信验证码" name="yzm" autocomplete=off >
        <input type="button" value="获取验证码" class="main_form_yzm">
        <label id="yzm-error" class="error" for="yzm" style="display: inline;"></label>
        <input type="submit" value="立即登录">
        <div class="main_form_gengduo">
            <h5>您可以使用以下账号登录</h5>
            <ul>
                <li>
                    <a class="hz_qq" href="https://www.happigo.com/shop/api.php?act=toqq" title="QQ"></a>
                </li>
                <li>
                    <a class="hz_xl" href="https://www.happigo.com/shop/api.php?act=tosina" title="新浪微博"></a>
                </li>
                <li>
                    <a class="hz_login_weixin" href="https://www.happigo.com/shop/api.php?act=weixin" title="微信"><img src="https://ecimg.happigo.com/resource/web/images/icon_wechat_login.png"></a>
                </li>
            </ul>
        </div>
        `
        $(".main_form").html(str)
}
// 普通账号密码登录
function putong(){
    str = `
        <label>
            <input type="radio" name="xuan" id="radio_one"><span>快捷登录</span>
        </label>
        <label>
            <input type="radio" name="xuan" id="radio_two" checked><span>普通账号密码登录</span>
        </label>
        <input type="text" placeholder="已验证手机/邮箱/用户名" name="uname">
        <label id="uname-error" class="error" for="uname"></label>
        <input type="password" placeholder="请输入密码" name="pwd" autocomplete=off style="width: 300px;">
        <label id="pwd-error" class="error" for="pwd" style="display: inline;" ></label>
        <label class="checkbox_jz">
        `
        if(getCookie("uname") && getCookie("pwd")){
            str+=`<input type="checkbox" class="checkbox_jizhu" checked>记住用户密码`
        }else{
            str+=`<input type="checkbox" class="checkbox_jizhu">记住用户密码`
        }

        str += ` 
        </label>
        <span class="wjmm"><a href="https://www.happigo.com/login/forget_password/">忘记密码？</a></span>
        <input type="submit" value="立即登录" style="margin-top:10px">
        <div class="main_form_gengduo">
            <h5>您可以使用以下账号登录</h5>
            <ul>
                <li>
                    <a class="hz_qq" href="https://www.happigo.com/shop/api.php?act=toqq" title="QQ"></a>
                </li>
                <li>
                    <a class="hz_xl" href="https://www.happigo.com/shop/api.php?act=tosina" title="新浪微博"></a>
                </li>
                <li>
                    <a class="hz_login_weixin" href="https://www.happigo.com/shop/api.php?act=weixin" title="微信"><img src="https://ecimg.happigo.com/resource/web/images/icon_wechat_login.png"></a>
                </li>
            </ul>
        </div>
        `
        $(".main_form").html(str)
}

// 获取验证码
function get_yzm(n){
    var arr = get_zmArray()
    var str=""
    for(var i=0; i<n ;i++){
        str+=arr[parseInt(Math.random()*52)]
    }
    return str
}
// 获取字母数组
function get_zmArray(){
    var arr = []
    var count = 0
    //小写
    for (var i = 97; i < 123; i++) {
        arr[count] = String.fromCharCode(i)
        count++
    }
    //大写
    for (var i = 65; i < 91; i++) {
        arr[count] = String.fromCharCode(i)
        count++
    }
    return arr
}