

const userName = localStorage.getItem('user');
const cleanUserName = userName.replace(/"/g, ''); // Remove double quotes

const userInfo = document.getElementById('user-info');
if (userInfo) {
    userInfo.innerHTML = `<h2>Welcome, ${cleanUserName || 'User'}!</h2>`;
}

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'index.html'; // Redirect back to login page
});


const API_URL = "https://localhost:7171/api/Auth";



// async function displayUserInfo() {
    

//     try {
//         const response = await fetch(API_URL, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             const userData = await response.json(); //pasikuriam kintamoaji json, i skurio reikia istraukti userName.

//             const userNameElement = document.getElementById('user-info');
//             userNameElement.textContent = userName;
//             console.log (`userName`)
//         } else {
//             console.error(`Failed to fetch user info: ${response.status} - ${response.statusText}`);
//         }
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }

// displayUserInfo();





// function populateHeader(result) {
//     const header = document.querySelector("#header");
//     header.innerHTML =
//         `<h1>${result.squadName}</h1>
//     <p> Hometown: ${result.homeTown} // Formed: ${result.formed}</p>`;
// }

// populateMembers = (obj) => {
//     const membersdiv = document.querySelector("#members");
//     const heroes = obj.members;
//     heroes.forEach(hero => {
//         membersdiv.innerHTML += `
//     <article data-id=${hero.name}>
//         <h2>${hero.name}</h2>
//         <p>Secret identity: ${hero.secretIdentity}</p>
//         <p id="age">Age: ${hero.age}</p>
//         <p>Superpowers:
//             <ul>
//                 ${hero.powers.map(power => `<li>${power}</li>`).join("")}
//             </ul>
//         </p>
//     </article>`;
//     });

// }




// // Todo state management
// let todos = [];

// // Check if user is authenticated
// function checkAuth() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         window.location.href = '../index.html';
//         return;
//     }
//     displayUserInfo();
//     loadTodos(); // Load todos after authentication check
// }

// // Display user information
// // function displayUserInfo() {
// //     const user = JSON.parse(localStorage.getItem('user'));
// //     if (user) {
// //         const userInfo = document.getElementById('user-info');
// //         userInfo.textContent = `Logged in as: ${user.userName || 'User'}`;
// //     }
// // }


// // Fetch todos from API
// async function loadTodos() {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(apiToDo, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });
        
//         if (!response.ok) throw new Error('Failed to fetch todos');
        
//         todos = await response.json();
//         renderTodos();
//     } catch (error) {
//         console.error('Error loading todos:', error);
//         showNotification('Failed to load todos', 'error');
//     }
// }

// // Render todos to DOM
// function renderTodos() {
//     const todoList = document.getElementById('todo-list');
//     todoList.innerHTML = '';
    
//     todos.forEach(todo => {
//         const li = document.createElement('li');
//         li.className = 'todo-item';
        
//         li.innerHTML = `
//             <input type="checkbox" ${todo.isComplete ? 'checked' : ''} 
//                    onchange="toggleTodo(${todo.id})">
//             <span class="${todo.isComplete ? 'completed' : ''}">${todo.title}</span>
//             <button onclick="deleteTodo(${todo.id})">Delete</button>
//             <button onclick="editTodo(${todo.id})">Edit</button>
//         `;
        
//         todoList.appendChild(li);
//     });
// }

// // Add new todo
// async function addTodo(event) {
//     event.preventDefault();
//     const todoInput = document.getElementById('todo-input');
//     const title = todoInput.value.trim();
    
//     if (!title) return;
    
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(apiToDo, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ title, isComplete: false })
//         });
        
//         if (!response.ok) throw new Error('Failed to add todo');
        
//         const newTodo = await response.json();
//         todos.push(newTodo);
//         renderTodos();
//         todoInput.value = '';
//         showNotification('Todo added successfully', 'success');
//     } catch (error) {
//         console.error('Error adding todo:', error);
//         showNotification('Failed to add todo', 'error');
//     }
// }

// // Toggle todo completion
// async function toggleTodo(id) {
//     try {
//         const todo = todos.find(t => t.id === id);
//         if (!todo) return;
        
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${apiToDo}/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ ...todo, isComplete: !todo.isComplete })
//         });
        
//         if (!response.ok) throw new Error('Failed to update todo');
        
//         todo.isComplete = !todo.isComplete;
//         renderTodos();
//         showNotification('Todo updated successfully', 'success');
//     } catch (error) {
//         console.error('Error updating todo:', error);
//         showNotification('Failed to update todo', 'error');
//     }
// }

// // Delete todo
// async function deleteTodo(id) {
//     if (!confirm('Are you sure you want to delete this todo?')) return;
    
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${apiToDo}/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
        
//         if (!response.ok) throw new Error('Failed to delete todo');
        
//         todos = todos.filter(t => t.id !== id);
//         renderTodos();
//         showNotification('Todo deleted successfully', 'success');
//     } catch (error) {
//         console.error('Error deleting todo:', error);
//         showNotification('Failed to delete todo', 'error');
//     }
// }

// // Edit todo
// function editTodo(id) {
//     const todo = todos.find(t => t.id === id);
//     if (!todo) return;
    
//     const newTitle = prompt('Edit todo:', todo.title);
//     if (!newTitle || newTitle.trim() === todo.title) return;
    
//     updateTodo(id, newTitle.trim());
// }

// // Update todo
// async function updateTodo(id, newTitle) {
//     try {
//         const todo = todos.find(t => t.id === id);
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${apiToDo}/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ ...todo, title: newTitle })
//         });
        
//         if (!response.ok) throw new Error('Failed to update todo');
        
//         todo.title = newTitle;
//         renderTodos();
//         showNotification('Todo updated successfully', 'success');
//     } catch (error) {
//         console.error('Error updating todo:', error);
//         showNotification('Failed to update todo', 'error');
//     }
// }

// // Show notification
// function showNotification(message, type) {
//     const notification = document.getElementById('notification');
//     notification.textContent = message;
//     notification.className = `notification ${type}`;
//     notification.style.display = 'block';
    
//     setTimeout(() => {
//         notification.style.display = 'none';
//     }, 3000);
// }

// // Logout function (keeping your existing implementation)
// function handleLogout() {
//     try {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         window.location.href = '../index.html';
//     } catch (error) {
//         console.error('Logout error:', error);
//         window.location.href = '../index.html';
//     }
// }

// // Event listeners
// document.addEventListener('DOMContentLoaded', () => {
//     checkAuth();
    
//     const todoForm = document.getElementById('todo-form');
//     if (todoForm) {
//         todoForm.addEventListener('submit', addTodo);
//     }
    
//     const logoutBtn = document.getElementById('logout');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', handleLogout);
//     }
    
//     window.addEventListener('storage', (e) => {
//         if (e.key === 'token' && !e.newValue) {
//             window.location.href = '../index.html';
//         }
//     });
// });



// function displayUserInfo() {
//     try {
//         const urlParams = readInputs();
//         const fullURL = `${API_URL}?${urlParams.toString()}`;

//         const response = await fetch(fullURL, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//         });

//         const data = await response.json();

//         if (response.ok){
//             const userInfo = document.getElementById('user-info');
//         if (userInfo) {
//             userInfo.textContent = `Welcome, ${user.userName || 'User'}!`;
//         } else {
//             console.error('User info element not found');
//         }
//         }


//     }
// console.log(`veikia`)