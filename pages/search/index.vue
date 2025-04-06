<script setup>
  import {searchProd} from '@/utils/utils'
  const route = useRoute();

  const {q} = route.query;
  const searchProds = ref([]);

  onMounted(async () => {
    if (!q) {
      return;
    }
    searchProds.value = await searchProd(q);
  });

</script>

<template>
  <div>
    test
  </div>
</template>

<style lang="scss">

</style>