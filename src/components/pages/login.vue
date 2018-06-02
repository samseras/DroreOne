
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
 	    				<input type="text" name="checkname" id="checkCode" placeholder="请输入验证码" @blur="regForm()"/>
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
    let Base64 = require('js-base64').Base64;
    import api from "@/api"
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
			regForm () {
				let s = $('#checkCode').val().toLowerCase();
				let x= $('#Code').val().toLowerCase();
				var reg1 = /^[a-zA-Z_]\w{4-14}$/;
				var reg2 = /\d{5,16}/;
				if(s == x){

                }else{
                    $('#checkCode').val("");
                }
				// return reg1.test($('#userid').val()) && reg2.test($('#userpass').val()) && s == x;
			},
			changeCheckCode(){
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
            async loginOn(){
                localStorage.clear();
				if($('#checkCode').val() !== "") {
                    // opts.headers["Authorization"] = encodeURIComponent("BASIC " + this.utils.base64Encode(opts.user + ":" + opts.password));
                    let obj = `${Base64.encode(this.username +  ":"+ this.password)}`

                    // var obj = {
                    //     username: this.username,
                    //     password: this.password
                    // };
                    console.log(obj)
                    await api.login.userLogin(obj).then(res => {
                        localStorage.setItem('token', JSON.stringify(`Basic ${obj}`))
                        if(res != []){
                             this.$router.push('droreone')
                        }
                    }).catch(err => {
                        console.log(err, '登录失败')
                        this.$message.info('登录失败')
                    })
                }else{
                    this.$message.info('验证码不能为空')
                }
			}
		},
		mounted(){
			this.changeCheckCode()
			// this.users.push(users);
		}
	}
</script>
<style scoped lang="scss" type="text/scss">
	*{margin: 0;padding:0;}
	.login{
        min-width: rem(1380);
        width: 100%;
        height:100%;
        min-height: rem(650);
        background: url('../../../static/img/1.png') no-repeat;
        background-size:cover;
        .login-content{
            display: flex;
            flex-direction:column;
            box-sizing:border-box;
            margin:0 auto;
            background: url('../../../static/img/2.png') no-repeat;
            background-size:rem(960);
            background-position:center rem(100);
            padding-top: rem(200);
            padding-bottom: rem(100);
            .top{
                width: rem(600);
                height: rem(26);
                display: flex;
                margin: 0 auto;
                padding-top: rem(20);
                img{
                    width: rem(120);
                    height:rem(55);
                    vertical-align: middle;
                    margin-top: rem(-10);
                    margin-right: rem(-8);
                }
                span{
                    display: block;
                    line-height: rem(26);
                    font-size: rem(18);
                    color: #607d8b;
                    border-right: 1px solid #a1b3bb;
                }
                span:last-child{
                    padding-left: rem(10);
                    border:none;
                }
            }
            .mian-con{
                width: rem(660);
                flex:1;
                display: flex;
                margin: 0 auto;
                .login-left{
                    width: 50%;
                    box-sizing: border-box;
                    img{
                        width: rem(250);
                        height: rem(240);
                        margin-left: rem(50);
                        margin-top: rem(75);
                    }
                }
                .login-right{
                    float: left;
                    width: 50%;
                    height: 72%;
                    background: none;
                    p{
                        width: 100%;
                        color: #93d2cc;
                        font-size: rem(18);
                        text-align: center;
                        margin-top: rem(50);
                    }
                    form{
                        margin-top: rem(15);
                        margin-left: rem(30);
                        position: relative;
                        margin-right: rem(50);
                        input:focus {
                            outline: none;
                        }
                        input{
                            border: none;
                            border-bottom: 1px solid #e9eef2;
                            width: rem(280);
                            height: rem(60);
                            text-indent:rem(50);
                            background: none;
                            font-size: rem(20);
                            color: #999;
                        }
                        #userid{
                            background: url(../../../static/img/person.png) no-repeat;
                            background-size:rem(14);
                            background-position: rem(15) rem(26);
                        }
                        #userpass{
                            background: url(../../../static/img/lock.png) no-repeat;
                            background-size:rem(14);
                            background-position: rem(15) rem(25);
                        }
                        input::-webkit-input-placeholder { /* WebKit browsers */ color: #cad4d6;font-size: rem(12); }
                        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ color: #cad4d6;font-size: rem(12);}
                        input::-moz-placeholder { /* Mozilla Firefox 19+ */ color: #cad4d6;font-size: rem(12); }
                        input:-ms-input-placeholder { /* Internet Explorer 10+ */ color:#cad4d6;font-size: rem(12);}

                        #Code{
                            position:absolute;
                            border: 1px solid #e9eef2;
                            height: rem(35);
                            width: rem(100);
                            left:rem(158);
                            top: rem(130);
                            text-indent: 0;
                            text-align: center;
                            font-size: rem(18);
                            outline:none;
                        }
                        #Code:focus{outline: none;}

                        /*#Code{*/
                            /*position:absolute;*/
                            /*border: 1px solid #e9eef2;*/
                            /*height: 40px;*/
                            /*width: 120px;*/
                            /*right: 0;*/
                            /*top: 130px;*/
                            /*text-indent: 0;*/
                            /*text-align: center;}*/

                        #submit{
                            margin-top: rem(35);
                            width: rem(200);
                            height: rem(40);
                            border-radius: rem(20);
                            background: #80cbc4;
                            color: #fffffd;
                            border: none;
                            margin-left: rem(40);
                            font-size: rem(16);
                            text-indent: 0;
                        }

                    }
                }

            }

        }
    }

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
