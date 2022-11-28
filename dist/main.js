"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cat_1 = __importDefault(require("./utils/cat"));
const touch_1 = __importDefault(require("./utils/touch"));
const command = process.argv[2];
const path = process.argv[3];
if (command && path) {
    switch (command) {
        case 'touch':
            (0, touch_1.default)(path);
            break;
        case 'cat':
            (0, cat_1.default)(path);
            break;
        default:
            console.log('Unknown command');
    }
}
else {
    console.log('Command missing');
}
//# sourceMappingURL=main.js.map