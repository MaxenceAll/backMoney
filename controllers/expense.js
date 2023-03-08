const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  // deconstruction de l'objet REQ (la réception via HTTP)
  const { title, amount, category, description, date } = req.body;
  const expense = ExpenseSchema({
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
    await expense.save();
    res.status(200).json({ message: "Ajout avec success de la dépense!" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout d'une dépense" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    //find pour faire remonter le dernier ajout en premier
    const expense = await ExpenseSchema.find().sort({ createAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des dépenses" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Dépense supprimé" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur lors de la suppression de la dépense" });
    });
};
