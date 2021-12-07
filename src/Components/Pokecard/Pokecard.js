import React,{useState} from "react";
import { gql, useQuery } from "@apollo/client";
import "./pokecard-style.css";
import axios from "axios";
const GET_POKEMON = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon(limit: 3) {
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

function GET_POKEMON_SPRITE(id){
  const [sprite,setSprite] = useState("");
   axios.get("https://pokeapi.co/api/v2/pokemon/"+id).then((res)=>{
      setSprite(res.data.sprites.front_default);
   })
   return(
     <img src={sprite}/>
   )
}
                      

function Pokecard() {
  const { loading, data } = useQuery(GET_POKEMON);
  
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
                  {GET_POKEMON_SPRITE(pokemon.id)}
                                     
                </div>
                <div className = "poke-type-area">
                  {
                    pokemon.pokemon_v2_pokemontypes.map((poke_types)=>{
                      return(
                          <div className= {`poke-type ${poke_types.pokemon_v2_type.name}`}>
                              <span>
                          {poke_types.pokemon_v2_type.name}
                            <br/>
                          </span>
                          </div>
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
