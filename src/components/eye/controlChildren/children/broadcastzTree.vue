<template>
    <div class="broadcast_tree">
        <el-tree
            :data="Info"
            show-checkbox
            node-key="id"
            :expand-on-click-node="true"
            :default-expanded-keys="['b2df9e8f-b12e-4c66-9575-b18356777a68']"
            :default-checked-keys="['b2df9e8f-b12e-4c66-9575-b18356777a68',6,19]">
            <span class="custom-tree-node" slot-scope="{ node, Info }">
                <img class="icon" :src="node.icon"/>
                <span>{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
    export default {
        props:['visible','Info','title','isDisabled'],
        data() {
            return {
                data4: JSON.parse(JSON.stringify(this.Info)),
            }
        },
        methods: {

        },
        created: function () {
            console.log(this.Info)
            this.route=this.$route.path
            if (this.route.includes('light')){

            }
        },

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
