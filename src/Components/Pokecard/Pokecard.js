import React from "react";
import { gql, useQuery } from "@apollo/client";
import "./pokecard-style.css";
const GET_POKEMON = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

function Pokecard() {
  const { error, loading, data } = useQuery(GET_POKEMON);
  console.log({ error, loading, data });

  return (
    <div className="poke-card-wrapper row">
      {
        loading
        ? <h1>Loading...</h1>
        :data.pokemon_v2_pokemon.map((pokemon) => {
            return (
              <div className="poke-card">
                <div className="poke-name">
                  <p>{pokemon.name.toUpperCase()}</p>
                </div>
                <div>
                  {
                    pokemon.pokemon_v2_pokemontypes.map((poke_types)=>{
                      return(
                        <span>
                          {poke_types.pokemon_v2_type.name}
                          {" "}
                        </span>
                      )
                    })
                  }
                </div>
              </div>
            );
          })
        
      }

      {}
    </div>
  );
}
export default Pokecard;
