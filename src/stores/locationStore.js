import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocationStore = defineStore('location', () => {
  const provinces = ref([])
  const districts = ref({})
  const wards = ref({})
  const hamlets = ref({})

  async function fetchAllLocations() {
    const res = await fetch('/mock-locations.json')
    const data = await res.json()

    provinces.value = data.map(p => ({ code: p.code, name: p.name }))

    data.forEach(p => {
      districts.value[p.code] = p.districts.map(d => ({ code: d.code, name: d.name }))
      p.districts.forEach(d => {
        wards.value[d.code] = d.wards.map(w => ({ code: w.code, name: w.name }))
        d.wards.forEach(w => {
          hamlets.value[w.code] = w.hamlets.map(h => ({ code: h.code, name: h.name }))
        })
      })
    })
  }

  return {
    provinces,
    districts,
    wards,
    hamlets,
    fetchAllLocations
  }
})
