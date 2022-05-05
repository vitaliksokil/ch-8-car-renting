<template>
  <div class="site-section p-4">
    <div class="container">
      <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div class="row">
          <div class="col-6 px-0 d-flex flex-column justify-content-between">
            <div>
              <h1 class="display-4 fst-italic">{{ currentCar.title }}</h1>
              <p class="lead my-3">{{ currentCar.description }}</p>
            </div>
            <div>
              <hr>
              <p class="d-flex justify-content-between"><span>Owner:</span><span>{{currentCar.owner_id}}</span></p>
              <p class="d-flex justify-content-between"><span>Price per hour:</span><span>{{$filters.formatYoctoNearToNear(currentCar.price_per_hour)}} Ⓝ</span></p>
              <button class="btn btn-primary" @click.prevent="rentCar">Rent car</button>
            </div>
          </div>
          <div class="col-6">
            <img :src="currentCar.image" alt="Image" class="img-fluid" style="width: 100%">
          </div>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
import Big from "big.js";
import * as nearAPI from "near-api-js";

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export default {
  name: "SingleCarComponent",
  components: {},
  data() {
    return {
      currentCar: {},
    }
  },
  methods: {
    async getCurrentCar() {
      const provider = new nearAPI.providers.JsonRpcProvider(window.nearConfig.nodeUrl);
      const argsBase64 = window.btoa(JSON.stringify({id: +this.$route.params.id}))
      const rawResult = await provider.query({
        request_type: "call_function",
        finality: "final",
        account_id: window.nearConfig.contractName,
        method_name: "get_car_by_id",
        args_base64: argsBase64,
      }).catch(() => {
        this.$router.push({'name': 'home'});
      });
      this.currentCar = JSON.parse(Buffer.from(rawResult.result).toString())
    },

    async rentCar() {
      let loader = this.$loading.show();
      try {
        await window.walletConnection.account().functionCall({
          contractId: window.nearConfig.contractName,
          methodName: 'rent_car',
          args: {
            car_id: +this.$route.params.id
          },
          gas:BOATLOAD_OF_GAS,
          walletCallbackUrl: window.location.href
        }).then(()=>{
          this.$swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your Car has been added to renting page!',
            footer: ``,
          });
        });
        this.$swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Car was rent!',
          footer: ``,
        })
        await this.getCurrentCar();
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
          footer: ``,
        })
        console.log(error)
      }
      loader.hide();
    },
  },
  async mounted() {
    let loader = this.$loading.show();
    await this.getCurrentCar();
    loader.hide();
    //
    // let uri = window.location.search.substring(1);
    // let params = new URLSearchParams(uri);
    // const transactionHash = params.get('transactionHashes');
    // if(transactionHash){
    //   this.$swal.fire({
    //     icon: 'success',
    //     title: 'Success',
    //     text: 'Ticket was successfully bought!',
    //     footer: `To look at your ticket go to your wallet collectibles!`,
    //   })
    // }
  },
}
</script>

<style scoped>

</style>