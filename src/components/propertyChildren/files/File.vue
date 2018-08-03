<template>
    <div class="fileDocument">
        <div class="title">
            安全文件
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <FileHeader></FileHeader>
            </div>
            <div class="personList judge-title">
                <ScrollContainer>
                    文件内容
                </ScrollContainer>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import FileHeader from '@/components/propertyChildren/files/FileHeader'
    import api from '@/api'
    import _ from 'lodash'
    export default {
        name: 'area-deploy',
        data(){
            return{
            }
        },
        created () {
        },
        components: {
            ScrollContainer,
            FileHeader
        }
    }

</script>
<style lang="scss" type="text/scss">
</style>
<style lang="scss" scoped type="text/scss">
    .fileDocument{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title{
            width: 100%;
            padding: rem(16) 0 rem(17) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #26bbf0;
            border-bottom:  1px solid #ccc;
        }
        .personContent{
            flex: 1;
            width: 100%;
            padding: 0 rem(15);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .funcTitle {
                width: 100%;
                height: rem(30);
                margin-top: rem(10);
                border-bottom: 2px solid #e44b4e;
            }
            .personList{
                width: 100%;
                flex: 1;
                margin-top: rem(20);
            }
        }
    }

</style>

