const Client = require('../model/clientModel');

exports.createClient = async (req, res, next) => {
  const user = await Client.create({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  res.status(201).json({
    status: 'success',
    user,
  });
};

exports.getAllClients = async (req, res, next) => {
  const alluser = await Client.find();
  res.status(200).json({
    status: 'success',
    data: {
      alluser,
    },
  });
};

exports.getClinet = async (req, res, next) => {
  const user = Client.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};
