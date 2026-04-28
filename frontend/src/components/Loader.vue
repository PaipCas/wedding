<template>
	<Transition name="loader-fade">
		<div v-if="visible" class="loader-overlay">
			<svg ref="svgRef" class="initials-svg" viewBox="0 0 400 240" width="400" height="240">
				<text class="letter letter-1" x="24" y="160" font-size="110">G</text>
				<text class="letter letter-amp" x="139" y="141" font-size="40">&</text>
				<text class="letter letter-2" x="196" y="160" font-size="110">A</text>
			</svg>

			<img src="../assets/images/ornament.webp" alt="Ornament" class="ornament">
		</div>
	</Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['done'])

const visible = ref(true)

onMounted(() => {
	setTimeout(() => {
		visible.value = false;
		emit('done')
	}, 5000);
});
</script>

<style scoped>
.loader-overlay {
	position: fixed;
	inset: 0;
	z-index: 9999;
	background: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 12px;

	&:before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: url('../assets/images/texture.webp');
		background-position: center;
		background-repeat: repeat-y;
		background-size: cover;
		z-index: -1;
		opacity: 0.25;
	}

	.initials-svg {
		max-width: 60%;

		.letter {
			font-family: var(--cursive);
			fill: var(--text);
			fill-opacity: 0;
			stroke: var(--text);
			stroke-width: 1;
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke-dasharray: 3500;
			stroke-dashoffset: 3500;

			&.letter-1 {
				animation: trace 2.2s cubic-bezier(0.4, 0, 0.6, 1) 0.3s forwards, fill-in 0.9s ease 2.8s forwards;
			}

			&.letter-2 {
				animation: trace 2.2s cubic-bezier(0.4, 0, 0.6, 1) 0.7s forwards, fill-in 0.9s ease 2.8s forwards;
			}

			&.letter-amp {
				stroke-dasharray: 1500;
				stroke-dashoffset: 1500;
				animation: trace 1s cubic-bezier(0.4, 0, 0.6, 1) 1.3s forwards, fill-in 0.9s ease 2.8s forwards;
			}
		}
	}
}

@keyframes trace {
	to {
		stroke-dashoffset: 0;
	}
}

@keyframes fill-in {
	to {
		fill-opacity: 1;
	}
}

.ornament {
	max-width: 90%;
	width: 674px;
	position: absolute;
	inset: 50% auto auto 50%;
	translate: -50% -50%;
	z-index: -2;
	animation: fadeIn 2s ease backwards;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

.loader-fade-leave-active {
	transition: opacity 0.8s ease;
}

.loader-fade-leave-to {
	opacity: 0;
}
</style>