<template>
  <div class="bg-money">
    <div :class="{ 'fullscreen flex column flex-center': true }">
      <header>
        <slot name="header">
          <!-- <h1>Auth Header</h1> -->
        </slot>
      </header>
      <main class="w-50">
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
  @apply bg-no-repeat bg-center bg-cover;
}

:deep(.formkit-outer) {
  margin: 0 auto 1rem auto;
}

:deep(.formkit-wrapper) {
  width: var(--fk-max-width-input);
  @apply flex flex-col;
}

/* @media screen and (orientation: landscape) {
  :deep(.login-card) {
    margin-top: 65px;
    margin-bottom: 15px;
  }
} */
</style>
