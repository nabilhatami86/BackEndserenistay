const express = require('express');
const product = require('./models/product');


const app = express();

app.use(express.json());
app.use('', require('./Routes/ProductRoute'));
app.use('', require( './Routes/cattegoryRoute' ));
app.use('', require( './Routes/userRoute'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
