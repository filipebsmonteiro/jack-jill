export const schema = {
  $formkit: 'spinningSubmit',
  label: 'Enviar',
}

const spinningSubmitDefinition = {
  type: 'input',
  schema: [
    {
      $cmp: 'FormKit',
      bind: '$submitAttrs',
      props: {
        ignore: true,
        type: 'submit',
        disabled: '$disabled',
        label: '$submitLabel',
      },
      children: [
        {
          $el: 'span',
          children: {
            if: '$disabled',
            then: '...',
            else: '$label',
          },
        },
      ],
    },
  ],
}

const customInputs = () => {}

// Then we attach a library
customInputs.library = (node) => {
  if (node.props.type === 'spinningSubmit') {
    node.define(spinningSubmitDefinition)
  }
}

export { customInputs as plugin }
