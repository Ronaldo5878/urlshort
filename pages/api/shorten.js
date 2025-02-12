import { db } from "../../lib/firebase";
import { collection, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { url } = req.body;

        if (!url || typeof url !== "string") {
            return res.status(400).json({ error: "Invalid URL format" });
        }

        const shortId = nanoid(6);
        const shortUrlRef = doc(collection(db, "shortenurls"), shortId);

        await setDoc(shortUrlRef, {
            originalUrl: url,
            shortId,
            createdAt: serverTimestamp(),
        });

        // ✅ Dynamically get the domain (works on Vercel & local)
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        res.status(201).json({ shortUrl: `${baseUrl}/${shortId}` });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
