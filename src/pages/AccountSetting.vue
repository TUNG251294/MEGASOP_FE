<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">Cài đặt</h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>

                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el label="Tài khoản" to="/account" />
                <q-breadcrumbs-el label="Cài đặt" style="color: #2a2a2a" />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <h4 class="">Company details</h4>
                <!-- Image -->
                <div class="row"></div>
                <!-- Form -->
                <div class="row mt-2">
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                    <div class="form-group">
                      <label class="form-label" for="companyName"
                        >Company Name</label
                      >
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Company Name"
                        autofocus=""
                        tabindex="1"
                        v-model="companyName"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                    <div class="form-group">
                      <label class="form-label" for="industry">Industry</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Industry"
                        autofocus=""
                        tabindex="2"
                        v-model="industry"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                    <div class="form-group">
                      <label class="form-label" for="representative"
                        >Representative</label
                      >
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Representative"
                        autofocus=""
                        tabindex="3"
                        v-model="representative"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                    <div class="form-group">
                      <label class="form-label" for="position">Position</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Position"
                        autofocus=""
                        tabindex="4"
                        v-model="position"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                    <div class="form-group">
                      <label class="form-label" for="email">Email</label>
                      <input
                        class="form-control"
                        type="email"
                        placeholder="Email"
                        autofocus=""
                        tabindex="5"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                    <div class="form-group">
                      <label class="form-label" for="industry"
                        >Phone Number</label
                      >
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Phone Number"
                        autofocus=""
                        tabindex="6"
                        v-model="phoneNumber"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                    <div class="form-group">
                      <label class="form-label" for="address">Address</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Address"
                        autofocus=""
                        tabindex="7"
                        v-model="adddress"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                    <div class="form-group">
                      <label class="form-label" for="city">City</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="City"
                        autofocus=""
                        tabindex="8"
                        v-model="city"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                    <div class="form-group">
                      <label class="form-label" for="district">District</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="District"
                        autofocus=""
                        tabindex="9"
                        v-model="district"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                    <div class="form-group">
                      <label class="form-label" for="ward">Ward</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Ward"
                        autofocus=""
                        tabindex="10"
                        v-model="ward"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary mt-1 mr-2">
                    <label>Save Changes</label>
                  </button>
                  <button class="btn btn-outline-secondary mt-1">
                    <label>Discard</label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>