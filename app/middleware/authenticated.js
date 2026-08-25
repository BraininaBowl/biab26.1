export default defineNuxtRouteMiddleware(() => {
    const { loggedIn } = useUserSession()
  
    console.log('Running authenticated middleware')
    // redirect the user to the login screen if they're not authenticated
    if (!loggedIn.value) {
      console.log('User is not logged in, redirecting to login page')
      return navigateTo('/admin/login')
    }
  })
  