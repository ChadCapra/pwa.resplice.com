<template>
  <div class="contact" @click="enterProfile">
    <el-row type="flex" justify="left" :gutter="10">
      <el-col :xs="8" :sm="8" :md="4" :lg="2" :xl="2"><img :src="contact.pic" :alt="contact.firstName"></el-col>
      <el-col class="name" :style="{ display: headVisible }" :xs="14" :sm="14" :md="14" :lg="6" :xl="6">
        {{ contact.firstName + ' '}}<span class="l-name">{{ contact.lastName }}</span>
        <br>
        <div class="g-name"><span>{{ contact.group }}</span></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['contact', 'headVisible'],
  // data () {
  //   return {
  //     id: '1',
  //     firstName: 'Luke',
  //     lastName: 'Skywalker',
  //     group: 'Heroes',
  //     profilePic: './path/to/pic'
  //   }
  // },
  methods: {
    enterProfile () {
      // This function should be called when someone taps on a contact.
      var id = this.contact.id
      this.$router.push({ name: 'Profile', params: { id } })
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
    border-radius: 50px;
  }
  .contact:hover {
    background-color: #ebeef5;
    cursor: pointer;
  }
  .name {
    font-size: 24px;
    text-align: left;
  }
  .g-name {
    margin-top: 10px;
    margin-left: 5px;
    color: #fff;
  }
  .g-name span {
    background-color: #1BBC9B;
    padding: 3px;
  }
</style>