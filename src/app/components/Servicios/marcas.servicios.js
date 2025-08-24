const url = process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL_PROD; 

exports.GetMarcas = () =>{
    return fetch(`${url}/api/apiMarca/marcas/`)
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Something went wrong ...');
        }
    })
}

exports.getIdMarcas = (id) =>{
    return fetch(`${url}/api/apiMarca/marcas/${id}/`)
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Something went wrong ...');
        }
    })
}

exports.addMarcas = (body) =>{
    return fetch(`${url}/api/apiMarca/marcas/`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
    })
    .then( res=>res.json())
    .catch((err) => { console.log(err); })
}

exports.updateMarcas = (body,id) =>{
    return fetch(`${url}/api/apiMarca/marcas/${id}/`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
    })
    .then( res=>res.json())
    .catch((err) => { console.log(err); })
}

exports.deleteMarcas = (id) =>{
    return fetch(`${url}/api/apiMarca/marcas/${id}/`,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then( res=>res.json())
    .catch((err) => { console.log(err); })
}
