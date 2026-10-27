
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskSubject = document.getElementById("task-subject");
const taskDate = document.getElementById("task-date");
const taskPriority = document.getElementById("task-priority");
const taskDuration = document.getElementById("task-duration");

const taskList = document.getElementById("task-list");
const upcomingList = document.getElementById("upcoming-list");
const taskFilter = document.getElementById("task-filter");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const remainingTasks = document.getElementById("remaining-tasks");
const progressNumber = document.getElementById("progress-number");
const progressFill = document.getElementById("progress-fill");
const taskCount = document.getElementById("task-count");

const circleNumber = document.getElementById("circle-number");
const progressCircle = document.getElementById("progress-circle");
const progressMessage = document.getElementById("progress-message");

const currentDate = document.getElementById("current-date");
const aiPlanButton = document.getElementById("ai-plan-button");
const aiStatus = document.getElementById("ai-status");

const STORAGE_KEY = "studyflow.tasks.v1";
let tasks = loadTasks();

// Display today's date
if (currentDate) {
  currentDate.textContent = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Load tasks from localStorage
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Could not load tasks:", error);
    return [];
  }
}

// Save tasks to localStorage
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Could not save tasks:", error);
    showStatus("Unable to save tasks in this browser.", "error");
  }
}

// Display a message
function showStatus(message, type = "success") {
  if (aiStatus) {
    aiStatus.textContent = message;
    aiStatus.dataset.type = type;
  } else {
    console.log(message);
  }
}

// Prevent user-entered text from being treated as HTML
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const characters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return characters[character];
  });
}

// Format a date
function formatDate(dateString) {
  if (!dateString) return "No due date";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

// Check whether a task is overdue
function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(`${task.dueDate}T00:00:00`) < today;
}

// Generate a unique task ID
function createTaskId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Add a new task
if (taskForm) {
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const subject = taskSubject.value.trim();
    const dueDate = taskDate.value;
    const priority = taskPriority.value;
    const duration = Number(taskDuration.value);

    if (!title || !subject || !dueDate || !Number.isFinite(duration) || duration <= 0) {
      showStatus("Please fill in all task fields correctly.", "error");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(`${dueDate}T00:00:00`);

    if (selectedDate < today) {
      showStatus("Please select today or a future due date.", "error");
      return;
    }

    const newTask = {
      id: createTaskId(),
      title,
      subject,
      dueDate,
      priority,
      duration,
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.unshift(newTask);

    saveTasks();
    renderTasks();
    taskForm.reset();

    showStatus("Your study task has been added!");
  });
}

// Render all task sections
function renderTasks() {
  renderTaskList();
  renderUpcomingTasks();
  updateDashboard();
}

