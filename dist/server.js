"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET_KEY)); // The KEY is: 10000
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', page_routes_1.default);
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.use((req, res) => {
    res.status(404).render('404');
});
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
