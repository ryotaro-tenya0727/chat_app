<template>
  <!-- ======= 👇 ここから変更する ======= -->
  <div class="container">
    <Navbar />
    <ChatWindow
      @connectCable="connectCable"
      :messages="formattedMessages"
      ref="chatWindow"
    />
    <NewChatForm @connectCable="connectCable" />
  </div>
  <!-- ====== 👆 ここまで変更する ======= -->
</template>

<script>
// ======= 👇 ここから変更する =======
import Navbar from '../components/Navbar';
import ChatWindow from '../components/ChatWindow';
import NewChatForm from '../components/NewChatForm';
import ActionCable from 'actioncable';

import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export default {
  components: { Navbar, ChatWindow, NewChatForm },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    async getMessages() {
      try {
        const res = await axios.get('http://localhost:3000/messages', {
          headers: {
            uid: window.localStorage.getItem('uid'),
            'access-token': window.localStorage.getItem('access-token'),
            client: window.localStorage.getItem('client'),
          },
        });
        if (!res) {
          new Error('メッセージ一覧を取得できませんでした');
        }
        this.messages = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    connectCable(message) {
      this.messageChannel.perform('receive', {
        message: message,
        email: window.localStorage.getItem('uid'),
      });
    },
  },
  mounted() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    this.messageChannel = cable.subscriptions.create('RoomChannel', {
      connected: () => {
        this.getMessages().then(() => {
          this.$refs.chatWindow.scrollToBottom();
        });
      },
      received: () => {
        this.getMessages().then(() => {
          this.$refs.chatWindow.scrollToBottom();
        });
      },
    });
  },
  computed: {
    formattedMessages() {
      if (!this.messages.length) {
        return [];
      }
      return this.messages.map((message) => {
        console.log(message.created_at);
        let time = formatDistanceToNow(new Date(message.created_at), {
          locale: ja,
        });
        return { ...message, created_at: time };
      });
    },
  },
  beforeUnmount() {
    this.messageChannel.unsubscribe();
  },

  // ====== 👆 ここまで変更する =======
};
</script>

<!-- ...省略 -->
