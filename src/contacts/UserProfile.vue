<template>
  <div v-if="userLoading">
    <re-user-loading></re-user-loading>
  </div>
  <div v-else class="profile">
    <el-row class="pic-uploader">
      <div class="profile-pic">
        <div v-if="profilePic" class="avatar-container" @click="getImg">
          <img :src="profilePic" ref="userImage" alt="User Avatar" class="avatar">
          <icon name="edit" class="edit" scale="2"></icon>
        </div>
        <div v-else class="pic-placeholder" @click="getImg"><icon name="plus" scale="2"></icon></div>
        <input type="file" style="display: none;" ref="upload" @change="cropImg">
      </div>
    </el-row>
    <el-row>
      <el-card>
        <div class="info-header" slot="header">Basic Information</div>
        <div class="info">
          <el-input v-model="firstName" placeholder="First Name">
            <template slot="prepend">First Name</template>
          </el-input>
        </div>
        <div class="info">
          <el-input v-model="lastName" placeholder="Last Name">
            <template slot="prepend">Last Name</template>
          </el-input>
        </div>
        <div class="info">
          <el-date-picker
            v-model="DOB"
            type="date"
            placeholder="Date of Birth"
            value-format="yyyy/MM/dd">
            <template slot="prepend"><icon name="calender"></icon></template>
          </el-date-picker>
        </div>
        <div class="info">
          <el-autocomplete
            class="inline-input"
            v-model="gender"
            :fetch-suggestions="querySearch">
            <template slot="prepend">Gender</template>
          </el-autocomplete>
        </div>
      </el-card>

      <!-- User Attributes -->
      <el-card>
        <div class="info-header" slot="header">Contact Information</div>
        <div v-for="type in attributeTypes" :key="type.id" class="info">
          <div class="info-content-header">
            <div class="type">
              <icon :name="type.icon"></icon>
              <span>{{ type.name }}</span>
            </div>
            <el-button type="primary" size="small" @click="addAttribute(type.id)">Add</el-button>
          </div>
          <div v-for="info in userAttributesFiltered(type.id)" :key="info.id" class="info-content">
            <el-input :value="info.value">
            </el-input>
            <el-select v-model="values[info.id]" placeholder="Select Type">
              <el-option
                v-for="type in options"
                :key="type.value"
                :label="type.label"
                :value="type.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-card>
    </el-row>

    <!-- Cropping and upload modal -->
    <re-modal v-show="showPicModal" @close="showPicModal = false" :loading="loading">
      <vue-croppie
        ref="crop"
        :enable-orientation="true"
        :boundary="{width: 250, height: 250}"
        :viewport="{width: 200, height: 200, type: 'circle'}"
        class="cropper"
        :enableResize="false"></vue-croppie>
        <el-button type="primary" class="cropper-save" @click="buildImage">Save</el-button>
    </re-modal>
  </div>
</template>

<script>
import Modal from '@/contacts/SlideModal.vue'
import axios from 'axios'
import UserLoading from '@/skeleton/UserLoading.vue'

