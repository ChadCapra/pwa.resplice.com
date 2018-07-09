<template>
  <el-container>
    <el-header>
      <el-row align="top" justify="space-between">
        <el-col :xs="6" :sm="4" :md="2" :lg="2" :xl="2">
          <icon class="exit-btn" name="arrow-left" scale="2" @click.native="$router.go(-1)"></icon>
        </el-col>
        <el-col :xs="12" :sm="18" :md="20" :lg="20" :xl="20">
          <span>Contact</span>
        </el-col>
        <el-col :xs="6" :sm="4" :md="2" :lg="2" :xl="2" justify="center" style="display: flex; justify-content: flex-end;">
          <el-button type="primary" size="medium">Invite</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="profile">
        <el-row class="pro-pic">
          <el-col :span="24"><img v-if="profilePic" :src='profilePic' alt="Profile Picture"><div v-else class="pic-placeholder"></div></el-col>
        </el-row>
        <el-row>
          <el-col style="color: #1BBC9B; font-size: 24px; margin-bottom: 20px;"><span v-if="firstName != null">{{ firstName }}</span><span v-if="lastName != null">{{ ' ' + lastName }}</span></el-col>
        </el-row>
        <el-row class="access" type="flex" justify="center">
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="phone" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="comment" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="globe" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="ellipsis-h" scale="2.5"></icon></el-col>
        </el-row>
        <el-row v-for="type in activeAttributeTypes" :key="type.id" class="info-row" type="flex" justify="center">
          <el-card class="info-card">
            <div slot="header" class="info-card-header">
              {{ type.name }}
            </div>
            <div v-for="info in type.attributes" :key="info.id" class="info-section text item">
              <div class="info-type">{{ info.type }}</div>
              <div class="info-item">
                {{ info.value }}<icon class="info-action-icon" :name="getIconName(info.attribute_group_id)" scale="2" @click="executeAction"></icon>
              </div>
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
      error: null
    }
  },
  computed: {
    // Find a better way to do attributes, using getters and setters
    attributes () {
      return this.$store.getters.getAttributes(this.$route.params.id)
    },
    activeAttributeTypes () {
      var types = this.$store.state.attributeTypes // get state attributeTypes
      types.forEach(type => {
        type.attributes = [] // reset state
      })
      this.attributes.forEach(a => { // push each attribute to a group.attributes array
        types.find(element => element.id === a.attribute_group_id).attributes.push(a)
      })
      var activeTypes = [] // Create active types variable
      types.forEach(type => {
        if (type.attributes.length > 0) {
          activeTypes.push(type) // Check which types have attributes in them and return them.
        }
      })
      return activeTypes
    },
    id () {
      return this.$store.getters.getContactId(this.$route.params.id)
    },
    firstName () {
      return this.$store.getters.getContactFirst(this.$route.params.id)
    },
    lastName () {
      return this.$store.getters.getContactLast(this.$route.params.id)
    },
    profilePic () {
      return this.$store.getters.getContactProfilePic(this.$route.params.id)
    }
  },
  methods: {
    getIconName (agi) {
      switch (agi) {
        case '1':
          return 'phone'
        case '2':
          return 'envelope'
        case '3':
          return 'home'
        case '4':
          return 'share'
        default:
          return 'mobile'
      }
    },
    executeAction () {
      console.log('Action executed')
    }
  }
}
</script>

<style scoped>
  .el-header {
    padding-top: 13px;
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
    margin-top: 15px;
  }
  .info-action-icon {
    margin-right: 5px;
    color: #1BBC9B;
  }
  .info-card {
    text-align: left;
    width: 100%;
  }
  .info-card-header {
    color: #1BBC9B;
    text-transform: capitalize;
    font-size: 18px;
  }
  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 16px;
  }
  .info-type {
    opacity: 0.7;
    text-transform: capitalize;
  }
  .info-section {
    margin-bottom: 15px;
  }
</style>


