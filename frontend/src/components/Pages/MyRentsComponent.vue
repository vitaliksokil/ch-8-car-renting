<template>
  <section class="site-section p-4">
    <div class="container">

      <div class="row">
        <car-list-item-component v-for="(car,key) in cars" :key="key"
                                 :id="key"
                                 :title="car.car.title"
                                 :description="car.car.description"
                                 :image="car.car.image"
                                 :owner_id="car.car.owner_id"
                                 :price_per_month="car.car.price_per_month"
                                 is_rent="true"
                                 :stream_id="car.rent.id"
                                 :already_paid="car.rent.balance"
                                 :rent="car.rent"
        >

        </car-list-item-component>

      </div>
    </div>
  </section>
</template>

<script>
import CarListItemComponent from "@/components/Pages/CarListItemComponent";
import * as nearAPI from "near-api-js";
import {getTransactionState, getUrlParams} from "../../../helpers";
import Big from "big.js";

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
    async getStream(stream_id){
      const provider = new nearAPI.providers.JsonRpcProvider(window.nearConfig.nodeUrl);
      const argsBase64 = window.btoa(JSON.stringify({"stream_id":stream_id}))
      const rawResult = await provider.query({
        request_type: "call_function",
        finality: "final",
        account_id: window.roketoContractName,
        method_name: "get_stream",
        args_base64: argsBase64,
      });
      return JSON.parse(Buffer.from(rawResult.result).toString())
    },
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
      let cars = JSON.parse(Buffer.from(rawResult.result).toString())
      for (const [key, value] of Object.entries(cars)) {
        value.rent = await this.getStream(value.rent.stream_id);
      }
      this.cars = cars;
      console.log(cars)
    },


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