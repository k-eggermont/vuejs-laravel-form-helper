var Errors = require("./Errors");

class Form {
    
    constructor(data) {
        this.originalData = data;

        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();
        this.loading = false;
    }

    data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }
    
    
    post(url) {
        return this.submit('post', url);
    }

    
    put(url) {
        return this.submit('put', url);
    }

    
    patch(url) {
        return this.submit('patch', url);
    }

    
    delete(url) {
        return this.submit('delete', url);
    }

    
    submit(requestType, url) {
        this.loading=true;
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    this.loading=false;
                    this.onSuccess(response.data);

                    resolve(response.data);
                })
                .catch(error => {
                    this.loading=false;
                    this.onFail(error.response.data);

                    reject(error.response.data);
                });
        });
    }

    
    onSuccess(data) {
        //alert(data.message); // temporary

        //this.reset();
    }

    
    onFail(errors) {
        this.errors.record(errors);
    }
}
module.exports = Form;
