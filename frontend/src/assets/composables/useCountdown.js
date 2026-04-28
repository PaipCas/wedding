import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useCountdown(targetDate) {
	const now = ref(Date.now())
	let interval = null
	
	const diff = computed(() => {
		const target = new Date(targetDate).getTime()
		return Math.max(0, target - now.value)
	})
	
	const days = computed(() => Math.floor(diff.value / (1000 * 60 * 60 * 24)))
	const hours = computed(() => Math.floor((diff.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
	const minutes = computed(() => Math.floor((diff.value % (1000 * 60 * 60)) / (1000 * 60)))
	const seconds = computed(() => Math.floor((diff.value % (1000 * 60)) / 1000))
	
	const pad = (n) => String(n).padStart(2, '0')
	
	onMounted(() => {
		interval = setInterval(() => {
			now.value = Date.now()
		}, 1000)
	})
	
	onUnmounted(() => {
		clearInterval(interval)
	})

	return { days, hours, minutes, seconds, pad }
}