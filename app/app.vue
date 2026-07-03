<template>
  <NuxtLayout />
</template>

<script setup></script>

<style lang="css">
/* @import url('https://fonts.googleapis.com/css2?family=Alan+Sans:wght@300..900&display=swap'); */

:root {
  --col-bg: #f9f5d7;
  --col-bg-light: #fffdec;
  --col-fg: #282828;
  /* --col-border: #7c6f64; */
  --col-border: #A79F94;
  --col-area-bg: #ebdbb2;
  --col-link: #458588;
  --col-link-hover: #83a598;
  --col-highlight: #fe8019;

  --padding: 1.5rem;
  --bg-grid-size: 4rem;
}

html * {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: "AlanSans", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 16px;
  background-color: var(--col-bg-light);
  color: var(--col-fg);
  background-image:
    radial-gradient(
      rgba(from var(--col-fg) r g b / 0) 25%,
      rgba(from var(--col-fg) r g b / 0.15) 100%
    ),
    radial-gradient(
      circle,
      rgba(0, 0, 0, 0) calc(var(--padding) / 8),
      var(--col-bg-light) calc(var(--padding) / 8),
      var(--col-bg-light) 100%
    ),
    linear-gradient(
      rgba(from var(--col-border) r g b / 0.25) 0px,
      rgba(from var(--col-border) r g b / 0.25) 1px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 0, 0, 0) var(--bg-grid-size)
    ),
    linear-gradient(
      to right,
      rgba(from var(--col-border) r g b / 0.25) 0px,
      rgba(from var(--col-border) r g b / 0.25) 1px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 0, 0, 0) var(--bg-grid-size)
    );
  background-position-x:
    0, calc(var(--padding) - (var(--bg-grid-size) / 2)), var(--padding),
    var(--padding);
  background-position-y:
    0, calc(var(--padding) - (var(--bg-grid-size) / 2)), var(--padding),
    var(--padding);
  background-repeat: repeat, repeat, repeat;
  background-size:
    100%,
    var(--bg-grid-size) var(--bg-grid-size),
    var(--bg-grid-size) var(--bg-grid-size),
    var(--bg-grid-size) var(--bg-grid-size);
  background-attachment: fixed;
}

h1 {
  font-family: "AlanSans", sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 4rem;
  line-height: 1;
  margin: 0;
}

h2 {
  font-family: "AlanSans", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 2.5rem;
  line-height: 1;
  margin: 0;
}

h3 {
  font-family: "AlanSans", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;
}

p {
  font-family: "AlanSans", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

a:not(.clear) {
  color: var(--col-link);
  text-decoration: none;
  transition: color 0.25s ease-in-out;
  font-weight: 700;
  position: relative;
  display: inline-block;
}

a.clear {
  color: unset;
  text-decoration: unset;
}

a:not(.clear)::after,
a:not(.clear)::before {
  content: "";
  display: inline-block;
  position: absolute;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--col-link);
  transition: all 0.25s ease-in-out;
  opacity: 0;
}
a:not(.clear)::after {
  bottom: -0.125em;
}
a:not(.clear)::before {
  top: -0.125em;
}

a:not(.clear):hover::after,
a:not(.clear):hover::before {
  width: 100%;
  left: 0;
  opacity: 1;
}

#__nuxt,
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  padding: 0 var(--padding) var(--padding);
  flex-grow: 100;
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding) * 2);
}

section {
  margin: 0 0 4rem;
}

.divider {
  width: 100%;
  height: 0.75rem;
  background-image: linear-gradient(
    135deg,
    rgba(from var(--col-fg) r g b / 0) 0%,
    rgba(from var(--col-fg) r g b / 0) 33%,
    rgba(from var(--col-fg) r g b / 1) 33%,
    rgba(from var(--col-fg) r g b / 1) 66%,
    rgba(from var(--col-fg) r g b / 0) 66%,
    rgba(from var(--col-fg) r g b / 0) 100%
  );
  background-repeat: repeat;
  background-size: calc(var(--padding) * 1), var(--padding);
  background-position-x: calc(var(--padding) * -0.45);
  border-radius: 0.5rem;
}

/* Images */
.pixel {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* Notifications */
#notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  pointer-events: none;
}

.notification {
  padding: 0.75rem 1.5rem;
  color: var(--col-fg);
  border-radius: 4px;
  border: 1px solid var(--col-border);
  background-color: var(--col-area-bg);
  transition: all 0.25s ease-in-out;
}

.notification.fade {
  opacity: 0;
  margin-top: -3rem;
}

.notification::before {
  content: "";
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.5rem;
  border-radius: 50%;
}

.notification.info::before {
  background-color: var(--col-info);
}
.notification.success::before {
  background-color: var(--col-link);
}
.notification.error::before {
  background-color: #991515;
}
</style>
