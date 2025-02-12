import { db, getDoc, doc } from "../../lib/firebase";

export default async function handler(req, res) {
    const { shortId } = req.query;
    if (!shortId) {
        return res.status(400).json({ error: "Short ID is required" });
    }
    
    const urlRef = doc(db, "shortenurls", shortId);
    const urlDoc = await getDoc(urlRef);
    
    if (urlDoc.exists()) {
        res.writeHead(302, { Location: urlDoc.data().originalUrl });
        res.end();
    } else {
        res.status(404).json({ error: "URL not found" });
    }
}
