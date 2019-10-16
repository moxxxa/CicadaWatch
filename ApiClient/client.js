const API_URL = 'http://127.0.0.1'

/* USERS API */

/*
  Récupérer un profil utilisateur (nécessite d'etre authentifié en tant que cet utilisateur).

  param "id": id de l'utilisateur

  Renvoie une Promise qui sera rejetée si l'utiliateur n'existe pas ou si une erreur survient lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie le JSON de l'utilisateur.

*/
function getUserFromId (id){
  return new Promise (function (resolve, reject){
    return sendRequest(API_URL + '/api/users/' + id, 'GET', function (err, json){
      if (err)
      return reject(err)

      if (json.success !== true || !json.result){
        return reject(new Error('User could not be found.'))
      }

      return resolve(json.result)
    })
  })
}

/*
  Mettre à jour les champs d'un profil utilisateur (nécessite d'etre authentifié en tant que cet utilisateur).

  param "id": id de l'utilisateur
  param "user": un objet contenant les champs à modifier (surname (string), firstname (string), email (string), password (string))

  Chacun des champ de l'objet "user" sont optionnels (on peut très bien ne rien update du tout avec un objet vide {}).

  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie true

*/
function updateUser (id, user){
  return new Promise (function (resolve, reject) {
    return sendRequest(API_URL + '/api/users/' + id, 'PATCH', function (err, json) {

      if (err)
      return reject(err)

      if (json.success !== true){
        return reject(new Error('User could not be modified.'))
      }

      return resolve(true)
    })
  })
}

/*
  Supprimer un compte utilisateur (nécessite d'être authentifiée en tant que cet utilisateur)

  param "id": id de l'utilisateur

  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie true
*/

function deleteUser(id){
  return new Promise(function (resolve, reject){
    return sendRequest(API_URL + '/api/users/' + id, 'DELETE', function (err, json){
      if (err)
      return reject(err)

      if (json.success !== true){
        return reject(new Error('User could not be removed.'))
      }

      return resolve(true)
    })
  })
}

/*

  Créer un compte utilisateur

  param "user": un objet représentant l'utilisateur à créer (doit contenir les clés firstname (string), surname (string), email (string), password (string))

  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie true

*/

function createUser (user){
  return new Promise (function (resolve, reject) {
    return sendRequest(API_URL + '/api/users/', 'POST', function (err, json){
      if (err)
      return reject(err)

      if (json.success !== true){
        return reject(new Error('User could not be created.'))
      }

      return resolve(true)
    }, JSON.stringify(user))
  })
}

/* PRODUCTS API */

/*
  Récupérer l'ensemble des produits en base.

  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie un tableau de produits

*/
function getProducts(){
  return new Promise (function (resolve, reject) {
    return sendRequest(API_URL + '/api/products/', 'GET', function (err, json){
      if (err)
      return reject(err)

      if (json.success !== true){
        return reject(new Error('Products could not be looked up.'))
      }

      return resolve(json.results)
    })
  })
}

/*
  Récupérer un produit via son id.

  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie le produit demandé.

*/
function getProductFromId(id){
  return new Promise (function (resolve, reject) {
    return sendRequest(API_URL + '/api/products/' + id, 'GET', function (err, json){
      if (err)
      return reject(err)

      if (json.success !== true || !json.result){
        return reject(new Error('Product could not be found.'))
      }

      return resolve(json.result)
    })
  })
}

/* Projects API */

/* TODO */

/* internals */
function sendRequest (url, method, callback, body){

  var request = new XMLHttpRequest()

  request.onreadystatechange = function (){
    if (this.readyState === XMLHttpRequest.DONE){
      try{
        callback(undefined, JSON.parse(this.responseText))
      } catch (e){
        callback(new Error('Error while parsing JSON'))
      }
    }
  }

  request.open(method, url)

  if (body)
  request.setRequestHeader('Content-Type', 'application/json')

  request.send(body)
}
