<template>
	<section class="rsvp" ref="sectionEl">
		<div class="rsvpContainer">

			<!-- Header -->
			<div class="rsvpHeader" ref="headerEl">
				<div class="rsvpLabel">
					<span class="labelLine"></span>
					<span class="labelText">Confirmación</span>
					<span class="labelLine"></span>
				</div>
				<h2>Confirma tu presencia</h2>
				<p class="before">
					Tu asistencia es un regalo en sí mismo.<br>
					Confirma antes del <strong>10 de junio</strong>
				</p>
			</div>

			<!-- Success -->
			<Transition name="fade-up">
				<div v-if="state === 'success'" class="successState" ref="formEl">
					<div class="successIcon">
						<svg viewBox="0 0 40 40" fill="none">
							<circle cx="20" cy="20" r="19" stroke="currentColor" stroke-width="0.8" />
							<path d="M12 20l6 6 10-12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</div>
					<h3 class="successTitle">
						{{ form.attending ? '¡Hasta pronto!' : 'Gracias por informarnos' }}
					</h3>
					<p class="successMsg">
						{{ form.attending
							? `Esperamos verte el 20 de junio, ${form.name}.`
							: `Gracias, ${form.name}. Serás recordado ese día.` }}
					</p>
					<button class="btnGold" @click="resetForm">Nueva respuesta</button>
				</div>
			</Transition>

			<!-- Form -->
			<Transition name="fade-up">
				<form v-if="state !== 'success'" @submit.prevent="submitRsvp" novalidate ref="formEl" class="rsvpForm">

					<!-- Nombre -->
					<div class="formGroup" :class="{ hasError: errors.name }">
						<label class="formLabel">Nombre completo</label>
						<input v-model="form.name" type="text" placeholder="Tu nombre" class="formInput"
							@blur="validateName" />
						<span v-if="errors.name" class="formError">{{ errors.name }}</span>
					</div>

					<!-- Asistencia -->
					<div class="formGroup">
						<label class="formLabel">¿Confirmas tu asistencia?</label>
						<div class="toggleGroup">
							<button type="button" class="toggleBtn" :class="{ active: form.attending === true }"
								@click="form.attending = true">
								Sí, estaré
							</button>
							<button type="button" class="toggleBtn" :class="{ active: form.attending === false }"
								@click="form.attending = false">
								No podré ir
							</button>
						</div>
					</div>

					<!-- Acompañantes -->
					<Transition name="fade-up">
						<div class="formGroup" v-if="form.attending === true">
							<label class="formLabel">Número de acompañantes</label>
							<div class="guestsControl">
								<button type="button" class="guestBtn" @click="decreaseGuests">−</button>
								<span class="guestCount">{{ form.guests }}</span>
								<button type="button" class="guestBtn" @click="increaseGuests">+</button>
							</div>
							<span class="formHint">Solo tú = 0 acompañantes</span>
						</div>
					</Transition>

					<!-- Mensaje -->
					<div class="formGroup">
						<label class="formLabel">Mensaje (opcional)</label>
						<textarea v-model="form.message" placeholder="Un mensaje para los novios…"
							class="formInput formTextarea" rows="3" />
					</div>

					<!-- Submit -->
					<div class="submitGroup">
						<button type="submit" class="btnGold" :disabled="state === 'loading'">
							<span v-if="state === 'loading'" class="loadingDots">
								<span /><span /><span />
							</span>
							<span v-else>Enviar confirmación</span>
						</button>
						<Transition name="fade-up">
							<p v-if="errors.submit" class="formError">{{ errors.submit }}</p>
						</Transition>
					</div>

				</form>
			</Transition>

		</div>
	</section>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const sectionEl = ref(null)
const headerEl = ref(null)
const formEl = ref(null)

const state = ref('idle')
const form = reactive({ name: '', attending: null, guests: 0, message: '' })
const errors = reactive({ name: '', submit: '' })

