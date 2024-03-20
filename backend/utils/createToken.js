import jwt  from 'jsonwebtoken';

const generateToken =async (res, userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"60d"
    })
    if(!token){
        console.log("token not generated");
    }
    console.log(token);

  try{
    res.cookie('jwt',token,{
        httpOnly:true,
        // secure: process.env.NODE_ENV !== "development",
        // sameSite:"strict",
        maxAge: 30*24*60*60*1000
    });

 
  }catch(e){
    console.log(e);
    console.log("error setting cookie");

  }

    return token;
}

export default generateToken