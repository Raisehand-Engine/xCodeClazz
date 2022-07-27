const KEYBOOK = {
    PYTHON_CODE: 'PYTHON_CODE'
}

class DB {

    constructor() {

    }

    savePythonCode(code = '') {
        this.save(KEYBOOK.PYTHON_CODE, code);
    }

    getPythonCode() {
        return this.get(KEYBOOK.PYTHON_CODE);
    }

    get(key) {
        if (localStorage.getItem(key)) return localStorage.getItem(key);
        return null;
    }

    save(key, value = null) {
        if (value == null) return;
        localStorage.setItem(key, value);
    }

    delete(key) {
        localStorage.removeItem(key);
    }

    clean() {
        localStorage.clear();
    }

}