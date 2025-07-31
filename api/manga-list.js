export default async function handler(req, res) {
  const page = req.query?.page || "1";

  try {
    const apiRes = await fetch(`https://gomanga-api.vercel.app/api/manga-list/${page}`);
    const data = await apiRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
