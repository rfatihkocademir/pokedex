import React,{useState} from "react";
import { gql, useQuery } from "@apollo/client";
import "./pokecard-style.css";
import axios from "axios";

const GET_POKEMON = gql`
  query samplePokeAPIquery($limit:Int,$offset:Int){
  pokemon_v2_pokemon (limit:$limit,offset:$offset){
    id
    name
    pokemon_v2_pokemontypes{
      pokemon_v2_type {
        name
      }
    }
  }
}
`;
const Loading = () => {
  return(
    // eslint-disable-next-line jsx-a11y/alt-text
    <img className="poke-loading" src="https://c.tenor.com/2lFt6lp1KaMAAAAj/run-pokemon.gif"/>
  )
}
function POKEMONSPRITE(props){
  //Bu fonksiyon element olarak çağrılır. Çünkü fonksiyon tekrar çalıştırıldığında içeride kullanılan hook döngü içinde dolu geldiği için hata verir.
  const [sprite,setSprite] = useState("");
   axios.get("https://pokeapi.co/api/v2/pokemon/"+props.pokemonID).then((res)=>{
      setSprite(res.data.sprites.front_default);
   })
    return(
      // eslint-disable-next-line jsx-a11y/alt-text
      <img className="poke-sprite" src={sprite}/>
    )
}

function Pokecard() {
  const { loading, data ,fetchMore} = useQuery(GET_POKEMON,{
    variables:{
      offset:0,
      limit:3,
    },
    fetchPolicy: "network-only",   // Used for first execution
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });
  function onLoadMore() {
    fetchMore({
      variables: {
        offset:data.pokemon_v2_pokemon.lenght,
      },
      updateQuery:(prev,{fetchMoreResult})=>{
        console.log(prev.pokemon_v2_pokemon);
        console.log(fetchMoreResult.pokemon_v2_pokemon);
        if(!fetchMoreResult) return prev;
        
        const newResult= Object.assign({},prev,{
          pokemon_v2_pokemon:[...prev.pokemon_v2_pokemon,...fetchMoreResult.pokemon_v2_pokemon]
        })
        console.log(newResult);
        return newResult;
        
      }
    })
  }
  return (
    <div className="poke-card-wrapper row">
      {
        loading
        ? <div><Loading /></div>
        :data.pokemon_v2_pokemon.map((pokemon) => {
            return (
              <div className="poke-card">
                <div className="poke-name">
                  <p>{pokemon.name.toUpperCase()}</p>
                </div>
                <div className="poke-sprite-area">
                  <POKEMONSPRITE pokemonID={pokemon.id}/>
                  
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

      <a className="btn btn-primary" onClick={() =>{
          onLoadMore()
          
      }}>Load more ... </a>
    </div>
  );
}
export default Pokecard;
