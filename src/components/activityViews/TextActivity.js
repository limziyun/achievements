/**
 * @file TextActivity container module
 * @author Theodor Shaytanov <theodor.shaytanov@gmail.com>
 * @created 23.06.18
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class TextActivity extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    problem: PropTypes.object,
    solution: PropTypes.object,
    readOnly : PropTypes.bool
  };

  onChangeSolution = e => this.props.onChange({ value: e.target.value });

  render() {
    const { problem, solution,readOnly } = this.props;

    return (
      <Fragment>
        <Typography align="left" gutterBottom variant="h5">
          {problem.question}
        </Typography>
        <TextField
          autoFocus
          defaultValue={(solution && solution.value) || ""}
          fullWidth
          label="Solution"
          multiline
          onChange={this.onChangeSolution}
          disabled={readOnly}
          style={{
            marginBottom: 4
          }}
        />
      </Fragment>
    );
  }
}

export default TextActivity;