const validateName = () => {
	errors.name = form.name.trim().length < 2 ? 'Por favor ingresa tu nombre completo.' : ''
}

const decreaseGuests = () => { if (form.guests > 0) form.guests-- }
const increaseGuests = () => { if (form.guests < 9) form.guests++ }

const resetForm = () => {
	state.value = 'idle'
	form.name = ''; form.attending = null; form.guests = 0; form.message = ''
	errors.name = ''; errors.submit = ''
}

const submitRsvp = async () => {
	validateName()
	if (errors.name) return
	if (form.attending === null) {
		errors.submit = 'Por favor selecciona si asistirás.'
		return
	}

	state.value = 'loading'
	errors.submit = ''

	try {
		await axios.post(`${API_URL}/rsvp`, {
			name: form.name.trim(),
			attending: form.attending,
			guests: form.attending ? form.guests : 0,
			message: form.message.trim(),
		})

		state.value = 'success'
	} catch (err) {
		state.value = 'idle'
		errors.submit = err.response?.data?.error || 'Hubo un error. Inténtalo nuevamente.'
	}
}

onMounted(async () => {
	await nextTick()
	ScrollTrigger.refresh()

	const st = (el, offset = '75%') => ({
		trigger: sectionEl.value,
		start: `top ${offset}`,
		toggleActions: 'play none none reverse',
	})

	gsap.fromTo(headerEl.value,
		{ opacity: 0, y: 40 },
		{ opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: st(sectionEl.value, '75%') }
	)

	gsap.fromTo(formEl.value,
		{ opacity: 0, y: 30 },
		{ opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.15, scrollTrigger: st(sectionEl.value, '70%') }
	)
})
</script>

<style scoped>
.rsvp {
	min-height: 100dvh;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: linear-gradient(to bottom, transparent, rgb(from var(--text) r g b / 0.05));

	&:before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: url('../assets/images/texture.webp');
		background-size: cover;
		background-position: center;
		opacity: 0.2;
		pointer-events: none;
	}
}

.rsvpContainer {
	width: 100%;
	max-width: 520px;
	margin: 0 auto;
	padding: clamp(80px, 12vh, 140px) 24px;
	position: relative;
}

/* ── Header ─────────────────────────────────────────────── */
.rsvpHeader {
	text-align: center;
	margin-bottom: clamp(40px, 7vw, 72px);
}

.rsvpLabel {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	margin-bottom: 24px;
}

.labelLine {
	display: block;
	height: 1px;
	width: 60px;
	background: linear-gradient(to right, transparent, rgb(from var(--text) r g b / 0.5));
}

.rsvpLabel .labelLine:last-child {
	background: linear-gradient(to left, transparent, rgb(from var(--text) r g b / 0.5));
}

.labelText {
	font-size: 14px;
	letter-spacing: 0.35em;
	text-transform: uppercase;
	color: var(--text);
}

.rsvpHeader h2 {
	font-family: var(--cursive);
	font-size: clamp(36px, 7vw, 64px);
	font-weight: 400;
	color: var(--text);
	margin: 0 0 20px;
}

.before {
	font-size: clamp(13px, 1.6vw, 15px);
	color: rgb(from var(--text) r g b / 0.6);
	line-height: 1.9;
	letter-spacing: 0.02em;

	strong {
		color: rgb(from var(--text) r g b / 0.8);
	}
}

/* ── Form ────────────────────────────────────────────────── */
.rsvpForm {
	display: flex;
	flex-direction: column;
	gap: 36px;
}

