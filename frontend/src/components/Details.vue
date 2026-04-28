<template>
	<section class="details">
		<div class="detailsContainer">
			<div class="detailsLabel" ref="labelEl">
				<span class="labelLine"></span>
				<h2>El evento</h2>
				<span class="labelLine"></span>
			</div>

			<div class="detailsContent">
				<div class="cardsRow">
					<!-- Ceremonia -->
					<div class="cardDetail" ref="ceremonyEl">
						<div class="cardInner">
							<p class="cardTag">Ceremonia</p>
							<div class="cardTime">14:00</div>
							<div class="cardDivider"></div>
							<p class="cardPlace">Parroquia Santa Gema</p>
							<p class="cardCity">Medellín, Colombia</p>

							<a href="https://maps.google.com/?q=Parroquia+Santa+Gema+Medellín" target="_blank"
								rel="noopener" class="cardButton">
								<span>Ver ubicación</span>
								<i class="fi fi-rr-arrow-right"></i>
							</a>
						</div>
					</div>

					<!-- Divisor central -->
					<div class="centerDivider" ref="centerDivEl">
						<div class="centerLine"></div>
						<div class="centerMonogram">G<small>&</small>A</div>
						<div class="centerLine"></div>
					</div>

					<!-- Recepción -->
					<div class="cardDetail" ref="receptionEl">
						<div class="cardInner">
							<p class="cardTag">Recepción</p>
							<div class="cardTime">17:00</div>
							<div class="cardDivider"></div>
							<p class="cardPlace">Finca Los Arrayanes</p>
							<p class="cardCity">Guarne · Vía Alto de la Virgen</p>

							<a href="https://maps.google.com/?q=Guarne+Vía+Alto+de+la+Virgen+Finca+Los+Arrayanes"
								target="_blank" rel="noopener" class="cardButton">
								<span>Ver ubicación</span>
								<i class="fi fi-rr-arrow-right"></i>
							</a>
						</div>
					</div>
				</div>

				<p class="dressCode" ref="dressEl">
					<span class="dressIcon">✦</span>
					Celebración campestre
					<span class="dressIcon">✦</span>
				</p>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const labelEl = ref(null)
const ceremonyEl = ref(null)
const receptionEl = ref(null)
const centerDivEl = ref(null)
const dressEl = ref(null)

onMounted(async () => {
	// Espera a que Hero haya insertado su spacer
	await nextTick()
	ScrollTrigger.refresh()

	const st = (el) => ({
		trigger: el,
		start: 'top 85%',
		toggleActions: 'play none none reverse',
	})

	gsap.fromTo(labelEl.value,
		{ opacity: 0, y: 24 },
		{ opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st(labelEl.value) }
	)

	gsap.fromTo(ceremonyEl.value,
		{ opacity: 0, x: -40 },
		{ opacity: 1, x: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: st(ceremonyEl.value) }
	)

	gsap.fromTo(centerDivEl.value,
		{ opacity: 0, scaleY: 0 },
		{ opacity: 1, scaleY: 1, duration: 1.3, ease: 'power3.out', transformOrigin: 'top center', scrollTrigger: st(centerDivEl.value) }
	)

	gsap.fromTo(receptionEl.value,
		{ opacity: 0, x: 40 },
		{ opacity: 1, x: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: st(receptionEl.value) }
	)

	gsap.fromTo(dressEl.value,
		{ opacity: 0, y: 16 },
		{ opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: st(dressEl.value) }
	)
})
</script>

<style scoped>
.details {
	min-height: 100dvh;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-image: linear-gradient(to bottom, rgb(from green r g b / 0.2), transparent);

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
}

.detailsContainer {
	padding: clamp(60px, 10vh, 120px) 20px;
	position: relative;
	width: 100%;
	max-width: 1100px;
	margin: 0 auto;
}

/* ── Label ─────────────────────────────────────────────── */
.detailsLabel {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	margin-bottom: clamp(40px, 6vw, 80px);
}

.detailsLabel h2 {
	font-family: var(--cursive);
	font-size: clamp(28px, 4vw, 52px);
	font-weight: 400;
	color: var(--text);
	white-space: nowrap;
	margin: 0;
}

