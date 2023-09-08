import { v4 as uuid } from 'uuid'
import { useI18n } from 'vue-i18n'

export interface SchemaElement {
  $el?: string
  $formkit?: string
  attrs?: any
  children?: Array<SchemaElement | string>
  label?: string
  name?: string
  type?: any
  validations?: any
  value?: any
}

export class FormKitSchema {
  public legendElement: SchemaElement = {
    $el: 'legend',
    children: [useI18n().t('schedule.schedule')],
  }
  public addElementButton: SchemaElement = {
    $el: 'button',
    attrs: {
      class: 'btn btn-sm mt-2',
      type: 'button',
    },
    children: [useI18n().t('schedule.add')],
  }
  protected scheduleFormKitRowDefault: SchemaElement = {
    $el: 'div',
    attrs: { class: 'schedule-formkit-row' },
    children: [
      {
        $formkit: 'text',
        label: useI18n().t('schedule.name'),
        name: 'name',
        validations: 'required',
      },
      {
        $formkit: 'datetime-local',
        label: useI18n().t('schedule.start_date'),
        name: 'start_date',
        validations: 'required',
      },
      {
        $formkit: 'datetime-local',
        label:useI18n().t('schedule.end_date'),
        name: 'end_date',
        validations: 'required',
      },
      {
        $el: 'button',
        attrs: {
          class: 'bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
          type: 'button',
        },
        children: [useI18n().t('schedule.remove')],
      },
    ],
  }

  public parseScheduleToSchema (index: number): SchemaElement {
    return {
      ...this.scheduleFormKitRowDefault,
      attrs: {
        ...this.scheduleFormKitRowDefault.attrs,
        id: uuid(),
      },
      children: this.scheduleFormKitRowDefault.children?.map((child: SchemaElement) => ({
        ...child,
        name: child.name ? `schedules[${index}][${child.name}]` : undefined,
      })),
    }
  }

  public createScheduleFormKitRow (index: number = 0): SchemaElement {
    return this.parseScheduleToSchema(index)
  }
}
