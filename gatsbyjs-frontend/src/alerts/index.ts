//SWEETALERT2
import Swal from 'sweetalert2';

export const darkAlert = (dark: boolean) => {
    Swal.fire({
        icon: 'info',
        title: `<p id="design">${!dark ? `Dark` : `Light`}</p>`,
        text: `You enabled ${!dark ? `Dark` : `Light`} Theme!`,
        timer: 2000,
        showConfirmButton: false
    })
}

export const successAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '<p id="design">successful!</p>',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
    })
}