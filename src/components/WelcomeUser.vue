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
  <h1 class="title is-1 mt-6">Bienvenido al sistema <strong v-text="name_user"></strong></h1>
</template>
