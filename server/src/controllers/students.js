const Students = require('../models/students');
const status = require('http-status');
const checkEmptyFields = require('../utils/students/checkEmptyFields');

exports.Create = async (req, res) => {
  const { name, email, ra, cpf } = req.body;

  try {
    await checkEmptyFields.Check([
      { prop: 'name', value: name },
      { prop: 'email', value: email },
      { prop: 'ra', value: ra },
      { prop: 'cpf', value: cpf },
    ]);

    const [user, created] = await Students.findOrCreate({
      where: {
        ra,
      },
      defaults: {
        name,
        email,
        ra,
        cpf,
      },
    });

    if (!created) {
      throw `RA já cadastrado. Aluno: ${user.dataValues.name} | CPF: ${user.dataValues.cpf}`;
    }

    res.status(status.OK).json({
      msg: 'Cadastro realizado com sucesso.',
      student: user.dataValues,
    });
  } catch (error) {
    res
      .status(status.BAD_REQUEST)
      .json({ msg: 'Algo deu errado. Cadastro não realizado.', error });
  }
};

exports.GetAll = async (req, res) => {
  try {
    const result = await Students.findAll({
      order: [['name', 'ASC']],
    });
    res.status(status.OK).send(result);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ msg: 'Algo deu errado. ', error });
  }
};

exports.Update = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await checkEmptyFields.Check([
      { prop: 'name', value: name },
      { prop: 'email', value: email },
    ]);

    const [result] = await Students.update(
      {
        name,
        email,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!result) {
      throw `Cadastro não localizado.`;
    }

    res.status(status.OK).json({ msg: 'Cadastro atualizado com sucesso.' });
  } catch (error) {
    res
      .status(status.BAD_REQUEST)
      .json({ msg: 'Algo deu errado. Cadastro não atualizado.', error });
  }
};

exports.Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Students.destroy({
      where: {
        id,
      },
    });

    if (!result) {
      throw `Cadastro não localizado.`;
    }

    res.status(status.OK).json({ msg: 'Cadastro excluído com sucesso.' });
  } catch (error) {
    res
      .status(status.BAD_REQUEST)
      .json({ msg: 'Algo deu errado. Cadastro não excluído.', error });
  }
};
