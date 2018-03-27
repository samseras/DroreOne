<template>
    <div class="detailDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :before-close="closeDialog"
            width="23%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--人员-->
                <div class="personCardContent" v-if="route.includes('person')">
                    <p class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<input type="text"v-model="person.name"></p>
                    <p class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<input type="text"v-model="person.sex"></p>
                    <p class="type">
                        人员角色： <select name="" v-model="person.type">
                        <option v-for="item in options" :value="item.type">{{item.type}}</option>
                        </select>
                    </p>
                    <p class="idNum">身份证号：<input type="text"v-model="person.idNum"></p>
                    <p class="phoneNum">电话号码：<input type="text"v-model="person.phone"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--车船-->
                <div class="personCardContent boatCardContent" v-if="route.includes('boat')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：
                        <select name="" v-model="boatCar.type">
                            <option  value="船只">船只</option>
                            <option  value="车辆">车辆</option>
                        </select>
                    </p>
                    <p class="sex">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text"v-model="boatCar.serNum"></p>
                    <p class="type">
                        维护状态： <select name="" v-model="boatCar.safeStatus">
                        <option  value="正常">正常</option>
                        <option  value="异常">异常</option>
                    </select>
                    </p>
                    <p class="idNum">核载人数：<input type="text"v-model="boatCar.loadNum"></p>
                    <p class="phoneNum">购买时间：<input type="text"v-model="boatCar.buyTime"></p>
                    <p class="phoneNum">维护时间：<input type="text"v-model="boatCar.safeTime"></p>
                    <p class="phoneNum">驾驶人员：<input type="text"v-model="boatCar.driver"></p>
                    <p class="phoneNum">联系电话：<input type="text"v-model="boatCar.phone"></p>
                    <p class="phoneNum">设备号码：<input type="text"v-model="boatCar.facilityNum"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--指示牌-->
                <div class="personCardContent boatCardContent" v-if="route.includes('indicator')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<input type="text"v-model="indicator.type"></p>
                    <p class="phoneNum">所属片区：<input type="text"v-model="indicator.area"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="indicator.location"><img src="" alt="" @click="showMapDialog"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--垃圾桶-->
                <div class="personCardContent boatCardContent" v-if="route.includes('trash')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<input type="text"v-model="trash.type"></p>
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text"v-model="trash.name"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="trash.state">
                        <option  value="充裕">充裕</option>
                        <option  value="已满">已满</option>
                    </select>
                    </p>
                    <p class="idNum">个&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：<input type="text"v-model="trash.number"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="trash.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="phoneNum">所属片区：<input type="text"v-model="trash.area"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--景点-->
                <div class="personCardContent boatCardContent" v-if="route.includes('scenic')">
                    <p class="name">景点名称：<input type="text"v-model="scenic.name"></p>
                    <p class="sex">所属片区：<input type="text"v-model="scenic.area"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="scenic.state">
                        <option  value="正常">充裕</option>
                        <option  value="异常">已满</option>
                    </select>
                    </p>
                    <p class="idNum">容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：<input type="text"v-model="scenic.capacity"></p>

                    <p class="phoneNum">当前人数：<input type="text"v-model="trash.nowPeopleNum"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="scenic.location"><img src="" alt="" @click="showMapDialog"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--商圈-->
                <div class="personCardContent boatCardContent" v-if="route.includes('shop')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<input type="text"v-model="shop.type"></p>
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text"v-model="shop.name"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="shop.state">
                        <option  value="充裕">充裕</option>
                        <option  value="已满">已满</option>
                    </select>
                    </p>
                    <p class="idNum">容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：<input type="text"v-model="shop.capacity"></p>

                    <p class="phoneNum">当前人数：<input type="text"v-model="shop.nowPeopleNum"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="shop.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="phoneNum">所属片区：<input type="text"v-model="shop.area"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--停车场-->
                <div class="personCardContent boatCardContent" v-if="route.includes('park')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<input type="text"v-model="park.type"></p>
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text"v-model="park.name"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="park.state">
                        <option  value="充裕">充裕</option>
                        <option  value="已满">已满</option>
                        <option  value="紧张">紧张</option>
                    </select>
                    </p>
                    <p class="idNum">空余车位：<input type="text"v-model="park.residuePark"></p>

                    <p class="phoneNum">车位总数：<input type="text"v-model="park.allPark"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="park.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="phoneNum">所属片区：<input type="text"v-model="park.area"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--洗手间-->
                <div class="personCardContent boatCardContent" v-if="route.includes('toilet')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text"v-model="toilet.name"></p>
                    <p class="phoneNum">所属片区：<input type="text"v-model="toilet.area"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="toilet.state">
                        <option  value="正常">正常</option>
                        <option  value="紧张">紧张</option>
                    </select>
                    </p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="toilet.location"><img src="" alt="" @click="showMapDialog"></p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--片区-->
                <div class="personCardContent boatCardContent" v-if="route.includes('area')">
                    <p class="sex">片区名称：<input type="text"v-model="area.name"></p>
                    <p class="phoneNum">所在景区：<input type="text"v-model="area.placeScenic"></p>
                    <p class="phoneNum">位置范围：<input type="text"v-model="area.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="area.describe" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
                <!--路网-->
                <div class="personCardContent boatCardContent" v-if="route.includes('roat')">
                    <p class="sex">路线名称：<input type="text"v-model="roat.name"></p>
                    <p class="phoneNum">所在景区：<input type="text"v-model="roat.placeScenic"></p>
                    <p class="phoneNum">位置范围：<input type="text"v-model="roat.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name=""v-model="roat.describe" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                    <div class="img">
                        <img src="" alt="">
                    </div>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="addNewInfo" :disabled='isDisabled'>保存</el-button>
                <el-button size="mini" @click = 'closeDialog' :disabled='isDisabled'>取消</el-button>
            </div>
        </el-dialog>
        <MapDialog v-if="mapVisible" :visible="mapVisible" class="map" @closeMapDialog = 'closeMapDialog'></MapDialog>
    </div>
