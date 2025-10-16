import User from '../model/userModel.js'

// export const getCurrentUser=async(req,res)=>{
//   try {
//     let user=await User.findById(req.userId).select("-password")
//     if(!user){
//        return res.status(404).json({message:"user is not found"})
//     }

//      return res.status(200).json(user)
//   } catch (error) {
//      console.log("error");
//     return res.status(500).json({ message: `getCurrentUser error ${error}` });
//   }
// }
const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${serverUrl}/api/auth/getCurrentUser`, {
      withCredentials: true,
    });
    setUserData(response.data);
  } catch (error) {
    console.log("No active session");
    setUserData(null); // 🔥 ensure context resets when cookie is gone
  }
};


export const getAdmin=async(req,res)=>{
  try {
    let adminEmail=req.adminEmail;

    if(!adminEmail){
      return res.status(404).json({message:"admin is not found"})
    }
    return res.status(201).json({email:adminEmail,role:"admin"})
  } catch (error) {
     console.log("error");
    return res.status(500).json({ message: `getAdmin error ${error}` });
  }
}
