// const UserMode = require("../mode/user")


// const createUser = async (req, res) => {
//   try {
//     const student = await UserModel.create(req.body)
//     console.log(req)
// res.status(201).json({id: user._id, username: user.username, email: user.email })
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }

// }

// module.export={register}





const UserModel = require("../model/user")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")


const signupController = (req,res)=>{
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: errors.array()[0].msg,
                errors: errors.array()
            })
        }

        const {username, email , password} = req.body;

        const extinguishUser = UserModel.findOne({email});

        if (extinguishUser){
          return res.status(400).json({
            message: "User already exist"
        });
        

        }
        
        const hashedPassword = bcrypt.hashSync(password, 10);






        // check if user exist
    const  extinguisher = User.findOne()
      }catch (error) {



    }
}



const register = async (req,res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).json({id: user._id,username: user.username, email: user.email});
    } catch (error) {
        res.status
    }
}


module.exports={ register}