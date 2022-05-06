<template>
  <section class="site-section p-4">
    <div class="container">

      <div class="row">
        <car-list-item-component v-for="(car,key) in cars" :key="key"
                                 :id="key"
                                 :title="car.title"
                                 :description="car.description"
                                 :image="car.image"
                                 :owner_id="car.owner_id"
                                 :price_per_month="car.price_per_month"
        >

        </car-list-item-component>

      </div>
    </div>
  </section>
</template>

<script>
import * as nearAPI from 'near-api-js';
import CarListItemComponent from "@/components/Pages/CarListItemComponent";
export default {
  name: "CarsComponent",
  components:{
    CarListItemComponent
  },
  data(){
    return {
      cars : {}
    }
  },
  methods:{
    async getAllCars(){
      const provider = new nearAPI.providers.JsonRpcProvider(window.nearConfig.nodeUrl);
      const rawResult = await provider.query({
        request_type: "call_function",
        finality: "final",
        account_id: window.nearConfig.contractName,
        method_name: "get_all_cars",
        args_base64: '',
      });
      this.cars = JSON.parse(Buffer.from(rawResult.result).toString())
    }
  },
  async mounted() {
    let loader = this.$loading.show();
    await this.getAllCars()
    loader.hide()
  },
}
</script>

<style scoped>


</style>