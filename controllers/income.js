const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  // deconstruction de l'objet REQ (la réception via HTTP)
  const { title, amount, category, description, date } = req.body;
  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //protection si vide
    if (!title || !category || !description || !date) {
      return res
        .status(400)
        .json({ message: "Il faut saisir tous les champs!" });
    }
    if (amount <= 0 || isNaN(amount)) {
      return res
        .status(400)
        .json({ message: "Il faut saisir un nombre, supérieur à 0." });
    }
    await income.save();
    res.status(200).json({ message: "Ajout avec success !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    //find pour faire remonter le dernier ajout en premier
    const incomes = await IncomeSchema.find().sort({ createAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des Incomes" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Revenu supprimé" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur lors de la suppression du revenu" });
    });
};
