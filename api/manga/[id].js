export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const apiRes = await fetch(`https://gomanga-api.vercel.app/api/manga/${id}`);
    const data = await apiRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
