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
                window.location.href = docSnap.data().originalUrl; // Redirects user
            } else {
                router.push("/404"); // Redirect to 404 if not found
            }
        };

        fetchUrl();
    }, [shortId, router]);

    return <p>Redirecting...</p>;
}
