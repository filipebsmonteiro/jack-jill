<template>
  <div class="bg-money">
    <div :class="{ 'fullscreen flex column flex-center': true }">
        <header>
            <slot name="header">
                <!-- <h1>Auth Header</h1> -->
            </slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer">
                <!-- <h1>Auth Footer</h1> -->
            </slot>
        </footer>
    </div>
  </div>
</template>

<style scoped>
.bg-money {
  /* background-image: url("@/assets/bkg.jpg"); */
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
  background-size: cover;
}

:deep(.logo-wrapper) {
  position: absolute;
  top: -50px;
  margin: 0 auto;
  width: 100px;
  border-radius: 50% !important;
  border: 5px solid #dedee0 !important;
}

:deep(.login-card) {
  min-width: 320px;
  max-width: 320px;
}

@media screen and (max-width: 320px) {
  :deep(.login-card) {
    width: 90%;
    margin: 0 auto;
  }
}

@media screen and (orientation: landscape) {
  :deep(.login-card) {
    margin-top: 65px;
    margin-bottom: 15px;
  }
}
</style>
