<template>
    <div class="shop_tree">
        <el-input
            placeholder='商铺名称'
            v-model="filterText">
        </el-input>
        <div class="manage">
            <el-checkbox class="check" v-model="selectAllCheckBox"
            @change="selectAllCheck">
                {{title}}总数<font>{{number}}</font>个
            </el-checkbox>
        </div>
        <el-tree
            :data="Info"
            show-checkbox
            node-key="id"
            :expand-on-click-node="true"
            :default-expanded-keys="regionId"
            :default-checked-keys="shopCheckout"
            :filter-node-method="filterNode"
            ref="tree"
            @check="handleCheckChange">
            <span class="custom-tree-node" slot-scope="{node,Info}">
                <img class="icon" :src="node.icon">
                <span>{{node.label}}</span>
            </span>
        </el-tree>

    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        props:['Info','regionId','shopList','number','title','shopCheckout'],
        data(){
            return{
                filterText:'',
                selectAllCheckBox:false,
            }
        },
        methods:{
            ...mapMutations(['SHOW_TREE']),
            filterNode(value,data){
                if(!value) return true;
                return data.label.indexOf(value) !==-1;
            },
            selectAllCheck(state){
                let arr
                if(this.selectAllCheckBox){
                    this.selectedAll = []
                    for(let i=0;i<this.shopList.length;i++){
                        this.selectedAll.push(
                            {id:this.lightList[i].id,label:this.lightList[i].label}
                        )
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
                }else{
                    this.selectedAll= []
                    this.$refs.tree.setCheckedNodes(this.selectedAll);
                    this.shopList.forEach(item => {
                        if (item.checked) {
                            delete item.checked
                        }
                    })
                    arr = this.shopList
                }
                console.log(arr, '这是最后提交的')
                this.$store.commit('SHOW_TREE', arr)
            }
        },


    }


</script>
