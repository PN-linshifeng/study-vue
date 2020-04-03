<template>
  <div>
    <el-row :gutter="20" style="margin:24px 0">
      <el-col :span="10">
        <el-form ref="search" :model="search" @submit.native.prevent="handleSearch">
          <el-input placeholder="查询姓名" v-model="search.name" prefix-icon="el-icon-search" />
        </el-form>
      </el-col>
      <el-col :span="14" style="text-align:right">
        <el-button type="primary" @click="addUserVisible=true">添加职工</el-button>
      </el-col>
    </el-row>
    <div></div>
    <el-table :data="dataList.data" v-loading="dataListLoading">
      <el-table-column prop="name" label="职工姓名" />
      <el-table-column prop="age" label="工龄" />
      <el-table-column prop="time" label="入职时间" />
      <el-table-column prop="department" label="部门" />
      <el-table-column prop="position" label="职位" />
      <el-table-column prop="admin" label="管理员" :formatter="formatterAdmin" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" @click="editUser(scope)">修改</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            @click="deleteUser(scope)"
            :loading="scope.row.loading"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev,pager,next"
      background
      style="padding:24px 0"
      :total="dataList.total"
      :current-page="dataList.page"
      @current-change="changePage"
    ></el-pagination>
    <el-dialog :visible="addUserVisible" width="800px" title="添加职工" @close="closeDialog">
      <el-form ref="addUser" :model="user" :rules="addUserRule" label-width="120px">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="user.name" />
        </el-form-item>
        <el-form-item label="工龄：" prop="age">
          <el-input type="number" v-model="user.age" />
        </el-form-item>
        <el-form-item label="入住时间：" prop="time">
          <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="部门：" prop="department">
          <el-input v-model="user.department" />
        </el-form-item>
        <el-form-item label="职位：" prop="position">
          <el-input v-model="user.position" />
        </el-form-item>
        <el-form-item label="管理员：" prop="admin">
          <el-radio v-model="user.admin" label="1">是</el-radio>
          <el-radio v-model="user.admin" label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitAddUser" :loading="addUserLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      search: {
        name: '',
      },
      addUserVisible: false,
      addUser: {
        name: '',
        age: '',
        time: '',
        department: '',
        position: '',
        admin: '0',
      },
      updateUser: undefined,
      addUserRule: {
        name: [{ required: true, message: '名字不能为空', trigger: 'change' }],
        age: [{ required: true, message: '工龄不能为空', trigger: 'change' }],
        time: [{ required: true, message: '入住时间不能为空', trigger: 'change' }],
        department: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        position: [{ required: true, message: '职位不能为空', trigger: 'change' }],
        admin: [{ required: true, message: '管理员不能为空', trigger: 'change' }],
      },
    };
  },
  computed: {
    user() {
      return this.updateUser || this.addUser;
    },
    ...mapState({
      dataList: state => state.user.dataList,
      dataListLoading: state => state.user.dataListLoading,
      addUserLoading: state => state.user.addUserLoading,
    }),
  },
  methods: {
    changePage(page) {
      this.$store.dispatch('user/dataList', { page });
    },
    handleSearch() {
      this.$refs.search.validate(vali => {
        if (vali) {
          this.$store.dispatch('user/dataList', { params: { ...this.search } });
        }
      });
    },
    handleSubmitAddUser() {
      this.$refs.addUser.validate(vali => {
        if (vali) {
          const url = this.updateUser ? 'user/updateUser' : 'user/addUser';
          const data = this.updateUser ? { ...this.updateUser } : { ...this.addUser };
          this.$store.dispatch(url, {
            data: { ...data },
            callback: () => {
              this.updateUser = undefined;
              this.addUserVisible = false;
              this.$refs.addUser.resetFields();
            },
          });
        }
      });
    },
    deleteUser(scope) {
      const { row } = scope;
      this.$confirm('此操作永久删除职工，是否继续', '删除警告').then(() => {
        this.$store.dispatch('user/deleteUser', { data: { id: row.id } });
      });
    },
    editUser({ row }) {
      this.updateUser = { ...row, admin: row.admin.toString() };
      this.addUserVisible = true;
    },
    closeDialog() {
      this.addUserVisible = false;
      if (this.updateUser) {
        this.updateUser = undefined;
        this.$refs.addUser.resetFields();
      }
    },
    formatterAdmin(row) {
      return row.admin === '0' ? '否' : '是';
    },
  },
  created() {
    this.$store.dispatch('user/dataList');
  },
};
</script> 
