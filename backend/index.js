// 라우터 등록보다 위에 위치!
const cors = require('cors');

app.use(cors({
    origin: true,            // ← 들어온 Origin을 그대로 반사
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());