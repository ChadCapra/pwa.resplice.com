<template>
  <div class="contact" @click="enterProfile">
    <el-row type="flex" justify="left">
      <div class="contact-actions" ref="contactActions">
        <icon class="action-btn" name="phone" scale="2.5"></icon>
        <icon class="action-btn" name="comment" scale="2.5"></icon>
        <icon class="action-btn" name="envelope" scale="2.5"></icon>
      </div>
      <el-col class="c-content" :xs="22" :sm="22" :md="22" :lg="12" :xl="12">
        <v-touch 
          tag="img"
          v-on:pan="picPan($event)"
          v-on:swiperight="picSwipe($event)"
          :pan-options="{ direction: 'horizontal', threshold: 10 }"
          class="contact-img" 
          style="margin-right: 20px;" 
          :src="contact.thumbnail" 
          :alt="contact.first_name"></v-touch>
        <div class="name" ref="name">
          <div class="f-name" v-if="contact.first_name">{{ contact.first_name }}</div>
          <span class="l-name" v-if="contact.last_name">{{ contact.last_name }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['contact', 'headVisible'],
  data () {
    return {
      actionsOn: false
    }
  },
  methods: {
    enterProfile () {
      if (!this.actionsOn) {
        var id = this.contact.id
        this.$router.push({ name: 'Profile', params: { id } })
      }
    },
    picPan (payload) {
      var e = payload.target
      var actions = this.$refs.contactActions
      var name = this.$refs.name
      // console.log(payload.deltaX)
      // console.log(this.$refs)
      this.$el.style.backgroundColor = '#1BBC9B'
      if (payload.deltaX >= 0) {
        this.actionsOn = true
        actions.style.display = 'flex'
        name.style.display = 'none'
        e.style.transform = 'translateX(' + payload.deltaX + 'px)'
      }
      if (payload.isFinal) {
        this.picSwipe(payload)
      }
    },
    picSwipe (payload) {
      var e = payload.target
      var actions = this.$refs.contactActions
      var name = this.$refs.name
      if (payload.deltaX > 125) {
        e.style.transform = 'translateX(' + (this.$el.clientWidth - 80) + 'px)'
      } else {
        this.actionsOn = false
        name.style.display = 'flex'
        actions.style.display = 'none'
        this.$el.style.backgroundColor = '#FFF'
        e.style.transform = 'translateX( 0px )'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .contact {
    margin-bottom: 20px;
    transition: all .30s ease;
    border-radius: 50px;
    font-size: 24px;
    text-align: left;
    &:hover {
      background-color: #ebeef5;
      cursor: pointer;
    }
  }
  .contact-actions {
    width: 100%;
    height: 100%;
    color: white;
    transition: linear;
    position: absolute;
    display: none;
    justify-content: center;
    align-items: center;
  }
  .c-content {
    display: flex;
    align-items: center;
  }
  .name {
    display: flex;
    flex-wrap: wrap;
  }
  .l-name {
    color: #1BBC9B;
  }
  .f-name {
    margin-right: 5px;
  }
  .action-btn {
    margin-right: 20px;
  }
</style>