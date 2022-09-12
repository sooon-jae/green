import React from 'react';
import fetchGraphQL from './fetchGraphQL';
import AddStar from "./addstar";
import RemoveStar from "./removestar";

const { useState, useEffect } = React;

function Displayrepos(props) {

const { current, data, refetch } = props;

const [searchValue, setSearchValue] = useState(null);
const [searchValueList, setSearchValueList] = useState(null);
const [more, setMore] = useState(5);
const showMoreItems = () => {    
    setMore((prevValue) => prevValue + 5); // Load more add 5
};

const onChangeHandler = (e) => {
    setSearchValue(e.target.value);    
}

const repoSearch = (e) => {    
    fetchGraphQL(`
    query RepositoryNameQuery {        
        search(query: "`+searchValue+`", type: REPOSITORY, first: 50) {      
          nodes {
            ... on Repository {              
              id
              name
              description
              stargazerCount
              databaseId
              viewerHasStarred
              owner {
                login
              }
            }
          }
        } 
      }
    `).then(response => {
      const data = response.data.search.nodes;         
      setSearchValueList(data) 
      setMore(5);              
    })
}

return (    
    <div>                
        <input type="text" placeholder="레포지토리를 입력하세요." onChange={onChangeHandler}/>
        <button onClick={repoSearch}>검색</button>      

        { <p align="left">{ searchValueList ? searchValueList.slice(0, more).map((node =>             
            {return (
                <ul className="list" key={node.id}>
                <li>
                    {node.name} <br />
                    {node.description}
                    {node.viewerHasStarred ? (
                    <RemoveStar id={node.id} refetch={refetch} />
                    ) : (
                    <AddStar id={node.id} refetch={refetch} />
                    )}
                    <small>{node.stargazerCount}</small>
                </li>                
                </ul>
              );                      
            }))
          : null }           
        </p>}
        
        <button className="btn2" onClick={showMoreItems}>더 보기</button>
    </div>
    );
}

export default Displayrepos;