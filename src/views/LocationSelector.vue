<script setup>
import { computed, reactive, watch } from 'vue'
import { useLocationStore } from '@/stores/locationStore'

const props = defineProps({
  modelValue: Object
})
const emit = defineEmits(['update:modelValue'])

const locationStore = useLocationStore()
const model = reactive({ ...props.modelValue })

// Emit dữ liệu lên parent
watch(model, () => emit('update:modelValue', model), { deep: true })

// Reset khi chọn cấp trên
watch(() => model.provinceCode, () => {
  model.districtCode = null
  model.wardCode = null
  model.hamletCode = null
})
watch(() => model.districtCode, () => {
  model.wardCode = null
  model.hamletCode = null
})
watch(() => model.wardCode, () => {
  model.hamletCode = null
})

// Các danh sách lựa chọn
const provinces = computed(() => locationStore.provinces)
const districts = computed(() => locationStore.districts[model.provinceCode] || [])
const wards = computed(() => locationStore.wards[model.districtCode] || [])
const hamlets = computed(() => locationStore.hamlets[model.wardCode] || [])
</script>

<template>
  <v-row dense>
    <v-col cols="3">
      <v-select
        v-model="model.provinceCode"
        :items="provinces"
        label="Tỉnh / Thành phố"
        item-title="name"
        item-value="code"
        clearable
      />
    </v-col>

    <v-col cols="3">
      <v-select
        v-model="model.districtCode"
        :items="districts"
        label="Quận / Huyện"
        item-title="name"
        item-value="code"
        :disabled="!model.provinceCode"
        clearable
      />
    </v-col>

    <v-col cols="3">
      <v-select
        v-model="model.wardCode"
        :items="wards"
        label="Phường / Xã"
        item-title="name"
        item-value="code"
        :disabled="!model.districtCode"
        clearable
      />
    </v-col>

    <v-col cols="3">
      <v-select
        v-model="model.hamletCode"
        :items="hamlets"
        label="Thôn / Xóm"
        item-title="name"
        item-value="code"
        :disabled="!model.wardCode"
        clearable
      />
    </v-col>
  </v-row>
</template>
