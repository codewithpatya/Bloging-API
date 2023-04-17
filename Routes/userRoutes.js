const {postUser,postLogins,getUser,putUser,deleteUser, getDataById} = require("../Controller/userController")

const route = require("express").Router()

route.post("/",postUser)

// single user get

route.get('/byid/:id',getDataById)

route.post("/login",postLogins)

route.get("/",getUser)

route.put("/:id",putUser)

route.delete("/:id",deleteUser)

module.exports = route