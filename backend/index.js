const cors = require('cors');

// 로컬 + 배포 둘 다 허용
const allow = new Set([
  'http://localhost:5173',
  process.env.FRONT_ORIGIN, // 예: https://mern-team-project-main.vercel.app
].filter(Boolean));

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);      // 서버-서버/포스트맨 등
    cb(null, allow.has(origin));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors());