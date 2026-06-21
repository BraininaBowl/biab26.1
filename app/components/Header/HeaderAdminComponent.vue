<template>
  <header>
    <h1>Admin</h1>
    <nav>
      <section>
        <NuxtLink to="/admin/new/">New</NuxtLink
        ><NuxtLink to="/admin/edit/">Edit</NuxtLink
        ><NuxtLink to="/admin/upload/">Upload</NuxtLink>
      </section>
      <section>
        <NuxtLink to="/">Exit</NuxtLink>
      </section>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="css" scoped>
header {
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
h1 {
  margin: 0;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid var(--col-border) ;
  border-bottom: 1px solid var(--col-border) ;
  padding: none;
}
nav section {
  display: flex;
  flex-direction: row;
  gap: var(--padding);
  margin: 0;
  padding: 0.5rem 0;
}
</style>
