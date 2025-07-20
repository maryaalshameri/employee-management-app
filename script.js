const btn =document.querySelector(".toggle-mode");
    btn.addEventListener("click",()=>{
        document.body.classList.toggle("dark-mode")
    });

    const validInput=document.getElementById("add-employee");
   const nameInput = document.getElementById("name");
    const jobInput = document.getElementById("role");
   const salaryInput = document.getElementById('salary');
   const selectInput = document.getElementsByClassName("status");
    const tableBody = document.querySelector("#employeeTable tbody");
    const trashTable = document.querySelector("#trashTableBody");
    const employeeCount = document.getElementById('mainCount');
    const trashCount = document.getElementById('trashCount');
     const bonusModal = document.querySelector('#bonusModal');
    const bonusInput = document.querySelector('#bonusInput');
    let currentBonusRow = null;
    const saveBonusBtn = document.querySelector("#saveBonusBtn");
    const closeBonusBtn = document.getElementById("closeBonusBtn");
    const totalPayroll = document.getElementById('totalPayroll');
    const totalSalary= document.getElementById('totalSalary');

    saveBonusBtn.addEventListener("click", saveBonus);
    closeBonusBtn.addEventListener("click", closeBonusModal);

const resetFilterBtn = document.getElementById("resetFilterBtn");
const filterModal = document.getElementById("filterModal");
const openFilterBtn = document.getElementById("openFilterModal");
const closeFilterBtn = document.getElementById("closeFilterModal");
const applyFilterBtn = document.getElementById("applyFilterBtn");
const nameFilter = document.getElementById("filterName");
const roleFilter = document.getElementById("filterRole");
const statusInput = document.getElementById("filterStatus");
const minSalaryInput = document.getElementById("filterMinSalary");
const minBonusInput = document.getElementById("filterMinBonus");

    validInput.addEventListener("submit",function (e) {
     e.preventDefault();
   const name = nameInput.value.trim();
   const role = jobInput.value.trim();
  const salary = parseFloat(salaryInput.value);
  const status = selectInput[0].value;

  
  if (!name || !/^[A-Za-z\s]{8,}$/.test(name)) {
    alert("⚠️ the name is empty or must be text with at least 8 characters");
    return;
  }

  // ✅ التحقق من الوظيفة
  if (!role || !/^[A-Za-z\s]{2,}$/.test(role)) {
    alert("⚠️ the role is empty or must be text with at least 2 characters");
    return;
  }

  // ✅ التحقق من الراتب
  if (!salary || isNaN(salary) || salary <= 0) {
    alert("⚠️the salary is empty or must be number greater then 0");
    return;
  }
  if (!status) {
    alert(" PLEASE ENTER status ");
    return;
  }
console.time("AddEmployee");

     const tr = document.createElement('tr');
      tr.dataset.id = Date.now();
      tr.dataset.name = name.toLowerCase();
      tr.dataset.role = role.toLowerCase();
      tr.dataset.salary = salary;
      tr.dataset.status = status;
      tr.dataset.bonus = 0;
      tr.dataset.salarybonus = salary;
      const salaryBadge = salary >= 100000 ? '<span class="high-salary">High</span>' : '';

      tr.innerHTML = `
        <td class="name">${name}</td>
        <td class="role">${role}</td>
        <td><span class="badge ${getBadgeClass(status)}">${status}</span></td>
        <td class="salary">${salary.toFixed(2)} R ${salaryBadge}</td>
        <td class="bonus">0 R</td>
         <td class="salary-bounas">${salary.toFixed(2)} R ${salaryBadge}</td>
        <td class="actions">
          <button class="bonus-btn" onclick="openBonusModal(this)"><i class="fas fa-gift"></i>Bonus</button>
          <button class="edit-btn" onclick="editEmployee(this)"><i class="fas fa-edit"></i>Edit</button>
          <button class="delete-btn" onclick="deleteEmployee(this)"><i class="fas fa-trash"></i>Delete</button>
        </td>
      `;

      tableBody.appendChild(tr);
      
      validInput.reset();
      updateCounters();
      updatePayroll();
       updateTotalSalary();
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

     function updatePayroll() {
      const rows = tableBody.querySelectorAll('tr');
      const total = Array.from(rows).reduce((sum, row) => sum + parseFloat(row.dataset.salary), 0);
      totalPayroll.textContent = total.toFixed(2);
    }

     function updateTotalSalary() {
      const rows = tableBody.querySelectorAll('tr');
      const total = Array.from(rows).reduce((sum, tr) => sum + parseFloat(tr.dataset.salarybonus), 0);
      totalSalary.textContent = total.toFixed(2);
    }


    function openBonusModal(button) {
      currentBonusRow = button.closest("tr");
      bonusInput.value = "";
      bonusModal.style.display = "flex";
    }

    

    function closeBonusModal() {
      bonusModal.style.display = "none";
      currentBonusRow = null;
    }

    function saveBonus() {
      
   const bonusPercent = parseFloat(bonusInput.value);

  if (isNaN(bonusPercent) || bonusPercent < 0 || bonusPercent > 100) {
    alert("Enter a valid bonus percentage between 0 and 100.");
    return;
  }

  const salary = parseFloat(currentBonusRow.dataset.salary);
  const bonusAmount = salary * bonusPercent / 100;
 const bonusBadge = bonusAmount > 0 ?`<span class='bonus-badge'>Bonus</span>` :'';
  // إجمالي الراتب والمكافأة
  const total = salary + bonusAmount;
const totalBadge = total >= 100000 ? '<span class="high-salary">High</span>' : '';
  // تحديث في الجدول
  currentBonusRow.querySelector(".bonus").innerHTML =
    `${bonusAmount.toFixed(2)} R ${bonusBadge}`;

  currentBonusRow.querySelector(".salary-bounas").innerHTML =
    `${total.toFixed(2)} R ${totalBadge}`;

  // تحديث في dataset
  currentBonusRow.dataset.bonus = bonusAmount.toFixed(2);
  currentBonusRow.dataset.salarybonus = total.toFixed(2);
  
      closeBonusModal();
      updatePayroll();
      updateTotalSalary();
    }

//  function editEmployee(button) {
//       const tr = button.closest("tr");
//       const name = tr.querySelector(".name").innerText;
//       const role = tr.querySelector(".role").textContent;
//       const status = tr.querySelector("span").textContent;

//       const newName = prompt("Edit name:", name);
//       const newRole = prompt("Edit role:", role);
//       const newStatus = prompt("Edit status (Active, On Leave, Terminated):", status);

//       if (newName && newRole && newStatus) {
//         tr.querySelector(".name").innerText = newName;
//         tr.querySelector(".role").textContent = newRole;
//         const badge = tr.querySelector("span");
//         badge.textContent = newStatus;
//         badge.className = "badge " + getBadgeClass(newStatus);
//       }
//     }

function editEmployee(button) {
const tr = button.closest("tr");
  const oldName = tr.querySelector(".name").textContent;
  const oldRole = tr.querySelector(".role").textContent;
  const oldSalary = tr.querySelector(".salary").textContent;
  const oldBonus = tr.querySelector(".bonus").textContent;
  const oldStatus = tr.dataset.status;

  const newName = prompt("Edit name:", oldName);
  const newRole = prompt("Edit role:", oldRole);
  const newSalary = prompt("Edit salary:", oldSalary);
  const newBonus = prompt("Edit bonus:", oldBonus);
  const newStatus = prompt("Edit status (Active, On Leave, Terminated):", oldStatus);

  if (!newName || !/^[A-Za-z\s]{8,}$/.test(newName)) {
    alert("⚠️ the name must be text with at least 8 characters");
    return;
  }

  if (!newRole || !/^[A-Za-z\s]{2,}$/.test(newRole)) {
    alert("⚠️ the role must be text with at least 2 characters");
    return;
  }

  const salaryNumber = parseFloat(newSalary);
  if (isNaN(salaryNumber) || salaryNumber <= 0) {
    alert("⚠️ the salary must be a number greater than 0");
    return;
  }

  const bonusNumber = parseFloat(newBonus);
  if (isNaN(bonusNumber) || bonusNumber < 0 || bonusNumber > 100) {
    alert("⚠️ Enter a valid bonus percentage between 0 and 100.");
    return;
  }

  if (!['Active', 'On Leave', 'Terminated'].includes(newStatus)) {
    alert("⚠️ The status must be: Active, On Leave, or Terminated.");
    return;
  }

  // ✅ تحديث البيانات في الجدول
  tr.querySelector(".name").textContent = newName;
  tr.querySelector(".role").textContent = newRole;

  // ✅ تحديث الراتب مع شارة High إن لزم
  const salaryBadge = salaryNumber >= 100000 ? '<span class="high-salary">High</span>' : '';
  tr.querySelector(".salary").innerHTML = `${salaryNumber.toFixed(2)} R ${salaryBadge}`;
  tr.dataset.salary = salaryNumber.toFixed(2);

  // ✅ تحديث المكافأة
  const bonusCell = tr.querySelector(".bonus");
  if (bonusNumber === 0) {
    bonusCell.textContent = "0";
  } else {
    bonusCell.innerHTML = `${((salaryNumber * bonusNumber) / 100).toFixed(2)} R <span class='bonus-badge'>Bonus</span>`;
  }
  tr.dataset.bonus = bonusNumber.toFixed(2);

  // ✅ حساب total salary
  const bonusAmount = (salaryNumber * bonusNumber) / 100;
  const totalSalary =  salaryNumber + bonusAmount;
  const bounsBadge = totalSalary >= 100000 ? '<span class="high-salary">High</span>' : '';
  tr.querySelector(".salary-bounas").textContent = `${totalSalary.toFixed(2)} R ${bounsBadge}`;
  tr.dataset.salarybonus = totalSalary.toFixed(2);

  // ✅ الحالة
  const badge = tr.querySelector(".badge");
  badge.textContent = newStatus;
  badge.className = "badge " + getBadgeClass(newStatus);

  // ✅ تحديث البيانات في dataset للبحث والفلاتر
  tr.dataset.name = newName.toLowerCase();
  tr.dataset.role = newRole.toLowerCase();
  tr.dataset.status = newStatus;
   updatePayroll();
   updateTotalSalary();
}


  function deleteEmployee(button) {
      const tr = button.closest("tr");
      trashTable.appendChild(tr);
      tr.querySelector(".actions").innerHTML = `
        <button class="restore-btn" onclick="restoreEmployee(this)"><i class="fas fa-undo"></i>Restore</button>
        <button class="forever-btn" onclick="permanentDelete(this)"><i class="fas fa-trash-alt"></i>Delete Forever</button>
      `;
          updateCounters();
          updatePayroll();
          updateTotalSalary();
      
    }

      function restoreEmployee(button) {
      const tr = button.closest("tr");
      tableBody.appendChild(tr);
      const salaryBadge = parseFloat(tr.dataset.salary) >= 100000 ? '<span class="high-salary">High</span>' : '';
      const bonusBadge = parseFloat(tr.dataset.bonus) > 0 ? '<span class="bonus-badge">Bonus</span>' : '';

      tr.querySelector(".actions").innerHTML = `
        <button class="bonus-btn" onclick="openBonusModal(this)"><i class="fas fa-gift"></i>Bonus</button>
        <button class="edit-btn" onclick="editEmployee(this)"><i class="fas fa-edit"></i>Edit</button>
        <button class="delete-btn" onclick="deleteEmployee(this)"><i class="fas fa-trash"></i>Delete</button>
      `;

      updateCounters();
       updatePayroll();
       updateTotalSalary();
      
    }

    function permanentDelete(button) {
      const tr = button.closest("tr");
     const confirmDelete = confirm("Are you sure of permanent delete ? ");
  if (confirmDelete) {
    trashTable.removeChild(tr);
    updateCounters(); // تحديث العدادات بعد الحذف
     updatePayroll();
     updateTotalSalary();
  }
    }


   document.getElementById("moveToTrashBtn").addEventListener("click", function () {
  const input = document.getElementById("salaryThresholdInput");
  const threshold = parseFloat(input.value);

  if (isNaN(threshold) || !threshold || threshold<=0) {
    alert("Please enter a valid salary threshold");
    return;
  }

  const rows = Array.from(tableBody.querySelectorAll('tr'));
  rows.forEach(row => {
    if (parseFloat(row.dataset.salary) <= threshold) {
      deleteEmployee(row.querySelector('.delete-btn'));
    }
  });

  input.value = ""; // تفريغ الحقل بعد التنفيذ
  updatePayroll();
  updateTotalSalary();
});

openFilterBtn.addEventListener("click", () => {
  filterModal.style.display = "block";
});

closeFilterBtn.addEventListener("click", () => {
  filterModal.style.display = "none";
});




applyFilterBtn.onclick = () => {
  const nameVal = nameFilter.value.toLowerCase();
  const roleVal = roleFilter.value.toLowerCase();
  const statusVal = statusInput.value;
  const minSalary = parseFloat(minSalaryInput.value) || 0;
  const minBonus = parseFloat(minBonusInput.value) || 0;

  const rows = document.querySelectorAll("#employeeTable tbody tr");

  rows.forEach(row => {
    const name = row.querySelector(".name").textContent.toLowerCase();
    const role = row.querySelector(".role").textContent.toLowerCase();
    const status = row.dataset.status.toLowerCase();
    const salary = parseFloat(row.dataset.salary);
    const bonus = parseFloat(row.dataset.bonus) || 0;

    const matchName = name.includes(nameVal);
    const matchRole = role.includes(roleVal);
    const matchStatus = !statusVal || status === statusVal;
    const matchSalary = salary >= minSalary;
    const matchBonus = bonus >= minBonus;

    row.style.display = (matchName && matchRole && matchStatus && matchSalary && matchBonus) ? "" : "none";
    
  });

filterModal.style.display = "none";

};

resetFilterBtn.onclick = () => {
  document.querySelectorAll("#employeeTable tbody tr").forEach(row => {
    row.style.display = "";
  });
 nameFilter.value = "";
roleFilter.value = "";
  statusInput.value = "";
  minSalaryInput.value = "";
  minBonusInput.value = ""; // مسح bonus
filterModal.style.display = "none";
};




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