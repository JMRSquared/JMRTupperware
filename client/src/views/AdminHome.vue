<template>
  <div class="home">
    <md-card v-show="isAddingNewTupperware">
      <md-card-header>
        <div class="md-title">Add tupperware</div>
      </md-card-header>
      <md-card-content class="md-layout">
        <div class="md-layout md-layout-item md-medium-size-50 md-small-size-100">
          <md-ripple>
            <img @click="imageInput" class="vue-img-preview" :src="newTupperware.img !== null ? newTupperware.img : require('@/assets/logo.png')" v-if="newTupperware.img != null ? newTupperware.img : require('@/assets/logo.png')">
          </md-ripple>
          <input ref="imageInput" type="file" accept="image/*" class="form-control" hidden @change="chooseImage">
        </div>
        <md-card class="md-layout md-layout-item md-medium-size-50 md-small-size-100">
          <md-card-content>
            <div class="md-layout md-layout-item md-medium-size-50 md-small-size-100">
              <div class="md-layout-item md-size-100 md-alignment-center-center">
                <md-field>
                  <label>Name</label>
                  <md-input v-model="newTupperware.name" required></md-input>
                  <span class="md-error">Please provide your valid south african 10 digit contact numbers</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 md-alignment-center-center">
                <md-field>
                  <label>Price</label>
                  <md-input type="number" v-model="newTupperware.price" required></md-input>
                  <span class="md-error">Please provide your valid south african 10 digit contact numbers</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 md-alignment-center-center">
                <md-field>
                  <label>Quantity</label>
                  <md-input type="number" v-model="newTupperware.quantity" required></md-input>
                  <span class="md-error">Please provide your valid south african 10 digit contact numbers</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 md-alignment-center-center">
                <p class="red-text center-align">{{ txtError }}</p>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </md-card-content>
  
      <md-card-actions>
        <md-button @click="isAddingNewTupperware = !isAddingNewTupperware">Cancel</md-button>
        <md-button v-if="!currentAdded.status" @click="AddNewTupperware">Save</md-button>
      </md-card-actions>
    </md-card>
  
    <md-table v-show="!isAddingNewTupperware" v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <md-button v-on:click="isAddingNewTupperware = !isAddingNewTupperware">Add new tupperware</md-button>
        </div>
  
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
  
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Price" md-sort-by="price">R{{ item.price }}</md-table-cell>
        <md-table-cell md-label="Quantity" md-sort-by="quantity">{{ item.quantity }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button v-on:click="Remove(item)" class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
          <md-button v-on:click="Edit(item)" class="md-icon-button">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from "epic-spinners";
import Tupperware from "../components/Tupperware";
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }

  return items;
};

export default {
  name: "home",
  data() {
    return {
      search: null,
      searched: [],
      img: null,
      txtError: "",
      isAddingNewTupperware: false,
      newTupperware: {
        _id: null,
        name: null,
        price: null,
        quantity: null,
        img: null
      }
    };
  },
  components: {
    BreedingRhombusSpinner,
    Tupperware
  },
  computed: {
    tupperwares() {
      return this.$store.state.tupperwares;
    },
    currentAdded() {
      return this.$store.state.currentAdded;
    }
  },
  watch: {
    currentAdded: function(newVal, oldVal) {
      if (newVal.status == null) {
        return;
      }
      if (!newVal.status) {
        this.txtError = newVal.text;
      } else {
        this.newTupperware = {
          name: null,
          price: null,
          quantity: null,
          img: null
        };
        alert("Tupperware successfully added");
      }
    }
  },
  mounted() {
    if (!this.$store.state.currentUser.status) {
      this.$router.replace("/login");
    } else {
      this.$store.dispatch("getTupperwares", {
        take: 10000,
        skip: 0
      });
    }
  },
  methods: {
    Edit(item) {
      this.newTupperware = item;
      this.isAddingNewTupperware = true;
    },
    Remove(item) {
      item.quantity = 0;
      this.newTupperware = item;
      this.AddNewTupperware();
    },
    newUser() {
      window.alert("Noop");
    },
    getSum(total, num) {
      return total + num;
    },
    searchOnTable() {
      this.searched = searchByName(this.tupperwares, this.search);
    },
    AddNewTupperware() {
      this.txtError = "";
      if (!this.newTupperware.img) {
        this.txtError = "Please pick a picture of the tupperware.";
      } else if (this.newTupperware.name.length < 3) {
        this.txtError = "Please enter a valid name.";
      } else if (
        this.newTupperware.price.length < 0 ||
        isNaN(this.newTupperware.price)
      ) {
        this.txtError = "Please enter a valid price for the tupperware.";
      } else if (
        this.newTupperware.quantity.length < 0 ||
        isNaN(this.newTupperware.quantity)
      ) {
        this.txtError = "Please enter a valid quantity of the tupperware.";
      } else {
        this.$store.dispatch("addNewTupperware", {
          tupperware: this.newTupperware
        });
      }
    },
    imageInput() {
      this.$refs.imageInput.click();
    },
    chooseImage(e) {
      let files = e.target.files;
      if (files.length === 0) {
        this.newTupperware.img = null;
        return;
      }
      let reader = new FileReader();
      reader.onload = ee => {
        this.newTupperware.img = ee.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  },
  created() {
    this.searched = this.tupperwares;
  }
};
</script>

<style lang="scss" scoped>
.vue-img-preview {
  height: 100%;
  width: 100%;
}
</style>
