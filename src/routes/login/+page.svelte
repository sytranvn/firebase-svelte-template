<script>
  import { Row, Col, CardLink } from '@sveltestrap/sveltestrap';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import authStore from '../../stores/authStore.js';
  import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
  let message = '';

  async function loginWithGoogle() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      await signInWithPopup(auth, provider);
    } catch (e) {
      message = 'Something went wrong. Please retry after a minute.';
      console.log(e);
    }
  }

  const sub = authStore.subscribe(async (info) => {
    if (info.isLoggedIn) {
      await goto('/');
    }
  });

  onDestroy(() => {
    sub();
  });
</script>

<Row class="justify-content-center align-item-center">
  <Col md={9} lg={6} xl={5}>
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
      class="img-fluid"
      alt="Sample"
    />
  </Col>
  <Col md={8} lg={6} xl={{ size: 4, offset: 1 }}>
    <form>
      <div
        class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"
      >
        <p class="lead fw-normal mb-0 me-3">Sign in with</p>
        <button
          on:click={loginWithGoogle}
          type="button"
          data-mdb-button-init
          data-mdb-ripple-init
          class="btn btn-primary btn-floating mx-1"
        >
          <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
        </button>

        <button
          disabled
          type="button"
          data-mdb-button-init
          data-mdb-ripple-init
          class="btn btn-primary btn-floating mx-1"
        >
          <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
        </button>

        <button
          disabled
          type="button"
          data-mdb-button-init
          data-mdb-ripple-init
          class="btn btn-primary btn-floating mx-1"
        >
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
        </button>
      </div>

      <div class="divider d-flex align-items-center my-4">
        <p class="text-center fw-bold mx-3 mb-0">Or</p>
      </div>

      <!-- Email input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <input
          type="email"
          id="form3Example3"
          class="form-control form-control-lg"
          placeholder="Enter a valid email address"
        />
        <label class="form-label" for="form3Example3">Email address</label>
      </div>

      <!-- Password input -->
      <div data-mdb-input-init class="form-outline mb-3">
        <input
          type="password"
          id="form3Example4"
          class="form-control form-control-lg"
          placeholder="Enter password"
        />
        <label class="form-label" for="form3Example4">Password</label>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <!-- Checkbox -->
        <div class="form-check mb-0">
          <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
          <label class="form-check-label" for="form2Example3"> Remember me </label>
        </div>
        <a href="#!" class="text-body">Forgot password?</a>
      </div>

      <div class="text-center text-lg-start mt-4 pt-2">
        <button
          type="button"
          data-mdb-button-init
          data-mdb-ripple-init
          class="btn btn-primary btn-lg"
          style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button
        >
        <p class="small fw-bold mt-2 pt-1 mb-0">
          Don't have an account? <a href="/register" class="link-danger">Register</a>
        </p>
      </div>
    </form>
  </Col>
</Row>

<style>
  .divider:after,
  .divider:before {
    content: '';
    flex: 1;
    height: 1px;
    background: #eee;
  }
  .h-custom {
    height: calc(100% - 73px);
  }
  @media (max-width: 450px) {
    .h-custom {
      height: 100%;
    }
  }
</style>
