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
          <el-button type="primary" size="small" style="font-size: 14px;" @click="share">Share With</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="profile">
        <el-row class="pro-pic">
          <el-col class="pro-pic-col" :span="24"><img v-if="contact.profile_pic" :src='contact.profile_pic' alt="Profile Picture"><div v-else class="profile-pic-placeholder">{{ letter }}</div></el-col>
        </el-row>
        <el-row>
          <el-col style="color: #1BBC9B; font-size: 24px; margin-bottom: 20px;"><span v-if="firstName">{{ firstName }}</span><span v-if="lastName">{{ ` ${lastName}` }}</span></el-col>
        </el-row>
        <el-row class="access" type="flex" justify="center">
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="phone" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="comment" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="globe" scale="2.5"></icon></el-col>
          <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4"><icon class="access-btn" name="ellipsis-h" scale="2.5"></icon></el-col>
        </el-row>
        <el-row v-for="type in attributeTypes" :key="type.id" class="info-row" type="flex" justify="center">
          <el-card class="info-card">
            <div slot="header" class="info-card-header">
              {{ type.name }}
            </div>
            <div v-for="attr in contactAttributesFiltered(type.id)" :key="attr.id" class="info-section">
              <div v-if="attr.id > 0">
                <div class="info-type">{{ attr.sub_type }}</div>
                <div class="info-item">
                  {{ attr.value }}<icon class="info-action-icon" :name="getIconName(attr.attribute_type_id)" scale="2" @click="executeAction"></icon>
                </div>
              </div>
              <div v-else class="info-request"><el-button type="primary" @click="requestAttribute(type.id)">Request Attribute <icon name="paper-plane"></icon></el-button></div>
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
    contact () {
      return this.$store.getters.getContactById(this.$route.params.id)
    },
    contactAttributes () {
      return this.$store.getters.getContactAttributes(this.contact.id)
    },
    firstName () {
      return this.$store.getters.getContactFirstName(this.contact.id)
    },
    lastName () {
      return this.$store.getters.getContactLastName(this.contact.id)
    },
    letter () {
      return this.$store.getters.getContactLetter(this.contact.id)
    },
    attributeTypes () {
      return this.$store.getters.getAttributeTypes
    }
  },
  methods: {
    contactAttributesFiltered (ati) {
      return this.$store.getters.getContactAttributesFiltered(this.contact.id, ati)
    },
    getIconName (ati) {
      switch (ati) {
        case 1:
          return 'phone'
        case 2:
          return 'envelope'
        case 3:
          return 'home'
        case 4:
          return 'share'
        default:
          return 'mobile'
      }
    },
    executeAction () {
      console.log('Action executed')
    },
    requestAttribute (ati) {
      console.log(`Attribute type number ${ati} requested.`)
    },
    share () {
      this.$store.commit('setSharingContacts', [this.contact])
      this.$router.push({name: 'Attributes'})
    }
  }
}
</script>

<style lang="scss" scoped>
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
    &:hover {
      color: #0be8ba;
      cursor: pointer;
    }
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
  .pro-pic-col {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
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
  .info-request {
    display: flex;
    justify-content: center;
    align-items: center;
    & .fa-icon {
      margin-left: 15px;
    }
  }
</style>


