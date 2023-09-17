<script setup>
import { reactive, ref, watch, onBeforeUnmount, markRaw } from 'vue';
import { useI18n } from 'vue-i18n';
import { plugin } from 'Resources/components/Form/SubmitLoading';
import { normalizeTimestamp } from 'Resources/helpers/functions';
import ScheduleList from 'Resources/components/Form/ScheduleList.vue';

const props = defineProps({ errors: Object, values: Object })
const emits = defineEmits(['submit'])
const { t } = useI18n()
const library = markRaw({ ScheduleList })
let schedules = ref([])

const schema = reactive([
  {
    $el: "div",
    attrs: { class: "collapse collapse-arrow shadow my-2", },
    children: [
      { $el: "input", attrs: { checked: "checked", name: "accordion", type: "radio", value: 'info' } },
      { $el: "div", attrs: { class: "collapse-title bg-base-300" }, children:["Info"] },
      {
        $el: "div",
        attrs: { class: "collapse-content formkit-collapse-content bg-base-200" },
        children:[
          {
            $formkit: "text",
            name: "name",
            label: t('event.name'),
            validation: "required",
          },
          {
            $formkit: "textarea",
            name: "description",
            label: t('event.description'),
            validation: "required",
          },
          {
            $formkit: "text",
            name: "location",
            label: t('event.location'),
            validation: "required",
          },
          {
            $formkit: "text",
            name: "type",
            label: t('event.type'),
            validation: "required",
          },
          {
            $formkit: "select",
            name: "status",
            label: t('event.status'),
            validation: "required",
            options: [
              { label: t('event.statuses.draft'), value: 'draft' },
              { label: t('event.statuses.published'), value: 'published' },
              { label: t('event.statuses.canceled'), value: 'canceled' },
            ]
          },
          {
            $formkit: "file",
            name: "image",
            label: t('event.image'),
            accept: ".jpeg,.jpg,png,.webp",
            multiple: "false",
          },
          {
            $formkit: "date",
            name: "start_date",
            label: t('event.start_date'),
            validation: `required|date|date_after:${new Date().toISOString().split('T')[0]}`,
          },
          {
            $formkit: "date",
            name: "end_date",
            label: t('event.end_date'),
            validation: `required|date|date_after:${new Date().toISOString().split('T')[0]}`,
          },
        ]
      },
    ]
  },

  {
    $el: "div",
    attrs: { class: "collapse collapse-arrow shadow my-2", },
    children: [
      { $el: "input", attrs: { name: "accordion", type: "radio", value: 'schedule' } },
      { $el: "div", attrs: { class: "collapse-title bg-base-300" }, children:[t('schedule.schedule')] },
      {
        $el: "div",
        attrs: { class: "collapse-content formkit-collapse-content bg-base-200" },
        children: [{
          $cmp: "ScheduleList",
          props: {
            schedules: schedules.value,
          },
        }],
      },
    ],
  },

  {
    $formkit: 'spinningSubmit',
    label: 'Enviar',
  }
])

const data = ref({
  name: props?.values?.name || '',
  description: props?.values?.description || '',
  location: props?.values?.location || '',
  type: props?.values?.type || '',
  status: props?.values?.status || '',
  image: props?.values?.image || '',
  start_date: props?.values?.start_date || '',
  end_date: props?.values?.end_date || '',
})

watch(props.errors, (errors) => {
  if (errors) {
    schema.forEach((field) => {
      if (errors[field.name]) {
        field.errors = errors[field.name]
      }
    })
  }
})

watch(props.values, (values) => {
  if (values) {
    const parsedValues = normalizeTimestamp(values)
    Object.keys(data.value).forEach((key) => {
      if (parsedValues[key]) {
        data.value[key] = parsedValues[key]
      }
    })

    if (Array.isArray(parsedValues.schedules)) {
      parsedValues.schedules.map((schedule) => schedules.value.push(schedule))
    }
  }
})

const handleSubmit = (data) => emits('submit', data)
</script>

<template>
  <div class="flex-center">
    <FormKit
      type="form"
      :actions="false"
      :plugins="[plugin]"
      v-model="data"
      form-class="tabs"
      @submit="handleSubmit"
    >
      <FormKitSchema :schema="schema" :data="data" :library="library" />
    </FormKit>
  </div>
</template>
