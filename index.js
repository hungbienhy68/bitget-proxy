const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/bitget-price', async (req, res) => {
  try {
    const { fiat = 'VND', side = 'buy' } = req.query;

    const payload = {
      page: 1,
      merchantPro: false,
      asset: 'USDT',
      fiat: fiat,
      tradeType: side.toUpperCase(),
      payTypes: [],
      publisherType: null
    };

    const response = await axios.post(
      'https://api.bitget.com/api/p2p/v1/merchant/advList',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://www.bitget.com/',
          'Origin': 'https://www.bitget.com'
        }
      }
    );

    const data = response.data.data;
    if (data && data.length > 0) {
      res.json({ price: data[0].price });
    } else {
      res.status(404).json({ error: 'Không tìm thấy dữ liệu từ Bitget' });
    }
  } catch (error) {
    console.error('Lỗi khi gọi API Bitget:', error.response?.data || error.message);
    res.status(500).json({ error: 'Lỗi máy chủ', detail: error.response?.data || error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy đang chạy tại http://localhost:${port}`);
});
