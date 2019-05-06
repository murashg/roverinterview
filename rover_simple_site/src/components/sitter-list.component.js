import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Paper from '@material-ui/core/Paper';

/*
<td><div class="img"><img src={props.sitter.sitter_image} alt="sitter" class="img-thumbnail"/></div></td>
<td>{props.sitter.sitter_name}</td>
<td>{props.sitter.sitter_rating_rounded}</td>
<td>
  <Link to={"/sitters/"+props.sitter._id}>View</Link>
</td>
*/

const Sitter = props => (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={props.column}>
            <Typography>
                <img src={props.sitter.sitter_image} alt="sitter" class="img-thumbnail"/>
            </Typography>
          </div>
          <div className={props.column}>
            <Typography className={props.heading}>
                {props.sitter.sitter_name}
            </Typography>
          </div>
          <div className={props.column}>
            <Typography className={props.secondaryHeading}>
                {props.sitter.sitter_rating_rounded}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={props.column}>
            <Typography className={props.Link}>
                {props.sitter.sitter_email}
            </Typography>
          </div>
          <div className={props.column}>
            <Typography className={props.secondaryHeading}>
                {props.sitter.sitter_phone_number}
            </Typography>
          </div>
          <div className={props.column}>
            <Typography className={props.secondaryHeading}>
                Stays: {props.sitter.sitter_phone_number}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary">
            <Link to="/createappointment" className="nav-link">Create Appointment</Link>
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
)

export default class SitterList extends Component {
    constructor(props) {
      super(props);
      this.state = {sitters: []};
    }

    componentDidMount() {
      axios.get('http://localhost:4000/sitters/')
          .then(response => {
            this.setState({ sitters: response.data});
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    sittersList() {
      return this.state.sitters.map(function(currentSitter, i) {
        return <Sitter sitter={currentSitter} key={i} />;
      })
    }

    render() {
        console.log(this.props.column);
        return (
            <div>
              <h3>Sitters!</h3>

              { this.sittersList() }
            </div>
        )
    }
}
function DetailedExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Location</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classNames(classes.column, classes.helper)}>
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#sub-labels-and-columns" className={classes.link}>
                Learn more
              </a>
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
