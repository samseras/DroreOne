
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
 	    				<input type="text" v-model="username" id="userid" placeholder="请输入用户名" ref="userid"/>
 	    				<input type="password" v-model="password" id="userpass" placeholder="请输入密码" ref="userpass"/>
 	    				<!--<input type="text" name="checkname" id="checkCode" placeholder="请输入验证码" v-model="checkCode" @keyup="enter" @blur="regForm()" ref="checkCode"/>-->
 	    				<!--<input type="text" name="codename" id="Code" @click="changeCheckCode"/>-->
 	    				<input type="button" @click="loginOn" value="登录" id="submit">
 	    			</form>
 	    		</aside>
 	    	</section>
 		</div>
 	</div>
</template>
<script>
    let Base64 = require('js-base64').Base64;
    import api from "@/api"
    import { mapMutations,mapActions } from 'vuex'
	export default {
		data() {
	        return {
                username:'',
                password:'',
                users:[],
                checkCode: ''
			    }
	   },
	   components:{
		},
		methods:{
            ...mapMutations(['SET_USER_DETAIL_INFO',]),
            ...mapActions(['getUserDetailInfo']),
			regForm () {
				let s = $('#checkCode').val().toLowerCase();
				let x= $('#Code').val().toLowerCase();
				var reg1 = /^[a-zA-Z_]\w{4-14}$/;
				var reg2 = /\d{5,16}/;
				if(s == x){

                }else{
                    $('#checkCode').val("");
                }
				// return reg1.test1($('#userid').val()) && reg2.test1($('#userpass').val()) && s == x;
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
            enter () {
                let that =this
                $(document).keyup(function(event){
                    switch(event.keyCode) {
                        case 13:
                            that.loginOn()
                    }
                });
            },
            async loginOn(){
                if (this.username.trim() === '') {
                    this.$refs.checkCode.style.border="none";
                    this.$refs.userpass.style.border="none";
                    this.$refs.userid.style.border="1px solid red";
                    this.$message.error('请输入用户名')
                    return
                }
                if (this.password.trim() === '') {
                    this.$refs.checkCode.style.border="none";
                    this.$refs.userpass.style.border="1px solid red";
                    this.$refs.userid.style.border="none";
                    this.$message.error('请输入密码')
                    return
                }
                let obj = `BASIC ${Base64.encode(this.username +  ":"+ this.password)}`
                await api.login.userLogin(obj).then(res => {
                    console.log(res, 'this is new login api respones')
                    let aid = 'request-token'
                    localStorage.setItem('token', JSON.stringify(res[aid]))
                    if (res[aid] !== '') {
                        this.$router.push('droreone')
                    }
                    this.$message.success("登录成功，欢迎使用 Drore 智慧旅游云平台")
                    this.$store.commit('SET_USER_DETAIL_INFO', res)
                    // this.getUserDetailInfo(this.username)
                }).catch(err => {
                    console.log(err, '登录失败')
                    this.$message.info('用户名或密码错误')
                    this.checkCode = ''
                })
            }
		},
		mounted(){
		    this.enter()
			this.changeCheckCode()
		}
	}
</script>
<style scoped lang="scss" type="text/scss">
	.login{
        min-width: rem(1380);
        width: 100%;
        height:100%;
        min-height: rem(650);
        background: url('../../../static/img/1.png') no-repeat;
        background-size:cover;
        .login-content{
            height: 100%;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
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
                    height:rem(55);
                    vertical-align: middle;
                    margin-top: rem(-10);
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
                    height: 50%;
                    background: none;
                    margin-top: rem(60);
                    p{
                        width: 100%;
                        color: #93d2cc;
                        font-size: rem(18);
                        text-align: center;
                        margin-top: rem(50);
                    }
                    form{
                        margin-top: rem(30);
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
                            padding: rem(20) rem(40);
                            padding-left: rem(40);
                            box-sizing: border-box;
                            background: none;
                            font-size: 16px;
                            color: #999;
                        }
                        #userid{
                            background: url(../../../static/img/person.png) no-repeat;
                            background-size:rem(14);
                            background-position: rem(15) rem(23);
                        }
                        #userpass{
                            background: url(../../../static/img/lock.png) no-repeat;
                            background-size:rem(14);
                            background-position: rem(15) rem(23);
                        }
                        input::-webkit-input-placeholder { /* WebKit browsers */ color: #cad4d6;font-size: rem(12); }
                        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ color: #cad4d6;font-size: rem(12);}
                        input::-moz-placeholder { /* Mozilla Firefox 19+ */ color: #cad4d6;font-size: rem(12); }
                        input:-ms-input-placeholder { /* Internet Explorer 10+ */ color:#cad4d6;font-size: rem(12);}

                        #Code{
                            position:absolute;
                            border: 1px solid #e9eef2;
                            border-radius: rem(3);
                            height: rem(35);
                            width: rem(60);
                            right:rem(20);
                            bottom: 87px;
                            text-indent: 0;
                            font-size: rem(18);
                            text-align: center;
                            outline:none;
                            padding: 0;
                        }
                        #Code:focus{outline: none;}
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
                            padding: 0;
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
