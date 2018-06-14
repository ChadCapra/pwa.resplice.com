<template>
  <div class="profile">
    <el-row class="pic-uploader">
      <div class="profile-pic">
        <div v-if="profilePic" class="avatar-container">
          <img :src="profilePic" alt="User Avatar" class="avatar">
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
          <!-- <el-input v-model="userData.userBasic.DOB">
            <template slot="prepend">Date of Birth</template>
          </el-input> -->
          <el-date-picker
            v-model="DOB"
            type="date"
            placeholder="Date of Birth"
            value-format="yyyy/MM/dd">
            <template slot="prepend"><icon name="calender"></icon></template>
          </el-date-picker>
        </div>
        <div class="info">
          <!-- <el-input v-model="userData.userBasic.gender">
            <template slot="prepend">Gender</template>
          </el-input> -->
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
        <div class="info">
          <div class="info-content-header">
            <span>Phone</span>
            <el-button type="primary" size="small">Add</el-button>
          </div>
          <div v-for="info in userData.userAttributes" :key="info.id" class="info-content">
            <el-input :value="info.value">
            </el-input>
            <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="info">
          <div class="info-content-header">
            <span>Email</span>
            <el-button type="primary" size="small">Add</el-button>
          </div>
          <div v-for="info in userData.userAttributes" :key="info.id" class="info-content">
            <el-input :value="info.value">
            </el-input>
            <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="info">
          <div class="info-content-header">
            <span>Address</span>
            <el-button type="primary" size="small">Add</el-button>
          </div>
          <div v-for="info in userData.userAttributes" :key="info.id" class="info-content">
            <el-input :value="info.value">
            </el-input>
            <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-card>
    </el-row>
    <re-modal v-show="showPicModal" @close="showPicModal = false">
      <vue-croppie
        ref="crop"
        :enable-orientation="true"
        :boundary="{width: 250, height: 250}"
        :viewport="{width: 200, height: 200, type: 'circle'}"
        class="cropper"
        :enableResize="false"></vue-croppie>
        <el-button type="primary" class="cropper-save" @click="upload">Save</el-button>
    </re-modal>
  </div>
</template>

<script>
import Modal from '@/contacts/SlideModal.vue'
import axios from 'axios'
// import cloudinary from 'cloudinary-core'

export default {
  components: {
    're-modal': Modal
  },
  data () {
    return {
      showPicModal: false,
      swiped: false,
      profilePic: null,
      genders: ['Male', 'Female', 'Pan', 'Tri'],
      options: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      value: ''
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
  },
  computed: {
    userData () {
      return this.$store.getters.getUserInfo
    },
    firstName: {
      get () {
        return this.$store.state.user.userBasic.firstName
      },
      set (value) {
        this.$store.commit('updateFirstName', value)
      }
    },
    lastName: {
      get () {
        return this.$store.state.user.userBasic.lastName
      },
      set (value) {
        this.$store.commit('updateLastName', value)
      }
    },
    DOB: {
      get () {
        return this.$store.state.user.userBasic.DOB
      },
      set (value) {
        this.$store.commit('updateDOB', value)
      }
    },
    gender: {
      get () {
        return this.$store.state.user.userBasic.gender
      },
      set (value) {
        this.$store.commit('updateGender', value)
      }
    },
    fullName () {
      return this.$store.getters.getUserInfo.userBasic.firstName + ' ' + this.$store.getters.getUserInfo.userBasic.lastName
    }
  },
  methods: {
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
        var url = window.URL.createObjectURL(file)
        console.log(url)
        this.$refs.crop.bind({
          url: url
        })
        this.showPicModal = true
      }
    },
    upload () {
      const cloudName = 'capabit-solutions'
      const unsignedUploadPreset = 'y49z5nwh'
      var orginalFile = this.$refs.upload.files[0]
      var croppedFile
      let options = {
        type: 'base64',
        size: 'orginal',
        format: 'png',
        circle: true
      }
      this.$refs.crop.result(options, (output) => {
        this.profilePic = output
        croppedFile = new File([output], orginalFile.name, {type: output.type, lastModified: Date.now()})
        console.log(croppedFile)
      })
      // TODO: Upload to cloudinary this is a task for tomorrow
      // var cl = new cloudinary.Cloudinary({cloud_name: 'capabit-solutions', api_key: '422859735239721', secure: true})
      // console.log(cl.url('sample'))
      // const CDN_url = 'https://res.cloudinary.com/capabit-solutions/'
      const APIUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
      var fd = new FormData()
      fd.append('upload_preset', unsignedUploadPreset)
      fd.append('tags', 'resplice-upload')
      fd.append('file', croppedFile)
      const config = {
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        async: true,
        onUploadProgress: progressEvent => {
          console.log(`onUploadProgress progressEvent.loaded: ${progressEvent.loaded}, progressEvent.total: ${progressEvent.total}`)
        }
      }
      axios.post(APIUrl, fd, config)
        .then(res => {
          var response = res.data
          console.log('API Reponse data: ', response)
        })
        .catch(err => {
          console.log(err)
        })
      this.showPicModal = false
      this.$refs.crop.destroy()
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
    justify-content: space-around;
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
</style>