</template>

<script>
    import MapDialog from './mapDialog'
    export default {
        name: "person-detail",
        props: ['visible', 'Info','isDisabled','title'],
        data () {
            return {
                isShowMapDialog: false,
                mapVisible: false,
                person: {
                    name:'',
                    sex:'',
                    idNum:'',
                    type: '',
                    phone:''
                },
                boatCar: {
                    type: '',
                    serNum: '',
                    safeStatus: '',
                    loadNum: '',
                    buyTime: '',
                    safeTime: '',
                    driver: '',
                    phone: '',
                    facilityNum:''
                },
                trash: {
                    type: '',
                    name: '',
                    state: '',
                    number: '',
                    location: '',
                    area: '',
                },
                indicator: {
                    type: '',
                    area: '',
                    location: ''
                },
                scenic: {
                    name: '',
                    area: '',
                    state: '',
                    capacity: '',
                    nowPeopleNum: '',
                    location: ''
                },
                shop: {
                    type: '',
                    name: '',
                    state: '',
                    capacity: '',
                    nowPeopleNum: '',
                    location: '',
                    area: '',
                },
                park: {
                    type:'',
                    name:'',
                    state:'',
                    residuePark:'',
                    allPark:'',
                    location:'',
                    area:'',
                },
                toilet: {
                    name:'',
                    area:'',
                    state:'',
                    location:'',
                },
                area: {
                    name: '',
                    placeScenic: '',//所在景区
                    location: '',
                    describe: ''
                },
                roat: {
                    name: '',
                    placeScenic: '',//所在景区
                    location: '',
                    describe: ''
                },
                options: [
                    {type: '安保'},
                    {type: '售票'},
                    {type: '保洁'},
                    {type: '司机'},
                    {type: '船夫'},
                    {type: '检票'}
                ],
                route: ''
            }
        },
        methods: {
            select () {
                console.log(this.type, 'klklkl')
            },
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
            addNewInfo () {
                let newInfo = {}
                if (this.route.includes('person')) {
                    newInfo = this.person
                } else if(this.route.includes('boat')) {
                    newInfo = this.boatCar
                } else if(this.route.includes('trash')) {
                    newInfo = this.trash
                } else if(this.route.includes('indicator')) {
                    newInfo = this.indicator
                } else if(this.route.includes('scenic')) {
                    newInfo = this.scenic
                } else if(this.route.includes('shop')) {
                    newInfo = this.shop
                } else if(this.route.includes('park')) {
                    newInfo = this.park
                } else if(this.route.includes('toilet')) {
                    newInfo = this.toilet
                } else if(this.route.includes('area')) {
                    newInfo = this.area
                } else if (this.route.includes('roat')) {
                    newInfo = this.roat
                }
                newInfo.status = true
                newInfo.checked = false
                if (this.Info.id) {
                    newInfo.id = this.Info.id
                    this.$emit('fixInfo', newInfo)
                } else {
                    this.$emit('addNewInfo', newInfo)
                }
                this.closeDialog()
            },
            showMapDialog () {
                // debugger
                this.mapVisible  = true
            },
            closeMapDialog () {
                this.mapVisible = false
            }
        },
        created () {
            this.route = this.$route.path
            console.log(this.Info,'  opopop')
            if (this.route.includes('person')) {
                this.person = this.Info
            } else if(this.route.includes('boat')) {
                this.boatCar = this.Info
            } else if(this.route.includes('trash')) {
                this.trash = this.Info
            } else if(this.route.includes('indicator')) {
                this.indicator = this.Info
            } else if(this.route.includes('scenic')) {
                this.scenic = this.Info
            } else if(this.route.includes('shop')) {
                this.shop = this.Info
            } else if(this.route.includes('park')) {
                this.park = this.Info
            } else if(this.route.includes('toilet')) {
                this.toilet = this.Info
            } else if (this.route.includes('area')) {
                this.area = this.Info
            } else if (this.route.includes('roat')) {
                this.roat = this.Info
            }
        },
        components: {
            MapDialog
        }
    }
