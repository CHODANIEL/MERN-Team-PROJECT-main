const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- 미들웨어 (라우터보다 위에 있어야 함) ---
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONT_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use((req, res, next) => { console.log('[REQ]', req.method, req.url); next(); });

// --- 라우터 ---
const authRoutes = require('./routes/authRoutes');
const bucketRoutes = require('./routes/bucketRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/buckets', bucketRoutes);

// --- 헬스체크 ---
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// --- DB 연결 ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB 연결 성공'))
    .catch(err => console.error('MongoDB 연결 실패:', err.message));

// --- 서버 실행 ---
app.get('/', (_req, res) => res.send('Hello Express'));
app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));