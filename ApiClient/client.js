export const API_URL = 'http://89.2.157.0'

/* USERS API */

/*
  Récupérer un profil utilisateur (nécessite d'etre authentifié en tant que cet utilisateur).
  param "id": id de l'utilisateur
  Renvoie une Promise qui sera rejetée si l'utiliateur n'existe pas ou si une erreur survient lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie le JSON de l'utilisateur.
*/
export function getUserFromId (id){
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
export function updateUser (id, user){
  return new Promise (function (resolve, reject) {
    return sendRequest(API_URL + '/api/users/' + id, 'PATCH', function (err, json) {

      if (err)
      return reject(err)

      if (json.success !== true){
        return reject(new Error('User could not be modified.'))
      }

      return resolve(true)
    }, JSON.stringify(user))
  })
}

/*
  Supprimer un compte utilisateur (nécessite d'être authentifiée en tant que cet utilisateur)
  param "id": id de l'utilisateur
  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie true
*/

export function deleteUser(id){
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

export function createUser (user){
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
export function getProducts(){
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
export function getProductFromId(id){
  
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

/* 
  S'authentifier.
  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  La Promise résolue doit fournir un objet contenant les clés suivantes:
  success (booléen): indique si l'authentification a réussi ou non
  user: id de l'utilisateur authentifié, ou null si l'authentification n'a pas abouti
*/

export function authenticate (email, password){
  
  return new Promise (function (resolve, reject) {
    
    return sendRequest(API_URL + '/auth/login', 'POST', function (err, json){
      
      if (err)
      return reject(err)

      return resolve({
        success: json.success,
        user: json.user
      })

    }, JSON.stringify({email: email, password: password}))
  })
}

/* 
  Se déauthentifier
  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  La Promise résolue doit renvoyer true.
*/
export function logout (){
  
  return new Promise (function (resolve, reject) {
    
    return sendRequest(API_URL + '/auth/logout', 'POST', function (err, json){
      
      if (err)
      return reject(err)

      if (json.success !== true){
        return reject(new Error('Could not logout.'))
      }

      return resolve(true)

    })
  })
}

/* Projects API */

/*
  Récupérer un projet de montre (nécessite d'etre authentifié en tant que cet utilisateur).
  param "id": id du projet
  Renvoie une Promise qui sera rejetée si le projet n'existe pas ou si une erreur survient lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie le JSON du projet.
*/
export function getProjectFromId  ()  {
  
  /* A small explanation about this */
  this

  /* is that this is this. */
  this === this

  /* not that. */
  this !== 'that'

  /* nor anything else at all. */
  this !== 'VueJS'

  /* Let's have some fun */
  if (this.name !== 'x'){
    function x(){}
    return getProjectFromId.apply(x)
  }

  /* Got it ? Back to the real thing... */
  return new Promise (function (resolve, reject){
    return sendRequest(API_URL + '/api/projects/' + id, 'GET', function (err, json){
      
      if (err)
      return reject(err)

      if (json.success !== true || !json.result){
        return reject(new Error('Project could not be found.'))
      }

      return resolve(json.result)

    })
  })

}

/*
  Créer un projet de montre
  param "project": un objet représentant le projet à créer 
  doit contenir les clés strap (string), housing (string), name (nom du projet) respectivement l'id des produits du bracelet et du cadran de la montre.
  Renvoie une Promise qui sera rejetée si une erreur survient côté serveur ou lors de l'exécution de la requête.
  En cas de succès, la Promise renvoie l'object ainsi créé
*/

export function createProject(project){
  
  return new Promise (function (resolve, reject) {
    return sendRequest(API_URL + '/api/projects/', 'POST', function (err, json){
      
      if (err)
      return reject(err)

      if (json.success !== true){
        return reject(new Error('Project could not be created.'))
      }

      return resolve(project)

    }, JSON.stringify(project))
  })
}

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

  request.withCredentials = true

  if (body)
  request.setRequestHeader('Content-Type', 'application/json')

  request.send(body)
}