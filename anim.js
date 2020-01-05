var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
 
 var platforms;
 var player1;
 var player2;
 var mummy;
 var ball;
 var weapon;
 var line;
 var ball2;
 var textStyle = { font: '18px Arial', fill: '#0095DD' };
 var GamePoints1;
 var GamePoints2;
 var PointsPlayer1 = 1;
 var PointsPlayer2 = 1;
 var leftPlatforms;
 var rightPlatforms;
 var hit;
 
function preload() {

 game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
 
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
	game.load.image('ball', 'img/ball.png');
	game.load.image('line', 'img/line.png');
	game.load.image('platforms','img/paddle.png');
	game.load.audio('hit', 'aud/zvuk.mp3');
	game.stage.backgroundColor = '#eee';
}
 
function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE); //добавление аркадной физики мячу. заставляет его двигаться
	game.physics.arcade.checkCollision.down = true;
	hit = game.add.audio('hit');
	ball2 = game.add.sprite(game.world.randomX, game.world.height-400, 'ball');
	ball2.anchor.set(0.5);
	game.physics.enable(ball2);
	ball2.body.collideWorldBounds = true;///перестает проходит сквозь стены
	ball2.body.bounce.set(1);///отскок от стен
	ball2.checkWorldBounds = true;
	ball2.body.gravity.y = 222 
	ball2.body.velocity.set(200, -150);
	
	rightPlatforms = game.add.group();
	rightPlatforms.enableBody = true;
	var ground = rightPlatforms.create(430, game.world.height - 20, 'platforms');
	ground.scale.setTo(5, 5);
	ground.anchor.set(0,0);
	ground.body.immovable = true;
	

	leftPlatforms = game.add.group();
	leftPlatforms.enableBody = true;
	var ground2 = leftPlatforms.create(0, game.world.height - 20, 'platforms');
	ground2.scale.setTo(5, 5);
	ground2.anchor.set(0,0);
	ground2.body.immovable = true;
	
	//  Мы собираемся использовать Physics, так что включаем Arcade Physics систему
    /* game.physics.startSystem(Phaser.Physics.ARCADE); *////дубль удалить
	line = game.add.sprite(game.world.width*0.5, game.world.height-1, 'line');
	line.scale.setTo(0.05, 1);///изменяем масштаб изображения 
	line.anchor.set(0.5,0.25);
	game.physics.enable(line, Phaser.Physics.ARCADE);
	line.body.immovable = true;
	

	
	// Игрок задаёт свои настройки.
    player1 = game.add.sprite(200, game.world.height - 150, 'dude');
 
    //  Нужно задействовать физику на игроке.
    game.physics.arcade.enable(player1);
 
    //  Параметры физики игрока. Даруйте малышу лёгкость в прыжках.
    player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 600;
	player1.body.collideWorldBounds = true;  ///перестает проходить сквозь стены
 
    //  Две наши анимации, ходьба влево и вправо.
    player1.animations.add('left', [0, 1, 2, 3], 10, true);
    player1.animations.add('right', [5, 6, 7, 8], 10, true);
	
	player2 = game.add.sprite(600, game.world.height - 150, 'dude');
	
	game.physics.arcade.enable(player2);
	player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 600;
	player2.body.collideWorldBounds = true;  
	
    player2.animations.add('left2', [0, 1, 2, 3], 10, true);
    player2.animations.add('right2', [5, 6, 7, 8], 10, true);	
	player2.tint = Math.random() * 0xFFFFFF;////оттенок
	
/* 	game.physics.startSystem(ball,Phaser.Physics.ARCADE); */
	
	/* weapon = game.add.weapon(30, 'ball');
	weapon.ballKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
	weapon.ballSpeed = 600;
	weapon.fireRate = 100; //количество пуль на экране
    player.body.drag.set(70);
    player.body.maxVelocity.set(200);
    weapon.trackSprite(player, 20, 40, true);	///привязка к player и перемещение по его фигуре по x и y */
	
	
	
	
	
	/* game.physics.arcade.enable(ball); */
	cursors = game.input.keyboard.createCursorKeys();
	KeyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
	KeyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
	KeyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
	jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	/* var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    /* space_key.onDown.add(this.jump, this); */
	
	GamePoints1 = game.add.text(game.world.width*0.25, 5, 'Points Player 1: ', textStyle);
	GamePoints2 = game.add.text(game.world.width*0.75, 5, 'Points Player 2: ', textStyle);
}
 
