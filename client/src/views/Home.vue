<template>
  <div class="home">
  
    <md-dialog class="white" v-if="tupperwares.find(t => t.selected)" :md-active.sync="open">
      <Tupperware @close="tupperwares = true" :tupperware="tupperwares.find(t => t.selected)"></Tupperware>
    </md-dialog>
    <div class="md-layout">
      <breeding-rhombus-spinner class="fullScreenLoading" v-if="!tupperwares || tupperwares.length == 0" :animation-duration="2000" :size="65" color="#0093a4" />
    </div>
    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
      <div class="md-layout" v-masonry transition-duration="0.5s" item-selector=".item">
        <div v-masonry-tile class="item m-y-15 md-layout-item md-large-size-25 md-medium-size-33  md-xsmall-size-50" v-for="(tupperware,i) in tupperwares" :key="i">
           <md-card md-with-hover>
          <div  role="button" @click="placeOrder(tupperware)">
               <md-ripple>
                <div v-if="tupperware.quantity && tupperware.quantity < 10" class="ribbon right">
                  <span>{{ tupperware.quantity }} in-stock</span>
                </div>
                <div v-if="tupperware.quantity == 0" class="ribbon right">
                  <span>out of stock</span>
                </div>
                <md-card-media-cover md-text-scrim>
                  <md-card-media>
                    <img :src="tupperware.img" :alt="tupperware._id">
                  </md-card-media>
                  <md-card-area>
  
                    <md-card-content>
                      <div class="md-title">R{{ tupperware.price}}</div>
                      <div class="md-subhead">{{ tupperware.name}}</div>
                    </md-card-content>
                  </md-card-area>
  
                </md-card-media-cover>
              </md-ripple>
          </div>
            </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from "epic-spinners";
import Tupperware from "../components/Tupperware";

export default {
  name: "home",
  data() {
    return {
      isLoading: false,
      open: false
    };
  },
  components: {
    BreedingRhombusSpinner,
    Tupperware
  },
  mounted() {},
  computed: {
    tupperwares: {
      get() {
        return this.$store.state.tupperwares;
      },
      set(val) {
        if (val) {
          this.tupperwares.map(t => {
            t.selected = false;
            return t;
          });
        }
      }
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch("getTupperwares", {
        take: 10,
        skip: this.tupperwares.length
      });
    },
    placeOrder(tupperware) {
      this.tupperwares = true;
      tupperware.selected = true;
      this.open = true;
    }
  }
};
</script>
