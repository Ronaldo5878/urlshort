import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectPage() {
    const router = useRouter();
    const { shortId } = router.query;

    useEffect(() => {
        if (!shortId) return;

        const fetchUrl = async () => {
            const docRef = doc(db, "shortenurls", shortId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                window.location.href = docSnap.data().originalUrl;
            } else {
                router.replace("/");
            }
        };

        fetchUrl();
    }, [shortId, router]);

    return <p>Redirecting...</p>;
}
