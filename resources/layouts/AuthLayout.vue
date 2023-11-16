<template>
  <div class="bg-money">
    <div :class="{ 'fullscreen flex column flex-center px-4': true }">
      <header>
        <slot name="header">
          <!-- <h1>Auth Header</h1> -->
        </slot>
      </header>
      <main class="w-100">
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

<style lang="scss" scoped>
.bg-money {
  @apply bg-no-repeat bg-center bg-cover;
}

:deep(.formkit-outer) {
  margin: 0 auto 1rem auto;
}
</style>
