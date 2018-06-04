<template>
    <div class="device-type" >

        <template>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    v-for="col in cols"
                    :prop="col.prop" :label="col.label" >
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    export default {
        name: "devicetype",
        data(){
            return{
                route:1,
                tableData:[],
                cols:[],
                tableData1: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                tableData2: [{
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                cols1: [
                    {prop: 'date', label: '日期'},
                    {prop: 'name', label: '姓名'},
                    {prop: 'address', label: '住址'}
                ],
                cols2: [
                    {prop: 'name', label: '姓名'},
                    {prop: 'address', label: '住址'}
                ]
            }
        },
        methods:{

        },
        components:{

        },
        watch:{
            '$route'(){
                //this.route = this.$route.path
                this.route=parseInt(this.$route.params.category);
                console.log(this.route);
                switch (this.route) {   //7,10,3
                    case '1': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                    case '2': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                    case '3': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                    case '4': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                    case '5': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                    case '6': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                    case '7': {
                        this.tableData=this.tableData2;
                        this.cols=this.cols2;
                        break
                    }
                    case '8': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                    case '9': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                    case '10': {
                        this.tableData=this.tableData1;
                        this.cols=this.cols1;
                        break
                    }
                }

            }
        },
        created(){
            this.tableData=this.tableData1;
            this.cols=this.cols1;
        }
    }
</script>

<style  lang="scss" type="text/scss">
    .device-type{
        margin:1rem;
        border:1px solid red;
    }
</style>
