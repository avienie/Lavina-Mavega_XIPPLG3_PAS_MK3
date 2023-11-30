// Selectors

// Ini biasanya digunakan untuk merujuk ke input di mana pengguna dapat menambahkan tugas baru.
const toDoInput = document.querySelector('.todo-input');
// Ini adalah tombol yang akan digunakan untuk menambahkan tugas ke daftar.
const toDoBtn = document.querySelector('.todo-btn');
// Ini adalah daftar tempat tugas-tugas akan ditampilkan.
const toDoList = document.querySelector('.todo-list');
// 3 code kebawah ini adalah tombol atau elemen lain yang digunakan untuk mengganti tema aplikasi ke tema standar, terang, dan gelap.
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');


// Event Listeners

// Code untuk menangani logika ketika tombol I Got This diklik
// Misalnya, menambahkan item ke bawah daftar tugas
toDoBtn.addEventListener('click', addToDo);
// Code untuk menangani logika ketika tombol yang bergambar tempat sampah diklik
// Misalnya, menghapus item yang ada di daftar tugas
toDoList.addEventListener('click', deletecheck);
// Digunakan untuk menetapkan agar fungsi getTodos dijalankan saat seluruh halaman HTML (DOM) telah selesai dimuat oleh browser. 
document.addEventListener("DOMContentLoaded", getTodos);
// 3 kode dibawah merupakan logika ketika tombol tema di klik
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Mengecek atau memeriksa apakah satu tema telah ditetapkan sebelumnya dan terapkan dan otomatis menerapkan tema standar apabila gagal diperiksa
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ?
    changeTheme('standard')
    : changeTheme(localStorage.getItem('savedTheme'));

// Functions;
function addToDo(event) {
    // Prevents form from submitting / Prevents form from relaoding;
    event.preventDefault();

    // toDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    // Create LI
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
            alert("You must write something!");
        } 
    else {
        // newToDo.innerText = "hey";
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Adding to local storage;
        savelocal(toDoInput.value);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);

        // CLearing the input;
        toDoInput.value = '';
    }

}   

// Memberikan interaktivitas pada daftar tugas, memungkinkan pengguna untuk menghapus atau menandai tugas sebagai selesai dengan efek animasi. 
function deletecheck(event){

    // console.log(event.target);
    const item = event.target;

    // delete
    if(item.classList[0] === 'delete-btn')
    {
        // item.parentElement.remove();
        // animation
        item.parentElement.classList.add("fall");

        //removing local todos;
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }

    // check
    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }


}

// Berfungsi untuk menyimpan tugas (todos) ke dalam penyimpanan lokal (localStorage) pada browser. 
// Saving to local storage:
function savelocal(todo){
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


// Bagian dari fungsi getTodos, yang digunakan untuk mendapatkan dan menampilkan daftar tugas dari penyimpanan lokal ke dalam elemen-elemen HTML. 
function getTodos() {
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        // toDo DIV;
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);

        // Create LI
        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);
    });
}

// Digunakan untuk mengelola dan memperbarui penyimpanan lokal setelah suatu tugas dihapus dari daftar tugas pada halaman web.
function removeLocalTodos(todo){
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    // console.log(todoIndex);
    todos.splice(todoIndex, 1);
    // console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//  Fung changeTheme digunakan untuk mengubah tema warna secara dinamis pada halaman web, termasuk mengubah warna latar belakang, elemen input, elemen daftar tugas, dan warna tombol sesuai dengan tema yang dipilih.
// Change theme function:
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;
    // Change blinking cursor for darker theme:
    color === 'darker' ? 
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${color}-input`;
    // Change todo color without changing their status (completed or not):
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ? 
            todo.className = `todo ${color}-todo completed`
            : todo.className = `todo ${color}-todo`;
    });
    // Mengubah warna tombol berdasarkan masing-masing tipe (todo, check, or delete):
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
              button.className = `check-btn ${color}-button`;  
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`; 
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
}