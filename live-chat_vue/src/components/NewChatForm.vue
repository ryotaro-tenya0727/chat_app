<template>
  <form>
    <textarea
      placeholder="メッセージを入力してEnterを押してください"
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
  </form>
</template>

<script>
export default {
  // ======= 👇 ここから追加する =======
  emits: ['connectCable'],
  // ======= 👆 ここまで追加する =======
  data() {
    return {
      message: '',
    };
  },
  // ======= 👇 ここから追加する =======
  methods: {
    handleSubmit() {
      this.$emit('connectCable', this.message);
      this.message = '';
    },
  },
};
</script>

<style scoped>
form {
  margin: 10px;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
