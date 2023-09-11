import { ComputedRef, Ref, computed, reactive, ref } from 'vue'
import { FormKitSchema, SchemaElement } from 'Resources/components/Form/Schedule/FormKitSchema'

export const useSchedule = () => {
  const formKitSchemaInstance = new FormKitSchema()
  let schedules: Ref<SchemaElement[]> = ref([])
  const resetSchedules = () => schedules.value = []
  let removeSchedule = (id: string) => {
    schedules.value = schedules.value.filter((schedule) => schedule.attrs?.id !== id)
  }
  const addSchedule = (childrenValues = {}) => {
    const newest = formKitSchemaInstance.createScheduleFormKitRow(schedules.value.length, childrenValues)
    if (newest.children && newest.children.length > 0) {
      const copyLastChild: SchemaElement = newest.children[newest.children.length - 1] as SchemaElement
      newest.children[newest.children.length - 1] = {
        ...copyLastChild,
        attrs: {
          ...copyLastChild.attrs,
          onClick: () => removeSchedule(newest.attrs?.id),
        },
      }
    }
    schedules.value.push(newest)
  }
  formKitSchemaInstance.addElementButton = {
    ...formKitSchemaInstance.addElementButton,
    attrs: {
      ...formKitSchemaInstance.addElementButton.attrs,
      onClick: () => addSchedule(),
    },
  }

  let children: ComputedRef = computed(() => ([
    formKitSchemaInstance.legendElement,
    ...schedules.value,
    formKitSchemaInstance.addElementButton,
  ]))

  let formKitSchema = reactive({
    $el: 'fieldset',
    attrs: {
      class: 'schedule-formkit',
    },
    children,
  })

  let formKitValues: ComputedRef = computed(() => {
    return schedules.value.reduce((acc, schedule) => {
      schedule.children?.map((field: SchemaElement) =>
        acc = field.name
          ? {
            ...acc,
            [`${field.name}`]: field.value || '',
          }
          : acc
      )
      return acc
    }, {})
  })

  return { addSchedule, formKitSchema, formKitValues, resetSchedules }
}
