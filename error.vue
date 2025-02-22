<script setup>
  const error = useError()
  const router = useRouter();

  const goToHome = () =>{
    router.push('/')
  } 
</script>

<template>
  <div class="wrapper-404">
    <div class="sorry">
      <h1>Something's wrong here...</h1>
      <p>We can't find the page your're looking for. Please check the url or head back to home</p>
      <div class="button-wrapper">
        <Button title="Home" fontSize="20px" rounded="4px" @clickTrigger="goToHome"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .wrapper-404{
    @include d-flex-center;
    width: 100%;
    height: 100%;
    .sorry{
      @include d-flex(column,flex-start,center);
      gap: 20px;
      h1{
        text-align: center;
        font-size: 3rem;
        font-weight: 600;
      }
      p{
        text-align: center;
        font-size: 1.6rem;
        font-weight: 500;
        color: $dark9;
      }
      .button-wrapper{
        @include d-flex-center;
        gap: 10px;
      }
    }
  }
</style>