import { useRouter } from "next/router";
import { useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function RedirectPage() {
    const router = useRouter();
    const { shortId } = router.query;

    useEffect(() => {
        if (!shortId) return;

        const fetchUrl = async () => {
            const docRef = doc(db, "shortenurls", shortId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                window.location.href = docSnap.data().originalUrl; // Redirect to original URL
            } else {
                router.replace("/404"); // Redirect to 404 if URL not found
            }
        };

        fetchUrl();
    }, [shortId, router]);

    return <p>Redirecting...</p>;
}
