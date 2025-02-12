"use client";
import { useState } from "react";

export default function Home() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });
        const data = await res.json();
        setShortUrl(data.shortId ? `http://localhost:3000/${data.shortId}` : "");
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
                    >
                        Shorten
                    </button>
                </form>
                {shortUrl && (
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