.formGroup {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.formLabel {
	font-size: 14px;
	letter-spacing: 0.3em;
	text-transform: uppercase;
	color: var(--text);
}

.formInput {
	width: 100%;
	box-sizing: border-box;
	background: transparent;
	border: none;
	border-bottom: 1px solid rgb(from var(--text) r g b / 0.5);
	color: var(--text);
	font-family: inherit;
	font-size: 15px;
	font-weight: 300;
	padding: 10px 0;
	outline: none;
	transition: border-color 0.3s ease;

	&::placeholder {
		color: rgb(from var(--text) r g b / 0.5);
	}

	&:focus {
		border-bottom-color: rgb(from var(--text) r g b / 0.5);
	}
}

.formTextarea {
	resize: none;
}

.formError {
	font-size: 14px;
	color: rgb(200 80 70 / 0.7);
	letter-spacing: 0.04em;
}

.formHint {
	font-size: 14px;
	color: rgb(from var(--text) r g b / 0.6);
	letter-spacing: 0.04em;
}

.hasError .formInput {
	border-bottom-color: rgb(200 80 70 / 0.4);
}

/* ── Toggle ──────────────────────────────────────────────── */
.toggleGroup {
	display: flex;
	gap: 10px;
}

.toggleBtn {
	flex: 1;
	padding: 12px 20px;
	border: 1px solid rgb(from var(--text) r g b / 0.5);
	background: transparent;
	color: var(--text);
	font-family: inherit;
	font-size: 14px;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	cursor: pointer;
	transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;

	&:hover {
		background: var(--text);
		border-color: var(--text);
		color: white;
	}

	&.active {
		background: var(--text);
		border-color: var(--text);
		color: white;
	}
}

/* ── Guests ──────────────────────────────────────────────── */
.guestsControl {
	display: flex;
	align-items: center;
	gap: 28px;
}

.guestBtn {
	width: 36px;
	height: 36px;
	border: 1px solid rgb(from var(--text) r g b / 0.12);
	background: transparent;
	color: rgb(from var(--text) r g b / 0.7);
	font-size: 18px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;

	&:hover {
		border-color: rgb(from var(--text) r g b / 0.5);
		color: var(--text);
	}
}

.guestCount {
	font-family: var(--cursive);
	font-size: 2.4rem;
	font-weight: 300;
	color: var(--text);
	min-width: 2rem;
	text-align: center;
}

/* ── Submit ──────────────────────────────────────────────── */
.submitGroup {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding-top: 8px;
}

.btnGold {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	border: 1px solid rgb(from var(--text) r g b / 0.5);
	background: transparent;
	color: var(--text);
	font-family: inherit;
	font-size: 14px;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	padding: 12px 20px;
	cursor: pointer;
	transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;

	&:hover:not(:disabled) {
		background: var(--text);
		border-color: var(--text);
		color: white;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}

/* ── Loading dots ────────────────────────────────────────── */
.loadingDots {
	display: flex;
	gap: 5px;
	align-items: center;

	span {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: currentColor;
		animation: dot 1.2s infinite;

		&:nth-child(2) {
			animation-delay: 0.2s;
		}

		&:nth-child(3) {
			animation-delay: 0.4s;
		}
	}
}

@keyframes dot {

	0%,
	80%,
	100% {
		opacity: 0.2;
		transform: scale(0.8);
	}

	40% {
		opacity: 1;
		transform: scale(1);
	}
}

/* ── Success ─────────────────────────────────────────────── */
.successState {
	text-align: center;
	padding: 60px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}

.successIcon {
	color: var(--text);
	margin-bottom: 8px;

	svg {
		width: 52px;
		height: 52px;
	}
}

.successTitle {
	font-family: var(--cursive);
	font-size: clamp(28px, 5vw, 40px);
	font-weight: 400;
	color: var(--text);
}

.successMsg {
	font-size: 14px;
	color: rgb(from var(--text) r g b / 0.45);
	line-height: 1.8;
	letter-spacing: 0.03em;
}

/* ── Transitions ─────────────────────────────────────────── */
.fade-up-enter-active,
.fade-up-leave-active {
	transition: all 0.45s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
	opacity: 0;
	transform: translateY(12px);
}
</style>