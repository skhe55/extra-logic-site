const rpc = new RPC({host: api.route});

let formData = {};

window.onload = async function() {
    const inputUidEl = document.querySelector('#form_uid');

    inputUidEl.value = window.location.href.split('?')[1];
    inputUidEl.setAttribute('disabled', 'true');
    await getFormWithDataByUid(inputUidEl.value);
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
    } catch(error) {
        console.error(`getFormWithDataByUid: ${error}`);
    }
}

function addElementsInForm(formData) {
    try {
        document.body.insertAdjacentHTML("beforeend", `<h3>${formData.form_name}</h3>`);
        formData.fields.forEach(field => {
            if(field.type_field_id === 1) {
                document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                    <p>Название: ${field.name_field}</p>
                    <p>Описание: ${field.description}</p>
                    <select autofocus required>${field.value ? field.value : ''}</select>
                </div>`);
            } else if(field.type_field_id === 3) {
                document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                    <p>Название: ${field.name_field}</p>
                    <p>Описание: ${field.description}</p>
                    <input type="text" id=${field.id} value=${field.value} disabled></input>
                 </div>`);
            } else if(field.type_field_id === 2) {
                document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                    <p>Название: ${field.name_field}</p>
                    <p>Описание: ${field.description}</p>
                    <textarea id=${field.id} disabled>${field.value}</textarea>
                 </div>`);
            }
        })
    } catch(error) {
        console.error(`addElementsInForm: ${error}`);
    }
}



