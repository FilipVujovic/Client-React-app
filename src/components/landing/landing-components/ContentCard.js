import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import  ImageCard  from './Card'
import Content from './Content/content'
import useWindowPosition from '../hook/useWindowPosition';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function Main() {
    const classes = useStyles();
    const checked = useWindowPosition("header");
    return (
      <div className = {classes.root} id = "content">
          <ImageCard content = {Content[0]} checked = {checked} path = {"/flights"}/>
          <ImageCard content = {Content[1]} checked = {checked} path = {"/testing"}/>
      </div>
    )
}