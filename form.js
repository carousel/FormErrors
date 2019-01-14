var axios = require('axios');
var FormErrors = require('./formErrors');

 module.exports   =  class Form {
        constructor(data) {
            this.originalData = data;
            this.errors = {}
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
    };


