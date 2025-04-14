const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Proxy Bitget P2P đang hoạt động!");
});

app.get("/api/bitget-price", async (req, res) => {
  try {
    const { fiat = "VND", side = "buy" } = req.query;

    const response = await axios.get(
      "https://api.bitget.com/api/p2p/v1/merchant/adv/search",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
        params: {
          fiat,
          side,
          tokenId: "USDT",
          page: 1,
          rows: 1,
        },
      }
    );

    const data = response.data.data;
    if (!data || data.length === 0) {
      return res.status(500).json({ error: "Không tìm thấy giá USDT" });
    }

    res.json({ price: data[0].price });
  } catch (error) {
    console.error("Lỗi gọi API Bitget:", error.message);
    res.status(500).json({ error: "Lỗi gọi API Bitget", detail: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
