<template>
	<main>
		<form @submit.prevent="login">
			<input v-model="credentials.email" type="email" placeholder="Email" />
			<input
				v-model="credentials.password"
				type="password"
				placeholder="Password"
			/>
			<button type="submit">Login</button>
		</form>
	</main>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
})
const { loggedIn, user, fetch: refreshSession } = useUserSession();
const credentials = reactive({
	email: "",
	password: "",
});
async function login() {
	try {
		await $fetch("/api/login/login", {
			method: "POST",
			body: credentials,
		});

		// Refresh the session on client-side and redirect to the home page
		await refreshSession();
		await navigateTo("/");
	} catch {
		alert("Bad credentials");
	}
}
</script>

<style lang="css" scoped></style>
