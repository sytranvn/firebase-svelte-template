<script>
  import { onDestroy, onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import authStore from '../../stores/authStore.js';
  onMount(() => {
    authStore.subscribe(async (info) => {
      if (info.firebaseControlled && !info.isLoggedIn) {
        await goto('/login');
      }
    });
  });
</script>

<slot />
