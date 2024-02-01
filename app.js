const express = require('express');
const app = express();

require('dotenv').config();

const userRoutes = require("./routes/users");
const marcaRoutes = require("./routes/marca");
const modeloRoutes = require("./routes/modelo");
const authRoutes = require("./routes/auth");

const cors = require('cors')

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function main() {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log('Database connected')
}
main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/users',userRoutes);
app.use('/marca',marcaRoutes);
app.use('/modelo',modeloRoutes);
app.use('/auth',authRoutes)

app.use('/',(req,res) => (res.send("<p>Que chulo esto</p>")));

app.listen(3000, function() {
    console.log(
        `El servidor se ha iniciado en el puerto ${process.env.PORT}`
    );
})