<script setup>
  import CategoryPage from "@/view/CategoryView.vue"
  const route = useRoute();

  const {q} = route.query;

  const sQuery = ref(q);

  watch(() => route.query.q,
    (newQuery, oldQuery) => {
      if (newQuery !== oldQuery && newQuery) {
        sQuery.value = newQuery;
      }
    }
  )

</script>

<template>
  <CategoryPage 
    :key="sQuery"
    hideBackground
    :sQuery="sQuery"
  />
</template>