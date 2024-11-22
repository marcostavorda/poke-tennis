import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const BasicCard = ({name, position, front_default, types}) => {

    return (
        <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {position} {name}
                </Typography>
                <CardMedia sx={{ maxWidth: 100 }}
                    component="img"
                    image={front_default}
                    alt={name}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {types!=null && types.length > 0 ? <>{types.map((itemType) => 
                    (`${itemType.type.name} `))}</> : ''}
                </Typography>
            </CardContent>
        </CardActionArea>
      );
}

export default BasicCard;