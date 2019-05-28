

class User {


    /**
     * @swagger
     * /users:
     *    get:
     *      parameters:
     *      - name: "status"
     *      description: This should return all users
     */
    getAllUsers (req, res){
        return res.end('This sould return all users')
    }


}


module.exports  = new User();