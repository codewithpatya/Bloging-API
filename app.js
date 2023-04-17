const express = require("express")
const mongoose = require("mongoose")
require("dotenv/config")
const blogRoute = require("./Routes/blogRoute")
const userRoute = require("./Routes/userRoutes")
const cors = require('cors')
// initilize
const app = express()

// middleware
app.use(express.json())
app.use(cors())

// bydefault get
app.get("/",(req,res)=>{
    res.send("home")
})

app.use("/api/blog",blogRoute)
app.use("/api/user",userRoute)

// connection
app.listen(process.env.PORT)
async function main() {
    const res = await mongoose.connect(process.env.DB,{useNewUrlParser: true,
        useUnifiedTopology: true})
        const data = res.default
        console.log(data.STATES['1']);
}
main()