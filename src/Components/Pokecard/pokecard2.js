import axios from 'axios'
import React, { Component } from 'react'
import { gql, useQuery } from "@apollo/client";
export default class pokecard2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sprite: null

        }
    }
    
    componentDidMount() {
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
    }
    GET_POKEMON_SPRITE(id) {
        axios.get("https://pokeapi.co/api/v2/pokemon/"+id).then((res)=>{
            this.setState({sprite:res.data.sprites.front_default});
        })
    }
    render() {
    const { loading, data } = useQuery(this.GET_POKEMON);
        
        return (
            
            <div>
                
            </div>
        )
    }
}

