<template>
  <div class="contact" @click="enterProfile">
    <el-row type="flex" justify="left">
      <el-col class="c-content" :xs="22" :sm="22" :md="22" :lg="12" :xl="12">
        <img class="contact-img" style="margin-right: 20px;" :src="contact.profilePic" :alt="contact.firstName">
        <div class="f-name" v-if="contact.firstName">{{ contact.firstName }}</div><span class="l-name" v-if="contact.lastName">{{ contact.lastName }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['contact', 'headVisible'],
  methods: {
    enterProfile () {
      var id = this.contact.id
      this.$router.push({ name: 'Profile', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .l-name {
    color: $--color-primary;
  }
  .contact {
    margin-bottom: 20px;
    transition: all .30s ease;
    border-radius: 50px;
    font-size: 24px;
    text-align: left;
  }
  .contact:hover {
    background-color: #ebeef5;
    cursor: pointer;
  }
  .c-content {
    display: flex;
    align-items: center;
  }
  .f-name {
    margin-right: 5px;
  }
</style>