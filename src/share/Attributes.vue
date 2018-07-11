<template>
  <div class="attributes">
    <div class="top">
      <h1>Attributes</h1>
      <h2>Sharing with 
        <span v-if="sharingContacts.length === 1">{{ sharingInfo }}</span>
        <span v-else>{{ sharingContacts.length }} people</span>
      </h2>
      <p>Select the attributes you would like to share:</p>
    </div>
    <div class="body">
      <el-button class="btn" type="primary" round @click="shareMinimalAttributes">Share Minimal Attributes</el-button>
      <el-button class="btn" type="primary" round @click="shareDefaultAttributes">Share Default Attributes</el-button>
      <div class="attributes">
        <div class="custom">
          <input type="checkbox" name="select" id="custom" class="checkbox" ref="allAttr" @click="checkAll">
          <span style="margin-left: 10px">Share all attributes</span>
        </div>
        <div class="attribute" v-for="attr in attributes" :key="attr.id">
          <input type="checkbox" name="select" :id="attr.id" ref="attr" class="checkbox">
          <span style="margin-left: 10px">{{ attr.value }}</span>
        </div>
      </div>
    </div>
    <el-button class="share btn" type="primary" round @click="shareAttributes">Share</el-button>
    <el-dialog
      title="Sharing Summary"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose">
      <div class="summary">
        <div class="summary-attributes">
          <span>Attributes</span>
          <p v-for="attr in sharingAttributes" :key="attr.id">- {{ attr.value }}</p>
        </div>
        <div class="summary-contacts">
          <span>Contacts</span>
          <p v-for="contact in sharingContacts" :key="contact.id">- {{ contact.first_name + ' ' + contact.last_name}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" round>Cancel</el-button>
        <el-button type="primary" @click="share" round>Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sharedAttributes: [],
      dialogVisible: false
    }
  },
  computed: {
    sharingContacts () {
      return this.$store.getters.getSharingContacts
    },
    sharingAttributes () {
      return this.$store.getters.getSharingAttributes
    },
    attributes () {
      return this.$store.getters.getUserAttributes
    },
    sharingInfo () {
      if (this.sharingContacts[0].first_name === undefined && this.sharingContacts[0].last_name === undefined) {
        return this.sharingContacts[0].attributes[0].value
      } else {
        return this.sharingContacts[0].first_name + ' ' + this.sharingContacts[0].last_name
      }
    }
  },
  methods: {
    checkAll () {
      if (this.$refs.allAttr.checked) {
        this.$refs.attr.forEach(attr => {
          attr.checked = true
        })
      } else {
        this.$refs.attr.forEach(attr => {
          attr.checked = false
        })
      }
    },
    addToSharedAttributes () {
      this.$refs.attr.forEach(attr => {
        if (attr.checked) {
          this.sharedAttributes.push(this.attributes.find(attrib => attrib.id === attr.id))
        }
      })
    },
    shareAttributes () {
      var checked = false
      this.$refs.attr.forEach(attr => {
        if (attr.checked) {
          checked = true
        }
      })

      if (!checked) {
        this.$notify({
          title: 'Attributes',
          message: 'You have not selected any attributes to share with. Please check the boxes or select an attribute set. Remember, sharing is caring 😊.',
          type: 'warning',
          duration: 0
        })
      } else if (this.sharingContacts.length < 1) {
        this.$notify({
          title: 'Contacts',
          message: 'You aren\'t sharing with anyone? Please go back and select a contact or contacts to share with.',
          type: 'warning',
          duration: 0
        })
      } else {
        this.addToSharedAttributes()
        this.$store.dispatch('setSharingAttributes', this.sharedAttributes)
        this.sharedAttributes = []
        this.dialogVisible = true
      }
    },
    shareMinimalAttributes () {},
    shareDefaultAttributes () {},
    handleClose () {
      this.$notify({
        title: 'Sharing',
        message: 'You did not complete your share, click Cancel or Confirm',
        type: 'warning'
      })
    },
    share () {
      this.dialogVisible = false
      // API Call
      this.$store.dispatch('share')
      this.$router.push({name: 'root'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .attributes {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .attributes > * {
    flex-shrink: 0;
  }
  .top {
    color: #1BBC9B;
    background-color: #fff;
  }
  .body {
    color: white;
    background-color: #1BBC9B;
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
  }
  h1 {
    font-size: 78px;
    margin: 0;
  }
  h2 {
    font-size: 36px;
    margin: 5px;
  }
  @media screen and (max-width: 350px){
    h1 {
      font-size: 62px;
      margin: 0;
    }
    h2 {
      font-size: 20px;
      margin: 5px;
    }
  }
  .btn {
    background-color: #fff;
    color: #1BBC9B;
    margin: 15px 0 0 0;
  }
  .share {
    position: fixed;
    bottom: 10px;
    left: calc(50% - 40px);
    margin: 0;
  }
  .minimal, .default {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .minimal {
    margin: 10px 0 15px 0;
  }
  .default {
    margin: 15px 0 10px 0;
  }
  .custom, .attribute {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 25px;
  }
  .attribute {
    margin-left: 30px;
  }
  .checkbox {
    position: relative;
    height: 25px;
    width: 25px;
    cursor: pointer;
    appearance: none;
    outline: 0;
    &:before {
      content: '';

      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;

      width: 100%;
      height: 100%;

      border: 2px solid #FFF;

      transition: all 0.2s ease-in-out;
    }
    &:checked:before {
      height: 50%;
      border-color: #FFF;
      transform: rotate(-45deg);
      border-top-style: none;
      border-right-style: none;
    }
  }
  .summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .summary-contacts span, .summary-attributes span {
    font-size: 24px;
    font-weight: 500;
    color:#1BBC9B;
    text-decoration: underline;
  }
</style>
