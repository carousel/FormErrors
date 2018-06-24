class FormErrors {
    constructor() {
        this.errors = {}
    }
    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }
    record(errors) {
        this.errors = errors;
    }
    clear(field) {
        delete this.errors[field]
    }
    any() {
        return Object.keys(this.errors).length > 0;
    }
}

module.exports = FormErrors;
