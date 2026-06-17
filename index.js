import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appsettings = {
    databaseURL: "https://tareas-eduardo-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appsettings)
const database = getDatabase(app)
const habitInDB = ref(database, "tareas")


const inputField = document.getElementById("input-field")
const taskList = document.getElementById("task-list")
const btn = document.getElementById("btn")

btn.addEventListener("click", function() {
    const inputFieldValue = inputField.value.trim()

    if (inputFieldValue === "") {
        return
    }
    
    push(habitInDB, inputFieldValue)

    clearInput()
})

onValue(habitInDB, function(snapshot) {
    taskList.innerHTML = ""

    if (snapshot.exists()) {
        let tareasArray = Object.entries(snapshot.val())

        for (let i = 0; i < tareasArray.length; i++) {
            const currentTask = tareasArray[i]
            appendHabit(currentTask)
        }
    } else {
        taskList.innerHTML = "No hay tareas..."
    }
})

function appendHabit(item) {
    const li = document.createElement("li")
    let itemID = item[0]
    let itemValue = item[1]

    li.textContent = itemValue
    taskList.append(li)

    li.addEventListener("dblclick", function() {
        let exactLocation = ref(database, `tareas/${itemID}`)
        remove(exactLocation)
    })
}

function clearInput() {
    inputField.value = ""
}

function removeTask(task) {

}