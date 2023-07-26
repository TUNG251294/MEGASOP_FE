<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                Plan &amp; Pricing
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el label="Plan &amp; Pricing" style="color: #2a2a2a" />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <section id="pricing-plan">
          <!-- title text and switch button -->
          <div class="text-center">
            <h1 class="mt-5">Pricing Plans</h1>
            <p class="mb-2 pb-75">
              All plans include 10+ advanced modules and features to boost your
              business Choose the best plan to fit your needs.
            </p>
            <div
              class="
                d-flex
                align-items-center
                justify-content-center
                mb-5
                pb-50
              "
            >
              <h6 class="mr-1 mb-0">Monthly</h6>
              <q-toggle v-model="value" color="primary" keep-color />
              <h6 class="ml-50 mb-0">Annually</h6>
            </div>
          </div>
          <!-- pricing plan cards -->
          <div class="row pricing-card">
            <div
              class="
                col
                col-12
                col-sm-offset-2
                col-sm-12
                col-md-12
                col-lg-offset-2
                col-lg-12
                mx-auto
              "
            >
              <div class="row">
                <!-- basic plan -->
                <div
                  class="
                    col-12 col-md-4
                    d-flex
                    align-items-stretch
                    mb-2
                    pricing
                  "
                >
                  <div class="card w-100 basic-pricing text-center">
                    <div class="card-body">
                      <img
                        src="~assets/Pot1.svg"
                        class="mb-2 mt-5"
                        alt="svg img"
                      />
                      <h3>Basic</h3>
                      <p class="card-text">A simple start for everyone</p>
                      <div class="annual-plan">
                        <div class="plan-price mt-2">
                          <sup
                            class="font-medium-1 font-weight-bold text-primary"
                            >$</sup
                          >
                          <span
                            class="
                              pricing-basic-value
                              font-weight-bolder
                              text-primary
                            "
                            >0</span
                          >
                          <sub
                            class="
                              pricing-duration
                              text-body
                              font-medium-1 font-weight-bold
                            "
                            >/month</sub
                          >
                        </div>
                        <small class="annual-pricing d-none text-muted"></small>
                      </div>
                      <div class="row">
                        <q-list>
                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >100 responses a month</q-item-section
                            >
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >Unlimited forms and surveys</q-item-section
                            >
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section>Unlimited fields</q-item-section>
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >Basic form creation tools</q-item-section
                            >
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section>Up to 2 subdomains</q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <button class="btn btn-block btn-outline-success mt-2">
                        Your current plan
                      </button>
                    </div>
                  </div>
                </div>

                <!-- standard plan -->
                <div
                  class="
                    col-12 col-md-4
                    d-flex
                    align-items-stretch
                    mb-2
                    pricing
                  "
                >
                  <div class="card w-100 standard-pricing popular text-center">
                    <div class="card-body">
                      <div class="pricing-badge text-right">
                        <q-badge
                          outline
                          rounded
                          color="primary"
                          label="Popular"
                          size="md"
                        />
                      </div>
                      <img src="~assets/Pot2.svg" class="mb-1" alt="svg img" />
                      <h3>Standard</h3>
                      <p class="card-text">For small to medium businesses</p>
                      <div class="annual-plan">
                        <div class="plan-price mt-2">
                          <sup
                            class="font-medium-1 font-weight-bold text-primary"
                            >$</sup
                          >
                          <span
                            class="
                              pricing-standard-value
                              font-weight-bolder
                              text-primary
                            "
                            >49</span
                          >
                          <sub
                            class="
                              pricing-duration
                              text-body
                              font-medium-1 font-weight-bold
                            "
                            >/month</sub
                          >
                        </div>
                        <small class="annual-pricing d-none text-muted"></small>
                      </div>
                      <div class="row">
                        <q-list>
                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section>Unlimited responses</q-item-section>
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >Unlimited forms and surveys</q-item-section
                            >
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >Instagram profile page</q-item-section
                            >
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >Google Docs integration</q-item-section
                            >
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >Custom “Thank you” page</q-item-section
                            >
                          </q-item>
                        </q-list>
                      </div>
                      <button class="btn btn-block btn-primary mt-2">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>

                <!-- enterprise plan -->
                <div
                  class="
                    col-12 col-md-4
                    d-flex
                    align-items-stretch
                    mb-2
                    pricing
                  "
                >
                  <div class="card w-100 enterprise-pricing text-center">
                    <div class="card-body">
                      <img src="~assets/Pot3.svg" class="mb-2" alt="svg img" />
                      <h3>Enterprise</h3>
                      <p class="card-text">Solution for big organizations</p>
                      <div class="annual-plan">
                        <div class="plan-price mt-2">
                          <sup
                            class="font-medium-1 font-weight-bold text-primary"
                            >$</sup
                          >
                          <span
                            class="
                              pricing-enterprise-value
                              font-weight-bolder
                              text-primary
                            "
                            >99</span
                          >
                          <sub
                            class="
                              pricing-duration
                              text-body
                              font-medium-1 font-weight-bold
                            "
                            >/month</sub
                          >
                        </div>
                        <small class="annual-pricing d-none text-muted"></small>
                      </div>
                      <div class="row">
                        <q-list>
                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section>PayPal payments</q-item-section>
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section>Logic Jumps</q-item-section>
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >File upload with 5GB storage</q-item-section
                            >
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section
                              >Custom domain support</q-item-section
                            >
                          </q-item>

                          <q-item class="col">
                            <q-item-section avatar>
                              <q-icon name="panorama_fish_eye" size="8px" />
                            </q-item-section>
                            <q-item-section>Stripe integration</q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <button class="btn btn-block btn-outline-primary mt-2">
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- pricing free trial -->
          <div class="pricing-free-trial">
            <div class="row">
              <div class="col col-12 col-lg-10 col-lg-offset-3 mx-auto">
                <div
                  class="pricing-trial-content d-flex justify-content-between"
                >
                  <div class="text-center text-md-left mt-3">
                    <h4 class="text-primary">
                      Still not convinced? Start with a 14-day FREE trial!
                    </h4>
                    <h6>
                      You will get full access to with all the features for 14
                      days.
                    </h6>
                    <button class="btn btn-primary mt-2 mt-lg-3">
                      Start 14-day FREE trial
                    </button>
                  </div>

                  <!-- image -->
                  <img
                    src="~assets/pricing-Illustration.svg"
                    class="pricing-trial-img img-fluid"
                    alt="svg img"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- pricing faq -->
          <div class="pricing-faq">
            <h3 class="text-center">FAQ's</h3>
            <p class="text-center">
              Let us help answer the most common questions.
            </p>
            <div class="row my-2">
              <div class="col-12 col-lg-10 col-lg-offset-2 mx-auto">
                <!-- faq collapse -->
                <div
                  class="collapse-margin collapse-icon"
                  id="accordionExample"
                >
                  <div class="card mb-1">
                    <q-expansion-item
                      expand-separator
                      label="Does my subscription automatically renew?"
                      class="w-100"
                      icon="favorite_border"
                    >
                      <q-card>
                        <q-card-section>
                          Pastry pudding cookie toffee bonbon jujubes jujubes
                          powder topping. Jelly beans gummi bears sweet roll
                          bonbon muffin liquorice. Wafer lollipop sesame snaps.
                          Brownie macaroon cookie muffin cupcake candy caramels
                          tiramisu. Oat cake chocolate cake sweet jelly-o
                          brownie biscuit marzipan. Jujubes donut marzipan
                          chocolate bar. Jujubes sugar plum jelly beans tiramisu
                          icing cheesecake.
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                  <div class="card mb-1">
                    <q-expansion-item
                      expand-separator
                      label="Can I store the item on an intranet so everyone has
                        access?"
                      class="w-100"
                      icon="space_dashboard"
                    >
                      <q-card>
                        <q-card-section>
                          Tiramisu marshmallow dessert halvah bonbon cake
                          gingerbread. Jelly beans chocolate pie powder. Dessert
                          pudding chocolate cake bonbon bear claw cotton candy
                          cheesecake. Biscuit fruitcake macaroon carrot cake.
                          Chocolate cake bear claw muffin chupa chups pudding.
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                  <div class="card mb-1">
                    <q-expansion-item
                      expand-separator
                      label="Am I allowed to modify the item that I purchased?"
                      class="w-100"
                      icon="attach_money"
                    >
                      <q-card>
                        <q-card-section>
                          Tart gummies dragée lollipop fruitcake pastry oat
                          cake. Cookie jelly jelly macaroon icing jelly beans
                          soufflé cake sweet. Macaroon sesame snaps cheesecake
                          tart cake sugar plum. Dessert jelly-o sweet muffin
                          chocolate candy pie tootsie roll marzipan. Carrot cake
                          marshmallow pastry. Bonbon biscuit pastry topping
                          toffee dessert gummies. Topping apple pie pie
                          croissant cotton candy dessert tiramisu.
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                  <div class="float-right">
                    <a href="" class="text-primary">
                      Visit Knowledge Base
                      <q-icon name="chevron_right" size="sm" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- pricing still have question -->
          <div class="pricing-question mt-5">
            <h3 class="text-center">You still have a question?</h3>
            <p class="text-center">
              If you cannot find a question in our Knowledge Base, you can
              always contact us. We will answer to you shortly!
            </p>
            <div class="row my-2">
              <div class="col-md-6 col-sm-12">
                <div
                  class="card"
                  style="
                    background-color: rgba(186, 191, 199, 0.12);
                    border: 0 !important;
                  "
                >
                  <div class="card-body">
                    <div class="text-center">
                      <q-icon
                        size="1.5em"
                        name="phone_in_talk"
                        color="primary"
                        style="
                          background-color: rgba(1, 138, 190, 0.135927);
                          padding: 0.5rem;
                          border-radius: 6px;
                          margin-bottom: 1rem;
                        "
                      />
                    </div>
                    <h5 class="text-center">+ (810) 2548 2568</h5>
                    <p class="text-center">We are always happy to help!</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div
                  class="card"
                  style="
                    background-color: rgba(186, 191, 199, 0.12);
                    border: 0 !important;
                  "
                >
                  <div class="card-body">
                    <div class="text-center">
                      <q-icon
                        size="1.5em"
                        name="mail_outline"
                        color="primary"
                        style="
                          background-color: rgba(1, 138, 190, 0.135927);
                          padding: 0.5rem;
                          border-radius: 6px;
                          margin-bottom: 1rem;
                        "
                      />
                    </div>
                    <h5 class="text-center">hello@help.com</h5>
                    <p class="text-center">Best way to get answer faster!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlanPricing",
  components: {},
  data: function () {
    return {
      value: false,
    };
  },
  mounted: function () {},
  methods: {},
});
</script>