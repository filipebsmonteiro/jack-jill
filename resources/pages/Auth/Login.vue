<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <div>
        <label>Email</label>
        <input type="email" v-model="form.email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="form.password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useForm } from "@inertiajs/vue3";
import AuthLayout from "@/layouts/AuthLayout.vue";

export default {
  layout: AuthLayout,
  setup() {
    const { data, setData, post, processing } = useForm({
      email: "",
      password: "",
    });

    function submit() {
      post(route("login"), {
        onSuccess: () => {
          console.log('SUCCESS :>> ');
          // do something on success
        },
      });
    }

    return {
      form: data,
      submit,
      processing,
    };
  },
};
</script>
