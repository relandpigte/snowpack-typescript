import { v4 as uuidv4 } from "uuid";

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createAt: Date;
}

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const task: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createAt: new Date(),
  };

  tasks.push(task);

  addListItem(task);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", (e) => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  label.append(checkbox, task.title);
  item.append(label);
  saveTasks();

  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const tasks = localStorage.getItem("tasks");
  if (tasks == null) return [];
  return JSON.parse(tasks);
}
