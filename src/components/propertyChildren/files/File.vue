<template>
    <div class="fileDocument">
        <div class="title">
            <p v-for="(item, index) in crumbList" :key="index" @click="getCrumbItem(item, index)">
                <span>{{item.name}}</span>
                <span v-if="index !== crumbList.length - 1"> > </span>
            </p>
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <FileHeader
                    @createdFloder="createdFloder"
                    @uploadFile="uploadFile">
                </FileHeader>
            </div>
            <div class="personList judge-title">
                <Document></Document>
            </div>
        </div>
        <CreatedFileDialog
            v-if="createdVisible"
            :visible="createdVisible"
            :title="title"
            @closeDialog="closeDialog"
            @saveAsFloder="saveAsFloder">
        </CreatedFileDialog>
        <UploadFileDialog
            v-if="uploadFileVisible"
            :visible="uploadFileVisible"
            @closeFileDialog="closeFileDialog"
            @saveFileHandler="saveFileHandler">
        </UploadFileDialog>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import FileHeader from '@/components/propertyChildren/files/FileHeader'
    import Document from '@/components/propertyChildren/files/Document'
    import CreatedFileDialog from '@/components/propertyChildren/files/createdFileDialog'
    import UploadFileDialog from '@/components/propertyChildren/files/uploadFileDialog'
    import api from '@/api'
    import {mapMutations, mapGetters, mapActions} from 'vuex'
    import _ from 'lodash'
    export default {
        name: 'file-document',
        data(){
            return{
                createdVisible: false,
                title: '',
                crumbList: [],
                uploadFileVisible: false
            }
        },
        created () {
            this.getCrumbsList()
        },
        methods: {
            ...mapMutations(['SET_CREATED_STATUS', 'SET_CLICK_CRUMBS', 'SET_CRUMBS', 'CRUMBS_LIST']),
            ...mapActions(['getFileType']),
            getCrumbsList () {
                let router = this.$route.params.id
                this.getFileType().then(res => {
                    res.forEach(item => {
                        item.name = item.type
                        if (router == item.id) {
                            // this.crumbList.push(item)
                            this.$store.commit('SET_CRUMBS', item)
                        }
                    })
                })
            },
            createdFloder () {
                this.createdVisible = true
                this.title = '创建文件夹'
            },
            uploadFile () {
                this.uploadFileVisible = true
            },
            closeDialog () {
                this.createdVisible = false
            },
            closeFileDialog () {
                this.uploadFileVisible = false
            },
            saveAsFloder (obj) {
                if (this.crumbList.length > 1) {
                    obj.pid = this.crumbList[this.crumbList.length - 1].id
                } else {
                    obj.pid = ''
                }
                obj.documentType = this.$route.params.id
                api.file.createdFloder(JSON.stringify(obj)).then(res => {
                    console.log(res, '成功')
                    this.$store.commit('SET_CREATED_STATUS', new Date().getTime())
                })
                this.closeDialog()
            },
            saveFileHandler () {
              console.log('上传文件回调函数')
            },
            getCrumbItem (item, index) {
                if (index === this.crumbList.length - 1) {
                    return
                }
                this.crumbList = this.crumbList.slice(0, index + 1)
                item.time = new Date().getTime()
                this.$store.commit('SET_CLICK_CRUMBS', item)
            }
        },
        components: {
            ScrollContainer,
            FileHeader,
            Document,
            CreatedFileDialog,
            UploadFileDialog
        },
        watch: {
            '$route' () {
                this.crumbList = []
                this.getCrumbsList()
            },
            getCrumbs () {
                this.crumbList.push(this.getCrumbs)
            },
            crumbList () {
                this.$store.commit('CRUMBS_LIST', this.crumbList)
            }
        },
        computed: {
            ...mapGetters(['getCrumbs'])
        }
    }

</script>
<style lang="scss" type="text/scss">
</style>
<style lang="scss" scoped type="text/scss">
    .fileDocument{
        width: 100%;
        height: 100%;
        .title{
            width: 100%;
            padding: rem(16) 0 rem(17) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #26bbf0;
            border-bottom:  1px solid #ccc;
            p{
                display: inline-block;
                margin-right: rem(5);
                cursor: pointer;
            }
        }
        .personContent{
            width: 100%;
            height: calc(100% - 70px);
            padding: 0 rem(15);
            box-sizing: border-box;
            .funcTitle {
                width: 100%;
                height: rem(30);
                margin-top: rem(10);
                border-bottom: 2px solid #e44b4e;
            }
            .personList{
                width: 100%;
                height: calc(100% - 50px);
                padding: rem(20) 0 rem(10) 0;
                box-sizing: border-box;
            }
        }
    }

</style>

