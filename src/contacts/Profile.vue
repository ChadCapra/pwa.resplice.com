<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2">
          <icon class="exit-btn" name="arrow-left" scale="2" @click.native="exitProfile"></icon>
        </el-col>
        <el-col :span="20" justify="center">
          <span>Profile</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!-- <div class="loading" v-if="loading">
        Insert loading animation here...
      </div>

      <div class="error" v-if="error">
        Insert Error Message here...
      </div> -->

      <!-- <div class="profile" v-if="post"></div> -->
      <div class="profile">
        <el-row class="pro-pic">
          <el-col :span="24"><img src='../assets/profile_pic.png' alt="Profile Picture"></el-col>
        </el-row>
        <el-row>
          <el-col style="color: #1BBC9B; font-size: 24px;">{{ firstName + ' ' + lastName }}</el-col>
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
        <el-row class="info-row" type="flex" justify="center">
          <el-card class="info-card">
            <div slot="header" class="info-card-header">
              <span>Personal</span>
            </div>
            <div v-for="i in userData.personal.phones" :key="i" class="text item">
              <icon class="info-icon" name="phone" scale="1.5"></icon>{{ i }}
            </div>
            <div v-for="i in userData.personal.emails" :key="i" class="text item">
              <icon class="info-icon" name="envelope" scale="1.5"></icon>{{ i }}
            </div>
          </el-card>
        </el-row>
        <el-row class="info-row" type="flex" justify="center">
          <el-card class="info-card">
            <div slot="header" class="info-card-header">
              <span>Work</span>
            </div>
            <div v-for="i in userData.work.phones" :key="i" class="text item">
              <icon class="info-icon" name="phone" scale="1.5"></icon>{{ i }}
            </div>
            <div v-for="i in userData.work.emails" :key="i" class="text item">
              <icon class="info-icon" name="envelope" scale="1.5"></icon>{{ i }}
            </div>
          </el-card>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null,
      userData: {
        firstName: 'Luke',
        lastName: 'Skywalker',
        group: 'Heroes',
        personal: {
          name: 'Personal',
          phones: ['555-555-5555'],
          emails: ['personal@domain.com']
        },
        work: {
          name: 'Work',
          phones: ['999-999-9999'],
          emails: ['email@domain.com']
        }
      }
    }
  },
  created () {
    // fetch data when the component is created
    // this.fetchData()
  },
  computed: {
    attributes () {
      return this.$store.getters.attributes(this.$route.params.id)
    },
    id () {
      return this.$store.getters.contactId(this.$route.params.id)
    },
    firstName () {
      return this.$store.getters.contactFirst(this.$route.params.id)
    },
    lastName () {
      return this.$store.getters.contactLast(this.$route.params.id)
    },
    profilePic () {
      return this.$store.getters.contactProfilePic(this.$route.params.id)
    }
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
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
  .el-header {
    padding-top: 10px;
    font-size: 28px;
    background-color: #32393d;
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
    height: 10vh;
    margin: 15px;
  }
  .info-row {
    padding: 10px;
    border: 5px;
  }
  .info-icon {
    margin-right: 5px;
    color: #1BBC9B;
  }
  .info-card {
    text-align: left;
    width: 100%;
  }
  .info-card-header {
    color: #1BBC9B;
  }
</style>


