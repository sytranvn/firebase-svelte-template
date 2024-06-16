<script context="module">
  import { Styles } from '@sveltestrap/sveltestrap';
  import { Container } from '@sveltestrap/sveltestrap';
  import { initFirebase } from '../initFirebase.js';
  export async function load() {
    return {
      props: {}
    };
  }
</script>

<script>
  import { getAuth } from 'firebase/auth';
  import 'firebase/auth';
  import { onMount } from 'svelte';
  import authStore from '../stores/authStore';
  import NavBar from '../components/NavBar.svelte';

  onMount(() => {
    initFirebase();
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      authStore.set({
        isLoggedIn: user !== null,
        user: user || undefined,
        firebaseControlled: true
      });
    });
  });
</script>

<Styles />

<NavBar />
<Container fluid>
  <slot />
</Container>
