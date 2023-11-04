import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export const toast = {
  success: (message: string) => Toast.fire({
    icon: 'success',
    title: message,
  }),
  error: (message: string) => Toast.fire({
    icon: 'error',
    title: message,
  }),
}

export const confirm = (
  title: string,
  text: string,
  confirmButtonText: string = 'Confirm'
) => Swal.fire({
  title,
  text,
  showCancelButton: true,
  confirmButtonText,
  // showDenyButton: true,
  // denyButtonText: `Don't delete`,
})
// .then((result) => {
//   /* Read more about isConfirmed, isDenied below */
//   if (result.isConfirmed) {
//     // Swal.fire('Saved!', '', 'success')
//   }
//   // else if (result.isDenied) {
//   //   Swal.fire('Changes are not saved', '', 'info')
//   // }
// })
// }
