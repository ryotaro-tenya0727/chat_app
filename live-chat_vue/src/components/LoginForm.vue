<template>
  <div>
    <h2>ログイン</h2>
    <!-- ======= 👇 ここから変更する ======= -->
    <form @submit.prevent="login">
      <!-- ====== 👆 ここまで変更する ======= -->
      <input
        type="email"
        required
        placeholder="メールアドレス"
        v-model="email"
      />
      <input
        type="password"
        required
        placeholder="パスワード"
        v-model="password"
      />
      <!-- ======= 👇 ここから追加する ======= -->
      <div class="error">{{ error }}</div>
      <!-- ====== 👆 ここまで追加する ======= -->
      <button>ログインする</button>
    </form>
  </div>
</template>

<script>
// ======= 👇 ここから追加する =======
import axios from 'axios';
import setItem from '../auth/setItem';

// ====== 👆 ここまで追加する =======

export default {
  emits: ['redirectToChatRoom'],
  data() {
    return {
      email: '',
      password: '',
      // ======= 👇 ここから追加する =======
      error: null,
      // ====== 👆 ここまで追加する =======
    };
  },
  // ======= 👇 ここから追加する =======
  methods: {
    async login() {
      try {
        this.error = null;

        const res = await axios.post('http://localhost:3000/auth/sign_in', {
          email: this.email,
          password: this.password,
        });
        if (!res) {
          throw new Error('メールアドレスかパスワードが違います');
        }
        if (!this.error) {
          console.log({ res });
          setItem(res.headers, res.data.data.name);

          this.$emit('redirectToChatRoom');
        }
        console.log({ res });

        return res;
      } catch (error) {
        console.log({ error });
        this.error = 'メールアドレスかパスワードが違います';
      }
    },
    // ====== 👆 ここまで追加する =======
  },
};
</script>
