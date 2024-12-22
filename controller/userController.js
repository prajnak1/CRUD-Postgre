import { UserModel } from "../postgres/postgres.js"
//CRUD Operations
//get (READ)
export const getAllEmp = async(req,res) =>{
    try{
        const users= await UserModel.findAll();
        if(users.length==0){
            return res.status(200).json({"error":"users not found"})
        }
        return res.status(200).json(users)

    } catch(error){
        console.log(error)
    return res.status(500).json({"error":"internal server error"})

}
}
//post 
export const addEmp = async(req,res) =>{
    const {name, email, designation,empId}   = req.body;
    try{
        const emp = await UserModel.findOne({where:{empId:empId}})
        if(emp==null){
            await UserModel.create(req.body);
            return res.status(201).json({message:"emp added successfully"})
        }
        return res.status(200).json({message:"already found"})
    } catch(e){
        console.log(e)
        return res.status(500).json({"error":"internal server error"})
    
    }
}
//PUT
//Handle cases when you can't find the data
export const updateEmp = async(req,res) =>{
    let empId = req.params.empId;

    try{
        const emp = await UserModel.update(res.body, {where:{empId }})
        if(emp[0]==0){
            return res.status(404).json({message:"not found"})
        }
        console.log(emp)
return res.status(200).json({message:"updated successfully"})
    }catch(e){
        console.log(e)
        return res.status(500).json({"error":"internal server error"})
    }
}
//Delete
export const deleteEmp = async (req, res) =>{
    let empId = req.params.empId;
    try{
        const emp = await UserModel.findOne({where:{empId:empId}})
        if(emp==null){
            return res.status(404).json({message:"emp not found"})
        }
        await emp.destroy()
        return res.status(200).json({message:"deleted successfully"})
    } catch(e){
        console.log(e)
        return res.status(500).json({"error":"internal server error"})
    }
}
