<template>
  <div class="share">
    <el-row type="flex" justify="center">
      <el-col class="search-header" :span="19">
        <input class="search" type="text" placeholder="Search">
        <button type="submit" class="search-btn"><icon scale="1.5" name="search"></icon></button>
      </el-col>
    </el-row>
    <div class="header">
      <h1>Share Your Information</h1>
      <h3>Search for Resplice contacts or select a platform to get started.</h3>
    </div>
    <div class="platforms">
      <el-button class="platform-btn" type="primary" round><div><icon name="comment"></icon>Text</div></el-button>
      <el-button class="platform-btn" type="primary" round><div><icon name="envelope"></icon>Email</div></el-button>
      <el-button class="platform-btn facebook" round><div><icon name="facebook-square"></icon>Facebook</div></el-button>
      <el-button class="platform-btn twitter" round><div><icon name="twitter"></icon>Twitter</div></el-button>
      <el-button class="platform-btn google" round><div><icon name="google"></icon>Google</div></el-button>
      <el-button class="platform-btn" type="info" round><div><icon name="link"></icon>Link</div></el-button>
    </div>
    <div class="contact-list"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .share {
    display: flex;
    flex-direction: column;
  }
  .platforms {
    display: flex;
    flex-direction: column; 
  }
  .platform-btn {
    margin: 0 25px 10px 25px;
    font-size: 14px;
    color: white;
    & .fa-icon {
      margin-right: 10px;
    }
    & div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .facebook {
    background-color: #3B5998;
  }
  .twitter {
    background-color: #08A0E9;
  }
  .google {
    color:#32393D;
  }
  .search {
    width: 80%;
    border: 3px solid #1BBC9B;
    padding: 5px;
    height: 25px;
    border-radius: 5px;
    outline: none;
    color: #9DBFAF;
  }
  .search-header {
    display: flex;
    justify-content: center;
  }
  .search:focus {
    font-weight: 900;
    color: #1BBC9B;
  }
  .search-btn {
    border: 1px solid #1BBC9B;
    background: #1BBC9B;
    text-align: center;
    color: #FFFFFF;
    border-radius: 5px;
    margin-left: -10px;
    height: 41px;
    cursor: pointer;
  }
  .share {
    padding: 20px 0 20px 0;
  }
</style>

