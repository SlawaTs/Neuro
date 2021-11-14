<template>

  <div class="cart-session">
    <div class="cart-session__row">
      <div>
        <UserOutlined class="cart__icon"/>
      </div>
      <div>
        <div>{{ session }}</div>
        <div>{{ openSession(session) }}-{{ exitSession(session) }}</div>
      </div>
      <div>
        <div>34829</div>
        <div>VV card id</div>
      </div>
      <div v-if="!saveSession">
        <EditOutlined class="cart__icon" @click="activated=!activated"/>
        <MoreOutlined class="cart__icon"/>
      </div>
      <div v-else>
        <CheckOutlined class="cart__icon-check"/>
      </div>
    </div>
    <div v-if="activated">
      <div class="cart-content">
        <div class="cart-content__row">
          <div class="cart-content__row-title">
            Вход
          </div>
          <div>
            <span>{{ openSession(session) }}</span>
<!--            <InteractionTwoTone class="cart-content__row-btn"/>-->
          </div>
        </div>
        <AppProduct v-for="product in products(session)"
                    :name="product.productName"
                    :key="product.id"
                    :cnt="product.productCount"
                    :id="product.id"
        ></AppProduct>
        <div class="cart-content__row">
          <div class="cart-content__row-title">
            Выход
          </div>
          <div>
            <span>{{ exitSession(session) }}</span>
<!--            <InteractionTwoTone class="cart-content__row-btn"/>-->
          </div>
        </div>
      </div>
      <div class="cart-content__btn">
        <app-modal :session="session">
        </app-modal>
        <button class="cart-content__item2-btn" @click="sendSession">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>

import AppProduct from "./Product"
import AppModal from "./Modal"
import {EditOutlined, MoreOutlined, UserOutlined, InteractionTwoTone, CheckOutlined} from "@ant-design/icons-vue";
import {mapGetters} from 'vuex'
import moment from "moment";

export default {
  props: {
    session: String
  },
  data() {
    return {
      activated: false,
      saveSession: false
    }
  },
  components: {
    AppProduct,
    AppModal,
    EditOutlined,
    MoreOutlined,
    UserOutlined,
    InteractionTwoTone,
    CheckOutlined
  },
  computed: {
    ...mapGetters({products: 'productsSession', trunstile: 'trunstileSession'}),

  },
  methods: {
    openSession(id) {
      let timeOpen = this.trunstile(id).find(pr => pr.type === "open")
      return moment(timeOpen.timestamp).format('MMMM Do YYYY, h:mm:ss a');

    },
    exitSession(id) {
      let timeExit = this.trunstile(id).find(pr => pr.type === "exit")
      return moment(timeExit.timestamp).format('MMMM Do YYYY, h:mm:ss a')
    },
    sendSession() {
      this.activated = false;
      this.saveSession = true
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.cart-session {
  max-width: 900px;
  border-radius: 5px;
  border: #881EA8 solid  3px;
  margin: 5px;
}

.cart-session__row {
  display: flex;
  justify-content: space-between;
  background-color: #FFF6F6;
}

.cart__icon {
  font-size: 24px;
  margin: 10px;
  width: 50px;
}

.cart__icon-check {
  font-size: 24px;
  margin: 10px;
  width: 120px;
  color: green;
}

.cart-content {
  margin: 10px;
}

.cart-content__row {
  display: flex;
  justify-content: space-between;
}

.cart-content__row-title {

}

.cart-content__row-btn {
  margin: 5px;

}

.cart-content__btn {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

.cart-content__item2-btn {
  background-color: rgb(24, 144, 255);
  border: none;
  color: white;
  border-radius: 8px;
  margin-right: 10px;
  padding: 5px 20px;

}

.cart-content__item1-btn {
  color: rgb(24, 144, 255);
  border: none;
  border-radius: 8px;
  margin-left: 10px;
  padding: 5px 20px;
}
</style>
