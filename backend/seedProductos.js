const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('./modelos/ModeloProducto');

const productos = [
  {
    nombre: "Camisa MAJA Outdoor Signature",
    categoria: "Hombre",
    precio: 1799,
    descripcion:
      "La Camisa MAJA Outdoor Signature combina protección solar, ventilación estratégica y repelencia al agua en una prenda ligera y resistente.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CO1-14-camisa-manga-larga-outdoor-signature-negra-maja-sportswear-01.jpg?v=1762155878&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO1-14-camisa-manga-larga-outdoor-signature-negra-maja-sportswear-02.jpg?v=1762155878&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO1-14-camisa-manga-larga-outdoor-signature-negra-maja-sportswear-03.jpg?v=1762155878&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO1-14-camisa-manga-larga-outdoor-signature-negra-maja-sportswear-04.jpg?v=1762155878&width=600"
    ],
    tallas: [
      { talla: "XXS", stock: 10},
      { talla: "XS", stock: 10},  
      { talla: "S", stock: 10 },
      { talla: "M", stock: 18 },
      { talla: "L", stock: 15 },
      { talla: "XL", stock: 15 },
      { talla: "XXL", stock: 15 }
    ]
  },

  {
    nombre: "Camisa MAJA Outdoor Equipo",
    categoria: "Hombre",
    precio: 1799,
    descripcion:
      "La Camisa MAJA Outdoor Equipo combina protección solar, ventilación y confort técnico en una prenda ligera y resistente.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CO10-3-camisa-manga-larga-outdoor-equipo-azul-marino-maja-sportswear-01.jpg?v=1764164373&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO10-3-camisa-manga-larga-outdoor-equipo-azul-marino-maja-sportswear-02.jpg?v=1764164373&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO10-3-camisa-manga-larga-outdoor-equipo-azul-marino-maja-sportswear-03.jpg?v=1764164373&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO10-3-camisa-manga-larga-outdoor-equipo-azul-marino-maja-sportswear-04.jpg?v=1764164373&width=600"
    ],
    tallas: [
      { talla: "XXS", stock: 10},
      { talla: "XS", stock: 10},  
      { talla: "S", stock: 10 },
      { talla: "M", stock: 18 },
      { talla: "L", stock: 15 },
      { talla: "XL", stock: 15 },
      { talla: "XXL", stock: 15 }
    ]
  },

  {
    nombre: "Camisa MAJA Navío",
    categoria: "Hombre",
    precio: 1799,
    descripcion:
      "La Camisa MAJA Navío combina un estilo formal con funcionalidad outdoor. Su tela antidesgarro aporta resistencia y durabilidad.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CO15-3-camisa-manga-larga-outdoor-navio-gris-ceniza-maja-sportswear-01.jpg?v=1764163794&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO15-3-camisa-manga-larga-outdoor-navio-gris-ceniza-maja-sportswear-02.jpg?v=1764163794&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO15-3-camisa-manga-larga-outdoor-navio-gris-ceniza-maja-sportswear-03.jpg?v=1764163794&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CO15-3-camisa-manga-larga-outdoor-navio-gris-ceniza-maja-sportswear-04.jpg?v=1764163794&width=600"
    ],
    tallas: [
      { talla: "XXS", stock: 10},
      { talla: "XS", stock: 10},  
      { talla: "S", stock: 10 },
      { talla: "M", stock: 18 },
      { talla: "L", stock: 15 },
      { talla: "XL", stock: 15 },
      { talla: "XXL", stock: 15 }
    ]
  },

  {
    nombre: "Camisa MAJA Montura",
    categoria: "Hombre",
    precio: 1799,
    descripcion:
      "La Camisa MAJA Montura combina la fuerza del estilo ranchero con funcionalidad contemporánea. Confeccionada en mezclilla resistente con estiramiento 4 vías, botones metálicos de presión, doble bolsillo frontal y un acabado cálido que resalta al tacto.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CC9-2-camisa-manga-larga-maja-montura-color-cafe-maja-sportswear-01.jpg?v=1763361139&width=1000",
      "https://majasportswear.com/cdn/shop/files/C-CC9-2-camisa-manga-larga-maja-montura-color-cafe-maja-sportswear-02.jpg?v=1763361138&width=1000",
      "https://majasportswear.com/cdn/shop/files/C-CC9-2-camisa-manga-larga-maja-montura-color-cafe-maja-sportswear-03.jpg?v=1763361138&width=1000",
      "https://majasportswear.com/cdn/shop/files/C-CC9-2-camisa-manga-larga-maja-montura-color-cafe-maja-sportswear-04.jpg?v=1763361138&width=1000"
    ],

    tallas: [
      { talla: "XXS", stock: 10},
      { talla: "XS", stock: 10},  
      { talla: "S", stock: 10 },
      { talla: "M", stock: 18 },
      { talla: "L", stock: 15 },
      { talla: "XL", stock: 15 },
      { talla: "XXL", stock: 15 }
    ]
  },

  {
    nombre: "Camisa Pescadero",
    categoria: "Hombre",
    precio: 1399,
    descripcion:
      "La Camisa Pescador tiene un corte perfecto con mucha funcionalidad, ideal para usarla en tu día a día.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CE1-2-camisa-manga-larga-pescadero-negra-maja-sportswear-01.jpg?v=1764165226&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CE1-2-camisa-manga-larga-pescadero-negra-maja-sportswear-02.jpg?v=1764165226&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CE1-2-camisa-manga-larga-pescadero-negra-maja-sportswear-03.jpg?v=1764165226&width=600",
      "https://majasportswear.com/cdn/shop/files/C-CE1-2-camisa-manga-larga-pescadero-negra-maja-sportswear-04.jpg?v=1764165226&width=600"
    ],
    
    tallas: [
      { talla: "XXS", stock: 10},
      { talla: "XS", stock: 10},  
      { talla: "S", stock: 10 },
      { talla: "M", stock: 18 },
      { talla: "L", stock: 15 },
      { talla: "XL", stock: 15 },
      { talla: "XXL", stock: 15 }
    ]
  },

  {
    nombre: "Top MAJA Respiro",
    categoria: "Mujer",
    precio: 699,
    descripcion:
      "El Top MAJA Respiro combina ligereza, comodidad y estilo moderno en una prenda diseñada para acompañarte tanto en movimiento como en calma.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-TT3-2-top-maja-respiro-color-cafe-maja-sportswear-01.jpg?v=1764906823&width=1000",
      "https://majasportswear.com/cdn/shop/files/D-TT3-2-top-maja-respiro-color-cafe-maja-sportswear-02.jpg?v=1764906823&width=1000",
      "https://majasportswear.com/cdn/shop/files/D-TT3-2-top-maja-respiro-color-cafe-maja-sportswear-03.jpg?v=1764906823&width=1000"
    ],
    
    tallas: [
      { talla: "XXS", stock: 10},
      { talla: "XS", stock: 10},  
      { talla: "S", stock: 10 },
      { talla: "M", stock: 18 },
      { talla: "L", stock: 15 },
      { talla: "XL", stock: 15 },
      { talla: "XXL", stock: 15 }
    ]
  },

  {
    nombre: "Polo MAJA Nube",
    categoria: "Mujer",
    precio: 799,
    descripcion:
      "El Polo MAJA Nube es una básica diseñada para el día a día: ligera, suave y funcional. Su tejido transpirable y con estiramiento 4 vías garantiza libertad de movimiento y un ajuste discreto.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-PM4-1-polo-manga-corta-maja-nube-azul-cielo-maja-sportswear-01.jpg?v=1753913222&width=1000",
      "https://majasportswear.com/cdn/shop/files/D-PM4-1-polo-manga-corta-maja-nube-azul-cielo-maja-sportswear-02.jpg?v=1753913222&width=1000",
      "https://majasportswear.com/cdn/shop/files/D-PM4-1-polo-manga-corta-maja-nube-azul-cielo-maja-sportswear-03.jpg?v=1753913222&width=1000",
      "https://majasportswear.com/cdn/shop/files/D-PM4-1-polo-manga-corta-maja-nube-azul-cielo-maja-sportswear-04.jpg?v=1753913222&width=1000"
    ],
    
    tallas: [
      { talla: "XXS", stock: 10},
      { talla: "XS", stock: 10},  
      { talla: "S", stock: 10 },
      { talla: "M", stock: 18 },
      { talla: "L", stock: 15 },
      { talla: "XL", stock: 15 },
      { talla: "XXL", stock: 15 }
    ]
  },

  {
    nombre: "Chamarra MAJA Pedregal Dama",
    categoria: "Mujer",
    precio: 1599,
    descripcion:
      "La chamarra MAJA Pedregal Dama ofrece el equilibrio perfecto entre abrigo, ligereza y estilo urbano. Esta prenda combina conservación térmica y repelencia al agua en una silueta cómoda y moderna. Su estructura ligera se adapta a distintos entornos brindando protección sin sacrificar movilidad.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-HW1-2-chamarra-maja-pedregal-dama-color-beige-maja-sportswear-01.jpg?v=1763993125&width=1000",
      "https://majasportswear.com/cdn/shop/files/D-HW1-2-chamarra-maja-pedregal-dama-color-beige-maja-sportswear-02.jpg?v=1763993125&width=1000",
      "https://majasportswear.com/cdn/shop/files/D-HW1-2-chamarra-maja-pedregal-dama-color-beige-maja-sportswear-03.jpg?v=1763993125&width=1000",
      "https://majasportswear.com/cdn/shop/files/D-HW1-2-chamarra-maja-pedregal-dama-color-beige-maja-sportswear-04.jpg?v=1763993125&width=1000"
    ],
    
    tallas: [
      { talla: "XXS", stock: 10},
      { talla: "XS", stock: 10},  
      { talla: "S", stock: 10 },
      { talla: "M", stock: 18 },
      { talla: "L", stock: 15 },
      { talla: "XL", stock: 15 },
      { talla: "XXL", stock: 15 }
    ]
  },

  
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB conectado, insertando productos...");

    await Producto.deleteMany({});

    const res = await Producto.insertMany(productos);
    console.log(`Productos insertados: ${res.length}`);
    process.exit(0);
  } catch (err) {
    console.error("Error al insertar productos:", err.message);
    process.exit(1);
  }
};

run();