export default {
  components: {
    're-modal': Modal,
    're-user-loading': UserLoading
  },
  data () {
    return {
      showPicModal: false,
      swiped: false,
      loading: false,
      genders: ['Male', 'Female', 'Pan', 'Tri'],
      options: [
        {
          value: 'personal',
          label: 'Personal'
        },
        {
          value: 'home',
          label: 'Home'
        },
        {
          value: 'work',
          label: 'Work'
        },
        {
          value: 'mobile',
          label: 'Mobile'
        },
        {
          value: 'main',
          label: 'Main'
        },
        {
          value: 'other',
          label: 'Other'
        }
      ],
      values: []
    }
  },
  computed: {
    userLoading () {
      return this.$store.getters.getUserLoading
    },
    userData () {
      return this.$store.getters.getUserInfo
    },
    attributeTypes () {
      return this.$store.getters.getAttributeTypes
    },
    firstName: {
      get () {
        return this.$store.getters.getUserInfo.user_basic.first_name
      },
      set (value) {
        this.$store.commit('updateFirstName', value)
      }
    },
    lastName: {
      get () {
        return this.$store.getters.getUserInfo.user_basic.last_name
      },
      set (value) {
        this.$store.commit('updateLastName', value)
      }
    },
    DOB: {
      get () {
        return this.$store.getters.getUserInfo.user_basic.dob
      },
      set (value) {
        this.$store.commit('updateDOB', value)
      }
    },
    gender: {
      get () {
        return this.$store.getters.getUserInfo.user_basic.gender
      },
      set (value) {
        this.$store.commit('updateGender', value)
      }
    },
    profilePic: {
      get () {
        return this.$store.getters.getUserInfo.user_basic.profile_pic
      },
      set (value) {
        this.$store.commit('updateProfilePic', value)
      }
    },
    fullName () {
      return this.$store.getters.getUserInfo.user_basic.first_name + ' ' + this.$store.getters.getUserInfo.user_basic.last_name
    }
  },
  created () {
    if (!this.profilePic) {
      this.$notify({
        title: 'Profile Picture',
        message: 'You havent uploaded a profile picture yet?! Click the plus at the top to upload your shiny new picture...',
        type: 'warning',
        duration: 5000
      })
    }
    this.$store.state.header.showSearch = false
    this.$store.state.header.showBack = true
  },
  destroyed () {
    this.$store.state.header.showBack = false
  },
  methods: {
    userAttributesFiltered (typeId) {
      var attributes = this.$store.getters.getUserAttributes
      return attributes.filter(attr => attr.type_id === typeId)
    },
    addAttribute (type) {
      this.$store.dispatch('pushAttribute', {
        id: '',
        type_id: type,
        value: '',
        genre: '',
        verified: false,
        primary_of_type: false
      })
    },
    handleSwipe () {
      this.swiped = true
    },
    getImg () {
      const input = this.$refs.upload
      input.click()
    },
    cropImg () {
      var file = this.$refs.upload.files[0]
      if (this.beforeAvatarUpload(file)) {
        this.$refs.crop.bind({
          url: window.URL.createObjectURL(file)
        })
        this.showPicModal = true // show modal
      }
    },
    buildImage () {
      const unsignedUploadPreset = 'y49z5nwh'
      // Build file data using FormData object
      var fileData = new FormData()
      fileData.append('upload_preset', unsignedUploadPreset)
      fileData.append('tags', 'resplice-upload')
      // Define cropper options
      let options = {
        type: 'base64',
        size: 'orginal',
        format: 'png',
        circle: true
      }
      // get the result of the cropper and upload to cloudinary
      this.$refs.crop.result(options, (output) => {
        fileData.append('file', output) // append the file output to the FormData object
        this.upload(fileData) // call upload
      })
    },
    upload (fd) {
      const cloudName = 'capabit-solutions'
      // var cl = new cloudinary.Cloudinary({cloud_name: 'capabit-solutions', api_key: '422859735239721', secure: true})
      // console.log(cl.url('sample'))
      const APIUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
      // Config cloudinary API request
      const config = {
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        async: true,
        onUploadProgress: progressEvent => {
          this.loading = true
        }
      }
      // Post request to Cloudinary
      axios.post(APIUrl, fd, config)
        .then(res => {
          // Set profile picture in user state
          this.profilePic = res.data.secure_url
          // Cleanup
          this.loading = false
          this.showPicModal = false
          this.$refs.crop.destroy()
        })
        .catch(err => {
          if (err.message === 'Network Error') {
            this.$notify({
              title: 'Network Error',
              message: 'You are not online or there is a problem with your network, please try again when you are connected to the internet.',
              type: 'error',
              duration: 5000
            })
          } else {
            this.$notify({
              title: 'Upload Error',
              message: 'There was an error while uploading your picture, please try again later or contact support@capabit.com',
              type: 'error',
              duration: 5000
            })
            console.log(err)
          }
          // Cleanup
          this.loading = false
          this.showPicModal = false
          this.$refs.crop.destroy()
        })
    },
    beforeAvatarUpload (file) {
      // file verification before cropping
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
      return results
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
  .pic-uploader {
    height: 210px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
  }
  .avatar {
    width: 200px;
    height: 200px;
  }
  .el-card {
    margin-bottom: 20px;
  }
  .info-header {
    color: #1BBC9B;
  }
  .info-content {
    display: flex;
  }
  .info-content-header {
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .info-content .el-input, .info-content .el-select {
    margin-bottom: 10px;
  }
  .info {
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  .type {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    & .fa-icon {
      margin-right: 15px;
      color:#1BBC9B;
    }
  }
  .el-input-group__prepend {
    padding: 15px;
    width: 150px;
  }
  .pic-placeholder {
    color: #1BBC9B;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background-color: #E0E0E0;
    &:hover {
      background-color: grey;
      cursor: pointer;
    }
  }
  .cropper {
    margin-top: 50px;
  }
  .cropper-save {
    margin-top: -300px;
  }
  .edit {
    position: absolute;
    color: #1BBC9B;
    margin-left: 90px;
    top: 170px;
  }
</style>
