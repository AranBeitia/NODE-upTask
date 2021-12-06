import Swal from 'sweetalert2'
import axios from 'axios'
import { updateProgress } from '../functions/progressBar'

const tasks = document.querySelector('.listado-pendientes')

if (tasks) {
	tasks.addEventListener('click', (e) => {
		const clickedIcon = e.target
		const taskId = clickedIcon.parentElement.parentElement.dataset.task
		// request hacia /tasks/:id
		const url = `${location.origin}/tasks/${taskId}`

		if (e.target.classList.contains('fa-check-circle')) {
			axios.patch(url, { taskId }).then((response) => {
				if (response.status === 200) {
					clickedIcon.classList.toggle('completo')
					updateProgress()
				}
			})
		}

		if (e.target.classList.contains('fa-trash')) {
			const taskHtml = clickedIcon.parentElement.parentElement
			Swal.fire({
				title: 'Delete task?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Kill it!',
			}).then((result) => {
				if (result.isConfirmed) {
					axios
						.delete(url, { taskId })
						.then((response) => {
							if (response.status === 200) {
								Swal.fire('Task deleted correctly!', response.data, 'success')
								taskHtml.remove()
								updateProgress()
							}
						})
						.catch(() => {
							Swal.fire({
								type: 'error',
								title: 'An error occurred',
								text: "Couldn't delete the task",
							})
						})
				}
			})
		}
	})
}

export default tasks
