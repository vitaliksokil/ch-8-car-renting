<template>
  <div class="container p-4">
    <form @submit.prevent="createCar">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="title">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input type="text" class="form-control" id="description" v-model="description">
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Car Image</label>
        <input type="file" class="form-control" id="image" @change="fileOnChange" required>
        <img class="my-4" width="350" :src="image"/>
      </div>
      <div class="mb-3">
        <label for="price_per_month" class="form-label">Price per month</label>
        <input type="text" class="form-control" id="price_per_month" placeholder="Ⓝ" v-model="price_per_month">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Big from "big.js";
import { NFTStorage } from 'nft.storage'

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export default {
  name: "CreateCarComponent",
  data(){
    return {
      title:"",
      description:"",
      image:"",
      price_per_month:"",
    }
  },
  methods:{
    async createCar(){
      let loader = this.$loading.show();
      await window.walletConnection.account().functionCall({
        contractId: window.nearConfig.contractName,
        methodName: 'add_new_car',
        args: {
          title:this.title,
          description:this.description,
          image:this.image,
          price_per_month:Big(this.price_per_month).times(10 ** 24).toFixed(),
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
        this.title = "";
        this.description = "";
        this.image = "";
        this.price_per_month = "";
      });
      loader.hide();
    },
    async fileOnChange(e){
      let loader = this.$loading.show();
      /* upload image to IPFS */
      const file = e.target.files[0];
      const client = new NFTStorage({ token: process.env.VUE_APP_NFT_STORAGE_TOKEN });
      const metadataCid = await client.storeBlob(file)
      const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;
      this.image = metadataUrl;
      loader.hide();
    },

  },
}
</script>

<style scoped>

</style>