class RPC {
    constructor(opts) {
        axios.defaults.baseURL = opts.host;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    _rpc = async (method, params = null, id = null) => {
        return axios.post('', {
            jsonrpc: 2.0,
            id: id,
            method,
            params
        });
    }

    saveFieldsData = async (param, id) => {
        const savedData = await this._rpc('form_fields.updateFormFields', param, id);
        return savedData;
    }

    getFieldsByUid = async (form_uid = '') => {
        const formFields = await this._rpc('form_fields.getFormFieldsByUuid', {
            "form_uid": form_uid
        })
        return formFields;
    }

    getFormWithDataByUid = async (form_uid = '') => {
        const formData = await this._rpc('form.getFormByUuid', {
            "form_uid": form_uid
        });

        const formFieldsData = await this._rpc('form_fields.getFormFieldsByUuid', {
            "form_uid": form_uid
        });

        return {
            form_name: formData.data.result.form_name,
            form_uid: formData.data.result.form_uid,
            fields: formFieldsData.data.result
        };
    }
}