import React from 'react';
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import {FlexGrid} from '../styled'
import {useShows} from '../../misc/custom-hooks';

function ShowGrid({ data }) {
   const[starredShow,dispatchStarred]= useShows()
  return (
    <FlexGrid>
      {data.map(({show}) => {

          const isStarred=starredShow.includes(show.id);
          const onStarClick=()=>{
            if(isStarred)
            {
              dispatchStarred({type: 'REMOVE',showId: show.id})
            }
            else{
              dispatchStarred({type: 'ADD',showId: show.id})
            }
        
          }

        return (<ShowCard
          key={show.id}
          id={show.id}
          image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
          name={show.name}
          summary={show.summary}
          onStarClick={onStarClick}
          isStarred={isStarred}
        />)
        })}
    </FlexGrid>
  );
}

export default ShowGrid;