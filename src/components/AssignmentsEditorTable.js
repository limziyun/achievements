import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { isEmpty } from "react-redux-firebase";

import Toolbar from "material-ui/Toolbar";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import Switch from "material-ui/Switch";
import TextField from "material-ui/TextField";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

import ExpandLessIcon from "material-ui-icons/ExpandLess";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";

const dateEditStyle = {
  width: "220px"
};

class AssignmentsEditorTable extends React.PureComponent {
  static propTypes = {
    assignments: PropTypes.any.isRequired,
    onUpdateAssignment: PropTypes.func.isRequired,
    onAddAssignmentClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <Toolbar>
          <Button raised onClick={this.props.onAddAssignmentClick}>
            Add assignment
          </Button>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Assignment Visible</TableCell>
              <TableCell>Solution Visible</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isEmpty(this.props.assignments) ? (
              <TableRow>
                <TableCell>Empty list</TableCell>
              </TableRow>
            ) : (
              Object.keys(this.props.assignments).map(assignmentId => {
                const assignment = this.props.assignments[assignmentId];
                return (
                  <TableRow key={assignmentId}>
                    <TableCell>{assignment.name}</TableCell>
                    <TableCell>
                      <Switch
                        onChange={(event, checked) =>
                          this.props.onUpdateAssignment(
                            assignmentId,
                            "visible",
                            checked
                          )
                        }
                        checked={assignment.visible}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        onChange={(event, checked) =>
                          this.props.onUpdateAssignment(
                            assignmentId,
                            "solutionVisible",
                            checked
                          )
                        }
                        checked={assignment.solutionVisible}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={dateEditStyle}
                        type="datetime-local"
                        onChange={event =>
                          this.props.onUpdateAssignment(
                            assignmentId,
                            "deadline",
                            event.target.value
                          )
                        }
                        defaultValue={assignment.deadline}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button>Edit</Button>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <ExpandLessIcon />
                      </IconButton>
                      <IconButton>
                        <ExpandMoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}

export default AssignmentsEditorTable;
