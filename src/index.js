const app = require('./app');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`🚀 Task API running on port ${PORT} [${ENV}]`);
  console.log(`📡 PID: ${process.pid}`);
});