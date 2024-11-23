import useData from "../hooks/useData";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress, ImageList, ImageListItem } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectButton from "./SelectButton";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));
  

const DetailCard = () => {

    const navigate = useNavigate();

    const { name } = useParams();
    const {data, error, loading} = useData(`https://pokeapi.co/api/v2/pokemon/${name}`,'get');

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const goBackPage = () => {
      navigate(-1);
    }
  

    if(loading){
        return (<CircularProgress />)
    }
    if(error!=null){
        return (<><h4>Error cargando datos</h4>{error}</>);
    }
    return (
    <Card sx={{ maxWidth: 650 }}>
        <CardHeader
        title={data.name}
        />
        <ImageList sx={{ width: 500}} cols={3} >
            <ImageListItem key={data.sprites.front_default}>
              <img
                src={data.sprites.front_default}
                alt={'front_default'}
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem key={data.sprites.back_default}>
              <img
                src={data.sprites.back_default}
                alt={'back_default'}
                loading="lazy"
              />
            </ImageListItem>
        </ImageList>
        <SelectButton name={data.name} />
        <Button variant="outlined" onClick={goBackPage}>Regresar</Button>
        <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {data.types.length > 0 ? <><h4>Tipo</h4>{data.types.map((itemType) => ( <>{itemType.type.name} </>  ))} </> : ''}
        {data.types.length > 0 ? <>
            <h4>Habilidades</h4><p>{data.abilities.map((itemAbility) => ( <>{itemAbility.ability.name}<br/></>  ))} </p></>
             : ''}
        </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
        >
            <ExpandMoreIcon />
        </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography sx={{ marginBottom: 2 , color: 'text.secondary' }}>
            {data.types.length > 0 ? <><h4>Movimientos</h4><p>{data.moves.map((itemMove) => ( <>{itemMove.move.name}<br/></> ))} </p></> : ''}
            </Typography>
        </CardContent>
        </Collapse>
    </Card>
    );
}

export default DetailCard;