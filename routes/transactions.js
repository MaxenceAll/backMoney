// import de la fonction addIncome du controller
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense')
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income')
// creation d'un router
const router = require('express').Router()

// routes + method associée
router
        .post('/add-income', addIncome)
        .get('/get-incomes', getIncomes)
        .delete('/delete-income/:id', deleteIncome)

        .post('/add-expense', addExpense)
        .get('/get-expenses', getExpenses)
        .delete('delete-expense/:id' , deleteExpense)


module.exports = router