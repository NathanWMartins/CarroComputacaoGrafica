// Configuração básica da cena, câmera e renderizador
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Ativa sombras
document.body.appendChild(renderer.domElement);

// Luz ambiente - mais intensa para maior brilho geral
var ambientLight = new THREE.AmbientLight(0x555555); // Ajustado para 0x555555
scene.add(ambientLight);

// Luz direcional - simulando o Sol
var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Luz mais forte para simular o Sol
directionalLight.position.set(10, 10, -15); // Mesma posição do modelo do Sol
directionalLight.castShadow = true; // Habilita sombras
directionalLight.shadow.mapSize.width = 2048; // Resolução da sombra
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;

// Ajuste do volume da câmera de sombra para capturar sombras detalhadas
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;

// Adiciona a luz direcional à cena
scene.add(directionalLight);

// Luz pontual para iluminação mais localizada
var pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 10, 5);
pointLight.castShadow = true;
scene.add(pointLight);

// Função para criar as estrelas
function criarEstrelas(qtdEstrelas) {
    var geometriaEstrelas = new THREE.BufferGeometry();
    var posicoes = [];

    for (var i = 0; i < qtdEstrelas; i++) {
        // Gera posições aleatórias para as estrelas em uma esfera ao redor da cena
        var x = (Math.random() - 0.5) * 500; // Valores entre -250 e 250
        var y = (Math.random() - 0.5) * 500;
        var z = (Math.random() - 0.5) * 500;
        posicoes.push(x, y, z);
    }

    geometriaEstrelas.setAttribute('position', new THREE.Float32BufferAttribute(posicoes, 3));

    // Material das estrelas
    var materialEstrelas = new THREE.PointsMaterial({
        color: 0xffffff,  // Cor branca para estrelas
        size: 0.7,        // Tamanho dos pontos
        sizeAttenuation: true, // Faz o tamanho diminuir com a distância
    });

    // Criação do sistema de pontos (estrelas)
    var estrelas = new THREE.Points(geometriaEstrelas, materialEstrelas);

    scene.add(estrelas);
}

// Adiciona 1000 estrelas à cena
criarEstrelas(1000);

// Curva para a pista
var pontos = [
    new THREE.Vector3(-20, 0, -10), // Ponto 1 - mais longe no eixo X e Z
    new THREE.Vector3(-10, 5, 0),   // Ponto 2 - aumentado no eixo X
    new THREE.Vector3(0, 2, 10),    // Ponto 3 - mais longe no eixo Z
    new THREE.Vector3(10, 2, 20),   // Ponto 4 - mais longe no eixo X e Z
    new THREE.Vector3(20, 2, 10),   // Ponto 5 - aumentado no eixo X
    new THREE.Vector3(10, 2, 0),    // Ponto 6 - mais longe no eixo Z negativo
    new THREE.Vector3(0, 2, -10),   // Ponto 7 - mais longe no eixo Z negativo
    new THREE.Vector3(-10, 1, -20), // Ponto 8 - mais longe no eixo X e Z negativo
  ];

var curva = new THREE.CatmullRomCurve3(pontos, true);
var extrudeSettings = {
    steps: 200,
    bevelEnabled: false,
    extrudePath: curva,
};

var pistaForma = new THREE.Shape();
pistaForma.moveTo(-0.5, -0.1);
pistaForma.lineTo(0.5, -0.1);
pistaForma.lineTo(0.5, 0.1);
pistaForma.lineTo(-0.5, 0.1);
pistaForma.lineTo(-0.5, -0.1);

var geometriaPista = new THREE.ExtrudeGeometry(pistaForma, extrudeSettings);
var materialPista = new THREE.MeshLambertMaterial({ color: 0xff6400 });
var pista = new THREE.Mesh(geometriaPista, materialPista);
pista.castShadow = true;
pista.receiveShadow = true;
scene.add(pista);

var loader = new THREE.GLTFLoader();

var moto;
loader.load('veiculos/moto3D/scene.gltf', function(gltf) {
    moto = gltf.scene;
    moto.position.set(-10, 1, -5);
    moto.scale.set(0.5, 0.5, 0.5);
    moto.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(moto); 
});

var moto2;
loader.load('veiculos/moto3D/scene.gltf', function(gltf) {
    moto2 = gltf.scene;
    moto2.position.set(-10, 1, -5);
    moto2.scale.set(0.5, 0.5, 0.5);
    moto2.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(moto2); 
});

var helicoptero;
loader.load('veiculos/helicopter3D/scene.gltf', function(gltf) {
    helicoptero = gltf.scene;
    helicoptero.position.set(0, 5, 0); // Posição inicial no céu
    helicoptero.scale.set(0.1, 0.1, 0.1); // Ajuste de escala
    helicoptero.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(helicoptero); // Adiciona o helicóptero à cena
});

