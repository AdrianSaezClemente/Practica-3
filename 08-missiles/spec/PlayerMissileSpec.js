/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/

describe("Ver funcionalidad de la clase PlayerMissile", function(){

	it("Funcion PlayerMissile", function(){
		
		SpriteSheet.map = {
			missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }
		};
		var player = new PlayerMissile(6,6);
		expect(player.x).toEqual(5);
		expect(player.w).toEqual(2);
		expect(player.h).toEqual(10);
		expect(player.y).toEqual(-4);
	});

	it("Funcion PlayerMissile.step()", function(){
		
		SpriteSheet.map = {
			missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }
		};
		var board = {
			remove : function(){
				return true;
			}
		};
		var player = new PlayerMissile(6,6);
		player.board = board;
		player.step(1);
		expect(player.y).toEqual(-704);
	});
});

