import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from './landing-components/Header'
import ContentCard from './landing-components/ContentCard';
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=2560'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}));

export default function Main() {
    const classes = useStyles();

    return (
        <div className = {classes.root}>
            <CssBaseline/>
            <Header/>
            <ContentCard/>
        </div>
    )
}