import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import "./style.css";

const removeStarquery = gql`
  mutation RemoveStar($repoid: ID!) {
    removeStar(input: { starrableId: $repoid }) {
      starrable {
        stargazers {
          totalCount
        }
        viewerHasStarred
      }
    }
  }
`;



class RemoveStar extends Component {
  render() {
    return (
      <Mutation mutation={removeStarquery}>
        {(removeStar, { data, loading, error }) => {
          return (
            <div>
              <button className="btn1"
                onClick={() => {
                  removeStar({
                    variables: { repoid: this.props.id }
                  }).then(res => {
                    this.props.refetch();
                  });
                }}
              >
                {" "}
                remove star
              </button>
              {loading && <p>processing...</p>}
              {error && <p>{error.message}</p>}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default RemoveStar;