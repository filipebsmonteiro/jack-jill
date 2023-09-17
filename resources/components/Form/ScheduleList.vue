<script>
import { ref } from 'vue';
// import { useI18n } from 'vue-i18n';

// const { t } = useI18n()

export default {
  props: {
    schedules: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  watch: {
    schedules: {
      immediate: true,
      handler(schedules) {
        this.localSchedules = schedules
      },
    },
  },
  data() {
    return {
      localSchedules: [],
    }
  },
  methods: {
    addNode(values = {}) {
      this.localSchedules.push({ id: null, name: '', start_date: '', end_date: '', ...values })
    },
    removeNode(index) {
      this.localSchedules = this.localSchedules.filter((_, i) => i !== index)
    }
  },
}
</script>

<template>
  <div v-for="(item, index) in localSchedules" :key="index" class="formkit-row">
    <FormKit
      type="hidden"
      :name="`schedules[${index}][id]`"
      v-model="item.id"
    />
    <FormKit
      type="text"
      :name="`schedules[${index}][name]`"
      :label="$t('schedule.name')"
      v-model="item.name"
      validations="required"
    />
    <FormKit
      type="datetime-local"
      :name="`schedules[${index}][start_date]`"
      :label="$t('schedule.start_date')"
      v-model="item.start_date"
      validations="required"
    />
    <FormKit
      type="datetime-local"
      :name="`schedules[${index}][end_date]`"
      :label="$t('schedule.end_date')"
      v-model="item.end_date"
      validations="required"
    />
    <button
      type="button"
      class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="removeNode(index)"
    >
      {{ $t('schedule.remove') }}
    </button>
  </div>
  <button type="button" class="btn btn-sm btn-outline mt-2" @click="addNode">
    {{ $t('schedule.add') }}
  </button>
</template>

<style lang="scss" scoped>
.formkit-row {
  width: 100%;
  @apply inline-flex items-center justify-around hover:bg-gray-100 rounded p-2;

  .formkit-outer {
    @apply m-0 basis-auto;

    .formkit-wrapper {
      @apply w-auto bg-red-600;
    }
  }
}
</style>

<style>
.formkit-row  > .formkit-outer > .formkit-wrapper {
  width: auto !important;
}
</style>