// Display tasks and apply the selected filter
function renderTaskList() {
  if (!taskList) return;

  const filter = taskFilter ? taskFilter.value : "all";
  let filteredTasks = [...tasks];

  if (filter === "pending") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  } else if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  } else if (filter === "overdue") {
    filteredTasks = filteredTasks.filter((task) => isOverdue(task));
  }

  if (taskCount) {
    taskCount.textContent = `${filteredTasks.length} ${
      filteredTasks.length === 1 ? "task" : "tasks"
    }`;
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <p>No tasks found.</p>
        <span>Add a task or choose another filter.</span>
      </div>
    `;
    return;
  }

  taskList.innerHTML = filteredTasks.map((task) => {
    const overdue = isOverdue(task);

    return `
      <article class="task-item ${task.completed ? "completed" : ""}">
        <div class="task-checkbox">
          <input
            type="checkbox"
            class="complete-task"
            data-id="${escapeHTML(task.id)}"
            aria-label="Mark ${escapeHTML(task.title)} as completed"
            ${task.completed ? "checked" : ""}
          />
        </div>

        <div class="task-content">
          <h3>${escapeHTML(task.title)}</h3>
          <p class="task-subject">${escapeHTML(task.subject)}</p>

          <div class="task-meta">
            <span class="priority priority-${escapeHTML(
              String(task.priority).toLowerCase()
            )}">
              ${escapeHTML(task.priority)} priority
            </span>

            <span>${escapeHTML(String(task.duration))} min</span>

            <span class="${overdue ? "overdue" : ""}">
              ${overdue ? "Overdue: " : "Due: "}
              ${escapeHTML(formatDate(task.dueDate))}
            </span>
          </div>
        </div>

        <button
          type="button"
          class="delete-task"
          data-id="${escapeHTML(task.id)}"
          aria-label="Delete ${escapeHTML(task.title)}"
        >
          Delete
        </button>
      </article>
    `;
  }).join("");
}

// Display the next four upcoming tasks
function renderUpcomingTasks() {
  if (!upcomingList) return;

  const upcomingTasks = tasks
    .filter((task) => !task.completed && task.dueDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  if (upcomingTasks.length === 0) {
    upcomingList.innerHTML = `
      <div class="empty-state">
        <p>No upcoming tasks.</p>
        <span>Your upcoming deadlines will appear here.</span>
      </div>
    `;
    return;
  }

  upcomingList.innerHTML = upcomingTasks.map((task) => `
    <div class="upcoming-item">
      <div class="upcoming-dot"></div>

      <div class="upcoming-content">
        <h4>${escapeHTML(task.title)}</h4>
        <p>${escapeHTML(task.subject)}</p>
      </div>

      <span class="upcoming-date">
        ${escapeHTML(formatDate(task.dueDate))}
      </span>
    </div>
  `).join("");
}

// Update dashboard numbers and progress indicators
function updateDashboard() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = total - completed;
  const percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  if (totalTasks) totalTasks.textContent = total;
  if (completedTasks) completedTasks.textContent = completed;
  if (remainingTasks) remainingTasks.textContent = remaining;

  if (progressNumber) {
    progressNumber.textContent = `${percentage}%`;
  }

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }

  if (circleNumber) {
    circleNumber.textContent = `${percentage}%`;
  }

  if (progressCircle) {
    progressCircle.style.background = `conic-gradient(
      #7765e3 ${percentage * 3.6}deg,
      #e9e7f5 ${percentage * 3.6}deg
    )`;
  }

  if (progressMessage) {
    if (total === 0) {
      progressMessage.textContent = "Add your first task to begin.";
    } else if (percentage === 100) {
      progressMessage.textContent = "Amazing! You completed every task.";
    } else {
      progressMessage.textContent = "Keep going. Every task counts!";
    }
  }
}

// Mark tasks as completed
if (taskList) {
  taskList.addEventListener("change", (event) => {
    if (!event.target.classList.contains("complete-task")) return;

    const taskId = event.target.dataset.id;
    const isChecked = event.target.checked;

    tasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: isChecked }
        : task
    );

    saveTasks();
    renderTasks();
    showStatus("Task progress updated.");
  });

  // Delete tasks
  taskList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-task");

    if (!deleteButton) return;

    tasks = tasks.filter(
      (task) => task.id !== deleteButton.dataset.id
    );

    saveTasks();
    renderTasks();
    showStatus("Task deleted.");
  });
}

// Filter tasks
if (taskFilter) {
  taskFilter.addEventListener("change", renderTaskList);
}

// Generate an AI study plan using the backend
if (aiPlanButton) {
  aiPlanButton.addEventListener("click", async () => {
    const subjects = window.prompt(
      "Enter your subjects, separated by commas:"
    );

    if (!subjects || !subjects.trim()) {
      showStatus("Please enter your subjects.", "error");
      return;
    }

    const hoursText = window.prompt(
      "How many hours can you study today? Enter 0.5 to 12."
    );

    if (hoursText === null || !hoursText.trim()) {
      showStatus("Please enter your available study hours.", "error");
      return;
    }

    const hours = Number(hoursText);

    if (!Number.isFinite(hours) || hours < 0.5 || hours > 12) {
      showStatus("Enter study hours between 0.5 and 12.", "error");
      return;
    }

    const goal = window.prompt(
      "What is your study goal for today?"
    );

    if (!goal || !goal.trim()) {
      showStatus("Please enter your study goal.", "error");
      return;
    }

    aiPlanButton.disabled = true;
    showStatus("Generating your AI study plan...", "info");

    try {
      const response = await fetch("https://mainai-u81g.onrender.com/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subjects: subjects.trim(),
          hours,
          goal: goal.trim()
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to generate study plan."
        );
      }

      let result = document.getElementById("ai-plan-result");

      if (!result) {
        result = document.createElement("section");
        result.id = "ai-plan-result";
        result.className = "ai-plan-result";

        aiPlanButton.insertAdjacentElement("afterend", result);
      }

      const heading = document.createElement("h3");
      heading.textContent = "Your AI Study Plan";

      const plan = document.createElement("p");
      plan.style.whiteSpace = "pre-wrap";
      plan.textContent = data.plan || "No plan was returned.";

      result.replaceChildren(heading, plan);

      showStatus("Your study plan is ready!", "success");
    } catch (error) {
      console.error("Study plan error:", error);

      showStatus(
        "Could not generate a plan. Check that the backend is running and your Gemini API key is configured.",
        "error"
      );
    } finally {
      aiPlanButton.disabled = false;
    }
  });
}

// Initial display
renderTasks();
