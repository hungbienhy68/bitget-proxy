const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Cấu hình headers để tránh bị chặn 403
const bitgetHeaders = {
  "User-Agent": "Mozilla/5.0",
  "Referer": "https://www.bitget.com",
  "Origin": "https://www.bitget.com",
  "Accept": "application/json",
};

// Route chính để gọi giá USDT
app.get("/api/bitget-price", async (req, res) => {
  const { fiat = "VND", side = "buy" } = req.query;

  try {
    const response = await axios.get("https://www.bitget.com/v1/p2p/adv/search", {
      headers: bitgetHeaders,
      params: {
        fiat,
        side,
        asset: "USDT",
        merchantPro: false,
        page: 1,
        rows: 1,
      },
    });

    const price = response.data?.data?.[0]?.price;
    if (!price) throw new Error("Không tìm thấy giá");

    res.json({ price });
  } catch (error) {
    console.error("Lỗi gọi API Bitget:", error?.response?.data || error.message);
    res.status(500).json({
      error: "Lỗi gọi API Bitget",
      detail: error?.response?.data || error.message,
    });
  }
});

// Mặc định trang chủ để test server sống
app.get("/", (req, res) => {
  res.send("Proxy Bitget P2P đang hoạt động!");
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
