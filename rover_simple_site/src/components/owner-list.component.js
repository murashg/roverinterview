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
import Paper from '@material-ui/core/Paper';
import Owner from './owner.component';

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
  paper: {
    width: '90%'
  },
});

/*
<td><div class="img"><img src={props.owner.owner_image} alt="owner" class="img-thumbnail"/></div></td>
<td>{props.owner.owner_name}</td>
<td>{props.owner.owner_rating_rounded}</td>
<td>
  <Link to={"/owners/"+props.owner._id}>View</Link>
</td>
*/
/*
const owner = props => (
      <ExpansionPanel className={classes.column}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>
            <Typography>
                <img src={props.owner.owner_image} alt="owner" className="img-thumbnail"/>
            </Typography>
          </div>
          <div>
            <Typography>
                {props.owner.owner_name}
            </Typography>
          </div>
          <div>
            <Typography>
                {props.owner.owner_rating_rounded}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <Typography>
                {props.owner.owner_email}
            </Typography>
          </div>
          <div>
            <Typography>
                {props.owner.owner_phone_number}
            </Typography>
          </div>
          <div>
            <Typography className={props.secondaryHeading}>
                Stays: {props.owner.owner_phone_number}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        {props.auth && (
          <div>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" color="primary">
                <Link to={"/createappointment/"+props.owner.owner_email+"/"+props.owner.owner_email}>Create Appointment</Link>
              </Button>
            </ExpansionPanelActions>
          </div>
        )}
      </ExpansionPanel>
)
*/
export default withStyles(styles)(class OwnerList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {owners: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/owners/')
        .then(response => {
          this.setState({ owners: response.data});
        })
        .catch(function (error) {
          console.log(error);
        })
  }

  ownersList(props) {
    return this.state.owners.map(function(currentOwner, i) {
      return <Owner owner={props.owner} auth={props.auth} owner={currentOwner} key={i} />;
    })
  }

  render() {
    const { classes } = this.props;
    console.log(classes.root);
    return (
        <div className={classes.root}>
            <h3>Owners!</h3>
            { this.ownersList(this.props) }
        </div>
    );
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
