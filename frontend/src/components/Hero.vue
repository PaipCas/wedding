<template>
	<section class="hero" ref="heroEl">
		<div class="bg" ref="heroBgEl"></div>

		<div class="heroContainer">
			<div class="monogram" ref="bgMonogramEl">G <small>&</small> A</div>

			<div ref="subtitleEl">Tenemos el honor de invitarte a celebrar nuestra unión</div>

			<h1><span ref="nameFirst">Glelcy</span> <small ref="nameSep">&</small> <span ref="nameSecond">Arbey</span>
			</h1>

			<div class="separator" ref="dividerEl">Celebremos juntos el inicio de esta nueva etapa</div>

			<div class="date" ref="ornamentEl">20 de junio · 2026</div>
		</div>

		<div class="scrollIndicator" ref="scrollEl">
			<span class="scrollLine"></span>
			<span class="scrollLabel">Desliza para ver los detalles</span>
		</div>
	</section>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted, nextTick } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const heroEl = ref(null)
const heroBgEl = ref(null)
const bgMonogramEl = ref(null)
const subtitleEl = ref(null)
const nameFirst = ref(null)
const nameSep = ref(null)
const nameSecond = ref(null)
const dividerEl = ref(null)
const ornamentEl = ref(null)
const scrollEl = ref(null)

const props = defineProps({ nextEl: Object })

onMounted(async () => {
	await nextTick()

	const nextSection = props.nextEl?.el

	if (nextSection) {
		gsap.set(nextSection, {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			marginTop: 0,
			zIndex: 1,
			opacity: 0,
			scale: 0.98,
			transformOrigin: 'center center',
		})
	}

	gsap.set([ornamentEl.value, subtitleEl.value, dividerEl.value], { opacity: 0 })
	gsap.set(nameFirst.value, { y: 80, opacity: 0, skewY: 3 })
	gsap.set(nameSecond.value, { y: 80, opacity: 0, skewY: -3 })
	gsap.set(nameSep.value, { opacity: 0, scaleX: 0 })
	gsap.set(bgMonogramEl.value, { opacity: 0, scale: 1.2 })
	gsap.set(scrollEl.value, { opacity: 0, y: 10 })

	const tl = gsap.timeline({ delay: 0.2 })

	tl.to(bgMonogramEl.value, { opacity: 0.03, scale: 1, duration: 2, ease: 'expo.out' })
		.to(ornamentEl.value, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=1.2')
		.to(nameFirst.value, { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'expo.out' }, '-=0.6')
		.to(nameSep.value, { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.7')
		.to(nameSecond.value, { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'expo.out' }, '-=0.8')
		.to(subtitleEl.value, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
		.to(dividerEl.value, { opacity: 1, duration: 0.6 }, '-=0.2')
		.to(scrollEl.value, { opacity: 1, y: 0, duration: 0.6 }, '-=0.1')
		.call(() => {
			document.body.classList.remove('overflow-hidden')

			const scrollTl = gsap.timeline({
				scrollTrigger: {
					trigger: heroEl.value,
					start: 'top top',
					end: '+=100%',
					scrub: 1,
					pin: true,
					anticipatePin: 1,
					onLeave: () => {
						if (nextSection) {
							gsap.set(nextSection, { clearProps: 'position,top,left,width,marginTop' })
						}
					},
					onEnterBack: () => {
						if (nextSection) {
							gsap.set(nextSection, {
								position: 'fixed',
								top: 0,
								left: 0,
								width: '100%',
								marginTop: 0,
							})
						}
					},
				}
			})

			scrollTl
				.to(heroBgEl.value, { scale: 1.15, opacity: 0, ease: 'none' }, 0)
				.to([ornamentEl.value, dividerEl.value], { opacity: 0, ease: 'none' }, 0)
				.to(subtitleEl.value, { opacity: 0, ease: 'none' }, 0.04)
				.to(nameFirst.value, { opacity: 0, ease: 'none' }, 0.08)
				.to(nameSep.value, { opacity: 0, ease: 'none' }, 0.12)
				.to(nameSecond.value, { opacity: 0, ease: 'none' }, 0.16)
				.to(scrollEl.value, { opacity: 0, ease: 'none' }, 0.2)

			if (nextSection) {
				scrollTl.to(nextSection, { opacity: 1, scale: 1, ease: 'none' }, 0.2)
			}
		})
})
</script>

<style>
.hero {
	height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	z-index: 2;

	.bg {
		background-image: url('../assets/images/rings.webp');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		inset: 0;
		transform: scale(1);
		will-change: transform;

		&:after {
			content: '';
			position: absolute;
			inset: 0;
			background-color: rgb(from var(--text) r g b / 0.8);
		}
	}

	.heroContainer {
		padding: 20px;
		text-align: center;
		font-size: 20px;
		color: white;

		* {
			position: relative;
		}

		.monogram {
			position: absolute;
			inset: 0;
			font-size: 25dvw;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			opacity: 0.04;
			font-family: var(--cursive);

			small {
				font-size: 0.4em;
			}
		}

		h1 {
			font-size: clamp(50px, 9.7vw, 100px);
			font-family: var(--cursive);
			margin: 40px 0 0;

			small {
				font-size: 0.4em;
			}
		}

		.separator {
			margin: 40px 0 0;
			font-size: clamp(20px, 2.6vw, 30px);
		}

		.date {
			margin: 20px 0 0;
		}
	}
}

.scrollIndicator {
	position: fixed;
	bottom: 36px;
	left: 50%;
	translate: -50% 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	color: white;
}

.scrollLabel {
	font-size: 9px;
	letter-spacing: 0.35em;
	text-transform: uppercase;
	opacity: 0.4;
}

.scrollLine {
	width: 1px;
	height: 48px;
	background: linear-gradient(to bottom, transparent, rgb(from white r g b / 0.4));
	position: relative;
	overflow: hidden;

	&:after {
		content: '';
		position: absolute;
		top: -100%;
		left: 0;
		width: 100%;
		height: 100%;
		background: white;
		animation: scrollDrop 1.8s ease-in-out infinite;
	}
}

@keyframes scrollDrop {
	0% {
		top: -100%;
		opacity: 1;
	}

	100% {
		top: 100%;
		opacity: 0;
	}
}
</style>