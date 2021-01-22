import { useState, useEffect, Fragment } from "react";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Nav from './Nav';
import ProjectCard from './ProjectCard';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

export default function Collection(props) {
  const classes = useStyles();
  const isLoggedIn = props.isLoggedIn;
  const { id } = useParams();
  const [projects, setProjects] = useState([{ collection_name: "" }])

  console.log("ID-------", id);

  useEffect(() => {
    axios
      .get(`/api/collection/${id}`)
      .then(data => {
        setProjects(data.data.projects);
      }).catch(err => console.log(err))
  }, [id]);

  // const handleDeleteCollection = () => {
  //   deleteCollection();
  // }

  const emptyCollection = [{ collection_name: "Wow, this looks lonely!", project_title: "Add A Project!", url_album_artwork: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFuY2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }];

  return isLoggedIn ? (
    <div>
      {projects.length > 0 ? (
        <div>
          <h1>{projects[0].collection_name}</h1>
          <h3>Delete Collection?</h3>
          <Container className={classes.cardGrid} maxWidth="md" id="projects" >
            <Grid container spacing={4} >
              {projects.map((project, i) =>
                <Fragment key={i}>
                  <ProjectCard
                    key={project.project_id}
                    title={project.project_title}
                    thumbnail={project.url_album_artwork}
                    link={`/project/${project.project_id}`}
                    songTitle={project.title}
                    songArtist={project.artist}
                  />
                </Fragment>
              )}
            </Grid>
          </Container>
        </div>
      ) : (
          <div>
            <h1>{emptyCollection[0].collection_name}</h1>
            <Container className={classes.cardGrid} maxWidth="md" id="projects" >
              <Grid container spacing={4} >
                {emptyCollection.map((project, i) =>
                  <Fragment key={i}>
                    <ProjectCard
                      key={project.id}
                      title={project.project_title}
                      thumbnail={project.url_album_artwork}
                      link={`/search`}
                    />
                  </Fragment>
                )}
              </Grid>
            </Container>
          </div>
        )}
      <Nav />
    </div>
  ) : (
      <Redirect to="/" />
    );
}
