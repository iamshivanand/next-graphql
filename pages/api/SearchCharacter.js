import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  //in this we are going to take something from request body and use that to search through graphql
  //1.Succesful find of the character.
  //2.Typed in character which is not found.
  //3.is something else happen we respond with error 500 and ask them to try again.
  const search = req.body;

  try {
    const { data } = await client.query({
      query: gql`query{
            characters(filter:{name:"${search}"}){
            info{
            count
            pages
            }
            results{
            name
            id
            location{
            id
            name
            }
            origin{
            id
            name
            }
            episode{
            id
            episode
            air_date
            }
            image
            }
            }
            }`,
    });
    res.status(200).json({ characters: data.characters.results, error: null });
  } catch (error) {
    if (error.message === "404: Not Found") {
      res.status(400).json({
        characters: null,
        error: "No Character Found",
      });
    } else {
      res.status(500).json({
        characters: null,
        error: "Internal Error, Please Try again",
      });
    }
  }
};
