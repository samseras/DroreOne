<template>
    <div class="broadcast_tree">
        <el-input
            placeholder="设备名称,组名称"
            v-model="filterText">
        </el-input>
        <div class="manage">
            <el-checkbox class="check" @change="selectAllCheck">路灯总数<font>{{this.number}}</font>个</el-checkbox>
            <el-checkbox class="check">故障<font>{{this.fault}}</font>个</el-checkbox>
        </div>
        <el-tree
            :data="Info"
            show-checkbox
            node-key="id"
            :expand-on-click-node="true"
            :default-expanded-keys="regionId"
            :default-checked-keys="[]"
            :filter-node-method="filterNode"
            ref="tree"
            @check-change="handleCheckChange">
            <span class="custom-tree-node" slot-scope="{ node, Info }">
                <img class="icon" :src="node.icon"/>
                <span>{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
    export default {
        props:['Info','regionId','lightList'],
        data() {
            return {
                filterText: '',
                number: '0',
                fault: '0',
            }
        },
        methods: {
            numberlist(){
                console.log(this.lightList,'12312321234234')
                this.number = this.lightList.length
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            selectAllCheck(state){
                if(state){
                    this.selectedAll= []
                    for (let i=0;i<this.lightList.length;i++){
                        this.selectedAll.push(this.lightList[i].id)
                    }
                }else {
                    this.selectedAll= []
                }
                this.$refs.tree.setCheckedKeys(this.selectedAll);
            },
            handleCheckChange(data,checked) {
                if(!data.children){
                    // if(checked) {
                    //     data.cchecked =checked
                    //     this.$store.commit('HIDE_TREE', true)
                    //     this.$store.commit('SHOW_TREE', data)
                    // }else {
                    //     this.$store.commit('HIDE_TREE', false)
                    //     this.$store.commit('SHOW_TREE', data)
                    // }
                    data.checked =checked
                    this.$store.commit('SHOW_TREE', data)
                    // this.$set()
                }
            }

        },
        created: function () {
            this.route=this.$route.path
            if (this.route.includes('light')){

            }
        },
        watch:{
            filterText(val) {
                this.$refs.tree.filter(val);
            },
        },
        mounted () {
            this.numberlist();
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
           .el-checkbox:last-child {
               color: #f36a5a;
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
