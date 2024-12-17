//1.load .env
require('dotenv').config()

//2. import express
const express = require('express')

//6. import cors
const cors = require('cors')

//8. import db
const db = require('./DB/connection')
const router = require('./Routes/router')

// const applicationMiddleware = require('./Middlewares/ApplicationMiddleWare')

//3. Create an application using express
const projectFair = express()

//7. middleware configuration
projectFair.use(cors())
projectFair.use(express.json())
// projectFair.use(applicationMiddleware)
projectFair.use(router)
// export imgae to frontend
projectFair.use('/uploads', express.static('./uploads'))

//4. Port Creation
const PORT = 4000 || process.env.PORT


//5. Server run
projectFair.listen(PORT, () => {
    console.log("project fair running on port" + PORT);
})

//http://localhost:3000/
projectFair.get('/', (req, res) => {
    res.send("Welocome to project fair")
})