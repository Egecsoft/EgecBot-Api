require('dotenv').config();
const express = require('express');

const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT;
const app = express();

app.get('/ataturk', (req, res) => {
    const imagesPath = path.join(__dirname, 'images');

    fs.readdir(imagesPath, (err, files) => {
        if (err) return res.status(500).send('Resimler okunamadı.');

        const ataturkImages = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));

        if (ataturkImages.length === 0)
            return res.status(404).send('Hiç resim bulunamadı.');

        const randomImage = ataturkImages[Math.floor(Math.random() * ataturkImages.length)];

        res.sendFile(path.join(imagesPath, randomImage));
    });
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor..`);
});