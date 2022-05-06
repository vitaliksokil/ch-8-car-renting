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
              <p class="d-flex justify-content-between"><span>Price per month:</span><span>{{$filters.formatYoctoNearToNear(currentCar.price_per_month)}} Ⓝ</span></p>
              <button class="btn btn-primary w-100" @click.prevent="startRentCarProcess" :disabled="currentCar.is_rented || currentCar.owner_id === window.nearAccount.accountId">Rent car</button>
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
import {getTransactionState, getUrlParams} from "../../../helpers";
import {Contract} from "near-api-js";

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

    async startRentCarProcess(){

      let loader = this.$loading.show();
      window.walletConnection.account().functionCall({
        contractId: window.roketoWrapContractName,
        methodName: 'near_deposit',
        args: {},
        gas:"200000000000000",
        attachedDeposit:Big(((this.currentCar.price_per_month + (0.2 * 10**24)) / (10**24)).toFixed(5)).times(10 ** 24).toFixed(),
      }).then((response)=>{
        console.log(response)
      });
      loader.hide();
    },
    async afterNearDeposit(){
      let loader = this.$loading.show();
      const ftContract = new Contract(window.walletConnection.account(), window.roketoWrapContractName, {
        changeMethods: ['ft_transfer_call'],
      });
      await ftContract.ft_transfer_call({
        receiver_id: window.roketoContractName,
        amount: Big(this.currentCar.price_per_month / (10**24)).times(10 ** 24).toFixed(), // 1 NEAR
        memo: 'Car rent #' + +this.$route.params.id,
        msg: JSON.stringify({
          Create: {
            request: {
              "owner_id": window.nearAccount.accountId,
              "receiver_id": this.currentCar.owner_id,
              "tokens_per_sec": this.currentCar.price_per_month / 60 / 60 / 24 / 30, // 1 month for 1 NEAR
              "is_auto_start_enabled": true
            }
          }
        }),
      }, 200000000000000,1);
      loader.hide();
    },
    cleanGetParams(){
      window.history.pushState({}, document.title, process.env.VUE_APP_APP_URL + '#' + this.$route.fullPath);
    },

    async afterFtTransferCall(){
      const provider = new nearAPI.providers.JsonRpcProvider(window.nearConfig.nodeUrl);
      const argsBase64 = window.btoa(JSON.stringify({
        account_id:window.nearAccount.accountId,
        from:1,
        limit:100
      }))
      const rawResult = await provider.query({
        request_type: "call_function",
        finality: "final",
        account_id: window.roketoContractName,
        method_name: "get_account_outgoing_streams",
        args_base64: argsBase64,
      });
      let outgoing_streams = JSON.parse(Buffer.from(rawResult.result).toString());
      console.log(outgoing_streams)
      let last_stream = outgoing_streams.at(-1);
      try {
        await window.walletConnection.account().functionCall({
          contractId: window.nearConfig.contractName,
          methodName: 'rent_car',
          args: {
            car_id: +this.$route.params.id,
            stream_id: last_stream.id
          },
          gas:BOATLOAD_OF_GAS,
        }).then(async () => {
          this.$swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Car was rent!',
            footer: ``,
          })
          this.currentCar.is_rented = true;
          // await this.getCurrentCar();
        });
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
          footer: ``,
        })
        console.log(error)
      }
    },

    async continueRentCarProcess() {
      let params = getUrlParams();
      let transactionHashes = params.get('transactionHashes');
      if (transactionHashes !== null){
        let result = await getTransactionState(transactionHashes);
        if ("SuccessValue" in result.status){
          const transactionMethodName = result.transaction.actions[0].FunctionCall.method_name;
          switch (transactionMethodName){
            case 'near_deposit':
              await this.afterNearDeposit();
              this.cleanGetParams();
              break;
            case 'ft_transfer_call':
              await this.afterFtTransferCall();
              this.cleanGetParams();
              break;
            case 'get_account_outgoing_streams':
              this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Car was rent!',
                footer: ``,
              })
              this.cleanGetParams();
              break;
          }
        }
      }
    },
  },
  async mounted() {
    let loader = this.$loading.show();
    await this.getCurrentCar();
    await this.continueRentCarProcess();
    loader.hide();
  },
}
</script>

<style scoped>

</style>