var aviao;
loader.load('veiculos/aviao3D/scene.gltf', function(gltf) {
    aviao = gltf.scene;
    aviao.position.set(0, 0, -40); 
    aviao.scale.set(0.009, 0.009, 0.009);
    aviao.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(aviao); // Adiciona o avião à cena
});

var sol;
loader.load('planetas/sol3D/scene.gltf', function(gltf) {
    sol = gltf.scene;
    sol.position.set(0, 0, -60); 
    sol.scale.set(1.8, 1.8, 1.8);
    sol.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(sol); // Adiciona o sol à cena    
});

var lua;
loader.load('planetas/lua3D/scene.gltf', function(gltf) {
    lua = gltf.scene;
    lua.position.set(4, 7, 0); // Posição inicial no céu
    lua.scale.set(0.0005, 0.0005, 0.0005); // Ajuste de escala
    lua.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(lua); // Adiciona o lua à cena    
});

var terra;
loader.load('planetas/terra3D/scene.gltf', function(gltf) {
    terra = gltf.scene;
    terra.position.set(0, 0, 0); 
    terra.scale.set(0.05, 0.05, 0.05); 
    terra.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(terra); // Adiciona o terra à cena    
});

var mercurio;
loader.load('planetas/mercurio3D/scene.gltf', function(gltf) {
    mercurio = gltf.scene;
    mercurio.position.set(0, 0, -37);
    mercurio.scale.set(3.5, 3.5, 3.5);
    mercurio.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(mercurio); // Adiciona Mercúrio à cena    
});

var venus;
loader.load('planetas/venus3D/scene.gltf', function(gltf) {
    venus = gltf.scene;
    venus.position.set(0, 0, -24);
    venus.scale.set(0.09, 0.09, 0.09);
    venus.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(venus); // Adiciona Venus à cena    
});

var marte;
loader.load('planetas/marte3D/scene.gltf', function(gltf) {
    marte = gltf.scene;
    marte.position.set(0, 0, 20);
    marte.scale.set(5, 5, 5);
    marte.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(marte); // Adiciona Marte à cena    
});

var jupiter;
loader.load('planetas/jupiter3D/scene.gltf', function(gltf) {
    jupiter = gltf.scene;
    jupiter.position.set(0, 0, 40);
    jupiter.scale.set(0.09, 0.09, 0.09);
    jupiter.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(jupiter); // Adiciona Jupiter à cena    
});

var saturno;
loader.load('planetas/saturno3D/scene.gltf', function(gltf) {
    saturno = gltf.scene;
    saturno.position.set(0, 0, 75);
    saturno.scale.set(0.1, 0.1, 0.1);
    saturno.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(saturno); // Adiciona Saturno à cena    
});

var urano;
loader.load('planetas/urano3D/scene.gltf', function(gltf) {
    urano = gltf.scene;
    urano.position.set(0, 0, 110);
    urano.scale.set(0.05, 0.05, 0.05);
    urano.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(urano); // Adiciona Urano à cena    
});

var netuno;
loader.load('planetas/netuno3D/scene.gltf', function(gltf) {
    netuno = gltf.scene;
    netuno.position.set(0, 0, 130);
    netuno.scale.set(0.05, 0.05, 0.05);
    netuno.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(netuno); // Adiciona Netuno à cena    
});

var buracoNegro;
loader.load('planetas/buracoNegro3D/scene.gltf', function(gltf) {
    buracoNegro = gltf.scene;
    buracoNegro.position.set(150, 0, 0);
    buracoNegro.scale.set(2, 2, 2);
    buracoNegro.rotateX(THREE.MathUtils.degToRad(25)); 
    buracoNegro.rotateZ(THREE.MathUtils.degToRad(10)); 
    buracoNegro.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(buracoNegro); // Adiciona Buraco Negro à cena    
});

var buracoNegro2;
loader.load('planetas/buracoNegro3D/scene.gltf', function(gltf) {
    buracoNegro2 = gltf.scene;
    buracoNegro2.position.set(70, 30, -200);
    buracoNegro2.scale.set(1, 1, 1);
    buracoNegro2.rotateX(THREE.MathUtils.degToRad(25)); 
    buracoNegro2.rotateZ(THREE.MathUtils.degToRad(10)); 

    buracoNegro2.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(buracoNegro2);
});

var curvaHelicoptero = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, 3, 0),
    new THREE.Vector3(-7, 3, -7),
    new THREE.Vector3(0, 3, -10),
    new THREE.Vector3(7, 3, -7), 
    new THREE.Vector3(10, 3, 0), 
    new THREE.Vector3(7, 3, 7),  
    new THREE.Vector3(0, 3, 10), 
    new THREE.Vector3(-7, 3, 7), 
    new THREE.Vector3(-10, 3, 0),
], true);

