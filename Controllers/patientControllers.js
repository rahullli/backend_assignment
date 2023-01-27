// Logic Part
const patients = require("../models/patientSchema.js");
const moment = require("moment");

// Register user 

exports.patient_post = async (req , res)=>{

   const {
        firstName , 
        lastName , 
        age,
        dob , 
        gender , 
        phoneNumber, 
        email, 
        address ,
        insurance ,
        medicalHistory, 
        maritalStatus, 
        disease ,
        consultedDoctor 
    } = req.body ;

    if (!firstName || 
        !lastName || 
        !age || 
        !dob || 
        !gender ||
        !phoneNumber ||
        !email || 
        !address ||
        !insurance || 
        !maritalStatus ||
        !disease ||
        !consultedDoctor) {
        res.status(401).json("All Inputs is required")
    }

    try{

        const preuser = await patients.findOne({ email: email });

        if (preuser) {
            res.status(401).json("This user already exist in our databse")
        }
        else {

            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const patientData = new patients( {
                firstName , 
                lastName , 
                age,
                dob , 
                gender , 
                phoneNumber, 
                email, 
                address ,
                insurance ,
                medicalHistory, 
                maritalStatus, 
                disease ,
                consultedDoctor 
        
        
            });
            await patientData.save();
            res.status(200).json(patientData);
        }
    }
    catch (error) {
        res.status(401).json(error);
        console.log(error , "catch block error")
    }

}

// Get Patient
exports.patient_get = async(req, res)=>{

    try{
        // will return all the users
        const patientdata = await patients.find()
        res.status(200).json(patientdata)
    }
    catch(error){
        res.status(401).json(error);
    } 
}

// Getting Single Patient

exports.single_patient_get = async (req  , res)=>{

    const {id} = req.params ;
    try{

        const patientdata = await patients.findOne({_id : id});
        res.status(200).json(patientdata);
    }
    catch(error){
        res.status(401).json(error);
    }
}

// Update Patient

exports.edit_patient_detail = async (req , res)=>{

    const {id} = req.params ;
    const {
        
        firstName , 
        lastName , 
        age,
        dob , 
        gender , 
        phoneNumber, 
        email, 
        address ,
        insurance ,
        medicalHistory, 
        maritalStatus, 
        disease ,
        consultedDoctor   
    } = req.body;

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try{
        const update_detail = await patients.findByIdAndUpdate({_id: id} , {

            firstName , 
            lastName , 
            age,
            dob , 
            gender , 
            phoneNumber, 
            email, 
            address ,
            insurance ,
            medicalHistory, 
            maritalStatus, 
            disease ,
            consultedDoctor ,
            dateUpdated

        }, {
            new : true
        });

        await update_detail.save();
        res.status(200).json(update_detail);
    }

    catch(error){
            res.status(401).json(error);
        }
}

// Delete Patient

exports.patient_delete = async (req , res)=>{

    const {id} = req.params ;
    try{

        const delete_patient = await patients.findByIdAndDelete({_id:id});
        res.status(200).json(delete_patient);
    }

    catch(error){
        res.status(401).json(error);
    }

}