<template>
  <div>
    <h1>Users page</h1>
    <hr>
    <ul>
      <li
        v-for="user in users"
        :key="user.id"
      >
        {{ user.name }}
      </li>
    </ul>
    <hr>
    <button @click="$router.push('/')">
      Home
    </button>
  </div>
</template>

<script>
export default {
	name: 'Users',
	async asyncData () {
		const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
		const users = await response.json()
		return { users }
	},
	data: () => ({
		users: []
	}),
	async mounted () {
	}
}
</script>

<style>
	hr {
		margin: 2rem 0;
	}
</style>
