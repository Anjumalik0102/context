import Head from "next/head";
import Navbar from "@/components/Navbar";
import Product from "@/components/Prdouct";




export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        
      </Head>
      <main>
        <div >
          <Navbar/>
          <Product/>
          </div>
           
       
      </main>
    </>
  );
}
