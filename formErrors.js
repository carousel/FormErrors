
module.exports = class FormErrors {
        constructor() {
            this.errors = {}
        }

        has(field) {
            return this.errors.hasOwnProperty(field)
        }

        get(field) {
            if (this.errors) {
                if (this.errors[field]) {
                    return this.errors[field][0]
                }
            }
        }

        record(errors) {
            this.errors = errors;
        }

        clear(field) {
            if (this.errors) {
                if (this.errors[field]) {
                    delete this.errors[field];
                    return;
                }
            }
            this.errors = {}
        }
        any() {
            if (this.errors) {
                return Object.keys(this.errors).length > 0;
            }
        }
    };
