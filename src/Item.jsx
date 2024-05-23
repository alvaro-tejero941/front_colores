function Item({id,r,g,b,borrandoColor}){
    return <li style={ {backgroundColor: `rgb(${[r,g,b]})`} } 
    onClick={(() => {
        fetch(`https://api-mongo-kqvr.onrender.com/colores/borrar/${id}`,{
            method: "DELETE"
        })
        .then(resultado => resultado.json())
        .then(({resultado,error}) => {
            if(!error){
               return borrandoColor(id);
            }
        });
    })}
    > { [r,g,b].join(",") }</li>
}

export default Item;