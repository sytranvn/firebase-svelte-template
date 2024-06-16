<script>
  import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
  import { faEnvelope, faKey, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { Card, CardBody, Col, Container, Form, Icon, Input, Row } from '@sveltestrap/sveltestrap';
  import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { GithubAuthProvider, TwitterAuthProvider } from 'firebase/auth/web-extension';
  import authStore from '../../stores/authStore';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';

  let message = '';

  async function loginWithGoogle() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      await signInWithPopup(auth, provider);
    } catch (e) {
      message = 'Something went wrong. Please retry after a minute or try other methods.';
      console.log(e);
    }
  }

  async function loginWithTwitter() {
    try {
      const auth = getAuth();
      const provider = new TwitterAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      await signInWithPopup(auth, provider);
    } catch (e) {
      message = 'Something went wrong. Please retry after a minute or try other methods.';
      console.log(e);
    }
  }

  async function loginWithGithub() {
    try {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      await signInWithPopup(auth, provider);
    } catch (e) {
      message = 'Something went wrong. Please retry after a minute or try other methods.';
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

<Container fluid class="container h-100">
  <Row class="row d-flex justify-content-center align-items-center h-100">
    <Col lg={12} xl={11}>
      <Card class="text-black" style="border-radius: 25px;">
        <CardBody class="p-md-5">
          <Row class="justify-content-center">
            <Col class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <Form class="mx-1 mx-md-4">
                <div class="text-danger d-flex flex-row align-items-center mb-4">
                  {message}
                </div>
                <div class="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faUser} fixedWidth size="lg" class="me-3" />
                  <Input type="text" label="Your Name" placeholder="Your Name" />
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} class="me-3" size="lg" fixedWidth />
                  <Input type="text" label="Your Email" placeholder="Your Email" />
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faLock} class="me-3" size="lg" fixedWidth />
                  <Input type="text" label="Password" placeholder="Password" />
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faKey} class="me-3" size="lg" fixedWidth />
                  <Input
                    type="text"
                    label="Repeat your password"
                    placeholder="Repeat your password"
                  />
                </div>

                <div class="form-check d-flex justify-content-center mb-5">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3c"
                  />
                  <label class="form-check-label" for="form2Example3">
                    I agree all statements in <a href="#!">Terms of service</a>
                  </label>
                </div>

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-primary btn-lg">Register</button
                  >
                </div>
              </Form>
            </Col>
            <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
              <p class="lead fw-normal mb-0 me-3">Or sign up with:</p>
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
                on:click={loginWithTwitter}
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                class="btn btn-primary btn-floating mx-1"
              >
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </button>
              <button
                on:click={loginWithGithub}
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                class="btn btn-primary btn-floating mx-1"
              >
                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
              </button>
            </div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>