<template lang="pug">
  //- #app
    //- #nav
    //-   router-link(to='/') Home
    //-   span |
    //-   router-link(to='/about') About
  router-view
</template>

<style lang="scss">
* {
  position: relative;
  box-sizing: border-box;
  transition-timing-function: cubic-bezier(.14, 1.19, 1, .99);
}

html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  background-image: -webkit-radial-gradient(ellipse, #2a437c 0, #10203b 100%);
  overflow: hidden;
}

.freeze-animations * {
  transition-duration: 0s !important
}

</style>
