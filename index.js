const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/p2p', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.bitget.com/api/p2p/v1/adv/search',
      {
        userType: '',
        side: 'buy',
        digitalCurrency: 'USDT',
        fiat: 'VND',
        payMethod: '',
        page: 1,
        rows: 10
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.bitget.com/api/p2p/v1/merchant/advertise/query-advertise-list?side=buy&coin=USDT&currency=VND');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
