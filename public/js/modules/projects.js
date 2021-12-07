import Swal from 'sweetalert2'
import axios from 'axios'

const btnDelete = document.querySelector('#eliminar-proyecto')

if (btnDelete) {
	btnDelete.addEventListener('click', (e) => {
		const projectUrl = e.target.dataset.projectUrl
		Swal.fire({
			title: 'Delete project?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Kill it!',
		}).then((result) => {
			if (result.isConfirmed) {
				const url = `${location.origin}/projects/${projectUrl}`

				axios
					.delete(url, { params: { projectUrl } })
					.then((response) => {
						Swal.fire('Deleted!', response.data, 'success')
						setTimeout(() => {
							window.location.href = '/'
						}, 3000)
					})
					.catch(() => {
						Swal.fire({
							type: 'error',
							title: 'An error occurred',
							text: "Couldn't delete the project",
						})
					})
			}
		})
	})
}

export default btnDelete
