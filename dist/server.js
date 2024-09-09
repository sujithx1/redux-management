"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const AdminRoute_1 = __importDefault(require("./routes/AdminRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const mongoUrl = process.env.MONGO_URI || "";
mongoose_1.default
    .connect(mongoUrl)
    .then(() => console.log(colors_1.default.green('MongoDB Connected')))
    .catch((error) => console.log(colors_1.default.red(`MongoDB Connection Error: ${error}`)));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', userRoutes_1.default);
app.use('/admin', AdminRoute_1.default);
app.use(errorMiddleware_1.errorHandler);
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(colors_1.default.green(`server Running ${port}`)));
