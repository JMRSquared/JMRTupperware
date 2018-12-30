<template>
  <div class="hello">
    <md-card v-if="tupperware">
      <div class="md-layout">
        <div class="md-layout-item md-large-size-50 md-alignment-center-center">
          <md-card-media-cover style="min-height: 100%;width: auto" md-text-scrim>
            <md-card-media class="md-alignment-center-center" md-big>
              <img :src="tupperware.img" :alt="tupperware._id">
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <div class="md-title">R{{ tupperware.price }}</div>
                <div class="md-subhead">{{ tupperware.name }}</div>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </div>
        <div class="md-layout-item md-large-size-50">
          <md-card-content>
            <md-card>
              <md-card-header>
                <div class="md-title">Interested ? </div>
                <div class="md-subhead">Place an order</div>
              </md-card-header>
              <md-card-content class="md-layout">
                <div class="md-layout-item md-size-100 md-alignment-center-center">
                  <md-field>
                    <md-icon>account_circle</md-icon>
                    <label>Firstname</label>
                    <md-input v-model="user.firstName" required></md-input>
                    <span class="md-error">Please provide your valid first name</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 md-alignment-center-center">
                  <md-field>
                    <md-icon>person</md-icon>
                    <label>Lastname</label>
                    <md-input v-model="user.lastName" required></md-input>
                    <span class="md-error">Please provide your valid last name</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 md-alignment-center-center">
                  <md-field>
                    <md-icon>phone</md-icon>
                    <label>Contact numbers</label>
                    <md-input type="number" v-model="user.numbers" required></md-input>
                    <span class="md-error">Please provide your valid south african 10 digit contact numbers</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 md-alignment-center-center">
                  <md-field>
                    <md-icon>description</md-icon>
                    <label>Message (optional)</label>
                    <md-input maxlength="150" v-model="user.message"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 md-alignment-center-center">
                  <p class="center-align red-text">{{ txtError }}</p>
                </div>
              </md-card-content>
  
              <md-card-actions>
                <md-button @click="closeDialog" class="md-primary">Cancel</md-button>
                <md-button v-if="orderStatus.status != 'PLACING'" @click="placeOrder" class="md-primary">Place order</md-button>
                <breeding-rhombus-spinner class="fullScreenLoading" v-if="orderStatus.status == 'PLACING'" :animation-duration="2000" :size="65" color="#0093a4" />
              </md-card-actions>
            </md-card>
          </md-card-content>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from "epic-spinners";
export default {
  name: "Tupperware",
  props: ["tupperware"],
  data() {
    return {
      txtError: "",
      user: {
        firstName: null,
        lastName: null,
        numbers: null,
        message: null
      }
    };
  },
  components: {
    BreedingRhombusSpinner
  },
  mounted() {
    if (!this.tupperware) {
      this.closeDialog();
    }
  },
  computed: {
    orderStatus() {
      return this.$store.state.placedOrder;
    }
  },
  watch: {
    orderStatus: function(newVal, oldVal) {
      if (newVal.status == "PLACED") {
        this.closeDialog();
      }
      alert(newVal.text);
    }
  },
  methods: {
    placeOrder() {
      this.txtError = "";
      if (!this.user.firstName || this.user.firstName.length < 3) {
        this.txtError = "Please enter your valid first name.";
      } else if (!this.user.lastName || this.user.lastName.length < 3) {
        this.txtError = "Please enter your valid last name.";
      } else if (
        !this.user.numbers ||
        this.user.numbers.length != 10 ||
        isNaN(this.user.numbers)
      ) {
        this.txtError =
          "Please enter your 10 digit South African valid contact number.";
      } else if (
        !this.tupperware ||
        !this.tupperware._id ||
        this.tupperware.quantity == 0
      ) {
        this.txtError = "We are out of stock of the selected tupperware";
      }

      if (this.txtError.length > 2) return;
      this.$store.dispatch("PlaceOrder", {
        user: this.user,
        tupperwareID: this.tupperware._id
      });
    },
    closeDialog() {
      this.$emit("close");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
