<template>
  <div class="picture-upload">
    <div class="top">
      <h1>Profile Picture</h1>
    </div>
    <div class="body">
      <el-row type="flex" justify="center">
        <el-col><p>Add a profile picture so people can identify you when you share information with them. You can add a picture later in Settings -> User Profile</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col>
          <p>Take a selfie<br>Or upload a picture</p>
          <div v-if="picUrl.length >= 0" class="upload" @click="$refs.file.click()">
            <icon name="camera" scale="2"></icon>
            <input ref="file" type="file" accept="image/*" @change="cropImg">
          </div>
          <img v-else :src="picUrl" alt="User profile picture">
        </el-col>
      </el-row>
      <el-button v-if="!uploaded" class="white-btn" @click="$router.push({name: 'root'})" type="primary">Skip</el-button>
      <el-button v-else class="white-btn" @click="$router.push({name: 'root'})" type="primary">Finish</el-button>
    </div>

    <!-- Cropping and upload modal -->
    <re-modal v-show="showModal" @close="showModal = false" :loading="loading" headerText="Crop Photo">
      <vue-croppie
        ref="crop"
        :enable-orientation="true"
        :boundary="{width: 250, height: 250}"
        :viewport="{width: 200, height: 200, type: 'circle'}"
        class="cropper"
        :enableResize="false"></vue-croppie>
        <el-button type="primary" class="white-btn" @click="buildImage">Save</el-button>
    </re-modal>
  </div>
</template>

<script>
import Modal from '@/skeleton/SlideModal'
import axios from 'axios'

export default {
  components: {
    're-modal': Modal
  },
  data () {
    return {
      uploaded: false,
      showModal: false,
      loading: false,
      picUrl: ''
    }
  },
  methods: {
    cropImg () {
      var file = this.$refs.file.files[0]
      if (this.beforeUpload(file)) {
        this.$refs.crop.bind({
          url: window.URL.createObjectURL(file)
        })
        this.showModal = true
      }
    },
    beforeUpload (file) {
      // file verification before cropping
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      if (!isJPG && !isPNG) {
        this.$message.error('Profile picture must be JPG or PNG format')
      }

      console.log(isJPG || isPNG)
      return isJPG || isPNG
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
      const APIUrl = `https://api.cloudinary.com/v1_1/capabit-solutions/upload`
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
          // this.$store.dispatch('updateUserValue', {profile_pic: res.data.secure_url})
          this.$store.commit('setProfilePic', res.data.secure_url)
          // Cleanup
          this.loading = false
          this.showModal = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .picture-upload {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .picture-upload > * {
    flex-shrink: 0;
  }
  .top {
    color: #1BBC98;
    background-color: white;
    & h1 {
      font-size: 64px;
      margin: 10px 0;
    }
  }
  .body {
    color: white;
    padding: 5px;
    background-color: #1BBC9B;
    flex-grow: 1;
    padding-bottom: 60px;
  }
  .el-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .white-btn {
    margin-top: 25px;
  }

  .upload {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #1BBC98;
    background-color: white;
    height: 150px;
    width: 150px;
    & input {
      display: none;
    }
    &:hover {
      cursor: pointer;
      box-shadow: 1px 1px 15px #00000042;
    }
    transition: 0.3s all ease;
  }
</style>

