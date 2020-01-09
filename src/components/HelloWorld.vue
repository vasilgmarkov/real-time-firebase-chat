<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="!auth">
      <h3>You dont's have an account ? LogIn with google!!</h3>
      <img
        @click="googleLogin"
        src="https://cdn.icon-icons.com/icons2/1269/PNG/512/1497553309-101_84843.png"
        alt="google Login"
      />
    </div>
    <div v-if="auth">
      <button @click="like(1)">Like</button>
      <div>
        <h3>{{auth.name}}</h3>
        <img :src="auth.avatar" alt="profile image" />
        <button @click="logOut">Log Out</button>
      </div>

      <input type="text" v-model="message" />
      <button @click="sendMsg">Send</button>
      <div v-for="(v,k,i) in messages" :key="i+'msg'" class="msg">
        <img :src="v.user.avatar" alt="avatar" />
        <p>
          <span>{{v.user.name}}</span>
          : {{v.msg}}
        </p>
      </div>
      <div v-for="(v,k,i) in likes" :key="i" class="like">
        <p>
          <span>{{v}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/fb";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      message: "",
      messages: [],
      auth: null,
      likes: []
    };
  },
  watch: {
    auth() {
      this.getLikes();
    }
  },
  methods: {
    sendMsg() {
      db.database()
        .ref()
        .child("posts")
        .push({ user: this.auth, msg: this.message });
      this.message = "";
    },
    getPosts() {
      let that = this;
      db.database()
        .ref("posts/")
        .on("value", snapshot => {
          console.log(snapshot.val());

          that.messages = snapshot.val();
        });
    },
    googleLogin() {
      let that = this;
      const provider = new db.auth.GoogleAuthProvider();
      db.auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = {
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL,
            id: result.user.uid
          };
          console.log(user);
          that.auth = user;

          db.database()
            .ref("users/" + result.user.uid)
            .set(user);

          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    logOut() {
      let that = this;
      db.auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          that.auth = null;
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    like(value) {
      db.database()
        .ref("productsCode/" + this.auth.id)
        .push(value + 1);
    },
    getLikes() {
      db.database()
        .ref("productsCode/" + this.auth.id)
        .on("value", snapshot => {
          console.log(snapshot.val());

          this.likes = snapshot.val();
        });
    }
  },
  created() {
    this.getPosts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 125px;
  cursor: pointer;
}
.msg img {
  width: 25px;
}
</style>
