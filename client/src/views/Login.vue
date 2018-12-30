<template>
  <div class="md-layout md-gutter" style="height:100%;width:100%">
    <div class="md-layout-item md-small-size-100 md-medium-size-50" style="margin:auto auto">
      <md-card>
        <md-card-header>
          <div class="md-title">Admin Login</div>
        </md-card-header>
  
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-size-100 md-alignment-center-center">
              <md-field>
                <md-icon>account_circle</md-icon>
                <label>Username</label>
                <md-input v-on:keypress.enter="Login" v-model="username" required></md-input>
                <span class="md-error">Please provide your valid south african 10 digit contact numbers</span>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 md-alignment-center-center">
              <md-field>
                <md-icon>lock</md-icon>
                <label>Password</label>
                <md-input v-on:keypress.enter="Login" type="password" v-model="password" required></md-input>
                <span class="md-error">Please provide your valid south african 10 digit contact numbers</span>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 md-alignment-center-center">
              <p class="red-text center-align">{{ txtError }}</p>
            </div>
          </div>
        </md-card-content>
  
        <md-card-actions>
          <md-button v-if="!currentUser.status" @click="Login">Login</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      txtError: ""
    };
  },
  methods: {
    Login() {
      this.txtError = "";
      if (this.username.length < 3) {
        this.txtError = "Incorrect username/password";
      } else if (this.password.length < 3) {
        this.txtError = "Incorrect username/password";
      } else {
        this.$store.dispatch("Login", {
          username: this.username,
          password: this.password
        });
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  watch: {
    currentUser: function(newVal, oldVal) {
      if (newVal.status == null) {
        return;
      }
      if (!newVal.status) {
        this.txtError = newVal.text;
      } else {
        this.$router.push("/admin/home");
      }
    }
  }
};
</script>
