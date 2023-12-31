<script setup>
import { markRaw, reactive, ref, watch } from 'vue';
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
            label: t('competition.name'),
            validation: "required",
          },
          {
            $formkit: "textarea",
            name: "description",
            label: t('competition.description'),
            validation: "required",
          },
          {
            $formkit: "file",
            name: "image",
            label: t('competition.image'),
            accept: ".jpeg,.jpg,png,.webp",
            multiple: "false",
          },
          {
            $formkit: "select",
            name: "type",
            label: t('competition.type'),
            validation: "required",
            options: [
              { value: '', label: 'Select Type...', attrs: { disabled: true, selected: true } },
              { label: t('competition.types.sortition'), value: 'sortition' },
              { label: t('competition.types.combat'), value: 'combat' },
            ]
          },
        ],
      }
    ],
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
  image: props?.values?.image || '',
  type: props?.values?.type || '',
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
      @submit="handleSubmit"
    >
      <FormKitSchema :schema="schema" :data="data" :library="library" />
    </FormKit>
  </div>
</template>

<style scoped>
:deep(.formkit-outer) {
  margin: 0 auto 1rem auto;
}
</style>
