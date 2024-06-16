<script>
  import { Row, Col, Container } from '@sveltestrap/sveltestrap';
  import authStore from '../../../stores/authStore.js';
</script>

<Container>
  <Row class="d-flex justify-content-center align-items-center">
    <Col>
      <div class="card mb-3" style="border-radius: .5rem;">
        <div class="row g-0">
          <div
            class="col-md-4 gradient-custom text-center"
            style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;"
          >
            <img
              src={$authStore.user?.photoURL}
              alt="Avatar"
              class="img-fluid my-5"
              style="width: 80px;"
            />
            <h5>{$authStore.user?.displayName}</h5>
            <i class="far fa-edit mb-5"></i>
          </div>
          <div class="col-md-8">
            <div class="card-body p-4">
              <h6>Information</h6>
              <hr class="mt-0 mb-4" />
              <div class="row pt-1">
                <div class="col-6 mb-3">
                  <h6>Email</h6>
                  <p class="text-muted">{$authStore.user?.email}</p>
                </div>
                <div class="col-6 mb-3">
                  <h6>Phone</h6>
                  <p class="text-muted">{$authStore.user?.phoneNumber ?? ''}</p>
                </div>
              </div>
              <!-- <h6>Projects</h6> -->
              <!-- <hr class="mt-0 mb-4" /> -->
              <!-- <div class="row pt-1"> -->
              <!--   <div class="col-6 mb-3"> -->
              <!--     <h6>Recent</h6> -->
              <!--     <p class="text-muted">Lorem ipsum</p> -->
              <!--   </div> -->
              <!--   <div class="col-6 mb-3"> -->
              <!--     <h6>Most Viewed</h6> -->
              <!--     <p class="text-muted">Dolor sit amet</p> -->
              <!--   </div> -->
              <!-- </div> -->
              <!-- <div class="d-flex justify-content-start"> -->
              <!--   <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a> -->
              <!--   <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a> -->
              <!--   <a href="#!"><i class="fab fa-instagram fa-lg"></i></a> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
</Container>

<style>
  button {
    border: none;
    padding: 0;
    background: transparent;
  }
</style>
