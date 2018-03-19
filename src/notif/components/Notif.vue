<template>
<div id="notifications">
    <!-- This will be the component for the notification view -->
    <h1>{{ name }}</h1>
    <button @click="exitNotif">[Icon-exit]</button>
    <p>Shared their contact information with you.</p>
    <section id="notif-area">
        <h1>Personal</h1>
        <p>[Icon-email] {{ email }}</p>
        <p>[Icon-Phone] {{ phone }}</p>
    </section>
</div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Darth Vader',
      email: 'dvader@deathstar.com',
      phone: '555-555-5555'
    }
  },
  methods: {
    closeAnimation () {
      // Might need another function for the closing animation.
      console.log('Animation will play here.')
    },
    exitNotif () {
      // This function should use the router to switch to the main page
      console.log('The exit notification method')
      this.closeAnimation()
    }
  }
}
</script>

<style>
#notifications {
  text-align: center;
}

#notif-area {
  border: 1px;
  background-color: #1BBC9B;
  color: white;
  min-height: 500px;
  width: 350px;
  margin: auto;
  border-radius: 20px;
  box-shadow: -5px 5px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
}

#notif-area p {
  text-align: left;
}
</style>