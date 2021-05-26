import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Collapse} from '@material-ui/core';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    maxWidth: 445,
    background: "rgba(0,0,0,0.5)",
    margin: "20px"
  },
  media: {
    height: 340,
  },
  title: {
    fontFamily: "Pattaya",
    fontSize: "2rem",
    color: "#fff",
  },
  desc: {
    fontFamily: "Poiret One",
    fontSize: "1rem",
    color: "#ddd",
  },
  button: {
    fontFamily: "Poiret One",
    fontSize: "1rem",
    color: "#ddd",
    justifyContent: "center"
  }
});

export default function ImageCard({ content , checked, path }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Collapse in = {checked} {... (checked ? { timeout: 1000 } : {})}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={
            content.imageUrl
          }
          title="image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {content.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {content.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" className = {classes.button} onClick = {() => history.push(path)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  </Collapse>
  );
}
