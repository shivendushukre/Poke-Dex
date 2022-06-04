import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, CircularProgress, Card, CardContent, Link, Grid, Box } from "@mui/material";
import axios from 'axios';

const cardStyle = {
    display: "block",
    height: "300px",
    width: '60%',
    margin: 'auto',
};

const toFirstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1)

const Pokemon = (props) => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(res => {
                const { data } = res;
                setPokemon(data);
            })
            .catch((error) => {
                setPokemon(false);
            })
    })



    const generatePokemon = () => {
        return (
            <>
                <Grid item xs={4} style={{ padding: '50px' }}>
                    <Card style={cardStyle}>
                        <CardContent>
                            <Typography variant="h5" style={{ textAlign: 'center' }}>
                                Pokemon Info
                            </Typography>
                            <Typography>
                                {`${pokemon.id}. ${toFirstCharUppercase(pokemon.name)}`}
                            </Typography>
                            <Typography>
                                <img src={pokemon.sprites.front_default}
                                    alt="Pokemon" align="left"
                                    style={{ height: '200px' }}
                                />
                            </Typography>
                            <Typography>
                                {"Height: "}{pokemon.height}
                            </Typography>
                            <Typography >
                                {"Weight: "}{pokemon.weight}
                            </Typography>
                            <Typography variant="h6">
                                {"Types: "}
                            </Typography>
                            {pokemon.types.map((typeInfo) => {
                                const { type } = typeInfo;
                                const { name } = type;
                                return <Typography key={name}> {`${toFirstCharUppercase(name)}`}</Typography>;
                            })}
                            <Typography>
                                {"Species: "}
                                <Link href={pokemon.species.url}
                                    underline="hover"
                                    target="_blank"
                                    rel="noopener"
                                >{pokemon.species.name} </Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </>
        )
    }

    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemon()}
            {pokemon === false && <Typography>Pokemon Not Found!!</Typography>}
            <Box textAlign='center' sx={{
                padding: '20px'
            }}>
                <Button variant="contained" onClick={() => navigate("/")}
                    size="large" >
                    Back to Pokedex
                </Button >
            </Box>
        </>
    )
}

export default Pokemon;