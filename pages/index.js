import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

//componets
import Character from "../components/Characters";
import Nav from "../components/Nav";
export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  const [search, setSearch] = useState("");

  // console.log("InitialState", initialState);

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs apollo crash course</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <h1>This is home page</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const results = await fetch("/api/SearchCharacter", {
            method: "post",
            body: search,
          });
          const { characters, error } = await results.json();
          if (error) {
            console.log("Error occured");
          } else {
            setCharacters(characters);
          }
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          type="submit"
          id="search-btn"
          onClick={(e) => {
            if (search === "") {
              e.preventDefault();
            }
          }}
        >
          Search
        </button>
        <button
          type="reset"
          id="reset-btn"
          onClick={async () => {
            console.log("search", search);
            setSearch("");
            setCharacters(initialState.characters);
          }}
        >
          Reset
        </button>
      </form>
      <Character characters={characters} />
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
            }
            image
          }
        }
      }
    `,
  });
  return {
    props: {
      characters: data.characters.results,
    },
  };
}
