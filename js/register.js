var pwd = ""
var pwd2 = ""
$("input[type=submit]").click(function(){
    if(pwd != "" && pwd == pwd2 && $(".checkbox_jizhu").prop("checked")==true){
        var u = $("input[name=uname]").prop("value")
        $.ajax({
            url: '../php/register.php',   // 必填，请求的地址
            type: 'post',   // 选填，请求方式，默认是 GET（忽略大小写）
            data: {
                uname:u,
                pwd:pwd
            },   // 选填，发送请求是携带的参数
            success (data) {
                alert(data)
                if(data=="账号注册成功"){
                    location.href = "../html/login.html"
                }
            }
        })
    }
})

$("input[name=pwd]")[0].oninput=function(){
    panduan()
}
$("input[name=pwd2]")[0].oninput=function(){
    panduan()
}
function panduan(){//判断密码是否一致，并是否提醒
    pwd = $("input[name=pwd]").prop("value")
    pwd2 = $("input[name=pwd2]").prop("value")
    if(pwd != "" && pwd2 != ""){
        if(pwd == pwd2){
            $("#pwd22-error").text("")
        }else{
            $("#pwd22-error").text("二次密码不一致")
        }
    }else{
        $("#pwd22-error").text("")
    }
}

$(".main_form").submit(function(){
    return false
})
