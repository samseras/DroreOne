<template>
    <div class="screenShow" style="background: url('../../../static/img/screenBg.png')">
        <el-container>
            <el-header>
                <el-row :gutter="10">
                    <el-col :xs="7" :sm="7" :md="6" :lg="7" :xl="7">
                        <div>卓锐科技股份有限公司</div>
                    </el-col>
                    <el-col :xs="9" :sm="7" :md="6" :lg="9" :xl="9">
                        <div class="scrrenTile">
                            <img src="../../../static/img/screenHead.svg" alt="">
                            <p>都江堰景区智慧旅游数据</p>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="7" :md="6" :lg="4" :xl="4">
                       <div>{{currTime | dayFiler}}({{currTime | weekFiler}})  {{currTime | timeFiler}}</div>
                    </el-col>
                    <el-col :xs="4" :sm="7" :md="6" :lg="4" :xl="4">
                            <a class="getBack" href=""><img src="../../../static/img/screenHome.svg" alt=""></a>
                            <div class="skinPeeler ">
                                <el-menu  class="el-menu-demo" mode="horizontal" router>
                                    <el-submenu index="">
                                        <template slot="title">
                                            <span class="Admin">换肤</span>
                                            <img src="../../../static/img/screenSetting.svg" alt="">
                                        </template>
                                        <el-menu-item index="">皮肤一</el-menu-item>
                                        <el-menu-item index="/droreone">皮肤二</el-menu-item>
                                        <el-menu-item index="/login">皮肤三</el-menu-item>
                                    </el-submenu>
                                </el-menu>
                            </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>Main</el-main>
        </el-container>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        props: [],
        data () {
             return{
                 currTime: new Date(),  //当前时间
             }
        },
        methods:{


        },
        filters: {
            dayFiler(item) {
                // console.log(item, '9090')
                return moment(item).format('YYYY年MM月DD日')
            },
            weekFiler(item) {
                let arr = ['天', '一', '二', '三', '四', '五', '六']
                let day = item.getDay()
                let week = arr.filter((item, index) => {
                    return index === day
                })
                return `星期${week[0]}`
            },
            timeFiler(item) {
                return moment(item).format('YY:MM:DD')
            },
        },
         created () {
            console.log(this.$route.params.id,"@@@@@@@@@@@")
        },
        mounted () {

        }
    }
</script>

<style lang="scss" scoped>
  .screenShow{
      width: 100%;
      height: 100%;
      .el-container{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          .el-header{
              width: 100%;
              height: rem(93)!important;
              /*background: #5daf34;*/
              .el-row{
                  height: rem(93);
                  line-height: rem(93);
                  .el-col{
                      div{
                          width: 100%;
                          text-align: center;
                          color: #fff;
                      }
                      .scrrenTile{
                          position: relative;
                           img{
                               width:100%;
                           }
                          p{
                            position: absolute;
                              top: rem(-3);
                              left: 32%;
                              font-size: rem(24);
                          }
                      }


                  }
                  .el-col:last-child{
                      display: flex;
                      height: 100%;
                      /*div{*/
                          /*width: rem(50);*/
                          /*height: rem(93);*/
                      /*}*/
                      .getBack{
                          display: block;
                          padding-left: rem(40);
                          padding-right: rem(15);
                      }
                      img{
                          width: rem(25);
                          height: rem(25);
                          margin-top: rem(30);
                      }
                      .skinPeeler{
                          width: rem(100);
                          height: 100%;

                          .el-menu-demo{
                              width: 100%;
                              height: 100%;
                              background: none;
                              border-bottom: none;
                              .el-submenu{
                                  width: 100%;
                                  height: 100%;
                                  border-bottom: none;
                                  .el-submenu__title{
                                      border-bottom: none;
                                      height: rem(93);
                                  }
                                  .el-menu-item{
                                      width: rem(100);
                                      height: rem(30);

                                  }
                              }
                          }
                      }
                  }
              }
          }
          el-main{

          }
      }
  }

</style>
<style lang="scss" scoped>

</style>
