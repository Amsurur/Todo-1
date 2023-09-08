let api = "https://64f80aa0824680fd217f0e00.mockapi.io/api/card/user";
let addModal = document.querySelector(".addModal");
let addBtn = document.querySelector(".addBtn");
let closeAddModal = document.querySelector(".closeAdd");
let box = document.querySelector(".box");
let addForm = document.querySelector(".addForm");
let tr1 = document.querySelector(".tr1");
let add = document.querySelector(".add");
let infoModal = document.querySelector(".infoModal");
let infoBtn = document.querySelector(".infoBtn");
let p1 = document.querySelector(".p1");
let p2 = document.querySelector(".p2");
let p3 = document.querySelector(".p3");
let editModal = document.querySelector(".editModal");
let editForm = document.querySelector(".editForm");
let closeEdit = document.querySelector(".closeEdit");
let searchForm = document.querySelector(".searchForm");
// search
// async function searchUser() {
//   try {
//     let { data } = await axios.get(api);
//     getList(data);
//     searchForm.onsubmit = (event) => {
//       event.preventDefault();
//       let value = searchForm["search"].value.toLowerCase().trim();
//       let filterData = data.fiter((user) =>
//         user.title.toLowerCase().includes(value)
//       );
//       getList(filterData);
//     };
//   } catch (error) {
//     console.error(error);
//   }
// }
// add
addBtn.onclick = () => {
  addModal.showModal();
};
closeAddModal.onclick = () => {
  addModal.close();
};

addForm.onsubmit = (event) => {
  event.preventDefault();
  let newUser = {
    title: event.target["titleAdd"].value,
    desc: event.target["descAdd"].value,
    completed: false,
  };
  post(newUser);
  addModal.close();
};

async function post(user) {
  try {
    let { data } = await axios.post(api, user);
    get();
  } catch (error) {
    console.error(error);
  }
}
// info
infoBtn.onclick = () => {
  infoModal.close();
};
// delete
async function deleteUser(id) {
  try {
    let { data } = await axios.delete(`${api}/${id}`);
    get();
  } catch (error) {
    console.error(error);
  }
}
// edit
async function edit(id, user) {
  try {
    let { data } = await axios.put(`${api}/${id}`, user);
    get();
  } catch (error) {
    console.error(error);
  }
}
closeEdit.onclick = () => {
  editModal.close();
};
function editUser(e) {
  editModal.showModal();
  editForm["titleEdit"].value = e.title;
  editForm["descEdit"].value = e.desc;
  editForm.onsubmit = (event) => {
    event.preventDefault();
    let editObj = {
      title: event.target["titleEdit"].value,
      desc: event.target["descEdit"].value,
    };
    edit(e.id, editObj);
    editModal.close();
  };
}
// check
async function checked(id, user) {
  try {
    let { data } = await axios.put(`${api}/${id}`, user);
    get();
  } catch (error) {
    console.error(error);
  }
}

// get
async function get() {
  try {
    let { data } = await axios.get(api);
    getList(data);
    searchForm.onsubmit = (event) => {
      event.preventDefault();
      let value = searchForm["search"].value.toLowerCase().trim();
      let filterData = data.filter((user) => {
        return (
          user.title.toLowerCase().includes(value) ||
          user.desc.toLowerCase().includes(value)
        );
      });
      getList(filterData);
    };
  } catch (error) {
    console.error(error);
  }
}

function getList(data) {
  box.innerHTML = "";
  data.forEach((e) => {
    let div = document.createElement("tr");
    div.classList = "div";
    let title = document.createElement("td");
    title.innerHTML = e.title;
    let desc = document.createElement("td");
    desc.innerHTML = e.desc;
    let status = document.createElement("td");
    let statusP = document.createElement("p");
    statusP.classList = "statusUnChecked";
    statusP.innerHTML = e.completed;
    let td1 = document.createElement("td");
    td1.classList = "td1";
    let delBtn = document.createElement("h1");
    delBtn.innerHTML = "X";
    delBtn.onclick = () => {
      deleteUser(e.id);
    };
    let editBtn = document.createElement("i");
    editBtn.classList = "gg-pen";
    // editBtn.innerHTML = "EDIT";
    editBtn.onclick = () => [editUser(e)];
    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = e.completed;
    check.onclick = () => {
      e.completed = !e.completed;
      checked(e.id, e);
    };
    if (e.completed) {
      title.classList = "checked";
      desc.classList = "checked";

      statusP.classList = "statusChecked";
    } else {
      title.classList = "unchecked";
    }
    let info = document.createElement("i");
    info.classList = "gg-info";
    info.onclick = () => {
      p1.innerHTML = e.title;
      p2.innerHTML = e.desc;
      p3.innerHTML = e.completed;
      infoModal.showModal();
    };
    status.appendChild(statusP);
    td1.appendChild(info);
    td1.appendChild(delBtn);
    td1.appendChild(editBtn);
    td1.appendChild(check);
    div.appendChild(title);
    div.appendChild(desc);
    div.appendChild(status);
    div.appendChild(td1);
    box.appendChild(div);
  });
}
get();
