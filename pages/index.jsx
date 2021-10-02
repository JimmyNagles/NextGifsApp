import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Home(props) {
  const [form, setForm] = useState({});
  const [SearchResults, setSearchResults] = useState([]);
  const [term, setTerm] = useState("space");

  useEffect(() => {
    setSearchResults(props.catGifs.data);
    console.log(`SearchResults`, SearchResults);
  }, [props]);

  const handleInput = (event) => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const search = async (event) => {
    event.preventDefault();
    let giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${form.searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=9`
    );
    giphys = await giphys.json();

    setSearchResults(giphys.data);
    setTerm(form.searchTerm);
  };

  return (
    <div>
      <Head>
        <title>Gifs Searchs App</title>

        <meta
          name="description"
          content="looking for gifs? Search for as many gifs as you like!"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <p>
        {" "}
        <Link href="/search/[pid]" as={`/search/${term}`}>
          <a>{`http://localhost:3000/search/${term}`}</a>
        </Link>
      </p>

      <h1>Search For Any Gifs you like!</h1>

      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInput} type="text" />
        <button>Search</button>
      </form>

      <h2>Search Results for {term}</h2>
      {console.log(SearchResults)}
      {/* div for map arr */}
      <div className="search-grid">
        {SearchResults.map((each, index) => {
          return (
            <div className="card" key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  let catGifs = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=space&api_key=dfo2laKhn86xuOypkpiBpqAGqHgiJsSR&limit=10"
  );

  catGifs = await catGifs.json();

  return { props: { catGifs: catGifs } };
}
