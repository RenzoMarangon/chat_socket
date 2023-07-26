const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-register');


const login = (e) => 
{
    e.preventDefault();

    const formData = {};

    //Busco los hijos del form que tengan nombre
    for( let element of formLogin.elements)
    {
        if( element.name.length > 0 )
        {
            formData[element.name] = element.value;
        }
    }


    fetch( url + 'login', {
        method:'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json())
    .then(({errors, msg, token}) => {
        
        if( errors )
        {
            errors.map( error => console.error(error.msg));


        }else if( msg ) console.error(msg);
        else if( token ) localStorage.setItem('token', token); 
        

         })   
    .catch( () => console.error )
}

const register = (e) => 
{    e.preventDefault();

    const formData = {};

    //Busco los hijos del form que tengan nombre
    for( let element of formRegister.elements)
    {
        if( element.name.length > 0 )
        {
            formData[element.name] = element.value;
        }
    }


    fetch( url + 'register', {
        method:'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json())
    .then(({errors, msg, token}) => {
        
        if( errors )
        {
            errors.map( error => console.error(error.msg));


        }else if( msg ) console.error(msg);
        else if( token ) console.log(token); 
        

         })   
    .catch( () => console.error )}


const url = ( window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/'
            : 'http://localhost:8080/api/auth/';


formLogin.addEventListener( 'submit', (e) => login(e))
formRegister.addEventListener( 'submit', (e) => register(e))

