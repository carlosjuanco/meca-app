<script lang="ts">
import { useRoute } from 'vue-router'

export default {
	name: 'WelcomeUser',
  setup() {
    const route = useRoute();

    const name_user = route.params.name_user

    return { name_user }
	}
}
</script>

<template>
  <h1 class="title is-1 mt-6 has-text-centered">Bienvenido al sistema</h1>
  <h2 class="subtitle is-2 has-text-centered" v-text="name_user"></h2>
</template>
