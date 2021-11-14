<template>
  <div>
    <button class="cart-content__item1-btn" @click="visible = true">Добавить продукт</button>
    <a-modal v-model:visible="visible" title="Добовление товара" @ok="addProduct" @cancel="mashing">

      <a-select
          class="modal-row__item"
          ref="select"
          v-model:value="type"
          style="width: 100%; margin-bottom: 10px"

      >
        <a-select-option value="take_off">take_off</a-select-option>
        <a-select-option value="put_on">put_on</a-select-option>
      </a-select>
      <a-input v-model:value="productName"
               placeholder="Название продукта"
               class="modal-row__item"
               style="margin-bottom: 10px"/>
      <a-input v-model:value="productCount"
               placeholder="количество"
               type="number"
      />
    </a-modal>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import {message} from 'ant-design-vue'

export default {
  props: {
    session: String,
  },
  components: {
    message
  },
  data() {
    return {
      visible: false,
      type: '',
      productName: '',
      productCount: '',
    }
  },
  computed: {
    ...mapGetters({sessions: 'sessions'}),
  },
  methods: {
    addProduct() {
      let product = {};
      if (this.type !== '' && this.productName !== '' && this.productCount !== '') {
        product.id = parseInt(Math.random() * 1000000);
        product.type = this.type;
        product.productName = this.productName;
        product.productCount = this.productCount;
        product.sessionId = this.session;
        this.addProductInSession(product);
        this.mashing();
        message.success('Продукт добавлен')
      } else message.error('Заполните все поля')
    },
    mashing() {
      this.type = '';
      this.productName = '';
      this.productCount = ''
    },
    ...mapActions({addProductInSession: 'addProduct'})
  }
};
</script>
<style>
.cart-content__item1-btn {
  color: rgb(24, 144, 255);
  border: none;
  border-radius: 8px;
  margin-left: 10px;
  padding: 5px 20px;
}

.modal-row__item {
  margin: 10px;
}
</style>