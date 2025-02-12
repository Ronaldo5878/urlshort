"use client";
import { useState } from "react";

<head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2188814733147919"
     crossorigin="anonymous"></script></head>
export default function Home() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false); // ✅ Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // ✅ Show "Generating..." message

        const res = await fetch("/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();
        setShortUrl(data.shortUrl ? data.shortUrl : ""); 
        setIsLoading(false); // ✅ Hide "Generating..." message
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    URL Shortener
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter a long URL"
                        required
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={isLoading} // ✅ Disable button while loading
                    >
                        {isLoading ? "Generating..." : "Shorten"} {/* ✅ Dynamic button text */}
                    </button>
                </form>

                {/* ✅ Show loading message if still generating */}
                {isLoading && <p className="mt-4 text-center text-gray-500">Generating short URL...</p>}

                {/* ✅ Show shortened URL if available */}
                {shortUrl && !isLoading && (
                    <p className="mt-4 text-center text-gray-700">
                        Shortened URL:{" "}
                        <a href={shortUrl} target="_blank" className="text-blue-500 underline">
                            {shortUrl}
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}
