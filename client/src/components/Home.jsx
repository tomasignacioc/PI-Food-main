import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getDiets, filterByDiets, orderByName, orderByScore } from "../actions";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import styles from "./Home.module.css"

export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets);
    const [tomas, setTomas] = useState(true)
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1);    // pagina que ira cambiando
    const [recipesPerPage, setRecipesPerPage] = useState(9); // self-explanatory
    const lastRecipe = recipesPerPage * currentPage; //9     // indice ultima receta renderizada
    const firstRecipe = lastRecipe - recipesPerPage; //0         // indice primera receta renderizada
    const currentRecipes = recipes.slice(firstRecipe, lastRecipe); // las 9 recetas que se iran mostrando en cda pág

    const paginate = (number) => {
        setCurrentPage(number)
    };


    function handleFilterByDiets(e) {
        dispatch(filterByDiets(e.target.value))
    };

    function handleOrderByName(e) {
        dispatch(orderByName(e.target.value))
        tomas ? setTomas(false) : setTomas(true)
    };

    function handleOrderByScore(e) {
        dispatch(orderByScore(e.target.value))
        tomas ? setTomas(false) : setTomas(true)
    };

    function returnToFirstPage() {
        setCurrentPage(1)
    };

    return (
        <div className={styles.home}>
            <div className={styles.selectContainer}>
            <SearchBar returnToFirstPage={returnToFirstPage} />
                <select onChange={e => handleOrderByName(e)} defaultValue='default' className={styles.filters}>
                    <option value="default" disabled >Alphabetical order</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select onChange={e => handleOrderByScore(e)} defaultValue='default' className={styles.filters}>
                    <option value="default" disabled >Order by score</option>
                    <option value="desc">Higher</option>
                    <option value="asc">Lower</option>
                </select>

                <select onChange={e => handleFilterByDiets(e)} defaultValue='default' className={styles.filters}>
                    <option value="default" disabled >Select by diet type</option>
                    {
                        diets && diets.map(d => (
                            <option value={d.name} key={d.id}>{d.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <Paginate
                    recipesPerPage={recipesPerPage}
                    recipes={recipes?.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <div className={styles.cardsGrid}>
                    {
                        currentRecipes && currentRecipes.map(el => {
                            return (
                                <Card img={el.image} name={el.name} diet={el.diets} id={el.id} key={el.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};
