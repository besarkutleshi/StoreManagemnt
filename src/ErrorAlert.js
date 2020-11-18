import Swal from 'sweetalert2'

function ErrorAlert(message){
    return (
        Swal.fire(
            'Something went wrong',
            message,
            'error'
        )
    )
}

export default ErrorAlert