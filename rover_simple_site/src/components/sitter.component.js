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

const styles = theme => ({
  root: {
    width: '90%',
    display: 'table',
    margin: '0 auto',
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
  expansionpanel: {
    display: 'inherit',
    flex: 'auto',
    paddingRight: '20px',
    justifyContent: 'space-between',
  }
});

export default withStyles(styles)(class Sitter extends Component {
  constructor(props){
    super(props);
  }

  render(props) {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.expansionpanel}>
                <Typography>
                    <img src={this.props.sitter.sitter_image} alt="sitter" className="img-thumbnail"/>
                </Typography>
                <Typography>
                    {this.props.sitter.sitter_name}
                </Typography>
                <Typography>
                    {this.props.sitter.sitter_rating_rounded}
                </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.expansionpanel}>
              <Typography>
                  {this.props.sitter.sitter_email}
              </Typography>
              <Typography>
                  {this.props.sitter.sitter_phone_number}
              </Typography>
              <Typography className={this.props.secondaryHeading}>
                  Stays: {(this.props.sitter.sitter_stays > 0) ? this.props.sitter.sitter_stays : 0}
              </Typography>
            </div>
          </ExpansionPanelDetails>
          {this.props.auth && (
            <div>
              <Divider />
              <ExpansionPanelActions>
                <Button size="small" color="primary">
                  <Link to={"/createappointment/"+this.props.sitter.sitter_email+"/"+this.props.owner.owner_email}>Create Appointment</Link>
                </Button>
              </ExpansionPanelActions>
            </div>
          )}
        </ExpansionPanel>
      </div>
    );
  }
})
