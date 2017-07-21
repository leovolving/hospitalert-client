module.exports = {
  PORT: process.env.PORT || 3000,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:8080",
  APP_ID: process.env.REACT_APP_FB_APP_ID
};