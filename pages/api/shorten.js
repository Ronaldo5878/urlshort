import { db } from "../../lib/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { url } = req.body;

        // ✅ Validate URL
        if (!url || typeof url !== "string") {
            return res.status(400).json({ error: "Invalid URL format" });
        }

        // ✅ Generate shortId
        const shortId = nanoid(6);
        const shortUrlRef = doc(collection(db, "shortenurls"), shortId);

        // ✅ Store in Firestore
        await setDoc(shortUrlRef, {
            originalUrl: url,
            shortId,
            createdAt: serverTimestamp(),
        });

        console.log("Short URL created:", shortId);

        // ✅ Return shortened URL
        res.status(201).json({ shortUrl: `http://localhost:3000/${shortId}` });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
