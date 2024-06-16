<script lang="ts">
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from '@sveltestrap/sveltestrap';
  import authStore from '../stores/authStore.js';
  import { getAuth } from 'firebase/auth';

  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faPerson } from '@fortawesome/free-solid-svg-icons';

  let isOpen = false;

  // handles the logout of
  async function logout() {
    const auth = getAuth();
    await auth.signOut();
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">Template Site</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md">
    <Nav class="ms-auto" navbar>
      {#if $authStore.firebaseControlled}
        {#if !$authStore.isLoggedIn}
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
        {:else}
          <NavItem>
            <NavLink href="/profile">
              <FontAwesomeIcon icon={faPerson} />
              Hello, {$authStore.user?.displayName ?? $authStore.user?.email}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink on:click={logout}>Logout</NavLink>
          </NavItem>
        {/if}
      {/if}
    </Nav>
  </Collapse>
</Navbar>
