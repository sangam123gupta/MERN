import { makeStyles } from '@material-ui/styles'

export const postStyles=makeStyles((them)=>({

    responsiveImg:{
        width:"100%",
        height:"auto",
    },

    cardImageContainer:{
        width:"100%",
        height:"auto",
        maxHeight:"480px",
        overflowY:"hedden",
    },

    Link:{
        textDecoration:"none"
    }
}));