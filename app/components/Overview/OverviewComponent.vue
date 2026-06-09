<template>
  <div class="loader" v-if="status == null">Loading...</div>
  <div class="overview" v-else>
    <!-- <div class="overview"> -->
    <section class="card_container">
      <CardComponent v-for="item in items" :key="item.id" :item="item" />
    </section>
  </div>
</template>

<script setup>
const items = new Array();
const filters = [{ attribute: "trashed", values: [false, undefined] }]
const { data, status, error, refresh, clear } = await useFetch(
  "/api/items/all",
  {
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      response._data.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
      filters.forEach((filterItem) => {
        response._data.data.items = response._data.data.items.filter((el) =>
          filterItem.values.includes(el[filterItem.attribute]),
        );
      });

      response._data.data.items.forEach((item) => {
        item.description = toHtml(item.description);
        items.push(item);
      });
      
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  },
);

// fetchItems([{attribute: "trashed", values: [false, undefined]},]).then(resizeItems);
function resizeItems() {
  for (const item of items) {
    const domItem = document.getElementById(`card_${item.id}`);
    if (domItem) {
      let height = domItem.querySelector(".card").clientHeight + 64;
      domItem.style.gridRow = "auto / span " + height;
      domItem.style.opacity = 1;
    }
  }
}

onMounted(() => {
  window.addEventListener("resize", resizeItems());
  resizeItems();
});
onUnmounted(() => {});
</script>

<style lang="css" scoped>
.card_container {
  display: grid;
  grid-auto-rows: 1px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0rem 2rem;
}

.card_wrapper {
  opacity: 0;
}
</style>
