<template>
  <div class="attributes">
    <div class="top">
      <h1>Attributes</h1>
      <h2>Sharing with 
        <span v-if="sharingContacts.length === 1">{{ sharingInfo }}</span>
        <span v-else @click="expand">{{ sharingContacts.length }} people <icon ref="arrow" name="sort-down" scale="2"></icon></span>
        <div v-if="expanded">
          <div v-for="contact in sharingContacts" :key="contact.id">{{ contact.name }}</div>
        </div>
      </h2>
      <p>Select the attributes you would like to share:</p>
    </div>
    <div class="body">
      <div class="attributes">
        <div class="attribute" v-for="attr in attributes" :key="attr.id">
          <input type="checkbox" name="select" :id="attr.id" ref="attr" class="checkbox">
          <span style="margin-left: 10px">{{ attr.value }}</span>
        </div>
      </div>

      <!-- Tags -->
      <!-- <el-card class="tags-edit" v-if="tagsEdit">
        <div class="tag-showcase">
          <el-tag color="white" closable>Tag One</el-tag>
          <el-tag color="white" closable>Tag Two</el-tag>
          <el-tag color="white" closable>Tag Three</el-tag>
        </div>
        <div class="tag-list">
          <p>Select a tag or create a new one</p>
          <el-input
            class="input-new-tag"
            v-model="tagInput"
            ref="saveTagInput"
            size="mini"></el-input>
          <el-button type="primary" v-if="tagInput.length > 0" @click="createTag">Create Tag {{ tagInput }}</el-button>
          <div class="tag-select">
            <div v-for="tag in tags" :key="tag.id">{{ tag.value }}</div>
          </div>
        </div>
      </el-card>
      <div class="tags" v-else @click="tagsEdit = true;">
        <el-tag color="white" closeable>Tag One</el-tag>
        <el-tag color="white" closable>Tag Two</el-tag>
        <el-tag color="white" closable>Tag Three</el-tag>
      </div> -->
      <div class="tags">
        <el-tag
          v-for="tag in tags"
          :key="tag.value"
          class="tag"
          closable
          :disable-transitions="false"
          @close="deleteTag(tag)">
          {{ tag.value }}
        </el-tag>
        <el-autocomplete
          class="input-new-tag"
          v-if="inputVisible"
          v-model="tagInput"
          :fetch-suggestions="tagSearch"
          placeholder="Enter Tag Name"
          ref="tagInput"
          size="small"
          @keyup.enter.native="createTag"
          @select="createTag"
        ></el-autocomplete>
        <!-- <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="tagInput"
          ref="tagInput"
          size="small"
          @keyup.enter.native="createTag"
          @blur="createTag"
        ></el-input> -->
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
          <p v-for="contact in sharingContacts" :key="contact.id">- {{ contact.name }}</p>
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      sharedAttributes: [],
      dialogVisible: false,
      tagInput: '',
      inputVisible: false,
      expanded: false,
      tags: []
    }
  },
  computed: {
    ...mapGetters({
      sharingContacts: 'getSharingContacts',
      sharingAttributes: 'getSharingAttributes',
      sharingAttributeIds: 'getSharingAttributeIds',
      sharingContactIds: 'getSharingContactIds',
      attributes: 'getUserAttributes',
      sharingType: 'getSharingType',
      savedTags: 'getUserTags'
    }),
    sharingInfo () {
      if (!this.sharingContacts[0].name) {
        return this.sharingContacts[0].attributes[0].value
      } else {
        return this.sharingContacts[0].name
      }
    }
  },
  methods: {
    addToSharedAttributes () {
      this.$refs.attr.forEach(attr => {
        if (attr.checked) {
          this.sharedAttributes.push(this.attributes.find(attrib => attrib.id === parseInt(attr.id)))
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
        this.$store.commit('setSharingAttributes', this.sharedAttributes)
        this.sharedAttributes = []
        this.dialogVisible = true
      }
    },
    handleClose () {
      this.$notify({
        title: 'Sharing',
        message: 'You did not complete your share, click Cancel or Confirm',
        type: 'warning'
      })
    },
    share () {
      this.dialogVisible = false
      var send = {}
      // Check if sharingType is with attributes, user ids, or both, or qr code link
      switch (this.sharingType) {
        case 0:
          send = {
            share_request: {
              email_or_phone: this.sharingContacts[0].attributes[0].value,
              attribute_ids: this.sharingAttributeIds
            }
          }
          this.$store.dispatch('shareWithAttribute', send)
            .then((contactList) => {
              this.$store.commit('setContacts', contactList)
              this.$store.commit('buildSearchableAttributes')
              this.$router.push({name: 'root'})
            })
            .catch(error => {
              console.log(error)
            })
          break
        case 1:
          send = {
            share_request: {
              contact_ids: this.sharingContactIds,
              attribute_ids: this.sharingAttributeIds
            }
          }
          this.$store.dispatch('shareWithId', send)
            .then((contactList) => {
              this.$store.commit('setContacts', contactList)
              this.$store.commit('buildSearchableAttributes')
              this.$router.push({name: 'root'})
            })
            .catch(error => {
              console.log(error)
            })
          break
        default:
          console.log('Could not share your information')
          break
      }
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.$refs.input.focus()
      })
    },
    createTag (item) {
      if (this.tagInput) {
        this.tags.push({value: this.tagInput})
      }
      this.inputVisible = false
      this.tagInput = ''
    },
    deleteTag (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    tagSearch (string, cb) {
      var results = string ? this.savedTags.filter((tag) => {
        return tag.value.toLowerCase().indexOf(string.toLowerCase()) === 0
      }) : this.savedTags
      cb(results)
    },
    expand () {
      if (this.expanded) {
        this.$refs.arrow.$el.classList.remove('expanded-icon')
        this.$refs.arrow.$el.classList.add('collapse-icon')
        this.expanded = false
      } else {
        this.$refs.arrow.$el.classList.remove('collapse-icon')
        this.$refs.arrow.$el.classList.add('expanded-icon')
        this.expanded = true
      }
    }
  },
  destroyed () {
    this.$store.commit('updateSearch', '')
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
    font-size: 32px;
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
  .custom, .attribute {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 25px;
  }
  .attribute {
    margin-left: 10px;
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
  .tags {
    display: flex;
    justify-content: flex-start;
    margin-top: 25px;
    padding: 10px;
  }
  .tag {
    margin: 0px 10px 10px 0px;
    background-color: white;
    color: #1BBC9B;
  }
  .tags {
    flex-wrap: wrap;
  }
  .tags-edit {
    flex-direction: column;
    border: 1px solid white;
    text-align: left;
    & .el-button {
      color: #1BBC9B;
      background-color: white;
      width: 250px;
      align-self: center;
    }
    & .el-input {
      width: 250px;
      align-self: center;
    }
  }
  .tag-showcase {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .tag-list {
    display: flex;
    flex-direction: column;
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

  .expanded-icon {
    animation: rotate-down 0.3s ease-out forwards;
  }
  .collapse-icon {
    animation: rotate-up 0.3s ease-in forwards;
  }

  @keyframes rotate-down {
    from { transform: rotateX(0deg); }
    to { transform: rotateX(180deg); }
  }

  @keyframes rotate-up {
    from { transform: rotateX(180deg); }
    to { transform: rotateX(0deg); }
  }
</style>
