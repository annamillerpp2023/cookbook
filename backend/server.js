const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Мідлвари
app.use(cors());
app.use(express.json());

// Підключення до MongoDB Compass
// Ми додаємо назву бази 'cookbook_db' в кінці посилання
mongoose.connect('mongodb://localhost:27017/cookbook_db')
    .then(() => console.log('✅ Підключено до MongoDB Compass!'))
    .catch(err => console.error('❌ Помилка підключення:', err));

// Схема даних
const RecipeSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

// МАРШРУТИ (ROUTES)

// 1. Отримати всі рецепти
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Додати новий рецепт
app.post('/api/recipes', async (req, res) => {
    const newRecipe = new Recipe({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущено: http://localhost:${PORT}`);
});
