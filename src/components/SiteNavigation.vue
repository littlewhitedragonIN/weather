<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col items-center sm:flex-row  gap-4 text-white py-6">
      <router-link to="/">
        <div class="flex gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </router-link>
      <div class="flex flex-1 justify-end gap-2">
        <i @click="toggleModal"
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
        <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer" @click="saveCity"
          v-if="currentCity && currentCityName"></i>
      </div>
    </nav>
  </header>
  <BaseModal :modal-active="modalActive" @close-modal="toggleModal">
    <div>
      <h1 class="text-2xl mb-1">About:</h1>
      <p class="mb-4">
        The Local Weather allows you to track the current and
        future weather of cities of your choosing.
      </p>
      <h2 class="text-2xl">How it works:</h2>
      <ol class="list-decimal list-inside mb-4">
        <li>
          Search for your city by entering the name into the
          search bar.
        </li>
        <li>
          Select a city within the results, this will take
          you to the current weather for your selection.
        </li>
        <li>
          Track the city by clicking on the "+" icon in the
          top right. This will save the city to view at a
          later time on the home page.
        </li>
      </ol>

      <h2 class="text-2xl">Removing a city</h2>
      <p>
        If you no longer wish to track a city, simply select
        the city within the home page. At the bottom of the
        page, there will be am option to delete the city.
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import BaseModal from './BaseModal.vue';
import { useRoute, useRouter } from 'vue-router';

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
}

const route = useRoute();
const router = useRouter();
let savedCities = [];

let currentCity = ref(null);
let currentCityName = ref(null);


watch(() => [route.params.locationID, route.query.cityName], (newVal) => {
  const [a, b] = newVal;
  currentCity.value = a;
  currentCityName.value = b;
})

const saveCity = () => {
  // save to localStorage
  if (currentCity.value) {
    if (localStorage.getItem('savedCities')) {
      savedCities = JSON.parse(localStorage.getItem('savedCities'));
    }
    savedCities.push({ locationID: currentCity.value, locationName: currentCityName.value });
    localStorage.setItem('savedCities', JSON.stringify(savedCities))
  }
  router.push({ path: '/' })

}


</script>
