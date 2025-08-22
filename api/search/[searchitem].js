export default async function handler(req, res) {
  const { searcheditem } = req.query;

  try {
    const apiRes = await fetch(`https://gomanga-api.vercel.app/api/search/${searcheditem}`);
    const data = await apiRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
