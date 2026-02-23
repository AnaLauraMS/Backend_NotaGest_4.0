const User = require('../models/userModel');

// CREATE
const createProfile = async (email, nome, senha) => {
  try {
    const newProfile = new User({ nome, email, senha });
    await newProfile.save();
    return newProfile;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('Usuário já existe.');
    }
    console.error('Erro ao criar perfil:', error.message);
    throw new Error('Falha na criação do perfil.');
  }
};

// READ
const getProfileById = async (_id) => {
    try {
        return await User.findById(_id);
    } catch (error) {
        console.error('Erro ao buscar perfil:', error.message);
        throw new Error('Falha ao buscar o perfil.');
    }
};

// UPDATE
const updateProfileById = async (_id, updateData) => {
    try {
        delete updateData.email; // Evita alteração de email
        const updatedProfile = await User.findByIdAndUpdate(
            _id,
            { $set: { ...updateData, updatedAt: Date.now() } },
            { new: true, runValidators: true }
        );
        return updatedProfile;
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error.message);
        throw new Error('Falha na atualização do perfil.');
    }
};

// DELETE
const deleteProfileById = async (_id) => {
    try {
        const result = await User.findByIdAndDelete(_id);
        return !!result;
    } catch (error) {
        console.error('Erro ao deletar perfil:', error.message);
        throw new Error('Falha na exclusão do perfil.');
    }
};



module.exports = {
    createProfile,
    getProfileById,
    updateProfileById,
    deleteProfileById,
};
