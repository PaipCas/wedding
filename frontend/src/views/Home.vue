<template>
	<Loader v-if="!appReady" @done="onLoaderDone"></Loader>

	<Transition name="site-reveal">
		<main v-if="appReady" class="site-main">
			<Hero :nextEl="countdownEl"></Hero>
			<Countdown ref="countdownEl"></Countdown>
			<Details></Details>
			<RSVP></RSVP>
		</main>
	</Transition>
</template>

<script setup>
import { ref } from 'vue';

import Hero from '../components/Hero.vue';
import Loader from '../components/Loader.vue';
import Countdown from '../components/Countdown.vue';
import Details from '../components/Details.vue';
import RSVP from '../components/RSVP.vue';

const appReady = ref(false)
const countdownEl = ref(null)

const onLoaderDone = () => {
  appReady.value = true
}
</script>

<style>
.site-reveal-enter-active {
	transition: opacity 0.8s ease 0.1s;
}

.site-reveal-enter-from {
	opacity: 0;
}

main {
	overflow: clip;
}
</style>