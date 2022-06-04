import React from "react";
import { AppBar, Toolbar, Grid, Box, Card, CardContent, CircularProgress, CardMedia, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import pokedex from './pokedex.png';

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia: {
        margin: 'auto'
    },
    cardContent: {
        textAlign: 'center'
    },
    searchContainer: {
        display: 'flex',
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "0"
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchInput: {
        width: "200px",
        margin: "5px",
    },
})

const toFirstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1)


const Pokedex = (props) => {
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const navigate = useNavigate();
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=898")
            .then(res => {
                const { data } = res;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1
                            }.png`,
                    }
                })
                setPokemonData(newPokemonData);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];
        return (
            <Grid item xs={12} sm={4} key={pokemonId}>
                <Card onClick={() => navigate(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: '130px', height: '130px' }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>
                            {`${id}. ${toFirstCharUppercase(name)}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }


    return (
        <>
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            style={{
                                flexGrow: 1,
                            }}
                        >
                            <img src={pokedex} style={{ height: '18px' }} />
                            Poke-Dex
                        </Typography>
                        <div className={classes.searchContainer}>
                            <SearchIcon className={classes.searchIcon} />
                            <TextField
                                className={classes.searchInput}
                                variant="standard"
                                label="Pokemon"
                                onChange={handleSearchChange}
                            >
                            </TextField>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(pokemonId =>
                        pokemonData[pokemonId].name.includes(filter) &&
                        getPokemonCard(pokemonId))}
                </Grid>
            ) : (
                <CircularProgress color="primary" />
            )}


        </>
    )
}

export default Pokedex;