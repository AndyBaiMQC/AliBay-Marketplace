import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
// Data
import { initiatives } from './data.js'

class Initiatives extends Component {
  render() {
    const {
      //Researcher Items
      initiative,
      tool_description,
      link,
      initiative_description,
      intended_users,
      prospective_users,
      potential_benefits_and_outcomes,
      researchers,
      research_partners,
      partner_institutions,
      copyright,
      language
    } = this.props.item;
        return (
            <div>
            <Card className="card-initiative">
              <CardHeader title="M-001" className="card-header"/>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Quebec Centre for Community and Organisational Participatory Research (Q-COPR)
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    To support policy and decision makers, managers, clinicians, patients, and researchers across Quebec in the conduct of Community and Organisational Participatory Research to ensure they achieve relevant and meaningful results that are implemented; thereby, improving health and social care practices and services, and ultimately patient health.
                  </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions disableSpacing className="card-action-icons">
                <Button size="small" color="primary">Share</Button>
                <Button size="small" color="primary">Learn More</Button>
              </CardActions>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>Tool Description</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                  This guide provides a set of recommendations to help all stakeholders (academics, members of health organizations and users of health services) of a participatory research project in an organizational context to carry it out successfully.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                  <Typography>Target Audience</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                  Managers,Researchers,Patient partners/patient associations,INSPQ,INESSS, MSSS
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              </Card>
          </div>

        )
    }
}

export default Initiatives