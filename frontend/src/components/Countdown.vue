<template>
	<section class="countdown" ref="root">
		<div class="countdownContainer">
			<h2>Nuestro para siempre comienza en...</h2>

			<div class="countdownContent">
				<div class="unit" v-for="unit in countdownUnits" :key="unit.label">
					<div class="number">{{ unit.value }}</div>

					<div class="label">{{ unit.label }}</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCountdown } from '../assets/composables/useCountdown';

const root = ref(null)
const { days, hours, minutes, seconds, pad } = useCountdown('2026-06-20T14:00:00')
const countdownUnits = computed(() => [
	{ value: pad(days.value), label: 'Días' },
	{ value: pad(hours.value), label: 'Horas' },
	{ value: pad(minutes.value), label: 'Minutos' },
	{ value: pad(seconds.value), label: 'Segundos' },
])

defineExpose({ el: root })
</script>

<style scoped>
.countdown {
	height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	text-align: center;
	background-image: linear-gradient(to bottom, transparent, rgb(from green r g b / 0.2));
	z-index: 1;
	margin-top: -100dvh;

	&:before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: url('../assets/images/texture.webp');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		opacity: 0.25;
	}

	&:after {
		content: '';
		position: absolute;
		inset: 0;
		background-image: url('../assets/images/leaves.webp');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		z-index: -1;
		opacity: 0.05;
	}

	.countdownContainer {
		position: relative;
		padding: 20px;

		h2 {
			font-size: clamp(40px 5.2vw, 80px);
			font-family: var(--cursive);
			font-weight: 600;
		}

		.countdownContent {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: clamp(20px, 6.6vw, 100px);
			flex-wrap: wrap;
			margin: 40px 0 0;

			.number {
				font-size: clamp(40px, 5.2vw, 120px);
				font-weight: 600;
				line-height: 1.2;
			}

			.label {
				font-size: clamp(16px, 2vw, 20px);
			}
		}
	}
}
</style>