<template>
  <div class="coming-soon">
    <h1>This feature is coming soon! Stay Tuned 📱</h1>
    <div class="social">Follow us on Twitter: <div class="twitter"><a href="https://twitter.com/respliceapp"><icon scale="1.5" name="twitter"></icon></a></div></div>
    <span>Or check us our at: <a class="r-link" href="https://www.resplice.com">Resplice.com</a></span>
  </div>
</template>

<style lang="scss" scoped>
  .coming-soon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .r-link {
    color: #1BBC9B;
  }
  .twitter {
    background-color:#1BBC9B;
    padding-top: 5px;
    border-radius: 50%;
    width: 33px;
    margin-left: 10px;
    & a {
      color: #FFF;
    }
  }
  .social {
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
