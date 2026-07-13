function login(){
  let user=document.getElementById("user").value;
  let pass=document.getElementById("pass").value;
  let error=document.getElementById("error");

  if(user==="admin" && pass==="1234"){
    localStorage.setItem("usuario",user);
    window.location.href = "../cine_perú/admin.html";
  }else{
    error.innerText="Usuario o contrasena incorrectos."
  }
}

let user = localStorage.getItem("usuario");

if(user){
    document.getElementById("mensaje-bienvenida").innerText=
    "Hola, "+user+ " bienvenido al sistema";
}else{
    document.getElementById("mensaje-bienvenida").innerText=
    "No hay sesion activa";
}

function logout(){
    localStorage.removeItem("usuario");
    window.location.href="../cine_perú/index.html";
}
