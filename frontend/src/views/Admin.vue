<template>
	<div class="container py-5">
		<h1 class="mb-4">Confirmaciones</h1>

		<table class="table table-dark table-striped">
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Asiste</th>
					<th>Acompañantes</th>
					<th>Mensaje</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(item, i) in list" :key="i">
					<td>{{ item.name }}</td>
					<td>
						<span :class="item.attending ? 'text-success' : 'text-danger'">
							{{ item.attending ? 'Sí' : 'No' }}
						</span>
					</td>
					<td>{{ item.guests }}</td>
					<td>{{ item.message }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const list = ref([])

onMounted(async () => {
	try {
		const res = await axios.get("http://localhost:3000/rsvp")
		list.value = res.data
	} catch (err) {
		console.error(err)
	}
})
</script>