<!-- ======= 👇 ここから追加する ======= -->
<template>
  <div>
    <h2>アカウントを登録</h2>
    <form @submit.prevent="signUp">
      <input type="text" required placeholder="名前" v-model="name" />
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
      <input
        type="password"
        required
        placeholder="パスワード（確認用）"
        v-model="passwordConfirmation"
      />
      <div class="error">{{ error }}</div>
      <button>登録する</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import setItem from '../auth/setItem';

export default {
  emits: ['redirectToChatRoom'],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      error: null,
    };
  },
  methods: {
    async signUp() {
      this.error = null;
      try {
        const res = await axios.post('http://localhost:3000/auth', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        });
        if (!res) {
          throw new Error('アカウントを登録できませんでした');
        }
        console.log(res);
        if (!this.error) {
          setItem(res.headers, res.data.data.name);
          this.$emit('redirectToChatRoom');
        }
        return res;
      } catch (error) {
        this.error = 'アカウントを登録できませんでした';
        console.log(error);
      }
    },
  },
};
</script>
<!-- ======= 👆 ここまで追加する ======= -->
