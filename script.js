const btn =document.querySelector(".toggle-mode");
    btn.addEventListener("click",()=>{
        document.body.classList.toggle("dark-mode")
    });

    const validInput=document.getElementById("add-employee");
   const nameInput = document.getElementById("name");
    const jobInput = document.getElementById("role");
    const selectInput = document.getElementsByClassName("status");
    const tableBody = document.querySelector("#employeeTable tbody");
    const trashTable = document.querySelector("#trashTableBody");
    const employeeCount = document.getElementById('mainCount');
    const trashCount = document.getElementById('trashCount');

    validInput.addEventListener("submit",function (e) {
     e.preventDefault();
   const name = nameInput.value.trim();
  const role = jobInput.value.trim();
  const status = selectInput[0].value;

  if (!name || !role || !status) {
    alert(" PLEASE ENTER ALL INPUTE ");
    return;
  }
console.time("AddEmployee");

      const tr = document.createElement('tr');
      tr.setAttribute("data-id", Date.now()); // ✅ setAttribute usage

      tr.innerHTML = `
         <td class="name">${name}</td>
        <td class="role">${role}</td>
        <td><span class="badge ${getBadgeClass(status)}">${status}</span></td>
            <td class="actions">
          <button class="edit-btn" onclick="editEmployee(this)">
            <i class="fas fa-edit"></i>Edit
          </button>
          <button class="delete-btn" onclick="deleteEmployee(this)">
            <i class="fas fa-trash"></i>Delete
          </button>
        </td>
      `;

      tableBody.appendChild(tr);
      
      validInput.reset();
      updateCounters();
      console.timeEnd("AddEmployee");
    });

    function getBadgeClass(status) {
      return status === "Active" ? "active" :
             status === "On Leave" ? "on-leave" : "terminated";
    }

    function updateCounters() {
      mainCount.textContent = tableBody.querySelectorAll('tr').length;
      trashCount.textContent = trashTable.querySelectorAll('tr').length;
    }
 function editEmployee(button) {
      const tr = button.closest("tr");
      const name = tr.querySelector(".name").innerText;
      const role = tr.querySelector(".role").textContent;
      const status = tr.querySelector("span").textContent;

      const newName = prompt("Edit name:", name);
      const newRole = prompt("Edit role:", role);
      const newStatus = prompt("Edit status (Active, On Leave, Terminated):", status);

      if (newName && newRole && newStatus) {
        tr.querySelector(".name").innerText = newName;
        tr.querySelector(".role").textContent = newRole;
        const badge = tr.querySelector("span");
        badge.textContent = newStatus;
        badge.className = "badge " + getBadgeClass(newStatus);
      }
    }

    function deleteEmployee(button) {
      const tr = button.closest("tr");
      trashTable.appendChild(tr);
      const actions = tr.querySelector(".actions");
      actions.innerHTML = `
        <button class="restore-btn" onclick="restoreEmployee(this)">
          <i class="fas fa-undo"></i>Restore
        </button>
        <button class="forever-btn" onclick="permanentDelete(this)">
          <i class="fas fa-trash-alt"></i>Delete Forever
        </button>
      `;
      updateCounters();
    }

    function restoreEmployee(button) {
      const tr = button.closest("tr");
      tableBody.appendChild(tr);
      const actions = tr.querySelector(".actions");
      actions.innerHTML = `
        <button class="edit-btn" onclick="editEmployee(this)">
          <i class="fas fa-edit"></i>Edit
        </button>
        <button class="delete-btn" onclick="deleteEmployee(this)">
          <i class="fas fa-trash"></i>Delete
        </button>
      `;
      updateCounters();
    }

    function permanentDelete(button) {
      const tr = button.closest("tr");
     const confirmDelete = confirm("Are you sure of permanent delete ? ");
  if (confirmDelete) {
    trashTable.removeChild(tr);
    updateCounters(); // تحديث العدادات بعد الحذف
  }
    }

 document.getElementById("toggleTrash").addEventListener("click", () => {
  trashSection.style.display = trashSection.style.display === "block" ? "none" : "block";
});

 const scrollBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });