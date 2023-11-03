import { StateTree } from 'pinia'

export default {
  getLevelsAsOptions: (state: StateTree) => {
    return [
      { label: 'Select Level...', value: null },
      ...state.list.map((level) => ({
        label: level.name,
        value: level.id,
      })),
    ]
  },
}
