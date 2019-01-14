import axios from "axios";

class Form {
    constructor(data, instance) {
        this.originalData = data;
        this.errors = {}
        this.instance = instance
        for (let field in data) {
            this[field] = data[field];
        }
        this.errors = new FormErrors();
    }
    reset() {
        for (let field in this.originalData) {
            this[field] = ''
        }
        this.errors.clear();
    }
    data() {
        let data = {}
        for (let field in this.originalData) {
            data[field] = this[field]
        }
        if (data['topic1']) {
            data['topic'] = data['topic1']
        }
        if (data['occupation1']) {
            data['occupation'] = data['occupation1']
        }
        return data;
    }
    submit(method, url) {
        return new Promise((resolve, reject) => {
            axios[method](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    if (this.instance) {
                        this.instance.loading()
                    }
                    this.onFail(error.response.data.errors)
                    reject(error.response.data.errors)
                })
        });
    }

    onSuccess(data) {
        this.reset();
    }
    onFail(errors) {
        this.errors.record(errors);
    }
}

export default Form;
