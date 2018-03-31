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
    <el-main>User PID: {{ $route.params.id }}
      <div class="loading" v-if="loading">
        Insert loading animation here...
      </div>

      <div class="error" v-if="error">
        Insert Error Message here...
      </div>

      <!-- <div class="profile" v-if="post"></div> -->
      <div class="profile">
        Main Profile Loaded...
      </div>
    </el-main>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        loading: false,
        post: null,
        error: null,
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
  created () {
    // fetch data when the component is created
    // this.fetchData()
  },
  methods: {
    // fetchData () {
    //   this.error = this.post = null
    //   this.loading = true
    //   // getPost is the data fetching API function
    //   // We want to pull data from cache if network is unavailable
    //   getPost(this.$route.params.id, (err, post) => {
    //     this.loading = false
    //     if (err) {
    //       this.error = err.toString()
    //     } else {
    //       this.post = post
    //     }
    //   })
    // },
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
    background-color: #35495E;
    color: #fff;
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


