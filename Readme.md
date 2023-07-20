## ** Registro **

Lo necesario para registrarse es:

"name": Nombre de la persona
"lastname": Apellido
"email": Email
"password": Contraseña

## ** Login **

Lo necesario para loguearse es:

"email": Email
"password": Contraseña

## ** Refresh Token **

El refresh token consiste en renovar el token del usuario logueado, esto sirve para no tener que desloguearse cada vez que el token expire y el usuario quiera realizar una función que lo necesite. Esta funcionalidad todavía debe ser probada.

**_ CAMPOS NO NECESARIOS PARA LA AUTENTICACIÓN PERO QUE EL USUARIO GUARDA _**

    tokenExp: GUARDA EL MOMENTO EN EL QUE EXPIRA EL TOKEN, PARA ASI RENOVARSE AUTOMÁTICAMENTE.

    location: LA LOCALIZACIÓN DEL USUARIO (PAÍS, PROVINCIA Y LOCALIDAD)

    gender: GENERO (CON UN CONJUNTO DE OPCIONES SETEADAS, LAS CUALES SON "male" Y "female". ESTO PUEDE SER MODIFICADO EN EL FRONT, POR EJEMPLO
    "male" === "Hombre")

    document: DOCUMENTO DEL USUARIO,

## ** Update user **
Para actualizar el usuario, se le debe pasar el token por header, el ID del usuario en la url como parámetro y la informacion por body de la siguiente manera:
 {
  "document": "1234567890",
  "location": {
    "country": "Spain",
    "province": "Barcelona",
    "city": "Barcelona"
  },
  "gender":"male"
}    

## ** Delete User **

Para ejecutar esta función, se necesita pasar el token del usuario por header y el ID del mismo en la url como parámetro.