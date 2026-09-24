"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Covid19DataError = void 0;
class Covid19DataError extends Error {
    isCovid19DataError = true;
    sdk = 'Covid19Data';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.Covid19DataError = Covid19DataError;
//# sourceMappingURL=Covid19DataError.js.map