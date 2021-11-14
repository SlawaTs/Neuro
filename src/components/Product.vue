<template>
  <div class="column-content">
    <span class="column-content__item">
      {{ name }}
    </span>
    <div class="column__btn">
      <span class="column-content__btn">
        <DeleteTwoTone two-tone-color="#eb2f96" @click="removeProduct(id)"
        />
      </span>
      <span class="column-content__btn">
        <MinusOutlined @click="decreaseCnt(id)"/>
      </span>
      <span class="column-content__btn">
      {{ cnt }}
      </span>
      <span class="column-content__btn">
        <PlusOutlined @click="increaseCnt(id)"/>
      </span>
      <span class="column-content__btn">
        <InteractionTwoTone @click="visible = true"/>
      </span>
    </div>
    <a-drawer
        v-model:visible="visible"
        class="custom-class"
        style="color: red"
        title="Измениеть session"
        placement="right"
        :width="500"

    >
      <a-select
          v-model:value="newSession"
          style="width: 100%"
      >
        <a-select-option v-for="session in sessions"
                         :value="session"
                         :key="session">{{ session }}
        </a-select-option>
      </a-select>
      <div>
        <a-button type="primary" style="margin-top: 10px" @click="setSessionProduct">Submit</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import {DeleteTwoTone, InteractionTwoTone, PlusOutlined, MinusOutlined} from "@ant-design/icons-vue";
import {mapActions, mapGetters} from 'vuex'
import {message} from "ant-design-vue";

export default {
  props: {
    name: String,
    cnt: Number,
    id: Number,
  },
  data() {
    return {
      visible: false,
      newSession: ''
    }
  },
  computed: {
    ...mapGetters({sessions: 'sessions'}),
  },
  methods: {
    ...mapActions({
      removeProduct: 'remove',
      increaseCnt: 'increase',
      decreaseCnt: 'decrease',
      setSession: 'setSession'
    }),
    setSessionProduct() {
      if (this.newSession !== '') {
        this.setSession({id: this.id, newSession: this.newSession});
        this.newSession = '';
        message.success('Session edit')
      } else message.error('Заполните все поля')
    }
  },
  components: {
    DeleteTwoTone,
    InteractionTwoTone,
    PlusOutlined,
    MinusOutlined
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.column-content {
  display: flex;
  justify-content: space-between;

}

.column-content__item {

}

.column-content__btn {
  margin: 5px 2px;
  display: inline-block;
  width: 20px;
  text-align: center;

}
</style>
