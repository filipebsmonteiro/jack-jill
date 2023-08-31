<template>
  <h1>Home Page</h1>
  <!-- <Link  href="/login" method="post" as="button" type="button">Login</Link> -->
  <Link  href="/auth/login">Login</Link>
</template>

<script>
import { Link } from "@inertiajs/vue3";
export default {
  components: {
    Link,
  },
};
</script>