</script>
<style lang="scss">
    .detailDialog{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
            /*height: rem(300);*/
        }
        .el-dialog__header{
            padding: rem(5) 0 0 rem(5);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(7);
        }
        .el-dialog__body{
            padding: rem(10) rem(20) 0 rem(20);
            box-sizing: border-box;
            font-size: rem(12);
            min-height: rem(150);
        }
        .el-dialog__footer{
            padding: 0;
            padding: rem(5) 0;
        }
        .el-dialog--center .el-dialog__footer{
            text-align: right;
            padding-right: rem(15);
            border-top: 1px solid #ccc;
            margin-top: rem(15);
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .detailDialog{
        .card{
            width: 100%;
            height: 100%;
            .personCardContent ,.boatCardContent {
                width: 100%;
                height: 100%;
                position: relative;
                p{
                    margin-top: rem(8);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(12);
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size: rem(12);
                    }
                    select{
                        border: none;
                        outline: none;
                        width: rem(100);
                        font-size: rem(12);
                        option{
                            appearance:none;
                            list-style: none;
                            border: none;
                            width: 100%;
                            outline: none;
                            padding: 0;
                            margin: 0;
                            /*border:  1px solid #ccc;*/
                            background: #fff;

                        }
                    }
                    img {
                        display: inline-block;
                        width: rem(20);
                        height: rem(20);
                        border-radius: 50%;
                        background: red;
                        vertical-align: middle;
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                    }
                }
                .img{
                    width: rem(100);
                    height: rem(60);
                    position: absolute;
                    top: rem(0);
                    right: rem(0);
                    background: #fff;
                    img{
                        width: rem(55);
                        height: rem(55);
                        display: inline-block;
                        background: red;
                        border-radius: 50%;
                        margin-left: rem(25);
                    }
                }
            }
            .cardFooter {
                width: 100%;
                padding: rem(5) rem(10);
                box-sizing: border-box;
                border-top: 1px solid #ccc;
                .el-button{
                    padding: 0;
                    padding: rem(4) rem(6);
                }
            }

        }
        .map {
            width: rem(400);
            height: rem(400);
        }
    }
</style>
