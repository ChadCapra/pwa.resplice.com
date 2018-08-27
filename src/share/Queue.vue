<template>
  <div class="queue">
    <div class="queue-header">
      <div class="queue-header-item" :class="{ 'item-active': !tab}" @click="tab = 0">My Queue</div>
      <div class="queue-header-item" :class="{ 'item-active': tab}" @click="tab = 1">Other's Requests</div>
    </div>

    <!-- My Queue -->
    <div v-if="!tab" class="my-requests">
      <el-card v-for="request in queue.incoming" :key="request.id" class="request">
        <div class="timestamp">{{ request.timestamp }}</div>
        <div class="name">{{ request.contact_name }}</div>
        <div class="message">{{ getMessage(request) }}</div>
        <el-button type="danger" class="request-btn-ignore" @click="ignoreRequest(request)">Ignore</el-button>
        <el-button type="primary" class="request-btn-accept" @click="continueRequest(request)">{{ getBtnText(request.share_type) }}</el-button>
      </el-card>
    </div>

    <!-- Other's Requests -->
    <div v-if="tab" class="others-requests">
      <el-card v-for="request in queue.outgoing" :key="request.id" class="request">
        <div class="timestamp">{{ request.timestamp }}</div>
        <div class="name">{{ request.contact_name }}</div>
        <div class="message">{{ getMessage(request) }}</div>
        <el-button type="primary" class="request-btn-ping" @click="pingRequest(request)">Remind</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // Tab is 0 for My Queue and 1 for Other's Requests
      tab: 0
    }
  },
  computed: {
    queue () {
      return this.$store.getters.getQueue
    }
  },
  methods: {
    ignoreRequest () {
      // Sent request to archive
    },
    continueRequest () {
      // Go to share page if share_type isnt group
      // Otherwise accept group invite
    },
    pingRequest (request) {
      this.$store.dispatch('ping', request.id)
        .then(() => { console.log('User was reminded') })
        .catch(error => { console.log(error) })
    },
    getBtnText (shareType) {
      if (shareType === 'group') {
        return 'Accept'
      } else {
        return 'Share'
      }
    },
    getMessage (request) {
      if (request.share_type === 'attribute') {
        switch (request.attribute_type_id) {
          case 1:
            return 'Requested a phone number'
          case 2:
            return 'Requested an email address'
          case 3:
            return 'Requested an address'
          case 4:
            return 'Requested a social media account'
          case 5:
            return 'Requested a website'
          default:
            return 'Requested another attribute'
        }
      } else if (request.share_type === 'general') {
        return 'Requested some information'
      } else if (request.share_type === 'update') {
        return 'Requested an update to an attribute'
      } else if (request.share_type === 'group') {
        return 'Requested you to join the group'
      } else {
        return 'Remind them to share something back'
      }
    }
  },
  created () {
    this.$store.commit('setHeaderText', 'Share Queue')
  }
}
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .queue {
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin-top: -15px;
  }
  .queue-header {
    background-color: #1BBC98;
    color: #FFFFFF;
    font-size: 18px;
    width: 100vw;
    height: 50px;
    justify-content: space-around;
  }
  .queue-header-item {
    width: 50%;
    height: 100%;
    border-top: solid 5px #1BBC98;
    border-bottom: solid 5px #1BBC98;
    &:hover {
      cursor: pointer;
    }
  }
  .item-active {
    background-color: #FFFFFF;
    color: #1BBC98;
    border-bottom: solid 5px #FFFFFF;
  }

  .my-requests, .others-requests {
    flex-direction: column;
    width: 100%;
  }
  .request {
    position: relative;
    width: 100%;
    justify-content: flex-start;
    margin-top: 20px;
  }
  .request-btn-accept, .request-btn-ping {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 18px;
  }
  .request-btn-ignore {
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 18px;
  }
  .timestamp {
    position: absolute;
    right: 5px;
    top: 5px;
    color: #303133ab;
  }
  .name {
    justify-content: flex-start;
    align-self: flex-start;
    font-size: 24px;
    font-weight: bold;
    margin-left: -10px;
  }
  .message {
    justify-content: flex-start;
    align-self: flex-start;
    font-size: 18px;
    margin-bottom: 45px;
    margin-left: -10px;
  }
</style>

