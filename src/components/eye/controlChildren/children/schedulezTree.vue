<template>
    <div class="broadcast_tree">
        <el-input
            placeholder="名称"
            v-model="filterText">
        </el-input>
        <div class="manage">
            <el-checkbox class="check" v-model="selectAllCheckBox" @change="selectAllCheck">{{title}}总数<font>{{number}}</font>个</el-checkbox>
        </div>
        <el-tree
            :data="Info"
            show-checkbox
            node-key="id"
            :default-checked-keys="lightCheckout"
            :filter-node-method="filterNode"
            default-expand-all
            :expand-on-click-node="false"
            :check-on-click-node="false"
            ref="tree"
            @check="handleCheckChange">
            <span class="custom-tree-node" slot-scope="{ node, Info }" @click="treeShow(node)">
                <img class="icon" :src="node.icon" v-if="node.icon"/>
                <span :class="{ highLight : node.data.state == 'ONLINE' ? true : false}">{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
    import {mapMutations,mapGetters} from 'vuex'
    export default {
        props:['Info','regionId','list','number','title','lightInfo','lightCheckout'],
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
                console.log(node);
                if (this.regionId.includes(node.data.id)) {
                    return
                }
                let checkedKeysId = this.$refs.tree.getCheckedKeys()
                if (checkedKeysId.length < 1) {
                    checkedKeysId.push(node.key)
                } else {
                    if (checkedKeysId.includes(node.key)) {//去掉选中点
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
               this.regionId.forEach(item => {
                   checkedKeysId = checkedKeysId.filter(item1 => {
                       return item !== item1
                   })
               })
                this.$refs.tree.setCheckedKeys(checkedKeysId)

                console.log(this.Info);
                // this.$store.commit('SHOW_TREE', this.Info)
                if (checkedKeysId.length == this.list.length) {
                    this.selectAllCheckBox = true
                } else {
                    this.selectAllCheckBox = false
                }
            },
            selectAllCheck(){
                let arr
                if(this.selectAllCheckBox){
                    this.selectedAll= []
                    for (let i=0;i<this.list.length;i++) {
                        this.selectedAll.push({id:this.list[i].id,label: this.list[i].label})
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
                    this.list.forEach(item => {
                        if (item.checked) {
                            delete item.checked
                        }
                    })
                    arr = this.list
                }
                this.$store.commit('SHOW_TREE', arr)
            },
            handleCheckChange(data,checked) {
                console.log(data, 'oooooooooooo')
                // console.log(checked, 'iiiiiiiiiiiiiiiiiiii')
                checked.checkedNodes = checked.checkedNodes.filter(item => {
                    if (!item.children) {
                        return item
                    }
                })
                if (checked.checkedNodes.length == this.number) {
                    this.selectAllCheckBox = true
                } else {
                    this.selectAllCheckBox = false
                }
                // console.log(checked.checkedNodes.length,this.list.length);
                data.checked = checked
                console.log(data, '这是最后提交的')
                this.$store.commit('SHOW_TREE', data)
            },
            treeALL(){
                if(this.lightCheckout.length > 0){
                    console.log(this.lightCheckout, '测试')
                    if (this.lightCheckout.length == this.number) {
                        this.selectAllCheckBox = true
                    } else {
                        this.selectAllCheckBox = false
                    }
                }
            },
            treeShow(data){
                if(data.isLeaf){
                    this.$store.commit('TREE_SHOW', [])
                    let checkedKeysId = this.$refs.tree.getCheckedKeys()
                    checkedKeysId.push(data.data.id)
                    this.$refs.tree.setCheckedKeys(checkedKeysId)
                    let number =this.number+this.Info.length-1
                    if (checkedKeysId.length >= number) {
                        this.selectAllCheckBox = true
                    } else {
                        this.selectAllCheckBox = false
                    }
                    this.$store.commit('TREE_SHOW', data.data)
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
            ...mapGetters(['getSearchInfo']),
        },
        mounted () {

            let _this = this;
            console.log(this.Info)
            setTimeout(function() {
                _this.treeALL();
            }, 300)
            if (this.getSearchInfo.id) {
                this.$refs.tree.setCheckedKeys([this.getSearchInfo.id])
            }
        }
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

       .highLight{
           color: #00B83F;
       }

   }
</style>