function update() {
	game.physics.arcade.collide(player1, ballHitLine);
	game.physics.arcade.collide(player2, ballHitLine);
	game.physics.arcade.collide(player1, line);
	game.physics.arcade.collide(player2, line);
	game.physics.arcade.collide(ball2, line);
game.physics.arcade.collide(player1, ball2);
game.physics.arcade.collide(player2, ball2);
	game.physics.arcade.collide(player2, leftPlatforms);
	game.physics.arcade.collide(player1, leftPlatforms);
	game.physics.arcade.collide(ball2, leftPlatforms, ballHitGroundLeft);////включить физику столкновения мяча, платформы и того что будет если они столкнутся 
	game.physics.arcade.collide(player2, rightPlatforms);
	game.physics.arcade.collide(player1, rightPlatforms);
	game.physics.arcade.collide(ball2, rightPlatforms, ballHitGroundRight);////включить физику столкновения мяча, платформы и того что будет если они столкнутся 
	game.physics.arcade.collide(ball2, player1, ballHitPlayer1);
	game.physics.arcade.collide(ball2, player2, ballHitPlayer2);
		
	// сбрасываем скорость игрока (movement)
    player1.body.velocity.x = 0;
	player2.body.velocity.x = 0;
	
	    if (cursors.up.isDown)
    {
        /* game.physics.arcade.accelerationFromRotation(player.rotation, 300, player.body.acceleration);///фигура вертится  */
		player1.body.velocity.y = -350;
	}
	else {
		player1.body.acceleration.set(0);
	}
	
	
 
    if (cursors.left.isDown)
    {
        //  движение влево
        player1.body.velocity.x = -150;
 
        player1.animations.play('left');
/* 		player.body.angularVelocity = -300;
		weapon.fireAngle = Phaser.ANGLE_LEFT; */
    }
    else if (cursors.right.isDown)
    {
        //  движение вправо
        player1.body.velocity.x = 150;
 
        player1.animations.play('right');
/* 		player.body.angularVelocity = 300;
		weapon.fireAngle = Phaser.ANGLE_RIGHT; */
    }
    else
    {
        //  остановиться
        player1.animations.stop();
 
        player1.frame = 4;
		player1.body.angularVelocity = 0;///остановка вращения
    }
 





	    if (KeyW.isDown)
    {
        /* game.physics.arcade.accelerationFromRotation(player.rotation, 300, player.body.acceleration);///фигура вертится  */
		player2.body.velocity.y = -350;
	}
	else {
		player2.body.acceleration.set(0);
	}
	
	
 
    if (KeyA.isDown)
    {
        //  движение влево
        player2.body.velocity.x = -150;
 
        player2.animations.play('left2');
/* 		player.body.angularVelocity = -300;
		weapon.fireAngle = Phaser.ANGLE_LEFT; */
    }
    else if (KeyD.isDown)
    {
        //  движение вправо
        player2.body.velocity.x = 150;
 
        player2.animations.play('right2');
/* 		player.body.angularVelocity = 300;
		weapon.fireAngle = Phaser.ANGLE_RIGHT; */
    }
    else
    {
        //  остановиться
        player2.animations.stop();
 
        player2.frame = 4;
		player2.body.angularVelocity = 0;///остановка вращения
    }
 
/* 	if (ball2, platforms) 
	    alert('You lost, game over!');
        location.reload(); */

 
/*     if (jumpKey.isDown ){
        weapon.fire();
	} */
	
/* 	game.world.wrap(player1, 16);////карта зациклена, конец одной стороны возвращает к другой  */
	
}

function ballHitLine(ball2, line) {
 	ball2.body.velocity.x = -5*(line.x-ball2.x);
}

function ballHitPlayer1(ball2, player1) {
 	ball2.body.velocity.x = -10*(player1.x-ball2.x);
	hit.play();
}
function ballHitPlayer2(ball2, player2) {
 	ball2.body.velocity.x = -10*(player2.x-ball2.x);
	hit.play();
}



function ballHitGroundLeft (ball2, leftPlatforms) { //платформа игрока 1
		GamePoints2.setText('Points Player 2: '+PointsPlayer2);
		PointsPlayer2=PointsPlayer2+1;
		if (PointsPlayer2==6){
			alert('Game over! Player 2 Win!!!');
			location.reload();
		}
			
	/* 	    alert('You lost, game over!');
	location.reload();  */
} 

function ballHitGroundRight (ball2, rightPlatforms) { //платформа игрока 2
			GamePoints1.setText('Points Player 1: '+PointsPlayer1);
		PointsPlayer1=PointsPlayer1+1;
		if (PointsPlayer1==6){
			alert('Game over! Player 1 Win!!!');
			location.reload();
		}
		  
} 

/////https://phaser.io/examples/v2/weapon/asteroids
/////https://kenney.nl/assets