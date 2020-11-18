import Swal from 'sweetalert2'

function SuccessAlert(message) {
    return (
        Swal.fire(
            'Good job!',
            message,
            'success'
          )
    )
}

export default SuccessAlert