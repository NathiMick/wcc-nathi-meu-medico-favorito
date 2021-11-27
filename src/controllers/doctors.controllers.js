const { canTreatArrayAsAnd } = require("sequelize/dist/lib/utils");
const { isNotNull, sendErrorMessage } = require("../../utils/utilities");
const Doctor = require("../models/doctors.model");

    /***** CREATE DOCTOR *****/

const createDoctor = async (req, res) => {
    const { name, crm, speciality, clinic, phone, favorite } = req.body;
    const obj = {name,crm,speciality,clinic};
    const searchDoctor = await Doctor.findOne({ where: { crm: crm } }).then(function (data) {

      if(data) {
        // CRM seached in "CRM" not Found 
        res.status(400).json({message: `Não é possível cadastrar, pois já existe outro cadastro com o CRM: ${crm}.`})
      
      } else {

        if ( !isNotNull(obj) ) {
          // Verify if "name", "crm", "speciality" and "clinic" is not filled as null, undefined or ""
          res.status(400).json({message: `Por favor preencha todos os campos para para cadastrar seu Doutor favorito!`});
              
            } else {

              try {          
                const doctor = Doctor.create({
                  name,
                  crm,
                  speciality,
                  clinic,
                  phone,
                  favorite,
                });
                
                // New doctor created
                const newDoctor = Doctor.create(doctor);
                res.status(200).json({message: `Cadastro do doutor ${name} criado com sucesso`});

                // Catch error if something went wrong while POSTING at DB
              } catch (error) { sendErrorMessage(error, res) };
            };
      };
      // Catch error if something went wrong while searching for CRM
    }).catch( function (error)  { sendErrorMessage(error, res) });
};


    /***** GET ALL DOCTORS FROM DB *****/
  
const getAllDoctors = async (req, res) => {
    const favorite = req.query.favorite;

    try {
      const where = favorite ? { where: { favorite } } : {};
      const doctors = await Doctor.findAll({
        where,
        order: [['name', 'DESC']]
      });
      
      // Verify if found any data at DB
      if (doctors && doctors.length > 0) {
        res.status(201).send(doctors);

      } else {
          res.status(204).send()
      };
      // Catch error if something went wrong while returning all data from DB
    } catch (error) { sendErrorMessage(error, res) };
};


    /***** GET DOCTOR BY ID *****/

 const getDoctorbyId = async (req, res) => {
    try {
      const doctorId = req.params.id;
      const doctorById = await Doctor.findByPk(doctorId)
      
      if (doctorById == null) {
        // Verify if id is not invalid ou Null
          return res.status(404).json({ message: `Médico não encontrado com o id ${doctorId}`})
      
        } else {
          // Return data found by ID
          res.json(doctorById);
        }
      // Catch error if something went wrong while searching at DB
    } catch (error) { sendErrorMessage(error, res) };        
 };

    /***** UPDATE *****/

const updateDoctor = async (req, res) => {
  try {
    const doctorId = await Doctor.findByPk(req.params.id);
    const updateBody = req.body;
    const obj = { doctorId, updateBody };

    if (!doctorId) {
      // Verify if ID was found at DB. If not fournd, return error message
      return res.status(400).json({message: `Médico não encontrado com o id: ${req.params.id}`});
        
    } else {
      // Loop to update only the data informed at requisition body           
      let keyList = Object.keys(updateBody);
      keyList.forEach((key) => {
        doctorId[key] = updateBody[key];
      });
      // Save updated data at DB
      const doctorUpdated = await doctorId.save();
      res.status(200).json([{
          "message": `Dados do Médico atualizado com sucesso!`,
          doctorUpdated
      }]);
        // Catch error if something went wrong while searching at DB
    }; } catch (error) { sendErrorMessage(error, res) }
};


    /***** DELETE DOCTOR *****/

const deleteDoctor = async (req, res) => {
  const { id: doctorId } = req.params;

  try {
      const doctorFoundById = await Doctor.findByPk(doctorId);
      
      if(doctorFoundById == null) {
        // Verify if ID was found in the DB and return error if not found
        return res.status(404).json({message: `Médico não encontrado com o ID: ${req.params.id}`});
      } 
      // Delete doctor found by ID from the DB and return message
      await doctorFoundById.destroy();
      res.status(202).json({message: `Doutor ${doctorFoundById.name} deletado com sucesso!`})
    
    // Catch error if something went wrong while searching at DB
  } catch (error) { sendErrorMessage(error, res) };

  // const { id: doctorId } = req.params;

  // try {
  //     const doctorFoundById = await Doctor.findByPk(doctorId);

  //   if ( doctorFoundById == null ) {
  //     return res.status(404).json({message: `Médico não encontrado com o ID: ${req.params.id}`});
      
  //   } else {
  //       await Doctor.destroy(doctorFoundById);
  //       return res.status(202).json({message: `Doutor ${doctorFoundById.name} deletado com sucesso!`})
  //   }

  // } catch (error) { sendErrorMessage(error, res) }; 

};


    /***** UPDATE FAVORITE DOCTOR *****/

const updateFavorite = async (req, res) => {
  const doctorId = req.params.id;
  const favorite = req.body.favorite;
  try {
    const updateDoctor = await Doctor.update({favorite},
       { where: { 
         id: doctorId
       } 
      });
      if(updateDoctor && updateDoctor[0] > 0) {
        // Verify if ID was found int the DB and update if found
        res.status(200).send({message: `Médico com ID ${doctorId} marcado como favorito`});
      } else {
        res.status(404).send({message: `Médico com ID ${doctorId} não encontrato`})
      }
  // Catch error if something went wrong while searching at DB
  } catch (error) { sendErrorMessage(error, res) }

};

  
  module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorbyId,
    updateDoctor,
    deleteDoctor,
    updateFavorite

  };