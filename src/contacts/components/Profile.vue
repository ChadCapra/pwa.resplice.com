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
    <el-main>
      <div class="loading" v-if="loading">
        Insert loading animation here...
      </div>

      <div class="error" v-if="error">
        Insert Error Message here...
      </div>

      <!-- <div class="profile" v-if="post"></div> -->
      <div class="profile">
        <el-row class="pro-pic">
          <el-col :span="24"><img src='../../assets/profile_pic.png' alt="Profile Picture"></el-col>
        </el-row>
        <el-row>
          <el-col>First Last</el-col>
        </el-row>
        <el-row>
          <el-col>User PID: {{ $route.params.id }}</el-col>
        </el-row>
        <el-row class="access" type="flex" justify="center">
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="phone" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="comment" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="globe" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="ellipsis-h" scale="2.5"></icon></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">Info row 1</el-col>
          <el-col :span="12">Info row 1</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">Info row 2</el-col>
          <el-col :span="12">Info row 2</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">Info row 3</el-col>
          <el-col :span="12">Info row 3</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">Info row 4</el-col>
          <el-col :span="12">Info row 4</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">Info row 5</el-col>
          <el-col :span="12">Info row 5</el-col>
        </el-row>
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
        profilePic: require('../../assets/profile_pic.png'),
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
    transition: all .30s ease;
  }
  .exit-btn:hover {
    color: #0be8ba;
    cursor: pointer;
  }
  .access {
    position: relative;
    background-color: #1BBC9B;
    padding: 20px;
    width: 100vw;
    left: calc(-50vw + 50%);
  }
  .access-btn {
    color: #fff;
    transition: all .30s ease;
  }
  .access-btn:hover {
    color: #35495E;
    cursor: pointer;
  }
  .pro-pic {
    height: 25vh;
    margin: 15px;
  }
</style>


