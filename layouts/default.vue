<template>
  <div class="page-wrapper">
    <div class="content-wrapper" >
      <AppBar/>
      <div class="main-wrapper">
        <slot></slot>
      </div>
      <WebsiteFooter/>
    </div>
  </div>
</template>
<style lang="scss">
.page-wrapper{
  @include d-flex(row,flex-start,flex-start);
  min-height: 100%;
  .content-wrapper{
    width: 100%;
    height: 100%;
    .main-wrapper{
      margin-top: 10px;
      border-radius: 4px;
      padding: 16px;
    }
  }
}
</style>