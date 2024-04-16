const express = require('express');


const app = express();

app.use(express.json());
app.use('', require('./Routes/ProductRoute'));
app.use('', require( './Routes/cattegoryRoute' ));
app.use('', require( './Routes/userRoute'));
app.use('', require( './Routes/tipeRoute'));
app.use('', require ( './Routes/addressRoute')); 
app.use('', require( './Routes/cartRoute'));
app.use('', require( './Routes/fasilitasRoute'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
