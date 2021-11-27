const { notNull } = require("../../utils/utilities");
const Doctor = require("../models/doctors.model");

const createDoctor = async (req, res) => {

    const { name, crm, speciality, clinic, phone, favorite } = req.body;
    const obj = {name,crm,speciality,clinic};

    const searchDoctor = await Doctor.findOne({ where: { crm: crm } }).then(function (data) {

      if(data) {
        
           res.status(400).json({message: `Não é possível cadastrar, pois já existe outro cadastro com o CRM: ${crm}.`})
      
      } else {

            if ( !notNull(obj)) {

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
          
                const newDoctor = Doctor.create(doctor);
                res.status(200).json({message: `Cadastro do doutor ${name} criado com sucesso`});
              
              } catch (error) {
                res.status(500).send({ message: error.message });
              }
                
            }
          
      }

    }).catch( function ()  {
      
      res.status(500).json({ message: `Ocorreu um erro durante o Create Doctor.`})

    });
  
};

  
  const getAllDoctors = async (req, res) => {
    const favorite = req.query.favorite;

    try {
      
      const where = favorite ? { where: { favorite } } : {};
      const doctors = await Doctor.findAll({
        where,
        order: [['name', 'DESC']]
      
      });
      
      if (doctors && doctors.length > 0) {
        res.status(201).send(doctors);

      } else {
          res.status(204).send()
      }
      
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };



  const getDoctorbyId = async (req, res) => {

    try {
      const doctorId = req.params.id;
      const doctorById = await Doctor.findByPk(doctorId)
      
      if (doctorById == null) {
          return res.status(404).json({ message: `Médico não encontrado com o id ${doctorId}`})
      
        } else {
          
          res.json(doctorById);
        }
  

    } catch (error) {
      res.status(500).json({ message: `Ocorreu um erro durante a busca pelo Médico.`})

    };        

  }


const updateDoctor = async (req, res) => {
  
  try {

    const doctorId = await Doctor.findByPk(req.params.id);
    const updateBody = req.body;

    const obj = {doctorId, updateBody};

    if (!doctorId) {
        return res.status(400).json({message: `Médico não encontrado com o id: ${req.params.id}`});
        
    } else {
           
      let keyList = Object.keys(updateBody);
      keyList.forEach((key) => {
        doctorId[key] = updateBody[key];
      });
  
      const doctorUpdated = await doctorId.save();
      res.status(200).json([{
          "message": `Dados do Médico atualizado com sucesso!`,
          doctorUpdated
      }]);
  
    }

    
  } catch (error) {

    res.status(500).json({ message: `Ocorreu um erro durante a atualização do artigo.`})

  }

}

  
  module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorbyId,
    updateDoctor

  };