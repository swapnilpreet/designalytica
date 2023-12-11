const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
const calculationRoutes = require('./Routes/calculation.route')

app.use("/api",calculationRoutes)






// render deployment
const path = require('path');
__dirname=path.resolve();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
