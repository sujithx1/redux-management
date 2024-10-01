"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { errorHandler } from './middleware/errorMiddleware';
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const AdminRoute_1 = __importDefault(require("./routes/AdminRoute"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('uploads'));
// app.use(express.static(path.join(__dirname,'uploads')))
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
const mongoUrl = process.env.MONGO_URI || "";
mongoose_1.default
    .connect(mongoUrl)
    .then(() => console.log(colors_1.default.green('MongoDB Connected')))
    .catch((error) => console.log(colors_1.default.red(`MongoDB Connection Error: ${error}`)));
app.use('/api/auth', userRoutes_1.default);
app.use('/api/admin', AdminRoute_1.default);
// app.use(errorHandler)
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(colors_1.default.green(`server Running ${port}`)));
