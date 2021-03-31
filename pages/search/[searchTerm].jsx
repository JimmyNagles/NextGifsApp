import Head from "next/head"
import {useRouter} from 'next/router'
import Link from 'next/link'
import Footer from "../../components/Footer"


export default function Search(initialData) {

    const router = useRouter()

    return (
        <div>

<Head>
<title>Search result for : {router.query.searchTerm}</title>

<meta name="description" content={initialData.giphys.data.map((each, index) => each.title + ' ')}></meta>
<link rel="icon" href="/flavicon.ico" />
<link rel="stylesheet" href="/style.css" />
</Head>

<p>Go <Link href="/"><a>home</a></Link></p>

<h1>Search for result for : {router.query.searchTerm}</h1>




<div className="search-grid">

{console.log(`initialData`, initialData)}

{initialData.giphys.data.map((each, index) => {
      return(
          <div key={index}>
          <h3>{each.title}</h3>
          <img src={each.images.original.url} alt={each.title}/>
          </div>
      )
  })}

</div>



<Footer/>
            
        </div>
    )
}


export async function getServerSideProps(context) {
  
    const searchTerm = context.query.searchTerm
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`)
    giphys = await giphys.json()
    return {props: {giphys: giphys}} 
}