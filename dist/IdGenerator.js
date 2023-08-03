"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdGenerator {
    static rand() {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        return arr[0] / (0xffffffff + 1);
    }
    /***
     * Generates a random string of specified size
     * @param size - The length of the string to generate
     * @returns {string} - The generated random string
     */
    static text(size = 32) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < size; i++)
            text += possible.charAt(Math.floor(IdGenerator.rand() * possible.length));
        return text;
    }
}
exports.default = IdGenerator;
