$(document).ready(function(){
            var token = localStorage.getItem("accessToken");
            if(token == null)
            $(location).prop('href', '/ADN/Login_Almacen.html');
            
            $("#cerrarSesion").click(function(){
                jQuery.ajax({  
                    url: 'http://127.0.0.1:8001/api/logout',  
                    type: 'GET',
                    headers: {
                        "Authorization" : "Bearer " + localStorage.getItem("accessToken"),
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                    },
                    success: function(data) {  
                        localStorage.removeItem("accessToken");
                        $(location).prop('href', '/ADN/Login_Almacen.html');
                    }
                    
                });  
            });
            
        });
		
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}