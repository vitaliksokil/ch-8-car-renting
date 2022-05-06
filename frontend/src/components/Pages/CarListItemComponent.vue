<template>
  <div class="col-4 mb-4">
    <div class="card">
      <img :src="image" class="card-img-top" alt="..." style="height: 250px">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{description}}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between"><span>Owner:</span><span>{{owner_id}}</span></li>
        <li class="list-group-item d-flex justify-content-between"><span>Price per month:</span><span>{{$filters.formatYoctoNearToNear(price_per_month)}} Ⓝ</span></li>
      </ul>
      <router-link :to="{name:'car-single',params:{id:id}}" class="btn btn-primary">Go to car page</router-link>
      <div v-if="is_rent">
        <hr>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between"><span>Already paid:</span><span>{{$filters.formatYoctoNearToNear(alreadyPaid)}} Ⓝ</span></li>
        </ul>
        <button class="btn btn-danger w-100" @click.prevent="startCancelRentCarProcess">Cancel renting</button>
      </div>

    </div>
  </div>
</template>

<script>

import {getTransactionState, getUrlParams} from "../../../helpers";
import Big from "big.js";

export default {
  name: "CarListItemComponent",
  props: [
    'id',
    'title',
    'description',
    'image',
    'owner_id',
    'price_per_month',
    'is_rent',
    'stream_id',
    'rent',
  ],
  methods:{

    async continueCancelRentCarProcess() {
      let loader = this.$loading.show();
      let params = getUrlParams();
      let transactionHashes = params.get('transactionHashes');
      if (transactionHashes !== null){
        let result = await getTransactionState(transactionHashes);
        if ("SuccessValue" in result.status){
          const transactionMethodName = result.transaction.actions[0].FunctionCall.method_name;
          switch (transactionMethodName){
            case 'stop_stream':
              this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Car rent was canceled!',
                footer: ``,
              })
              this.cleanGetParams();
              break;

          }
        }
      }
      loader.hide();
    },
    cleanGetParams(){
      window.history.pushState({}, document.title, process.env.VUE_APP_APP_URL + '#' + this.$route.fullPath);
    },
    async startCancelRentCarProcess(){
      let loader = this.$loading.show();
      window.walletConnection.account().functionCall({
        contractId: window.nearConfig.contractName,
        methodName: 'stop_rent_car',
        args: {"car_id": +this.id},
        gas:"200000000000000",
      }).then((response)=>{
        window.walletConnection.account().functionCall({
          contractId: window.roketoContractName,
          methodName: 'stop_stream',
          args: {"stream_id": this.stream_id},
          gas:"200000000000000",
          attachedDeposit:1,
        }).then((response)=>{
          console.log(response)
        });
      });
      loader.hide();
    },
  },
  async mounted() {
    let loader = this.$loading.show();
    await this.continueCancelRentCarProcess()
    loader.hide()
  },
  computed:{
    alreadyPaid(){
      let currentTimestamp = (+ new Date());
      console.log(currentTimestamp)
      let rentTimestamp = new Date;
      rentTimestamp.setTime(this.rent.timestamp_created.toString().substring(0,13));
      console.log(+rentTimestamp)
      let secondsLeft = ((currentTimestamp - rentTimestamp) / 1000).toFixed();
      return secondsLeft * this.rent.tokens_per_sec;
    }
  }

}
</script>

<style scoped>

</style>