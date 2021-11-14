import React,{useState, useEffect} from 'react'

import {Container , Grid,Box, TextField,Button, Typography} from '@material-ui/core';


import { useParams } from "react-router-dom";



import { TextInputField } from "../../Components/common/FormComponents"

import joi from 'joi-browser'


import { toast } from 'react-toastify';



import {EditingPost, GetPostsDetails}  from '../../httpServices/Posts'


import { postStyles } from "./style.jsx"


import FileBase64 from "react-file-base64"

export default function EditPost(props) {

    const classes = postStyles();

    const {id}= useParams();





    const [formValidationError,setformValidationError]=useState(" ")



    const [state,setState]=useState({
    
    
        data:{
    
            title:"",
    
            imageFileSet:"",
    
            description:""
        },
    
        errors:{},
    
    })
    
    
    const Schema={
    
        title:joi.string().required().label("Title").min(5),
        imageFileSet:joi.string().required().label("Image"),
        description:joi.string().required().label("Description"),
    }
    
    ///    Function TextAria 
    
     const handleOnChange=({ target })=>{
    
        const {data,errors}=state;
    
        const {error}=joi.validate(data[target.name],Schema[target.name],{abortEarly:true});
    
        console.log("response",error);
    
        !error ? (errors[target.name]=" ") : 
        (errors[target.name]=error.details[0].message );
    
        data[target.name]=target.value;
    
        setState({data,errors})
    
        console.log("target",target)
     }
    
    
     //  Handle On SubMit form   $$$$$$$$$$$$$
    
     const validate=()=>{
    
        let errorObj={};
    
        let {error}=joi.validate(state.data,Schema ,{ abortEarly:false })
    
    
        !error ? errorObj = {} : (error.details.map((item)=>errorObj[item.path] = item.message))
    
        return errorObj;
     }
    
     const handleOnSubmit=(e)=>{

    
    
        e.preventDefault();
    
        let errors=validate();
    
        let {data}=state;
    
    
        setState({data,errors});
    
        console.log("data",data);
    
    
        if(Object.keys(errors).length===0 && errors.constructor===Object)
    
        {
    
    
            EditingPost({id,data}).then(()=>{
                console.log("Post Update successfully");
        
                toast.success("Post Update Successfully");
        
        
                // Reset form 
        
                setState({
        
        
        
                    data:{
        
                        title:"",
                
                        imageFileSet:"",
                
                        description:""
                    },
                
                    errors:{},
        
        
        
                });
        
                // navigate to /posts
        
                props.history.push("/posts");
        
        
            })
    
            .catch((e)=>{
                console.log("errors",e);
    
                setformValidationError(e.message);
    
            });
    
        }};






        //useEffect


        useEffect(()=>{




            GetPostsDetails({id}).then(({data:{data:item}})=>{


                const { data, errors } = state;
    
                data.title=item.title;
                data.imageFileSet=item.imageFileSet;
                data.description=item.description;
               
                setState({data, errors});
    
    
    
            })
            
            .catch((e)=>{
                console.log("error",e)

                props.history.push("/posts")
            })


       },
        [id]);

    return (
        <Container maxWidth='lg'>

            <Grid container>

                {/* updating image */ }

                <Grid item xs={12} sm={6}>


                <img src={state.data.imageFileSet} alt={state.data.title} 
                
                className={classes.responsiveImg}
                
                />

                </Grid>


                


                <Grid item xs={12} sm={6}>

                    {/* updating Form */ }

                    <Grid 
                container
                
                direction='row'

                justifyContent='center'

                alignItem='center'
                
                >
                <Grid item xs={12} sm={8}>


                    <Box mt={2} mb={2}>

                        <Typography variant='h6' color='primary'  align='center'>

                            Edit Blog Post




                        </Typography>

                        <Typography variant='subtitle2' color='error'  align='center'>


                            {formValidationError}


                
                        </Typography>



                    </Box>

                    <form onSubmit={handleOnSubmit}>

                        <Box mt={2} mb={1}>


                        <TextInputField    state={state}
                        
                        name='title'
                        
                        onChange={handleOnChange}
                        />
               

                        </Box>

                        <Box mt={2} mb={1}>


                            <FileBase64  onDone={(e)=>{

                                let {data,errors}=state;

                                data.imageFileSet=e.base64;

                                errors.imageFileSet=" ";

                                setState({data,errors});
                            }}   />

                            <Typography 
                            
                            variant='subtitle2'

                            color='error'

                            >
                                {state.errors.imageFileSet ? state.errors.imageFileSet : null }

                                </Typography>
                        </Box>

                        <Box>

                       <TextInputField    state={state}
                        
                        name='description'
                        
                        onChange={handleOnChange}

                        multiline

                        rows={4}
                        />

               </Box>


                        <Box  mt={2} mb={1}>
                         
                         <Button color='primary'  variant='outlined' type='submit'
                         
                         fullWidth
                         >
                             {" "}Submit {" "}
                             </Button>

                               </Box>


                    </form>
                    
                    </Grid>
                </Grid>



                </Grid>


                </Grid>
                
            


            </Container>




    )
}
