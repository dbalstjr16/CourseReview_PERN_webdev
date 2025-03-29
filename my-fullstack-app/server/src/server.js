const app = require('./app');

// ------ Run Server ------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running at Port:${PORT}`);
});
