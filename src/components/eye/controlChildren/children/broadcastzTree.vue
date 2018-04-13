<template>
    <el-tree
        :data="data4"
        show-checkbox
        node-key="id"
        :expand-on-click-node="true">
    </el-tree>
</template>

<script>
    // let id = 1000;
    export default {
        data() {
            const data = [{
                id: 1,
                label: '室内广播 总共14个 故障2个',
                children: [
                    {id: 6, label: '广播1',},
                    {id: 7, label: '广播2',},
                    {id: 8, label: '广播3',},
                    {id: 9, label: '广播4',},
                    {id: 10, label: '广播5',},
                    {id: 11, label: '广播6',},
                    {id: 12, label: '广播7',},
                    {id: 13, label: '广播8',},
                    {id: 14, label: '广播9',}
                    ]
            }, {
                id: 2,
                label: '室外广播 总共14个 故障2个',
                children: [
                    {id: 15, label: '广播1',},
                    {id: 16, label: '广播2',},
                    {id: 17, label: '广播3',},
                    {id: 18, label: '广播4',},
                    {id: 19, label: '广播5',},
                    {id: 20, label: '广播6',},
                    {id: 21, label: '广播7',},
                    {id: 22, label: '广播8',},
                    {id: 23, label: '广播9',}
                ]
            }, {
                id: 3,
                label: '室外广播 总共14个 故障2个',
                children: [
                    {id: 6, label: '广播1',},
                    {id: 7, label: '广播2',},
                    {id: 8, label: '广播3',},
                    {id: 9, label: '广播4',},
                    {id: 10, label: '广播5',},
                    {id: 11, label: '广播6',},
                    {id: 12, label: '广播7',},
                    {id: 13, label: '广播8',},
                    {id: 14, label: '广播9',}
                ]
            },
            {
                id: 4,
                label: '室外广播 总共14个 故障2个',
                children: [
                    {id: 6, label: '广播1',},
                    {id: 7, label: '广播2',},
                    {id: 8, label: '广播3',},
                    {id: 9, label: '广播4',},
                    {id: 10, label: '广播5',},
                    {id: 11, label: '广播6',},
                    {id: 12, label: '广播7',},
                    {id: 13, label: '广播8',},
                    {id: 14, label: '广播9',}
                ]
            },
            {
                id: 5,
                label: '室外广播 总共14个 故障2个',
                children: [
                    {id: 6, label: '广播1',},
                    {id: 7, label: '广播2',},
                    {id: 8, label: '广播3',},
                    {id: 9, label: '广播4',},
                    {id: 10, label: '广播5',},
                    {id: 11, label: '广播6',},
                    {id: 12, label: '广播7',},
                    {id: 13, label: '广播8',},
                    {id: 14, label: '广播9',}
                ]
            },
            ];
            return {
                data4: JSON.parse(JSON.stringify(data)),
                data5: JSON.parse(JSON.stringify(data))
            }
        },
        methods: {

        }
    };

</script>
<style>


</style>