var curvaAviao = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 6.3, 0),
    new THREE.Vector3(-4, 4, -3),
    new THREE.Vector3(-5, 0, -4),
    new THREE.Vector3(-3.8, -5, -3),
    new THREE.Vector3(0, -6.6, 0),
    new THREE.Vector3(3.8, -5, 3),
    new THREE.Vector3(5, 0, 4), 
    new THREE.Vector3(4, 4, 3), 
], true);

var pontosCurva = curvaAviao.getPoints(100);
var geometriaLinha = new THREE.BufferGeometry().setFromPoints(pontosCurva);

var materialTracejado = new THREE.LineDashedMaterial({
    color: 0xffffff,
    dashSize: 0.5,  
    gapSize: 0.2    
});

var linhaTracejada = new THREE.Line(geometriaLinha, materialTracejado);
linhaTracejada.computeLineDistances();

scene.add(linhaTracejada);

var progressoHelicoptero = 0;
function moverHelicoptero() {
  if (!helicoptero) return;
  progressoHelicoptero += 0.001;
  if (progressoHelicoptero > 1) progressoHelicoptero = 0;

  var posicao = curvaHelicoptero.getPointAt(progressoHelicoptero);
  var tangente = curvaHelicoptero.getTangentAt(progressoHelicoptero);

  helicoptero.position.copy(posicao);

  var matrizRotacao = new THREE.Matrix4();
  matrizRotacao.lookAt(posicao.clone().add(tangente), posicao, new THREE.Vector3(0, 1, 0));
  helicoptero.quaternion.setFromRotationMatrix(matrizRotacao);
}

var progresso = 0;
function moverMoto() {
  if (!moto) return;

  progresso += 0.002;
  if (progresso > 1) progresso = 0;

  var posicao = curva.getPointAt(progresso); 
  var tangente = curva.getTangentAt(progresso); 

  moto.position.copy(posicao);

  var matrizRotacao = new THREE.Matrix4();
  
  var eixoUp = new THREE.Vector3(0, 1, 0);
  
  matrizRotacao.lookAt(posicao.clone().add(tangente), posicao, eixoUp);
  
  moto.quaternion.setFromRotationMatrix(matrizRotacao);
}

var progresso2 = 0.5; 

function moverMoto2() {
  if (!moto2) return;

  progresso2 += 0.002;
  if (progresso2 > 1) progresso2 = 0;

  var posicao = curva.getPointAt(progresso2); 
  var tangente = curva.getTangentAt(progresso2); 

  moto2.position.copy(posicao);

  var matrizRotacao = new THREE.Matrix4();
  
  var eixoUp = new THREE.Vector3(0, 1, 0);
  
  matrizRotacao.lookAt(posicao.clone().add(tangente), posicao, eixoUp);
  
  moto2.quaternion.setFromRotationMatrix(matrizRotacao);
}

var progressoAviao = 0;
function moverAviao() {
    if (!aviao || !curvaAviao) return;

    progressoAviao += 0.001; 
    if (progressoAviao > 1) progressoAviao = 0;

    var posicao = curvaAviao.getPointAt(progressoAviao);
    aviao.position.copy(posicao);

    var centroTerra = new THREE.Vector3(0, 0, 0);
    var direcaoParaCentro = centroTerra.clone().sub(posicao).normalize();

    var tangente = curvaAviao.getTangentAt(progressoAviao).negate().normalize();

    var matrizRotacao = new THREE.Matrix4();
    matrizRotacao.lookAt(
        posicao.clone().add(tangente), 
        posicao,                    
        direcaoParaCentro            
    );

    aviao.quaternion.setFromRotationMatrix(matrizRotacao);

    aviao.rotateX(Math.PI);
}


camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5; 
controls.maxDistance = 50; 
controls.maxPolarAngle = Math.PI / 2;

function animate() {
    requestAnimationFrame(animate);
    if(terra){
        sol.rotation.y += 0.003;
        mercurio.rotation.y += 0.003;
        venus.rotation.y += 0.003;
        terra.rotation.y += 0.003;
        marte.rotation.y += 0.003;
        jupiter.rotation.y += 0.003;
        saturno.rotation.y += 0.005;
        urano.rotation.y += 0.003;
        netuno.rotation.y += 0.003;
        buracoNegro2.rotation.y += 0.01;
        buracoNegro.rotation.y += 0.01;
    }
    moverMoto();
    moverMoto2();
    moverHelicoptero();
    moverAviao();
    controls.update(); 
    renderer.render(scene, camera);
}

animate();