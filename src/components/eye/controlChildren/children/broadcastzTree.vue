<template>
    <div class="broadcast_tree">
        <el-input
            placeholder="设备名称,组名称"
            v-model="filterText">
        </el-input>
        <div class="manage">
            <el-checkbox class="check" v-model="selectAllCheckBox" @change="selectAllCheck">{{title}}总数<font>{{number}}</font>个</el-checkbox>
            <!--<el-checkbox class="check">故障<font>{{fault}}</font>个</el-checkbox>-->
        </div>
        <el-tree
            :data="Info"
            show-checkbox
            node-key="id"
            :expand-on-click-node="true"
            :default-expanded-keys="regionId"
            :default-checked-keys="lightCheckout"
            :filter-node-method="filterNode"
            ref="tree"
            @check="handleCheckChange">
            <span class="custom-tree-node" slot-scope="{ node, Info }" @click="getChecked(node,Info)">
                <img class="icon" :src="node.icon"/>
                <span>{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
    import {mapMutations,mapGetters} from 'vuex'
    export default {
        props:['Info','regionId','lightList','number','fault','title','lightInfo','lightCheckout'],
        data() {
            return {
                filterText: '',
                selectAllCheckBox: false,
            }
        },
        methods: {
            ...mapMutations(['SHOW_TREE']),
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            getChecked (node,info) {
                console.log(node.data,'123123')
                if (this.regionId.includes(node.data.id)) {
                    return
                }
                let checkedKeysId = this.$refs.tree.getCheckedKeys()
                console.log(checkedKeysId, 'opopopopopopopopopopopop')
                console.log(node.key, 'xsaccsdcsdcbsdcahjcbjhsdcnmbcjsg')
                if (checkedKeysId.length < 1) {
                    checkedKeysId.push(node.key)
                } else {
                    if (checkedKeysId.includes(node.key)) {//去掉选中点
                        console.log(888888888888888)
                        checkedKeysId = checkedKeysId.filter(item => {
                            // return item !== node.key
                            if (item !== node.key) {
                                return item
                            }
                        })
                    } else {
                        checkedKeysId.push(node.key)//选中点
                    }
                }
                console.log(checkedKeysId, '这是选择后的ID')
               this.regionId.forEach(item => {
                   checkedKeysId = checkedKeysId.filter(item1 => {
                       return item !== item1
                   })
               })
                this.$refs.tree.setCheckedKeys(checkedKeysId)
            },
            selectAllCheck(){
                let arr
                if(this.selectAllCheckBox){
                    this.selectedAll= []
                    for (let i=0;i<this.lightList.length;i++){
                        this.selectedAll.push({id:this.lightList[i].id,label: this.lightList[i].label})
                    }
                    this.$refs.tree.setCheckedNodes(this.selectedAll);
                    arr = this.$refs.tree.getCheckedNodes()
                    arr = arr.filter(item => {
                        if (item.children) {
                            item.checked={}
                            item.checked.checkedKeys = this.$refs.tree.getCheckedKeys()
                            return item
                        }
                    })
                }else {
                    this.selectedAll= []
                    this.$refs.tree.setCheckedNodes(this.selectedAll);
                    this.lightList.forEach(item => {
                        if (item.checked) {
                            delete item.checked
                        }
                    })
                    arr = this.lightList

                }
                // console.log(arr, '这是最后提交的')
                this.$store.commit('SHOW_TREE', arr)
            },
            handleCheckChange(data,checked) {
                // console.log(data, 'oooooooooooo')
                // console.log(checked, 'iiiiiiiiiiiiiiiiiiii')
                checked.checkedNodes = checked.checkedNodes.filter(item => {
                    if (!item.children) {
                        return item
                    }
                })
                if (checked.checkedNodes.length == this.lightList.length) {
                    this.selectAllCheckBox = true
                } else {
                    this.selectAllCheckBox = false
                }
                data.checked = checked
                this.$store.commit('SHOW_TREE', data)
            },
            treeALL(){
                if(this.lightCheckout.length > 0){
                    if (this.lightCheckout.length == this.number) {
                        this.selectAllCheckBox = true
                    } else {
                        this.selectAllCheckBox = false
                    }
                }
            }
        },
        created: function () {

        },
        watch:{
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            getSearchInfo () {
                if (this.getSearchInfo.id) {
                    this.$refs.tree.setCheckedKeys([this.getSearchInfo.id])
                }
            },
        },
        computed: {
            ...mapGetters(['getSearchInfo'])
        },
        mounted () {
            let _this = this;
            setTimeout(function() {
                _this.treeALL();
            }, 300)
            if (this.getSearchInfo.id) {
                this.$refs.tree.setCheckedKeys([this.getSearchInfo.id])
            }
        },

    };

</script>
<style lang="scss">
   .broadcast_tree{
       font-size: rem(14);
       .el-input{
           padding: rem(10);
           background: #f2f2f2;
           box-sizing: border-box;
           .el-input__inner{
               height: rem(26);
               line-height: rem(26);
           }
       }
       .manage {
           width: 100%;
           height: 45px;
           line-height: 45px;
           border-bottom: 1px solid #ccc;
           .check {
               margin-left: 10px;
           }
       }
       .el-tree-node__children{
            .custom-tree-node{
                .icon{
                    width: rem(18);
                    height:rem(18);
                    margin-right: rem(5);
                    display: inline-block;
                    vertical-align: bottom;
                }
           }
       }
   }
</style>
