import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Styling imports
import IconButton from '@material-ui/core/IconButton';
// import LanguageIcon from '@material-ui/icons/Language';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';

// Data
import { initiatives } from './data.js'

class Researcher extends Component {
    render() {
      const {
        //Researcher Items
        researchers
    
      } = this.props.item;
        return (
            <div className="test">
            <Card className="card-researcher">
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="h3">
                    {item.researchers.name}
                  </Typography>
                  <Typography variant="h5" color="textSecondary" component="h5">
                    {item.researchers.title}
                  </Typography>
                  </CardContent>
                  <Divider />
                  <IconButton><MailIcon /> {item.researchers.email}</IconButton>
                </CardActionArea>
              </Card>
          </div>           
        )
    }
}

export default Researcher