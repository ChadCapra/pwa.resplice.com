<template>
  <div v-if="loading">
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
          <el-input
            v-model="name"
            placeholder="Full Name"
            @input="updates.name = name; updates.status = true">
            <template slot="prepend">Full Name</template>
          </el-input>
        </div>
        <div class="info">
          <el-date-picker
            v-model="DOB"
            type="date"
            placeholder="Date of Birth"
            value-format="yyyy/MM/dd"
            @change="updates.DOB = DOB; updates.status = true">
            <template slot="prepend"><icon name="calender"></icon></template>
          </el-date-picker>
        </div>
        <div class="info">
          <el-autocomplete
            class="inline-input"
            v-model="gender"
            placeholder="Gender"
            :fetch-suggestions="querySearch"
            @input="updates.gender = gender; updates.status = true">
            <template slot="prepend">Gender</template>
          </el-autocomplete>
        </div>
        <div v-show="updates.status" style="margin-top: 25px;">
          <el-button type="danger" @click="cancelUpdates">Cancel</el-button>
          <el-button type="primary" @click="saveUpdates">Save</el-button>
        </div>
      </el-card>
    </el-row>

      <!-- User Attributes -->
    <el-row>
      <el-card>
        <div class="info-header" slot="header">Attributes</div>
        <div v-for="type in attributeTypes" :key="type.id" class="info">
          <div class="info-content-header">
            <div class="type">
              <icon :name="type.icon"></icon>
              <span>{{ type.name }}</span>
            </div>
            <el-button type="primary" size="small" @click="openAttributeAdd(type.id)">Add</el-button>
          </div>
          <div v-for="attr in userAttributesFiltered(type.id)" :key="attr.id" class="info-content" @click="openAttributeEdit(attr)">
            <div class="info-content-type">{{ attr.value }}</div>
            <div class="info-content-subtype">
              <span>{{ attr.sub_type }}</span>
              <icon name="pencil-square" scale="2"></icon>
            </div>
            <!-- <el-select v-model="values[info.id]" placeholder="Select Type">
              <el-option
                v-for="type in options"
                :key="type.value"
                :label="type.label"
                :value="type.value">
              </el-option>
            </el-select> -->
          </div>
        </div>
      </el-card>
    </el-row>

    <el-dialog title="Editing Attribute" :visible.sync="showAttributeEdit">
      <el-form :model="editingAttribute">
        <el-form-item label="Attribute Value">
          <el-input v-model="editingAttribute.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Attribute Sub-Type">
          <el-autocomplete
            v-model="editingAttribute.sub_type"
            placeholder="Select attribute type or enter your own"
            :fetch-suggestions="querySearch">
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteAttribute">Delete</el-button>
        <el-button type="primary" @click="saveAttribute">Update</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Adding Attribute" :visible.sync="showAttributeAdd">
      <el-form :model="addingAttribute">
        <el-form-item label="Attribute Value">
          <el-input v-model="addingAttribute.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Attribute Sub-Type">
          <el-autocomplete
            v-model="addingAttribute.sub_type"
            placeholder="Select attribute type or enter your own"
            :fetch-suggestions="querySearch">
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="resetAddAttribute">Cancel</el-button>
        <el-button type="primary" @click="addAttribute">Add</el-button>
      </span>
    </el-dialog>

    <!-- Cropping and upload modal -->
    <re-modal v-show="showPicModal" @close="showPicModal = false" v-loading="uploading" headerText="Crop Photo">
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
import { mapGetters } from 'vuex'
import Modal from '@/skeleton/SlideModal.vue'
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
      uploading: false,
      showAttributeEdit: false,
      showAttributeAdd: false,
      swiped: false,
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
      values: [],
      updates: {
        status: false,
        initial: {
          name: '',
          DOB: '',
          gender: ''
        },
        contact: {}
      },
      addingAttribute: {
        attribute_type_id: '',
        value: '',
        sub_type: ''
      },
      editingAttribute: {}
    }
  },
  computed: {
    ...mapGetters({
      globalLoading: 'getGlobalLoading',
      userData: 'getUser',
      attributeTypes: 'getAttributeTypes',
      userAttributes: 'getUserAttributes'
    }),
    loading: {
      get () {
        return this.globalLoading
      },
      set (value) {
        this.$store.commit('setGlobalLoading', value)
      }
    },
    name: {
      get () {
        return this.userData.name
      },
      set (value) {
        this.$store.commit('updateName', value)
      }
    },
    DOB: {
      get () {
        return this.userData.date_of_birth
      },
      set (value) {
        this.$store.commit('updateDOB', value)
      }
    },
    gender: {
      get () {
        return this.userData.gender
      },
      set (value) {
        this.$store.commit('updateGender', value)
      }
    },
    profilePic: {
      get () {
        return this.userData.profile_pic
      },
      set (value) {
        this.$store.commit('updateProfilePic', value)
      }
    }
  },
  created () {
    this.$store.commit('setSettingsHeaderText', 'User Profile')
    if (!this.profilePic) {
      this.$notify({
        title: 'Profile Picture',
        message: 'You havent uploaded a profile picture yet?! Click the plus at the top to upload your shiny new picture...',
        type: 'warning',
        duration: 5000
      })
    }
  },
  mounted () {
    this.updates.initial.name = this.name
    this.updates.initial.DOB = this.DOB
    this.updates.initial.gender = this.gender
  },
  methods: {
    userAttributesFiltered (typeId) {
      return this.userAttributes.filter(attr => attr.attribute_type_id === typeId)
    },
    addAttribute () {
      var send = {
        attribute: {
          sub_type: this.addingAttribute.sub_type,
          value: this.addingAttribute.value,
          attribute_type_id: this.addingAttribute.attribute_type_id
        }
      }
      this.$store.dispatch('createUserAttribute', send)
        .then(() => {
          this.showAttributeAdd = false
          this.$notify({
            title: send.attribute.value,
            message: 'Attribute Successfully Added',
            type: 'success',
            duration: 3000
          })
          this.resetAddAttribute()
        })
        .catch(error => {
          console.log(error)
          this.$notify({
            title: send.attribute.value,
            message: 'Attribute could not be added :(',
            type: 'error',
            duration: 3000
          })
          this.resetAddAttribute()
          this.showAttributeAdd = false
        })
    },
    openAttributeEdit (attr) {
      this.editingAttribute = attr
      this.showAttributeEdit = true
    },
    openAttributeAdd (typeId) {
      this.addingAttribute.attribute_type_id = typeId
      this.showAttributeAdd = true
    },
    saveAttribute () {
      var send = {
        attribute: {
          id: this.editingAttribute.id,
          sub_type: this.editingAttribute.sub_type,
          value: this.editingAttribute.value
        }
      }
      this.$store.dispatch('updateUserAttribute', send)
        .then(() => {
          this.showAttributeEdit = false
          this.$notify({
            title: send.attribute.value,
            message: 'Attribute Successfully Updated',
            type: 'success',
            duration: 3000
          })
        })
        .catch(error => {
          console.log(error)
          this.$notify({
            title: send.attribute.value,
            message: 'Attribute could not be updated :(',
            type: 'error',
            duration: 3000
          })
          this.showAttributeEdit = false
        })
    },
    deleteAttribute () {
      var send = {
        attribute: {
          id: this.editingAttribute.id
        }
      }
      this.$store.dispatch('deleteUserAttribute', send)
        .then(() => {
          this.showAttributeEdit = false
          this.$notify({
            title: send.attribute.value,
            message: 'Attribute Successfully Deleted',
            type: 'success',
            duration: 3000
          })
        })
        .catch(error => {
          console.log(error)
          this.$notify({
            title: send.attribute.value,
            message: 'Attribute could not be deleted :(',
            type: 'error',
            duration: 3000
          })
          this.showAttributeEdit = false
        })
    },
    resetAddAttribute () {
      this.showAttributeAdd = false
      this.addingAttribute = {
        attribute_type_id: '',
        value: '',
        sub_type: ''
      }
    },
    saveUpdates () {
      this.$store.dispatch('updateUserValue', this.updates.contact)
        .then(() => {
          this.updates.status = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancelUpdates () {
      this.name = this.updates.initial.name
      this.DOB = this.updates.initial.DOB
      this.gender = this.updates.initial.gender
      this.updates.status = false
    },
    handleSwipe () {
      this.swiped = true
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
      const APIUrl = `https://api.cloudinary.com/v1_1/capabit-solutions/upload`
      // Config cloudinary API request
      const config = {
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      }
      // Post request to Cloudinary
      delete axios.defaults.headers.common['Authorization']
      this.uploading = true
      axios.post(APIUrl, fd, config)
        .then(res => {
          // Update pic URL in backend
          this.$store.dispatch('updateUserValue', {profile_pic: res.data.secure_url})
            .then(() => {
              this.uploading = false
              this.showPicModal = false
            })
            .catch(error => {
              console.log(error)
            })
          this.$notify({
            title: 'Profile Picture',
            message: 'Profile Picture Successfully Uploaded',
            type: 'success',
            duration: 3000
          })
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
          this.uploading = false
          this.showPicModal = false
          // this.$refs.crop.destroy()
        })
    },
    beforeAvatarUpload (file) {
      // file verification before cropping
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      if (!isJPG && !isPNG) {
        this.$message.error('Avatar picture must be JPG or PNG format')
      }
      return isJPG || isPNG
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
    justify-content: space-between;
    align-items: center;
    margin: 15px;
  }
  .info-content-subtype {
    display: flex;
    align-items: center;
    & .fa-icon {
      color: #1BBC9B;
      &:hover {
        cursor: pointer;
      }
    }
    & span {
      margin-right: 25px;
    }
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
    position: fixed;
    bottom: 75px;
    left: calc(50% - 40px);
  }
  .edit {
    position: absolute;
    color: #1BBC9B;
    margin-left: 90px;
    top: 170px;
  }
</style>
