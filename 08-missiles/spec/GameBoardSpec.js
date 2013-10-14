/*


En el anterior prototipo, el objeto Game permite gestionar una pila de
tableros (boards). Los tres campos de estrellas, la pantalla de inicio
y el sprite de la nave del jugador se a�aden como tableros
independientes para que Game pueda ejecutar sus m�todos step() y
draw() peri�dicamente desde su m�todo loop(). Sin embargo los tableros
no pueden interaccionar entre s�. Resulta dif�cil con esta
arquitectura pensar en c�mo podr�a por ejemplo detectarse la colisi�n
de una nave enemiga con la nave del jugador, o c�mo podr�a detectarse
si un disparo de colisiona con una nave.

Este es precisamente el requisito que se ha identificado para este
prototipo: gestionar la interacci�n entre los elementos del
juego. Piensa en esta clase como un tablero de juegos de mesa, sobre
el que se disponen los elementos del juego (fichas, cartas, etc.). En
este caso ser�n naves enemigas, nave del jugador y disparos los
elementos del juego. Para Game, GameBoard ser� un tablero m�s, por lo
que deber� ofrecer los m�todos step() y draw(), y ser� responsable de
mostrar todos los objetos que contenga cuando Game llame a estos
m�todos.



Especificaci�n: GameBoard debe

- mantener una colecci�n de objetos a la que se pueden a�adir y de la
  que se pueden eliminar sprites

- interacci�n con Game: cuando reciba los m�todos step() y draw() debe
  ocuparse de que se ejecuten estos m�todos en todos los objetos que
  contenga.

- debe detectar la colisi�n entre objetos. Querremos que los disparos
  de la nave del jugador detecten cu�ndo colisionan con una nave
  enemiga, que una nave enemiga detecte si colisiona con la nave del
  jugador, que un disparo de la nave enemiga detecte si colisiona con
  la nave del jugador,... necesitamos saber de qu� tipo es cada objeto.


*/

describe("Ver funcionalidad de la clase GameBoard", function(){

	it("Funcion add", function(){
		var game = new GameBoard();
		expect(game.add("hola")).toEqual(game.objects[0]);
	});


	it("Funcion resetRemoved, remove y finalizeRemoved", function(){
		var game = new GameBoard();
		game.resetRemoved();
		game.remove("hola");
	
		var agrego = game.add("hola");

		game.finalizeRemoved();
		expect("hola").toEqual(game.removed[0]);
		expect(game.objects).toEqual([]);
	});


	it("Funcion overlap", function(){
		var game = new GameBoard();
		var Coordenadas = function(x,y,h,w){
			this.x = x;
			this.y = y;
			this.h = h;
			this.w = w;
		};
		var coordA = new Coordenadas(1,1,3,3);
		var coordB = new Coordenadas(9,9,3,3);
		var coordC = new Coordenadas(2,2,3,3);
		expect(game.overlap(coordA,coordB)).toEqual(false);
		expect(game.overlap(coordA,coordC)).toEqual(true);
	});

	
	it("Funcion iterate", function(){
		var game = new GameBoard();
		var obj1 = new function(){
			this.funcion = function(){
				return 0;
			};
		};
		var obj2 = new function(){
			this.funcion = function(){
				return 1;
			};
		};
		spyOn(obj1,"funcion");
		spyOn(obj2,"funcion");
		game.add(obj1);
		game.add(obj2);
		game.iterate("funcion");
		

		_.each(game.objects,function(element,index,list){expect(element.funcion).toHaveBeenCalled()});
	});


	it("Funcion detect", function(){
		var game = new GameBoard();
		var funcion = {
			valor : 1,
			func: function(){
				return this.valor;
			},
		};
		var obj1 = {
			valor : 2
		};
		var obj2 = {
			valor : 3
		};
		//alert(4);
		game.add(obj1);
		game.add(obj2);

		var objeto = game.detect(funcion.func);

		expect(0).toBe(0);
		_.each(game.objects,function(element,index,list){expect(list[0].valor).toEqual(objeto.valor)});
	});
});
