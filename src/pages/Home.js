/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

function Home() {
  const [input, setInput] = useLastQuery();
  const [result, setResults] = useState(null);
  const[searchOption,setsearchOption]=useState('shows');
  
  const isShowsSearch=searchOption==="shows";
  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(results => {
      setResults(results);
    });
  };
  const onRadioChange=(ev)=>{
    setsearchOption(ev.target.value);
  }
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResults = () => {
    if (result && result.length === 0) {
      return <div>No results</div>;
    }
    if (result && result.length > 0) {
      return result[0].show?
            <ShowGrid data={result}/>:
           <ActorGrid data={result}/>
    
    }
    return null;
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">Shows
        <input id="shows-search" type="radio" value="shows" checked={isShowsSearch} onChange={onRadioChange} />
        </label>
        <label htmlFor="actors-search">Actors
        <input id="actors-search" type="radio" value="people" checked={!isShowsSearch} onChange={onRadioChange} /></label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;
