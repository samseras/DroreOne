
<template>  
 	<div id="login">
 	    <div class="login-content">
 	    	<header class="top">
 	    		<img src="../../static/img/logo.png"/>
 	    		<span style="padding-right: 10px;">Drore One</span>
 	    		<span>智慧旅游 · 云</span>
 	    	</header>
 	    	<section class="mian-con">
 	    		<aside class="login-left">
 	    			 <img src="../../static/img/20180125143202.png"/>
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
	import tableDatas from "../../API/entrance.js"
	import users from "../../API/user.json"
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
				
				
				location.href = "/index";
			}
		},
		mounted:function(){
			this.changeCheckCode()
			this.users.push(users);
		}
		
		
	}
</script>
<style scoped>
	*{margin: 0;padding:0;}
	
	#login{box-sizing: border-box;min-width: 1519px;min-height: 1080px;width: 100%;height: 100%;min-height: 750px;background: url('../../static/img/1.png') no-repeat;background-size:100%;}
	.login-content{
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background: url('../../static/img/2.png') no-repeat;
	    background-size: contain;
	    background-position: center;
	    padding: 100px 355px;    
	   }
	.top{width: 100%;height: 40px;display: flex;margin-top: 10px;}
	.top img{width: 60px;height:38px;margin-right: 15px;}
	.top span{display: block;line-height: 40px; font-size: 26px;color: #607d8b;border-right: 1px solid #a1b3bb;}
    .top span:last-child{padding-left: 10px;border:none;}
    
    .mian-con{width: 100%;height: 460px;margin-top: 30px;display: flex;}
    .mian-con .login-left{width: 50%;box-sizing: border-box;}
    .login-left img{width: 250px;height: 240px;    margin-left: 85px;margin-top: 100px;}
    .mian-con .login-right{float: left;width: 50%;height: 100%;background: none;}
    .login-right p{width: 100%;color: #93d2cc;font-size: 24px;text-align: center;margin-top: 50px;}
    
    form{margin-top: 50px;margin-left: 30px; position: relative;}
    input:focus { outline: none; } 
    input{border: none;border-bottom: 1px solid #e9eef2;width: 350px;height: 60px;text-indent:50px;background: none;font-size: 24px;}
    #userid{background: url(../../static/img/person.png) no-repeat;background-position: 15px 25px;}
    #userpass{background: url(../../static/img/lock.png) no-repeat;background-position: 15px 23px;}
    input::-webkit-input-placeholder { /* WebKit browsers */ color: #cad4d6;font-size: 12px; } 
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ color: #cad4d6;font-size: 12px;} 
    input::-moz-placeholder { /* Mozilla Firefox 19+ */ color: #cad4d6;font-size: 12px; } 
    input:-ms-input-placeholder { /* Internet Explorer 10+ */ color:#cad4d6;font-size: 12px;}
    #Code{position:absolute;border: 1px solid #e9eef2;height: 40px;width: 120px;right: 32px;top: 130px;text-indent: 0;text-align: center;}
    
    #submit{margin-top: 50px;width: 200px;height: 40px;border-radius: 20px;background: #80cbc4;color: #fffffd;border: none;margin-left: 60px;font-size: 16px;text-indent: 0;}
</style>
