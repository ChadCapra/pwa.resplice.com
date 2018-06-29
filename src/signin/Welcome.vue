<template>
  <div class="welcome">
    <div class="top">
      <h1>Hello!</h1>
      <h2>Welcome to Resplice</h2>
    </div>
    <div class="body">
      <p style="font-size: 24px;">Please add your information so you can share it with your friends and family:</p>
      <form action="">
        <el-row type="flex" justify="center" class="form-item">
          <el-col :xs="4" :sm="4" :md="2" :xl="1"><icon name="user" scale="2.5"></icon></el-col>
          <el-col :xs="14" :sm="10" :md="8" :xl="6"><input type="text" v-model="fullName" placeholder="Full Name" class="input"></el-col>
          <el-col :xs="4" :sm="4" :md="2" :xl="1"></el-col>
        </el-row>
        <div v-for="type in defaultAttributeTypes" :key="type.id" class="type-section">
          <el-row v-for="(attr, index) in attributesFiltered(type.id)" :key="attr.id" type="flex" justify="center" class="form-item">
            <el-col :xs="4" :sm="4" :md="2" :xl="1"><icon v-if="index === 0" :name="type.icon" scale="2.5"></icon></el-col>
            <el-col :xs="10" :sm="10" :md="8" :xl="6"><input type="text" :placeholder="type.name" v-model="attr.value" class="input"></el-col>
            <el-col :xs="4" :sm="4" :md="2" :xl="1"><input type="text" placeholder="Attribute Name" v-model="attr.genre" class="input"></el-col>
            <el-col :xs="4" :sm="4" :md="2" :xl="1">
              <icon v-if="index === 0" name="plus" scale="2.5" @click.native="addAttribute({type_id: type.id, value: ''})"></icon>
              <icon v-else @click.native="removeAttribute(attr.id)" name="times" scale="2.5"></icon>
            </el-col>
          </el-row>
        </div>
        <el-row type="flex" v-if="!showMore" class="form-item">
          <el-col :xs="1" :sm="4" :md="6" :xl="8"></el-col>
          <el-col :xs="6" :sm="4" :md="2" :xl="1" @click.native="enableMore"><icon name="sort-down" scale="2.5"></icon> More</el-col>
        </el-row>
        <div v-show="showMore" v-for="type in otherAttributeTypes" :key="type.id" class="type-section">
          <el-row v-for="(attr, index) in attributesFiltered(type.id)" :key="attr.id" type="flex" justify="center" class="form-item">
            <el-col :xs="4" :sm="4" :md="2" :xl="1"><icon v-if="index === 0" :name="type.icon" scale="2.5"></icon></el-col>
            <el-col :xs="10" :sm="10" :md="8" :xl="6"><input type="text" :placeholder="type.name" v-model="attr.value" class="input"></el-col>
            <el-col :xs="4" :sm="4" :md="2" :xl="1"><input type="text" placeholder="Attribute Name" v-model="attr.genre" class="input"></el-col>
            <el-col :xs="4" :sm="4" :md="2" :xl="1">
              <icon v-if="index === 0" name="plus" scale="2.5" @click.native="addAttribute({type_id: type.id, value: ''})"></icon>
              <icon v-else @click.native="removeAttribute(attr.id)" name="times" scale="2.5"></icon>
            </el-col>
          </el-row>
        </div>
        <el-button class="sub-btn" @click="submit" type="primary">Submit</el-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fullName: '',
      submitted: false,
      showMore: false
    }
  },
  computed: {
    defaultAttributeTypes () {
      return this.$store.getters.getAttributeTypes.slice(0, 3)
    },
    otherAttributeTypes () {
      return this.$store.getters.getAttributeTypes.slice(3)
    }
  },
  methods: {
    addAttribute (attr) {
      this.$store.commit('addAttribute', attr)
    },
    removeAttribute (id) {
      this.$store.commit('removeAttribute', id)
    },
    submit () {
      console.log(`Name: ${this.fullName}`)
      console.log(this.$store.getters.getUserAttributes)
      this.$store.commit('sanitizeAttributes')
      this.submitted = true
      // Call action to submit new attributes to server
      this.$router.push({name: 'Share'})
    },
    attributesFiltered (type) {
      return this.$store.getters.getFilteredAttributes(type)
    },
    enableMore () {
      // Initialize empty attributes for all other attribute_types
      this.$store.commit('addAttribute', {
        id: '',
        type_id: '4',
        value: '',
        genre: 'Twitter',
        verified: false,
        primary_of_type: false
      })
      this.$store.commit('addAttribute', {
        id: '',
        type_id: '5',
        value: '',
        genre: 'Personal',
        verified: false,
        primary_of_type: false
      })
      this.$store.commit('addAttribute', {
        id: '',
        type_id: '6',
        value: '',
        genre: 'Locker Combo',
        verified: false,
        primary_of_type: false
      })
      this.showMore = true
    }
  },
  // beforeRouteEnter (to, from, next) {},
  created () {
    // Initialize three empty attributes for the user to start with
    this.$store.commit('addAttribute', {
      id: '',
      type_id: '1',
      value: '',
      genre: 'Personal',
      verified: false,
      primary_of_type: false
    })
    this.$store.commit('addAttribute', {
      id: '',
      type_id: '2',
      value: '',
      genre: 'Work',
      verified: false,
      primary_of_type: false
    })
    this.$store.commit('addAttribute', {
      id: '',
      type_id: '3',
      value: '',
      genre: 'Home',
      verified: false,
      primary_of_type: false
    })
  },
  destroyed () {
    // Reset user attributes if leaves without submitting
    if (!this.submitted) {
      this.$store.state.user.user_attributes = []
    }
  }
}
</script>

<style lang="scss" scoped>
  .welcome {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .welcome > * {
    flex-shrink: 0;
  }
  .top {
    color: #1BBC9B;
    background-color: #fff;
  }
  .body {
    color: white;
    padding: 5px;
    background-color: #1BBC9B;
    flex-grow: 1;
    padding-bottom: 60px;
  }
  h1 {
    font-size: 96px;
    margin: 0;
  }
  h2 {
    font-size: 36px;
    margin: 5px;
  }
  .sub-btn {
    background-color: #fff;
    color: #1BBC9B;
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
  .form-item {
    margin-bottom: 30px;
  }
  .input {
    outline: 0;
    border: 0;
    height: 80%;
    width: 100%;
    background: transparent;
    border-bottom: 2px solid #fff;
    color: #fff;
    font-size: 16px;
  }
</style>
