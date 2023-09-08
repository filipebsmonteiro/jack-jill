import { ComputedRef, Ref, computed, ref } from 'vue'
import { FormKitSchema, SchemaElement } from 'Resources/components/Form/Schedule/FormKitSchema'

export const useSchedule = () => {
  const formKitSchemaInstance = new FormKitSchema()
  let schedules: Ref<SchemaElement[]> = ref([])
  let removeSchedule = (id: string) => {
    console.log('id :>> ', id);
    schedules.value.map((schedule) => console.log('schedule :>> ', schedule));
    console.log('filter :>> ', schedules.value.filter((schedule) => schedule.attrs.id !== id));
    schedules.value = schedules.value.filter((schedule) => schedule.attrs.id !== id)
  }
  const addSchedule = () => {
    schedules.value = [
      ...schedules.value,
      formKitSchemaInstance.createScheduleFormKitRow(),
    ].map(schedule => ({
      ...schedule,
      children: schedule.children?.map((child: SchemaElement) => ({
        ...child,
        attrs: {
          ...child.attrs,
          onClick: () => removeSchedule(schedule.attrs.id),
        },
      })),
    }))
  }
  formKitSchemaInstance.addElementButton.attrs.onClick = () => addSchedule()

  let children: ComputedRef = computed(() => ([
    formKitSchemaInstance.legendElement,
    ...schedules.value,
    formKitSchemaInstance.addElementButton,
  ]))

  let formKitSchema = {
    $el: 'fieldset',
    attrs: {
      class: 'schedule-formkit',
    },
    children,
  }

  return { formKitSchema }
}
