<template>
    <div class="screenDialog">
        <el-dialog
            :visible="visible"
            title="定义内容"
            :before-close="closeScreenDialog"
            width="40%"
            class="dialog screen_Dialog"
            center>
            <div class="screenContent">
                 <div class="screenTop">
                     <textarea name="" cols="60" rows="4" placeholder="定义内容"></textarea>
                     <i class="el-icon-circle-plus" @click="addContent"></i>
                 </div>
                <div class="screenBottom">
                    <ul>
                        <li v-for="(item,idx) in contentList">
                            <el-checkbox v-model="item.checked" @change="checked(item,idx)"></el-checkbox>
                            <p>{{item.content}}</p>
                            <i class="el-icon-close" @click="deleteList(item,idx)"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="">保存</el-button>
                <el-button size="mini" @click = 'closeScreenDialog'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['visible'],
        name: "LED-dialog",
        data () {
            return{
               contentList:[
                   {
                       checked:true,
                       content:"1.新年快乐！"
                   },
                   {
                       checked:false,
                       content:"2.下雨天路滑，请注意"
                   },
                   {
                       checked:false,
                       content: "3.夏天炎热，请注意防暑"
                   }
               ],
                showContentList:[],
                checkedList:[],
                dataList:[]
            }
        },
        methods: {
            closeScreenDialog () {
                this.$emit('closeScreenDialog')
            },
            addContent(){
                let content = $(".screenTop>textarea").val();
                let obj = {
                    checked:false,
                    content:content
                };
                if(this.dataList.indexOf(obj.content)===-1){
                         this.contentList.push(obj)
                         this.dataList.push(obj.content)
                }
                console.log(this.contentList);
            },
            deleteList(item,idx){
                this.contentList.splice(idx,1);
                if(this.checkedList.indexOf(item.content) !== -1 ){
                    let index = this.checkedList.indexOf(item.content);
                    this.checkedList.splice(index,1);
                    this.showContentList.splice(index,1);
                }
               // console.log(this.checkedList);
               //  console.log(this.showContentList)
            },
            checked (item,idx) {
                if(item.checked){
                    item.checked = true;
                    this.checkedList.push(item.content);
                    this.showContentList.push(item)
                }else {
                    item.checked = false;
                    let index = this.checkedList.indexOf(item.content)
                    this.checkedList.splice(index,1);
                    this.showContentList.splice(index,1);
                }
                console.log(this.showContentList)
            },
        },
        created () {
        },
        components : {

        },
        mounted(){
            let that = this;
            that.contentList.forEach(function(item){
                  if(item.checked){
                      that.checkedList.push(item.content)
                      that.showContentList.push(item);
                  }
            })
            that.contentList.forEach(function(item){
                that.dataList.push(item.content);
            })

            // console.log(that.checkedList)
            // console.log(that.showContentList)
            // console.log(that.dataList)
        }
    }
</script>

<style lang="scss">
    .screenDialog{
        position: relative;
        .el-dialog__header{
            background: #fafafa;
        }
        .el-dialog__body {
            padding: rem(0) rem(0) 0 rem(0);

        }
        .ol-overlaycontainer-stopevent{
            /*display: none;*/
            position: absolute;
            top: rem(10);
            left: rem(20);
        }
        .ol-overlaycontainer-stopevent .ol-zoom,.ol-control .ol-zoom-in{
            width: rem(20);
            height: rem(20);
            border-radius: 50%;
            opacity: .8;
            transform: scale(1.5);
        }
        .ol-overlaycontainer-stopevent .ol-zoom,.ol-control .ol-zoom-out{
            width: rem(20);
            height: rem(20);
            border-radius: 50%;
            opacity: .8;
            margin-top: rem(15);
            transform:scale(1.5);
        }
        .ol-rotate{
            display: none;
        }
        .ol-attribution{
            display: none;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .screenDialog {
        width: 100%;
        height: rem(300);
        .screen_Dialog{
            width: 100%;
            height: 100%;
            .screenContent{
                width: 100%;
                height: rem(400);
                padding: rem(15);
                box-sizing: border-box;
                /*background: yellowgreen;*/
                border-radius: rem(5);
                .screenTop{
                    height: rem(100);
                    background: #efefef;
                    position: relative;
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(5);
                        box-sizing: border-box;
                        border-radius: rem(5);
                        border: 1px solid #ccc;
                        height: rem(60);
                        line-height: rem(25);
                        overflow-y: auto;
                        margin-top:rem(15) ;
                        margin-left:rem(15) ;
                    }
                    i{
                        position: absolute;
                        width: rem(60);
                        height: rem(60);
                        font-size: rem(40);
                        background: #c8c8c8;
                        text-align: center;
                        line-height: rem(60);
                        border-radius: 50%;
                        color: #edebeb;
                        margin-left: rem(20);
                        top: rem(15);
                    }
                }
                .screenBottom{
                    height: rem(270);
                    border:1px solid #e0e0e0;
                    border-bottom-right-radius: rem(5);
                    border-bottom-left-radius: rem(5);
                    ul{
                        width: 97%;
                        height: 90%;
                        box-sizing: border-box;
                        margin: 3% auto 7%;
                        border-radius: rem(5);
                        background: #efefef;
                        overflow-y: auto;
                        li{
                            margin: 0 rem(15);
                            display: flex;
                            line-height: rem(35);
                            border-bottom: 1px dashed #b1b1b1 ;
                            p{
                                width: 90%;
                                margin-left: rem(10);
                            }
                            i{
                                font-size: rem(14);
                                font-weight: 600;
                                line-height: rem(35);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
