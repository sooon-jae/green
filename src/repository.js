import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Displayrepos from "./display-repos";
import { reposQuery } from "./queries";

class searchRepository extends Component {    
    handleMore = (data, fetchMore, current) => {
        fetchMore({
            variables: { first: current + 10 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return prev;
                }
                return Object.assign(prev, fetchMoreResult);
            }
        });
    };

    render() {        
        return (
        <Query query={reposQuery} variables={{ first: 50 }}>                
            {({ data, loading, error, fetchMore, refetch }) => {                    
            if (loading) return <p>loading...</p>;
            if (error) return <p>{error.message}</p>;

            let current = data.search.edges.length;                      

            return (
                <Displayrepos
                    current={current}
                    refetch={refetch}
                    data={data}
                    handleMore={() => this.handleMore(data, fetchMore, current)}
                />
            );
            }}
        </Query>
        );
    }
}

export default searchRepository;