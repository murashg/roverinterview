import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import StepSlider from './step-slider';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

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
                <img src={props.sitter.sitter_image} alt="sitter" className="img-thumbnail"/>
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
        {props.auth && (
          <div>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" color="primary">
                <Link to="/createappointment" className="nav-link">Create Appointment</Link>
              </Button>
            </ExpansionPanelActions>
          </div>
        )}
      </ExpansionPanel>
)

export default withStyles(styles)(class SitterList extends Component {
    constructor(props) {
      super(props);
      console.log(this.props);
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

    sittersList(props) {
      return this.state.sitters.map(function(currentSitter, i) {
        return <Sitter auth={props.auth} sitter={currentSitter} key={i} />;
      })
    }

    render() {
        console.log(this.props);
        return (
            <div>
              <h3>Sitters!</h3>
              
              { this.sittersList(this.props) }
            </div>
        )
    }
})
/*
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
*/
