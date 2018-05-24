<template>
  <div class="profile">
    <el-row justify="center">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="profilePic" :src="profilePic" alt="User Avatar" class="avatar">
        <div v-else class="avatar-icon">
          <icon name="plus" scale="2.5"></icon>
        </div>
      </el-upload>
    </el-row>
    <el-row>
      <el-card>
        <div class="info-header" slot="header">Basic Information</div>
        <div class="info">
          <el-input v-model="fullName" placeholder="Full Name">
            <template slot="prepend"><icon name="address-card"></icon></template>
          </el-input>
        </div>
        <div class="info">
          <!-- <el-input v-model="userData.userBasic.DOB">
            <template slot="prepend">Date of Birth</template>
          </el-input> -->
          <el-date-picker
            v-model="userData.userBasic.DOB"
            type="date"
            placeholder="Date of Birth">
            <template slot="prepend"><icon name="calender"></icon></template>
          </el-date-picker>
        </div>
        <div class="info">
          <!-- <el-input v-model="userData.userBasic.gender">
            <template slot="prepend">Gender</template>
          </el-input> -->
          <el-autocomplete
            class="inline-input"
            v-model="userData.userBasic.gender"
            :fetch-suggestions="querySearch"
            @select="handleSelect">
            <template slot="prepend">Gender</template>
          </el-autocomplete>
        </div>
      </el-card>
      <el-card>
        <div class="info-header" slot="header">Contact Information</div>
        <div v-for="info in userData.userAttributes" :key="info.id" class="info">
          {{ info.value }}
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiped: false,
      profilePic: '',
      genders: ['Male', 'Female', 'Pan', 'Tri']
    }
  },
  computed: {
    userData () {
      return this.$store.getters.getUserInfo
    },
    fullName () {
      return this.$store.getters.getUserInfo.userBasic.firstName + ' ' + this.$store.getters.getUserInfo.userBasic.lastName
    }
  },
  methods: {
    handleSwipe () {
      this.swiped = true
    },
    handleAvatarSuccess (res, file) {
      this.profilePic = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2m = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('Avatar picture must be JPG or PNG format')
      }
      if (!isLt2m) {
        this.$message.error('Profile picture cannot exceed 2MB')
      }
      return (isJPG || isPNG) && isLt2m
    },
    querySearch (queryString, cb) {
      var genders = this.genders
      var results = queryString ? genders.filter(this.createFilter(queryString)) : genders
      cb(results)
    },
    createFilter (queryString) {
      return gender => {
        return (gender.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    width: 170px;
    height: 170px;
    border: 1px dashed grey;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .avatar-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 170px;
    height: 170px;
    color: #8c939d;
    text-align: center;
  }
  .avatar {
    width: 170px;
    height: 170px;
    display: block;  
  }
  .el-card {
    margin-bottom: 20px;
  }
  .info-header {
    color: #1BBC9B;
  }
  .info-title {
    text-transform: uppercase;
    border-right: #d9d9d9;
    border-right-width: 1px;
    border-right-style: solid;
    padding: 15px;
  }
  .info-content {
    padding: 15px;
  }
  .info {
    text-align: left;
    display: flex;
    margin-top: 15px;
  }
  .el-input-group__prepend {
    padding: 15px;
    width: 150px;
  }
</style>
