import axios from 'axios'

const tasks = document.querySelector('.listado-pendientes')

if (tasks) {
	tasks.addEventListener('click', (e) => {
		if (e.target.classList.contains('fa-check-circle')) {
			const clickedIcon = e.target
			const taskId = clickedIcon.parentElement.parentElement.dataset.task

			// request hacia /tasks/:id
			const url = `${location.origin}/tasks/${taskId}`
			axios.patch(url, { taskId }).then((response) => {
				if (response.status === 200) {
					clickedIcon.classList.toggle('completo')
				}
			})
		}
	})
}

export default tasks
