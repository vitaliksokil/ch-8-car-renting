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
                                 :price_per_hour="car.price_per_hour"
        >

        </car-list-item-component>

      </div>
    </div>
  </section>
</template>

<script>
import CarListItemComponent from "@/components/Pages/CarListItemComponent";
import * as nearAPI from "near-api-js";

export default {
  name: "MyRentsComponent",
  components:{
    CarListItemComponent
  },
  data(){
    return {
      cars : {}
    }
  },
  methods:{
    async getMyCars(){
      const provider = new nearAPI.providers.JsonRpcProvider(window.nearConfig.nodeUrl);
      const argsBase64 = window.btoa(JSON.stringify({renter_account_id:window.nearAccount.accountId}))
      const rawResult = await provider.query({
        request_type: "call_function",
        finality: "final",
        account_id: window.nearConfig.contractName,
        method_name: "get_rents_by_renter_id",
        args_base64: argsBase64,
      });
      this.cars = JSON.parse(Buffer.from(rawResult.result).toString())
    }
  },
  async mounted() {
    let loader = this.$loading.show();
    await this.getMyCars()
    loader.hide()
  },

}
</script>

<style scoped>

</style>