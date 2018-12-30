/**
 * @file PathTabs container module
 * @author Theodor Shaytanov <theodor.shaytanov@gmail.com>
 * @created 25.04.18
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Fab from "@material-ui/core/Fab";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Zoom from "@material-ui/core/Zoom";

import AddIcon from "@material-ui/icons/Add";
import PathsTable from "../../components/tables/PathsTable";

const PATHS_TAB_JOINED = 0;
const PATHS_TAB_OWNED = 1;
const PATHS_TAB_PUBLIC = 2;

class PathTabs extends React.Component {
  static propTypes = {
    pathDialogShow: PropTypes.func.isRequired,
    paths: PropTypes.object,
    myPaths: PropTypes.object.isRequired,
    publicPaths: PropTypes.object,
    joinedPaths: PropTypes.object,
    uid: PropTypes.string
  };

  state = {
    currentTab: 0
  };

  onAddPathClick = () => {
    this.setState({ currentTab: PATHS_TAB_OWNED });

    this.props.pathDialogShow();
  };

  handleTabChange = (event, tabIndex) => {
    this.setState({ currentTab: tabIndex });
  };

  render() {
    const {
      pathDialogShow,
      joinedPaths,
      myPaths,
      publicPaths,
      uid
    } = this.props;
    let paths;

    switch (this.state.currentTab) {
      case PATHS_TAB_PUBLIC:
        paths = publicPaths;

        // FIXIT: Dirty workaround, move that somewhere else
        Object.keys(publicPaths || {}).forEach(key => {
          if (joinedPaths[key]) {
            publicPaths[key].solutions = joinedPaths[key].solutions;
            publicPaths[key].totalActivities = joinedPaths[key].totalActivities;
          }
        });
        break;
      case PATHS_TAB_OWNED:
        paths = myPaths;
        break;
      case PATHS_TAB_JOINED:
        paths = joinedPaths;
        break;
      default:
        throw new Error("Wrong tab index");
    }
    paths = paths || {};

    return (
      <Fragment>
        <Zoom in={this.state.currentTab === PATHS_TAB_OWNED} unmountOnExit>
          <Fab
            color="primary"
            onClick={this.onAddPathClick}
            style={{
              position: "fixed",
              bottom: 20,
              right: 20
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>

        <Tabs
          fullWidth
          indicatorColor="primary"
          onChange={this.handleTabChange}
          textColor="primary"
          value={this.state.currentTab}
        >
          <Tab label="Joined Paths" />
          <Tab label="Created Paths" />
          <Tab label="Public Paths" />
        </Tabs>
        <PathsTable
          pathDialogShow={pathDialogShow}
          paths={paths}
          uid={uid}
          viewCreatedTab={this.state.currentTab === PATHS_TAB_OWNED}
        />
      </Fragment>
    );
  }
}

export default PathTabs;
