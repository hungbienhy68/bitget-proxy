const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Proxy Bitget P2P đang hoạt động!');
});

app.get('/p2p', async (req, res) => {
  try {
    const response = await axios.post('https://www.bitget.com/api/p2p/v2/merchantAds/advList', {
      "page": 1,
      "payType": "",
      "asset": "USDT",
      "tradeType": "BUY",
      "fiat": "VND",
      "publisherType": null
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi gọi API Bitget', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại cổng ${PORT}`);
});
