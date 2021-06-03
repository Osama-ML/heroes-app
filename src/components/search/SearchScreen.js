import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import { useForm } from "../../Hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroesByName } from "../../selectors/GetHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({ searchText: q });

  const { searchText } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>SearchScreen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="searchText"
              placeholder="Find your hero"
              className="form-control"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            ></input>
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search ...
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          {(q === "") && <div className="alert alert-info animate__animated animate__fadeIn">Search a hero</div>}
          {(q !== "" && heroesFiltered.length === 0) && <div className="alert alert-danger animate__animated animate__fadeIn">Theres is no a hero with <b>"{q}"</b></div>}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
