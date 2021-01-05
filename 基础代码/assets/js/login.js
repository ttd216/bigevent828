$(function(){
     $(".login a").click(function(){
         $('.login').hide().next().show()
     })
     $(".register a").click(function(){
         $('.register').hide().prev().show()
     })





     let layer = layui.layer;
     $('.register form').on("submit",function(e){
        e.preventDefault();  
        
        let data=$(this).serialize();
      $.ajax({
          type:"POST",
          url:"/api/reguser",
          data:data,
          success:function(res){
            layer.msg(res.message);
            if (res.status===0){
                $('.register').hide().prev().show()
            }
          }

      })

     })

   let form=layui.form

   form.verify({
       pwd:function(value){
        if (!/^\S{6,12}$/.test(value)){
           return;

        }
      },
      repwd:function(value){
        let pwd=$('.reg-password [name=password]').val().trim()
        if(value!==pwd){
          return "两次密码不一致，请重新输入"
        }
      }
   });

   $('#loginForm').on("submit",function(e){
     e.preventDefault()
     $.ajax({
       type:"POST",
       url:"/api/login",
       data:$(this).serialize(),
       success:function(res){
         layer.msg(res.message);
         if (res.status !== 0) {
          // 登录失败
          return layer.msg("登录失败");
        }

        /* // 登录成功
        layer.msg("登录成功, 即将跳转到首页");
        // 跳转页面
        location.href = "/home/index.html"; */

        // 登录成功，还需要把服务器给的token信息给存储起来
        localStorage.setItem("token", res.token);

        // 延时跳转：等弹出框关闭了才去跳转
        layer.msg("登录成功, 即将跳转到首页", function () {
          // 弹出框关闭了才会执行该函数
          // 跳转页面
          location.href = "/ttd/基础代码/index.html";
        });
       }
     })
   })

})