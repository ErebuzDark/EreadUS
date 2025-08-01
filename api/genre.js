export default async function handler(req, res) {
  try {
    const apiRes = await fetch("https://gomanga-api.vercel.app/api/genre");
    const data = await apiRes.json();

    // Allow all origins (CORS)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching genre data:", err);
    res.status(500).json({ error: "Server error" });
  }
}
