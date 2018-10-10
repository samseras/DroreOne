<template>
    <div class="station">
        <ScrollContainer>
            <div class="content">
                <div class="contentDiv">
                   <div class="contentBody">
                      <div class="desc">
                          <div class="left">
                              <span>线路001</span>
                          </div>
                          <div  class="center">
                              <span>船只001还有3分钟到达</span>
                          </div>
                          <div  class="right">
                              <span>剩余人数：14人</span>
                          </div>
                      </div>
                       <div class="trend">
                           <div class="route"></div>


                           <div class="stationInfo">
                               <img src="../../../static/img/icon/station/firstStation.png">
                               <div class="stationName first">西安软件园</div>
                           </div>

                           <div class="stationInfo normal normalPosition">
                               <div class="emptyRound">
                                   <div class="fillRound">
                                   </div>
                               </div>
                               <div class="stationName">西安软件园</div>
                           </div>
                       </div>
                   </div>
                </div>
                <div class="contentDiv">
                    <div class="contentBody">
                        <div class="desc">
                            <div class="left">
                                <span>线路001</span>
                            </div>
                            <div  class="center">
                                <span>船只001还有3分钟到达</span>
                            </div>
                            <div  class="right">
                                <span>剩余人数：14人</span>
                            </div>
                        </div>
                        <div class="trend">

                        </div>
                    </div>
                </div>
                <div class="contentDiv">
                    <div class="contentBody">
                        <div class="desc">
                            <div class="left">
                                <span>线路001</span>
                            </div>
                            <div  class="center">
                                <span>船只001还有3分钟到达</span>
                            </div>
                            <div  class="right">
                                <span>剩余人数：14人</span>
                            </div>
                        </div>
                        <div class="trend">

                        </div>
                    </div>
                </div>
            </div>
        </ScrollContainer>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import {mapGetters} from 'vuex'

    export default {
        name:'station',
        data() {
            return {


            }
        },
        components: {
            ScrollContainer
        },
        methods: {

        },
        watch:{

        },
        created: function () {

        },
        mounted() {
        },
        computed: {
            ...mapGetters([''])
        }
    }
</script>

<style lang="scss" scoped>
    .station {
        width: 100%;
        height: 100%;
        .content{
            width: 100%;
            height:100%;
            /*display: flex;*/
            /*flex-direction: column;*/
            /*justify-content:space-between;*/
            .contentDiv{
                /*flex:1;*/
                width:100%;
                height:35%;
                position:relative;
                .contentBody{
                    width:85%;
                    height:90%;
                    border-radius: rem(10);
                    border:1px solid #dcdfe6;
                    background-color: #f2f2f2;
                    position: absolute;
                    margin: auto;
                    top:0;
                    bottom:0;
                    left:0;
                    right:0;
                    display: flex;
                    flex-direction: column;
                    .desc{
                        height:20%;
                        background-color: #f2f2f2;
                        display: flex;
                        flex-direction: row;
                        font-size: 1.14em;
                        .left{
                            flex:1;
                            text-align: center;
                            span{
                                display:block;
                                position: relative;
                                top:50%;
                                transform:translateY(-50%);
                            }
                        }
                        .right{
                            flex:1;
                            text-align: center;
                            span{
                                color:#cf9236;
                                display:block;
                                position: relative;
                                top:50%;
                                transform:translateY(-50%);
                            }
                        }
                        .center{
                            flex:1;
                            text-align: center;
                            span{
                                color:#cf9236;
                                display:block;
                                position: relative;
                                top:50%;
                                transform:translateY(-50%);
                            }
                        }
                    }
                    .trend{
                        height:80%;
                        background-color: #f2f2f2;
                        position: relative;
                        .route{
                            width:100%;
                            height:2px;
                            margin-top:60px;
                            padding:0px;
                            background-color: #cf9236;
                            overflow:hidden;
                        }
                        .stationInfo{
                            position: absolute;
                            top: 50px;
                            width: 20px;
                            text-align: center;
                            .emptyRound{
                                /*border: 1px solid #8c939d;*/
                                width: 100%;
                                height: 20px;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .fillRound{
                                    /*background-color: #8c939d;*/
                                    width: 12px;
                                    height: 12px;
                                    border-radius: 50%;
                                }
                            }
                            .stationName{
                                width:100%;
                                margin-top: 10px;
                                font-size: 14px;
                                line-height: 1em;
                            }
                        }
                        .first{
                            color: #00e3ff;
                        }
                        .end{
                            color: #00e3ff;
                        }
                        .normal{
                            .stationName{
                                color: #8c939d;
                            }
                            .emptyRound{
                                border: 1px solid #8c939d;
                              .fillRound{
                                  background-color: #8c939d;
                              }
                            }

                        }
                        .normalPosition{
                            margin-left: 100px;
                        }
                        .current{
                            color: #a71d5d;
                        }

                    }
                }
            }
        }
    }
</style>
