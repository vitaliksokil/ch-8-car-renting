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
        <li class="list-group-item d-flex justify-content-between"><span>Price per hour:</span><span>{{$filters.formatYoctoNearToNear(price_per_hour)}} Ⓝ</span></li>
      </ul>
      <router-link :to="{name:'car-single',params:{id:id}}" class="btn btn-primary">Go to car page</router-link>

    </div>
  </div>
<!--  <div class="col-md-4">-->
<!--    <div class="cause shadow-sm">-->
<!--      <router-link-->
<!--          :to="{name:'meeting-single',params:{id:id}}"-->
<!--          custom-->
<!--          v-slot="{ href, navigate }">-->
<!--        <a :href="href" @click="navigate" class="cause-link d-block">-->
<!--          <img :src="image" alt="Image" class="img-fluid" style="height: 250px;width: 100%">-->
<!--          <custom-progress-bar :current-value="currentValue" :max-value="maxValue"></custom-progress-bar>-->
<!--        </a>-->
<!--      </router-link>-->

<!--      <div class="px-3 pt-3 border-top-0 border border shadow-sm">-->
<!--        <span class="py-1 small px-2 rounded mb-3 d-inline-block" :class="className"><font-awesome-icon-->
<!--            :icon="iconName"/> {{ donationType }}</span>-->
<!--        <h3 class="mb-4">-->
<!--          <router-link :to="{name:'meeting-single',params:{id:id}}">{{ title }}</router-link>-->
<!--        </h3>-->
<!--        <div class="border-top border-light border-bottom py-2 d-flex justify-content-between">-->
<!--          <div>Ticket price</div>-->
<!--          <div class="ml-auto"><strong class="text-success">{{ $filters.formatTicketPrice( ticketPrice )}} Ⓝ</strong></div>-->
<!--        </div>-->

<!--        <div class="py-4">-->
<!--          <div class="d-flex align-items-center">-->
<!--            <div class="">Author: <span class="badge bg-primary p-2">{{ author }}</span></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
</template>

<script>

export default {
  name: "CarListItemComponent",
  props: [
    'id',
    'title',
    'description',
    'image',
    'owner_id',
    'price_per_hour',
  ],

}
</script>

<style scoped>

</style>