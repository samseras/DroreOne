<template>
    <div class="screenDialog">
        <el-dialog
            :visible="visible"
            title="定义内容"
            :close-on-click-modal = false
            :before-close="closeScreenDialog"
            width="40%"
            class="dialog screen_Dialog"
            center>
            <div class="screenContent" v-loading="isShowLoading">
                 <div class="screenTop">
                     <textarea name="" cols="60" rows="4" placeholder="定义内容" v-model="content"></textarea>
                     <i class="el-icon-circle-plus" @click="addContent"></i>
                 </div>
                <div class="screenBottom">
                    <ul>
                        <li v-for="item in contentList">
                            <el-checkbox v-model="item.checked" @change="checked(item.id)"></el-checkbox>
                            <p>{{item.content}}</p>
                            <i class="el-icon-close" @click="deleteList(item.id)"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="saveContent">保存</el-button>
                <el-button size="mini" @click = 'closeScreenDialog'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        props: ['visible','screenContentList'],
        name: "LED-dialog",
        data () {
            return{
               contentList:[],
                showContentList:[],
                checkList:[],
                dataList:[],
                isShowLoading: false,
                content: ''
            }
        },
        methods: {
            closeScreenDialog () {
                this.$emit('closeScreenDialog')
            },
            saveContent () {
                let list = []
                this.contentList.forEach(item => {
                    for (let i = 0; i < this.checkList.length; i++) {
                         if (item.id === this.checkList[i]) {
                             list.push(item)
                         }
                    }
                })
                console.log(list, '选择好的')
                this.$emit('saveContent', list)
            },
            addContent(){
                if (this.content.trim() === '') {
                    this.$message.error('请填写要播放的内容')
                    return
                } else {
                    let obj = {
                        name: '1',
                        content: this.content
                    }
                    api.scheduleled.createdContent(JSON.stringify(obj)).then(res => {
                        console.log(res, '添加成功')
                        this.getAllContent()
                        this.$message.success('添加成功')
                        this.content = ''
                    }).catch(err =>{
                        console.log(err, '添加失败')
                        this.$message.error('添加失败，请稍后重试')
                    })
                }
            },
            deleteList(id){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.scheduleled.deleteContent([id]).then(res => {
                        console.log(res, '删除成功')
                        this.contentList = this.contentList.filter(item => {
                            return item.id !== id
                        })
                        this.$message.success('删除成功')
                    }).catch(err => {
                        console.log(err, '删除失败')
                        this.$message.error('删除失败，请稍后重试')
                    })
                }).catch(() => {
                    this.$message.info('取消删除')

                })
            },
            checked (id) {
                this.contentList = this.contentList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item
                })
                if (this.checkList.includes(id)) {
                    this.checkList = this.checkList.filter(item => {
                        return item !== id
                    })
                } else {
                    this.checkList.push(id)
                }
            },
            async getAllContent () {
                this.isShowLoading =true
                await api.scheduleled.getAllContent().then(res => {
                    console.log(res, '请求成功')
                    this.isShowLoading = false
                    this.contentList = res
                    this.contentList.forEach(item => {
                        item.checked = false
                        if (this.screenContentList && this.screenContentList.length > 0) {
                            this.screenContentList.forEach(item1 => {
                                if (item.id === item1.id) {
                                    item.checked = true
                                    this.checked(item1.id)
                                }
                            })
                        }
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            }
        },
        created () {
            this.getAllContent()
        },
        components : {

        },
        watch: {
            screenContentList () {
                console.log (this.screenContentList, 'jgscsdchjkg')
            }
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
