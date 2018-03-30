<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2">
          <icon class="exit-btn" name="arrow-left" scale="2.5" @click.native="exitProfile"></icon>
        </el-col>
        <el-col :span="20" :justify="center">
          <span>Profile</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>User PID: {{ $route.params.id }}</el-main>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        firstName: 'Luke',
        lastName: 'Skywalker',
        group: 'Heroes',
        personal: {
          emails: [
            'lukesky@rebels.com',
            'lukesky@heroes.com'
          ],
          phones: [
            '333-333-3333',
            '999-999-9999'
          ]
        },
        work: {
          emails: ['lukesky@tatooine.com'],
          phones: ['123-456-7890']
        }
      }
    }
  },
  methods: {
    exitProfile () {
      this.$router.push({ name: 'Container' })
    }
  }
}
</script>

<style scoped>
  .el-header {
      padding-top: 10px;
      font-size: 36px;
    }
  .exit-btn {
    float: left;
    color: #1BBC9B;
  }
  .exit-btn:hover {
    color: #0be8ba;
    cursor: pointer;
  }
</style>