.labelLine {
	flex: 1;
	max-width: 120px;
	height: 1px;
	background: linear-gradient(to right, transparent, rgb(from var(--text) r g b / 0.5));
}

.detailsLabel .labelLine:last-child {
	background: linear-gradient(to left, transparent, rgb(from var(--text) r g b / 0.5));
}

/* ── Cards row ──────────────────────────────────────────── */
.cardsRow {
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	gap: 0;
	align-items: stretch;
}

/* ── Card ───────────────────────────────────────────────── */
.cardDetail {
	border: 1px solid rgb(from var(--text) r g b / 0.12);
	background: rgb(from var(--text) r g b / 0.04);
	backdrop-filter: blur(4px);
	position: relative;
	overflow: hidden;
	transition: border-color 0.3s ease;

	&:hover {
		border-color: rgb(from var(--text) r g b / 0.35);
	}

	&:before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgb(from var(--text) r g b / 0.04) 0%, transparent 60%);
		pointer-events: none;
	}
}

.cardInner {
	padding: clamp(32px, 4vw, 56px) clamp(24px, 3.5vw, 48px);
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	height: 100%;
	box-sizing: border-box;
}

.cardTag {
	font-size: 11px;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: var(--text);
	margin: 0 0 20px;
	font-weight: 400;
}

.cardTime {
	font-size: clamp(52px, 7vw, 70px);
	font-weight: 300;
	line-height: 1;
	color: var(--text);
	letter-spacing: -0.02em;
	font-variant-numeric: tabular-nums;
}

.cardDivider {
	width: 32px;
	height: 1px;
	background: var(--text);
	margin: 24px 0;
	opacity: 0.6;
}

.cardPlace {
	font-family: var(--cursive);
	font-size: clamp(22px, 2.5vw, 30px);
	font-weight: 400;
	color: var(--text);
	margin: 0 0 6px;
	line-height: 1.2;
}

.cardCity {
	font-size: 13px;
	color: rgb(from var(--text) r g b / 0.5);
	margin: 0 0 auto;
	padding-bottom: 28px;
	letter-spacing: 0.03em;
}

.cardButton {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	border: 1px solid rgb(from var(--text) r g b / 0.5);
	color: var(--text);
	text-decoration: none;
	font-size: 11px;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	padding: 12px 20px;
	transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;

	&:hover {
		background: var(--text);
		border-color: var(--text);
		color: white;
	}

	i {
		line-height: 1;
		transition: transform 0.25s ease;
	}

	&:hover i {
		transform: translateX(3px);
	}
}

/* ── Centro ─────────────────────────────────────────────── */
.centerDivider {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 16px;
	padding: 0 clamp(20px, 3vw, 40px);
}

.centerLine {
	width: 1px;
	flex: 1;
	background: linear-gradient(to bottom, transparent, rgb(from var(--text) r g b / 0.15), transparent);
}

.centerMonogram {
	font-family: var(--cursive);
	font-size: clamp(18px, 2vw, 24px);
	color: rgb(from var(--text) r g b / 0.5);
	white-space: nowrap;

	small {
		font-size: 0.6em;
		margin: 0 2px;
	}
}

/* ── Dress code ─────────────────────────────────────────── */
.dressCode {
	margin: clamp(40px, 5vw, 64px) 0 0;
	font-size: clamp(13px, 1.5vw, 15px);
	letter-spacing: 0.2em;
	text-transform: uppercase;
	color: rgb(from var(--text) r g b / 0.45);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16px;
}

.dressIcon {
	color: var(--text);
	opacity: 0.6;
	font-size: 0.7em;
}

/* ── Mobile ─────────────────────────────────────────────── */
@media (max-width: 680px) {
	.cardsRow {
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto;
	}

	.centerDivider {
		flex-direction: row;
		padding: 24px 0;
	}

	.centerLine {
		width: auto;
		height: 1px;
		flex: 1;
		background: linear-gradient(to right, transparent, rgb(from var(--text) r g b / 0.15), transparent);
	}
}
</style>