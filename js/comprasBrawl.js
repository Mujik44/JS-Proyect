/*--El usuario debe registrarse en nuestra página para luego poder cargar las gemas a su cuenta--*/

let opcion
let regresar = "SI"
let gemas = 0
let pago
let totalPagar

function Pago(totalPago,cantidad){
    totalPagar = totalPago*cantidad
}

console.log("Bienvenido a SuperCell Store de Brawl Stars") 

while(regresar == "SI"){
    totalPagar = 0
    let cantidad = 0

    console.log("Opciones:") 
    console.log("1) 2000 Gemas = 1̶0̶2̶.̶8̶6$ 92.57$") 
    console.log("2) 950 Gemas = 5̶1̶.̶4̶1$ 46.27$") 
    console.log("3) 360 Gemas = 2̶0̶.̶2̶8$ 18.25$") 
    console.log("4) 170 Gemas = 1̶0̶.̶2̶6$ 9.24$") 
    console.log("5) 80 Gemas = 4̶.̶8̶5$ 4.36$") 
    console.log("6) 30 Gemas = 1̶.̶8̶7$ 1.68$") 
    opcion = prompt("Elije una opcion:")

    switch(opcion){
        case "1": 
            totalPagar = totalPagar + 92.57;
            gemas = 2000
            break;
        case "2":
            totalPagar = totalPagar + 46.27;
            gemas = 950
            break;
        case "3":
            totalPagar = totalPagar + 18.25;
            gemas = 360
            break; 
        case "4":
            totalPagar = totalPagar + 9.24;
            gemas = 170
            break;
        case "5":
            totalPagar = totalPagar + 4.36;
            gemas = 80
            break;
        case "6":
            totalPagar = totalPagar + 1.68;
            gemas = 30
            break;
        default:
            console.log("Porfavor ingrese una opción correcta")
            break;
    }
    if(totalPagar>0){
        cantidad = prompt("Elija la cantidad de paquetes que quiere comprar:")
        Pago(totalPagar,cantidad)
        console.log("Medios de Pago") 
        console.log("1) Google Pay") 
        console.log("2) Bank Card") 
        console.log("3) Paypal")
        console.log("4) Amazon Pay")
        opcion = prompt("Elija un medio de pago:") 
        console.log("El total a pagar por " + cantidad + " paquete(s) de "+ gemas + " gemas es " + totalPagar.toFixed(2) + " dolares")
        pago = prompt("¿Confirmar pago? Ingrese SI o NO")
        if(pago == "SI"){
            console.log("Pago exitoso las gemas ya fueron cargadas a su cuenta, gracias por su compra :) hasta la próxima")
            regresar = "NO"
        }else{
            regresar = prompt("¿Desea corregir su compra? Ingrese SI o NO")
            if(regresar == "NO"){
                console.log("Hasta la próxima :)")
            }
        }
    }else{
        regresar = prompt("¿Desea seguir comprando? Ingrese SI o NO")
    }
}