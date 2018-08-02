<template>
  <v-touch
    class="contact"
    @tap="handleClick"
    :class="{ 'contact-selected': selected }"
    @press="$emit('selected')">
  <!-- <div class="contact" @click="handleClick" :class="{ 'contact-selected': selected }"> -->
    <el-row type="flex">
      <div class="contact-actions" ref="contactActions">
        <icon class="action-btn" name="phone" scale="2.5"></icon>
        <icon class="action-btn" name="comment" scale="2.5"></icon>
        <icon class="action-btn" name="envelope" scale="2.5"></icon>
      </div>
      <el-col class="c-content" :xs="22" :sm="22" :md="22" :lg="12" :xl="12">
        <div v-if="selected" class="icon-checked"><icon name="check" scale="1.5"></icon></div>
        <v-touch
          v-else
          tag="img"
          @pan="picPan($event)"
          @swiperight="picSwipe($event)"
          :pan-options="{ direction: 'horizontal', threshold: 10 }"
          class="contact-img" 
          style="margin-right: 20px;" 
          :src="contact.thumbnail" 
          :alt="lastName"></v-touch>
        <div class="name" ref="name">
          <div class="f-name">{{ firstName }}</div>
          <div class="l-name" v-if="lastName">{{ lastName }}</div>
        </div>
      </el-col>
    </el-row>
  <!-- </div> -->
  </v-touch>
</template>

<script>
export default {
  props: ['contact', 'headVisible', 'selected', 'actions'],
  computed: {
    firstName () {
      return this.$store.getters.getContactFirstName(this.contact.id)
    },
    lastName () {
      return this.$store.getters.getContactLastName(this.contact.id)
    }
  },
  methods: {
    handleClick () {
      if (!this.actions) {
        var id = this.contact.id
        this.$router.push({ name: 'Profile', params: { id } })
      } else {
        this.$emit('selected')
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
      // background-color: #EBEEF5;
      cursor: pointer;
    }
  }
  .contact-selected {
    background-color: #EBEEF5;
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
  .icon-checked {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color:#1BBC9B;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
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