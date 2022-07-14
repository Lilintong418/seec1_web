<template>
  <div>
    <h3>数据的增删改查</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="100px" prop="date">
      </el-table-column>
      <el-table-column label="姓名" width="100px" prop="name">
      </el-table-column>
      <el-table-column label="地址" width="400px" align="center" prop="address">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
      <el-table-column label="修改" width="300px" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 表单 -->
    <MyDialog
      :form="form"
      :dialogFormVisible="dialogFormVisible"
      :formLabelWidth="formLabelWidth"
      @confirmfn_my="confirmfn"
      @my_cancel="cancelfn"
    ></MyDialog>

    <!-- 增加的窗 -->
    <AddDialog
      :addform="addform"
      :label-width="formLabelWidth"
      :incrementform="incrementform"
      @my_addconfirm="addconfirmfn"
      @my_addcancel="addcancelfn"
    ></AddDialog>
    <div>
      <el-button @click="addfn">增加新用户</el-button>
    </div>
  </div>
</template>
<script>
import instance from "@/api/api";
import dayjs from "dayjs";
import MyDialog from "@/components/MyDialog.vue";
import AddDialog from "@/components/AddDialog.vue";
export default {
  name: "index",
  components: {
    MyDialog,
    AddDialog,
  },
  data() {
    return {
      search: "",
      tableData: [],
      dialogFormVisible: false, //表单的隐藏
      form: {
        index: 0,
        date: null,
        name: "",
        address: "",
      }, //表单的内容
      formLabelWidth: "120px",
      incrementform: false, //决定增加表单的显示隐藏
      addform: {
        date: null,
        name: "",
        address: "",
      },
    };
  },
  created() {
    this.getall();
  },
  methods: {
    handleEdit(scope) {
      console.log(scope);
      this.form = scope.row;
      this.form.date = this.form.index = scope.$index;
      this.dialogFormVisible = true;
    },
    handleDelete(scope) {
      // console.log(scope);
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletefn(scope.$index).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    confirmfn() {
      this.dialogFormVisible = false;
      this.form.date = dayjs(new Date(this.form.date)).format("YYYY-MM-DD");
      console.log(this.form.date);
      this.updatefn();
    },
    // 修改业务
    async updatefn() {
      let { date, name, address } = this.form;

      let { data } = await instance.put("/update", { date, name, address });
      console.log(data);
    },
    //   删除业务
    async deletefn(index) {
      let { data } = await instance.delete("/delete", { params: { index } });
      console.log(data);
      this.getall();
    },
    // 请求数据业务
    async getall() {
      let { data } = await instance.get("/all");
      console.log(data);
      this.tableData = data.data;
    },
    cancelfn() {
      this.dialogFormVisible = false;
    },
    // 增加业务
    async incrementfn() {
      let { date, name, address } = this.addform;
      let { data } = await instance.post("/add", {date,name, address});
      console.log(data);
    },
    addfn() {
      this.incrementform = true;
    },
    addcancelfn() {
      this.incrementform = false;
    },
    addconfirmfn() {
      this.incrementfn()
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功",
            duration: 1000,
            onClose: () => {
              this.incrementform = false;
              this.getall();
            },
          });
        })
        .catch(() => {

        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>