import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import "./style.css";

const addStarquery = gql`
  mutation AddStar($repoid: ID!) {
    addStar(input: { starrableId: $repoid }) {
      starrable {
        stargazers {
          totalCount
        }
        viewerHasStarred
      }
    }
  }
`;

class AddStar extends Component {
  render() {
    return (
      <Mutation mutation={addStarquery}>
        {(addStar, { data, loading, error }) => {
          return (
            <div>
              <button className="btn1"
                onClick={() => {
                  addStar({ variables: { repoid: this.props.id } }).then(
                    res => {
                      this.props.refetch();
                    }
                  );
                }}
              >
                {" "}
                Addstar
              </button>

              {loading && <p>loading...</p>}
              {error && <p>{error.message}</p>}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default AddStar;