import "@/src/styles/globals.css";
import Layout from "../components/Utils/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
