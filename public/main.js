const rpc = new RPC({host: api.route});

let formData = {};

window.onload = function() {
    const inputUidEl = document.querySelector('#form_uid');

    const debounceGetFieldsByUid = debounce((e) => {
        getFormWithDataByUid(e.target.value);
    }, 500);

    inputUidEl.addEventListener('input', (e) => {
        debounceGetFieldsByUid(e);
    });
}

async function getFieldsByUid(form_uid = '') {
    try {
        const formFields = await rpc.getFieldsByUid(form_uid);
        console.log(formFields);
    } catch(error) {
        console.error(`getFieldsByUid: ${error}`);
    }
}

async function getFormWithDataByUid(form_uid = '') {
    try {
        const fullFormData = await rpc.getFormWithDataByUid(form_uid);
        formData = {...fullFormData};
        addElementsInForm({...fullFormData});
        return {...fullFormData};
    } catch(error) {
        console.error(`getFormWithDataByUid: ${error}`);
    }
}

async function saveFieldsData() {
    try {
        for(let i = 0; i < formData.fields.length; i++) {
            if(document.getElementById(`${formData.fields[i].id}`)) {
                await rpc.saveFieldsData(
                    {...formData.fields[i], value: document.getElementById(`${formData.fields[i].id}`).value}, formData.fields[i].id
                )
            }
        }       
    } catch(error) {
        console.error(`saveFieldsData: ${error}`);
    }
}

function addElementsInForm(formData) {
    try {
        document.body.insertAdjacentHTML("beforeend", `Форма: <h2>${formData.form_name}</h2>`);
        formData.fields.forEach(field => {
            if(field.type_field_id === 1) {
                document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                    <p>Название: ${field.name_field}</p>
                    <p>Описание: ${field.description}</p>
                    <select autofocus required></select>
                </div>`);
            } else if(field.type_field_id === 3) {
                document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                    <p>Название: ${field.name_field}</p>
                    <p>Описание: ${field.description}</p>
                    <input type="text" id=${field.id}></input>
                 </div>`);
            } else if(field.type_field_id === 2) {
                document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                    <p>Название: ${field.name_field}</p>
                    <p>Описание: ${field.description}</p>
                    <textarea id=${field.id}></textarea>
                 </div>`);
            }
        })
    } catch(error) {
        console.error(`addElementsInForm: ${error}`);
    }
}

function swapPage() {
    window.location.href = `${api.baseUrl}/saved_data.html?${formData.form_uid}`
}

function debounce(func, timeout = 0) {
    let timer;
    return (...args) => {
        const next = () => func(...args);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(next, timeout > 0 ? timeout : 300);
    };
}


