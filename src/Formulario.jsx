import { useState } from "react";

function Formulario({crearColor}){

    let [textoTmp,setTextoTmp] = useState("");//value del input text
    let [error,setError] = useState(false);
    let [textoError,setTextoError] = useState("");

    function validar(evento){
        evento.preventDefault();

        setError(false);

       setTextoError("debe escribir tres números entre 0-255 separados por comas");
    
        if(/^(\d{1,3},){2}\d{1,3}$/.test(textoTmp)){
            
            let [r,g,b] = textoTmp.split(",").map(n => Number(n));
    
            let valido = true;
    
            [r,g,b].forEach( n => valido = valido && n <= 255);
    
            if(valido){
                return fetch("https://api-mongo-kqvr.onrender.com/nuevo",{
                    method : "POST",
                    body : JSON.stringify({r,g,b}),
                    headers : {
                        "Content-type" : "application/json"
                    }
                })
                .then(respuesta => respuesta.json())
                .then(({id,error}) => {
                    if(!error){
                        setTextoTmp("");
                        return crearColor({id,r,g,b});
                    }
                    console.log("..error");
                });
            }
    
            setTextoError("Números fuera de rango (0-255)");
    
        }
        setError(true);
    
    }

    return (
        <form onSubmit={ validar }>
            <input type="text" placeholder="rrr,ggg,bbb" value={textoTmp} onChange={ evento => setTextoTmp(evento.target.value) } />
            <p className={`error ${ error ? "visible" : "" }`}>{ textoError }</p>
            <input type="submit" value="crear color" ></input>
        </form>
    )
}

export default Formulario;