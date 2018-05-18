<template>
    <div class="broadcast_tree">
        <el-tree
            :data="Info"
            show-checkbox
            node-key="id"
            :expand-on-click-node="true"
            :default-expanded-keys="regionId"
            :default-checked-keys="[]"
            @check-change="handleCheckChange"   >
            <span class="custom-tree-node" slot-scope="{ node, Info }">
                <img class="icon" :src="node.icon"/>
                <span>{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
    export default {
        props:['Info','regionId'],
        data() {
            return {
            }
        },
        methods: {
            handleCheckChange(data) {
                if(!data.children){
                    this.$store.commit('SHOW_TREE', data)
                }
            },
        },
        created: function () {
            this.route=this.$route.path
            if (this.route.includes('light')){

            }
        },
        mounted () {
            console.log(this.Info, '[[][][][')
            console.log(typeof this.Info)
            console.log(typeof [1,2,3])
        }

    };

</script>
<style lang="scss">
   .broadcast_tree{
       font-size: rem(14);
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
