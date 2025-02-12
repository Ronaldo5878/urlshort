import "@/styles/globals.css"; // Import global styles
import Navbar from "../components/Navbar"; // Import Navbar

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2188814733147919"
     crossorigin="anonymous"></script>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
