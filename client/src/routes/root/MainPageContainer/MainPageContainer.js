import React, { Component } from "react";
import { connect } from "react-redux";

import UserInfo from "../../../components/UserInfo/UserInfo";
import TaskSectionContainer from "../../../containers/TasksSectionContainer/TasksSectionContainer";

import "./MainPageContainer.css";

class MainPageContainer extends Component {
  render() {
    return (
      <div className="main-page-container row">
        <UserInfo
          user={{
            fullName: `${this.props.user.first_name} ${
              this.props.user.last_name
            }`
          }}
          date={new Date().toDateString()}
        />
        <TaskSectionContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: {
      first_name: state.user.first_name,
      last_name: state.user.last_name
    }
  };
};

export default connect(mapStateToProps)(MainPageContainer);
