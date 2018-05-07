
<template>
 	<div class="login">
 		<div class="login-content">
 			<header class="top">
 	    		<img src="../../../static/img/logo2.svg"/>
 	    		<!--<span style="padding-right: 10px;">Drore One</span>-->
 	    		<span>智慧旅游 · 云</span>
 	    	</header>
 	    	<section class="mian-con">
 	    		<aside class="login-left">
 	    			 <img src="../../../static/img/20180125143202.png"/>
 	    		</aside>

 	    		<aside class="login-right">
 	    			<p>登录Cloud账号</p>
 	    			<form>
 	    				<input type="text" v-model="username" id="userid" placeholder="请输入用户名"/>
 	    				<input type="password" v-model="password" id="userpass" placeholder="请输入密码"/>
 	    				<input type="text" name="checkname" id="checkCode" placeholder="请输入验证码" />
 	    				<input type="text" name="codename" id="Code" @click="changeCheckCode"/>
 	    				<input type="button" @click="loginOn" value="登录" id="submit">
 	    			</form>
 	    		</aside>
 	    	</section>
 		</div>
 	</div>
</template>

<script>
	// import tableDatas from "../../../API/entrance.js"
	// import users from "../../../API/user.json"
	export default {
		data() {
	        return {
			          username:'',
				      password:'',
				      users:[]
			       }
	   },
	   components:{

		},
		methods:{
			regForm : function() {
				let s = $('#checkCode').val().toLowerCase();
				let x= $('#Code').val().toLowerCase();
				var reg1 = /^[a-zA-Z_]\w{4-14}$/;
				var reg2 = /\d{5,16}/;
				return reg1.test($('#userid').val()) && reg2.test($('#userpass').val()) && s == x;
			},
			changeCheckCode:function(){
				//随机产生验证码
			    $("#Code").val(function(){
			    	var code="";
					var arr=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q"];
					 for(let i=0;i<4;i++){
					 	//var color1=parseInt(Math.random()*8);
					    var index=parseInt(Math.random()*53);
					    code=code+arr[index];
					 }
					 return code;
				});
			},
			loginOn:function(){
				/*if(this.regForm()){*/
					var obj={
						user:this.username,
						word:this.password
					};
					console.log(obj)
				/*tableDatas.findUser(obj,(data)=>{
					console.log(data)
					if(data.length>0){
						var local = window.localStorage;
						local.setItem('nowUser',this.username)
						location.href = "/MicServiceManagementSystem";
					}
				})*/


				/*}else{
					  alert('格式不正确！')
				}*/


				location.href = "/droreone";
			}
		},
		mounted:function(){
			this.changeCheckCode()
			// this.users.push(users);
		}
	}
</script>
<style scoped>
	*{margin: 0;padding:0;}
	.login{min-width: 1380px;width: 100%;height:100%;min-height: 650px;background: url('../../../static/img/1.png') no-repeat;background-size:cover;}
    .login-content{display: flex;flex-direction:column;box-sizing:border-box;margin:0 auto;background: url('../../../static/img/2.png') no-repeat;background-size:960px;background-position:center 100px;padding-top: 200px;padding-bottom: 100px;}
	.top{width: 600px;height: 26px;display: flex;margin: 0 auto;padding-top: 20px;}
	.top img{
        width: 120px;
        height:55px;
        vertical-align: middle;
        margin-top: -10px;
        margin-right: -8px;
    }
	.top span{display: block;line-height: 26px; font-size: 18px;color: #607d8b;border-right: 1px solid #a1b3bb;}
    .top span:last-child{padding-left: 10px;border:none;}

    .mian-con{width: 660px;flex:1;display: flex;margin: 0 auto;}
    .mian-con .login-left{width: 50%;box-sizing: border-box;}
    .login-left img{width: 250px;height: 240px; margin-left: 50px;margin-top: 75px;}
    .mian-con .login-right{float: left;width: 50%;height: 72%;background: none;}
    .login-right p{width: 100%;color: #93d2cc;font-size: 18px;text-align: center;margin-top: 50px;}

    form{margin-top: 15px;margin-left: 30px; position: relative;margin-right: 50px;}
    input:focus { outline: none; }
    input{border: none;border-bottom: 1px solid #e9eef2;width: 280px;height: 60px;text-indent:50px;background: none;font-size: 20px;color: #999;}
    #userid{background: url(../../../static/img/person.png) no-repeat;background-size:14px;background-position: 15px 26px;}
    #userpass{background: url(../../../static/img/lock.png) no-repeat;background-size:14px;background-position: 15px 25px;}
    input::-webkit-input-placeholder { /* WebKit browsers */ color: #cad4d6;font-size: 12px; }
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ color: #cad4d6;font-size: 12px;}
    input::-moz-placeholder { /* Mozilla Firefox 19+ */ color: #cad4d6;font-size: 12px; }
    input:-ms-input-placeholder { /* Internet Explorer 10+ */ color:#cad4d6;font-size: 12px;}

    #Code{position:absolute;border: 1px solid #e9eef2;height: 35px;width: 100px;left:158px;top: 130px;text-indent: 0;text-align: center;font-size: 18px;outline:none;}
    #Code:focus{outline: none;}

    #Code{position:absolute;border: 1px solid #e9eef2;height: 40px;width: 120px;right: 0;top: 130px;text-indent: 0;text-align: center;}

    #submit{margin-top: 35px;width: 200px;height: 40px;border-radius: 20px;background: #80cbc4;color: #fffffd;border: none;margin-left: 40px;font-size: 16px;text-indent: 0;}

    /*@media screen and (min-width:1200px) and (max-width:1300px){*/
	 /*.top{padding-top:80px;}*/
	 /*.mian-con{margin-top: 0;}*/
	 /*form{margin-top: 20px;margin-right: 0;}*/
	 /*input{width: 100%;}*/

	/*}*/
	/*@media screen and (min-width:1100px) and (max-width:1200px){*/
	 /*.top{padding-top:100px;width: 70%;}*/
	 /*.mian-con{margin-top: 0;width: 75%;}*/
	 /*form{margin-top: 20px;margin-right:30px;margin-left: 20px;}*/
	 /*.login-left img{margin-left: 60px;margin-top: 80px;}*/
	 /*input{width: 100%;}*/
	/*}*/
	/*@media screen and (min-width:980px) and (max-width:1100px){*/
	 /*.top{padding-top:100px;width: 75%;}*/
	 /*.mian-con{margin-top: 0;width: 82%;}*/
	 /*form{margin-top: 20px;margin-right:30px;margin-left: 20px;}*/
	 /*.login-left img{margin-left: 60px;margin-top: 80px;}*/
	 /*input{width: 100%;}*/
	/*}*/
	/*@media screen and (min-width:900px) and (max-width:980px){*/
	 /*.top{padding-top:100px;width: 75%;}*/
	 /*.mian-con{margin-top: 0;width: 82%;}*/
	 /*form{margin-top: 20px;margin-right:30px;margin-left: 20px;}*/
	 /*.login-left img{margin-left: 60px;margin-top: 80px;}*/
	 /*input{width: 100%;}*/
	/*}*/


</style>
