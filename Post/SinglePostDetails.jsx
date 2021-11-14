import React, { useState, useEffect } from 'react'

import {
    ListItemIcon,

    CardActions,
    Menu, MenuItem,
    Box, Button, Card,
    ListItemText,
    CardContent,
    Grow, 
    Typography, 
    CircularProgress, 
    Container, 
    Grid, 
    IconButton, 
    List, 
    ListItem, 
    ListItemSecondaryAction,
} from "@material-ui/core"

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { postStyles } from './style';

import { GetPostsDetails, DeletePostbyId } from '../../httpServices/Posts'
import { useParams, Link } from 'react-router-dom';


import EditIcon from "@material-ui/icons/Edit"

import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

// Dialog

import DialogComponent from "../../Components/common/DialogComponent"
import { toast } from 'react-toastify';

export default function SinglePostDetails(props) {
    const classes = postStyles();

    const [data, setData] = useState({});


    const { id } = useParams();


    // form menu purpose //

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Dialog purpose

    const [dialogOpen, setdialogOpen] = useState(false)

    useEffect(() => {

        GetPostsDetails({ id }).then(({ data:{data} }) => {

            setData(data);

            console.log("data", data);

        })
        
        .catch((e)=>{
            console.log("error",e);

            if(e.response.status===404){
                props.history.push("/posts");
            }
        });

    }, [])

   ////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                   dialog                              @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const DialogContent = () => (
    
    <Grid container>

        <Grid item xs={12}>

            <Card>

                <CardContent>


                    <Typography 
                    variant="h6" 
                    
                    color='primary'

                        align='center'

                        gutterBottom
                    >

                        Are you Sure Want to Delete ?


                    </Typography>


                    <Typography variant="h5" color='error' align="center"

                        gutterBottom

                    >                      

                        {data.title}

                    </Typography>

                </CardContent>

                <CardActions 
                style={{ justifyContent: "center" }}>

                    <Box

                        mt={1}

                        mb={1}

                        >

                        <Button
                            variant="outlined"
                            color='primary'
                            style={{ marginRight: "8px" }}
                            onClick={() =>
                                setdialogOpen(false)}>Cancel</Button>
                        <Button

                            variant="outlined"

                            color='secondary'

                            onClick={() =>

                               
                            
                                DeletePostbyId({id}).then(()=>{

                                    toast.success("post Deleted succesfully")

                                    setdialogOpen(false)

                                    props.history.push('/posts')

                          })
                            
                          }

                        >Delete</Button>


                    </Box>

                </CardActions>
            </Card>
        </Grid>
    </Grid>
    );


    // @@@@@@@@@@@@@@@@@@@@                              Date function



    const Formatdate=(str)=>{

        let date=new Date();

        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    

    return (
        <Container>


            <DialogComponent

                openState={dialogOpen}
                handleDialogClose={() => setdialogOpen(false)}
                content={<DialogContent/>}

            />

            <Menu
                id="simple-menu"

                anchorEl={anchorEl}

                keepMounted

                open={Boolean(anchorEl)}

                onClose={handleClose}

            >
                <MenuItem onClick={handleClose} color='primary'
                    component={Link}
                    to={`/posts/editpost/${id}`}
                >

                    <Button startIcon={<EditIcon />} color='primary'>

                       Edit

                    </Button>


                </MenuItem>

                <MenuItem color='secondary'
                >
                    <Button
                        onClick={() => {
                            handleClose();
                            setdialogOpen(true)
                        }}

                        startIcon={<DeleteForeverIcon />} color='secondary'>

                        Delete
                    </Button>

                </MenuItem>

            </Menu>

            <Grid container>

                {!Object.keys(data).length ? (<Grid item xs={12}>
                    <Box

                        p={5}
                        mt={5}

                        display='flex'

                        justifyContent='center'

                        alignItems='center'
                    >
                        <CircularProgress />
                    </Box>

                </Grid>) : (<Grid item xs={12} sm={8}>

                    <Card>


                        <List>

                            <ListItem>

                                



                                <ListItemText>

                                    <Typography variant="h6" color="textPrimary">

                                        {data.title}

                                    </Typography>

                                    {!data.publishedAt ? (<Typography variant="body1" color="textSecondary">

                                        { Formatdate(data.publishedAt)}

                                    </Typography>) : null}


                                </ListItemText>

                                <ListItemSecondaryAction>

                                    <IconButton


                                        
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"

                                        onClick={handleClick}
                                    >

                                        <MoreVertIcon />


                                    </IconButton>

                                </ListItemSecondaryAction>

                            </ListItem>

                        </List>

                        <img src={data.imageFileSet} alt={data.title} className={classes.responsiveImg} />

                        <CardContent>

                            <Typography variant="body1" component="h6" color="textSecondary">

                                


                                {data.description}
                            </Typography>


                        </CardContent>


                    </Card>

                </Grid>)}

            </Grid>
        </Container>
    )
}
