const socket = io();

//obtengo parametro de url
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
	window.location = "index.html";
	throw new Error("El escritorio es necesario");
}

const escritorio = searchParams.get("escritorio");

console.log(escritorio);

let $h1 = document.getElementsByTagName("h1");
let $small = document.getElementsByTagName("small");
let $boton = document.getElementsByTagName("button");

$h1[0].innerHTML = `Escritorio ${escritorio}`;

$boton[0].addEventListener("click", () => {
	socket.emit("atenderTicket", { escritorio }, resp => {
		if (resp.numero === undefined) {
			return alert(resp);
		}

		$small[0].innerHTML = resp.numero;
	});
});
