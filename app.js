const axios = require('axios');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/notice', async (req, res) => {
    try {
        //fetch data from a json api
        const notice = await axios.get(
            'https://www.thegazette.co.uk/all-notices/notice/data.json'
        );
        //const noticeData = await not.json();
        res.json(notice.data); //send it back as a json response
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.use((req, res) => {
    res.status(404).send('Not found');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
