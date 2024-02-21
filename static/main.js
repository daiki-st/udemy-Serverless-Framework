const API_URL_PREFIX = "https://ovhpyyj7e5.execute-api.ap-northeast-1.amazonaws.com"

const taskTitleInputElement = document.getElementById("task-title-input")
const taskAddButtonElement = document.getElementById("task-add-button")
const taskListElement = document.getElementById("task-list")

async function loadTasks() {
    try {
        const response = await fetch(API_URL_PREFIX + "/tasks")
        const responseBody = await response.json()

        const tasks = responseBody.tasks

        while (taskListElement.firstChild) {
            taskListElement.removeChild(taskListElement.firstChild)
        }

        tasks.forEach((task) => {
            const liElement = document.createElement("li")
            liElement.innerText = task.title

            taskListElement.appendChild((liElement))
        })
    }
    catch (error) {
        console.error("Error loading tasks:", error)
        // Optionally, display an error message to the user
    }
}

async function registerTask() {
    const title = taskTitleInputElement.value

    const requestBody = {
        title: title
    }

    await fetch(API_URL_PREFIX + "/tasks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })

    await loadTasks()
}

async function main() {
    taskAddButtonElement.addEventListener("click", registerTask)
    await loadTasks()
}

main()
