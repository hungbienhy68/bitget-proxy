const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/bitget-price', async (req, res) => {
  try {
    const { fiat = 'VND', side = 'buy' } = req.query;
    const response = await axios.post(
      'https://api.bitget.com/api/p2p/v1/merchant/advList',
      {
        page: 1,
        merchantPro: false,
        asset: 'USDT',
        fiat: fiat,
        tradeType: side.toUpperCase(),
        payTypes: [],
        publisherType: null
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    const data = response.data.data;
    if (data && data.length > 0) {
      res.json({ price: data[0].price });
    } else {
      res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
    }
  } catch (error) {
    console.error('Lỗi khi gọi API Bitget:', error.message);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});

app.listen(port, () => {
  console.log(`Proxy đang chạy tại http://localhost:${port}`);
});
