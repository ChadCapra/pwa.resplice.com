<template>
<!-- Not sure if I want to make a seperate component for a contact -->
  <div class="contact" @click="enterProfile">
    <span class="c-back"><el-row type="flex" justify="left" :gutter="10">
      <el-col :span="8"><img :src="contact.pic" :alt="contact.firstName"></el-col>
      <el-col class="name" :style="{ display: headVisible }" :xs="14" :sm="14" :md="14" :lg="6" :xl="6">
        {{ contact.firstName + ' '}}<span class="l-name">{{ contact.lastName }}</span>
        <br>
        <div class="g-name"><span>{{ contact.group }}</span></div>
      </el-col>
    </el-row></span>
  </div>
</template>

<script>
export default {
  props: ['contact', 'headVisible'],
  data () {
    return {
      id: '1',
      firstName: 'Luke',
      lastName: 'Skywalker',
      group: 'Heroes',
      profilePic: './path/to/pic'
    }
  },
  methods: {
    enterProfile () {
      // This function should be called when someone taps on a contact.
      console.log('Entered a profile')
      this.$router.push({ name: 'Profile', params: { contactId: 1 } })
    }
  }
}
</script>

<style>
  .l-name {
    color: #1BBC9B;
  }
  .contact {
    margin-bottom: 20px;
    transition: all .30s ease;
  }
  .contact:hover {
    background-color: lightgray;
    cursor: pointer;
  }
  .name {
    font-size: 24px;
    text-align: left;
  }
  .g-name {
    margin-top: 10px;
    margin-left: 5px;
  }
  .g-name span {
    background-color: #1BBC9B;
    padding: 3px;
  }
</style>