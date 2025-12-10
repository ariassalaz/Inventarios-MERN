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
// --------------------------CHAMARRAS MAJA HOMBRE-----------------------------------------------
  {
    nombre: "Chamarra MAJA Softshell",
    categoria: "Hombre",
    precio: 1999,
    descripcion:
      "La chamarra MAJA Sotfshell está diseñada para quienes enfrentan el frío con determinación. Su construcción softshell con tecnología repelente al agua y conservación térmica ofrece protección ligera contra el viento, la humedad y las bajas temperaturas.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CF2-5-chamarra-maja-softshell-color-cafe-maja-sportswear-01.jpg?v=1761750133&width=500",
      "https://majasportswear.com/cdn/shop/files/C-CF2-5-chamarra-maja-softshell-color-cafe-maja-sportswear-02.jpg?v=1761750133&width=500",
      "https://majasportswear.com/cdn/shop/files/C-CF2-5-chamarra-maja-softshell-color-cafe-maja-sportswear-03.jpg?v=1761750133&width=500",
      "https://majasportswear.com/cdn/shop/files/C-CF2-5-chamarra-maja-softshell-color-cafe-maja-sportswear-04.jpg?v=1761750133&width=500"
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
    nombre: "Chamarra MAJA Pedregal",
    categoria: "Hombre",
    precio: 2499,
    descripcion:
      "La chamarra MAJA Pedregal retoma lo mejor del estilo clásico y lo combina con funcionalidad moderna. Su diseño capitonado en patrón romboide ofrece calidez ligera y un look atemporal, mientras que el cuello en pana marrón aporta confort y un contraste elegante.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CM5-1-chamarra-maja-pedregal-color-gris-maja-sportswear-01.jpg?v=1763360024&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CM5-1-chamarra-maja-pedregal-color-gris-maja-sportswear-02.jpg?v=1763360024&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CM5-1-chamarra-maja-pedregal-color-gris-maja-sportswear-03.jpg?v=1763360024&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CM5-1-chamarra-maja-pedregal-color-gris-maja-sportswear-04.jpg?v=1763360024&width=800"
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
    nombre: "Chamarra MAJA Caborca",
    categoria: "Hombre",
    precio: 1999,
    descripcion:
      "La chamarra MAJA Caborca es una chamarra repelente al agua con conservación térmica, diseñada para actividades al aire libre y climas cambiantes. Una prenda resistente, funcional y lista para cualquier aventura.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CF2-4-chamarra-maja-caborca-maja-sportswear-02.jpg?v=1763359489&width=1000",
      "https://majasportswear.com/cdn/shop/files/C-CF2-4-chamarra-maja-caborca-maja-sportswear-02.jpg?v=1763359489&width=1000",
      "https://majasportswear.com/cdn/shop/files/C-CF2-4-chamarra-maja-caborca-maja-sportswear-03.jpg?v=1763359489&width=1000",
      "https://majasportswear.com/cdn/shop/files/C-CF2-4-chamarra-maja-caborca-maja-sportswear-04.jpg?v=1763359489&width=1000"
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
    nombre: "Chamarra MAJA Aventura",
    categoria: "Hombre",
    precio: 1799,
    descripcion:
      "La chamarra MAJA Aventura está diseñada con propósito y atención al detalle, rindiendo homenaje al paisaje natural de México. Su construcción resistente al agua, junto con el cierre frontal waterproof, la hacen ideal para acompañarte en climas cambiantes. Con una silueta estructurada y acabados limpios, esta prenda une funcionalidad y estilo.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CM1-5-chamarra-maja-aventura-color-verde-olivo-maja-sportswear-01.jpg?v=1762778316&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CM1-5-chamarra-maja-aventura-color-verde-olivo-maja-sportswear-02.jpg?v=1762778316&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CM1-5-chamarra-maja-aventura-color-verde-olivo-maja-sportswear-03.jpg?v=1762778316&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CM1-5-chamarra-maja-aventura-color-verde-olivo-maja-sportswear-04.jpg?v=1762778316&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CM1-5-chamarra-maja-aventura-color-verde-olivo-maja-sportswear-05.jpg?v=1762778316&width=800"
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
    nombre: "Chamarra MAJA Refugio",
    categoria: "Hombre",
    precio: 1999,
    descripcion:
      "Diseñada para los inviernos impredecibles, la Chamarra MAJA Refugio combina estilo minimalista y protección técnica. u cuello tipo tortuga y el cierre frontal completo ofrecen cobertura total contra el viento y el frío. Ajustes estratégicos en puños, ruedo y botones de presión aseguran confort y versatilidad.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-HW2-2-chamarra-maja-refugio-color-cafe-maja-sportswear-01.jpg?v=1765061955&width=800",
      "https://majasportswear.com/cdn/shop/files/C-HW2-2-chamarra-maja-refugio-color-cafe-maja-sportswear-02.jpg?v=1765061955&width=800",
      "https://majasportswear.com/cdn/shop/files/C-HW2-2-chamarra-maja-refugio-color-cafe-maja-sportswear-03.jpg?v=1765061955&width=800",
      "https://majasportswear.com/cdn/shop/files/C-HW2-2-chamarra-maja-refugio-color-cafe-maja-sportswear-04.jpg?v=1765061955&width=800",
      "https://majasportswear.com/cdn/shop/files/C-HW2-2-chamarra-maja-refugio-color-cafe-maja-sportswear-05.jpg?v=1765061955&width=800"
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

  //------------------------------POLO HOMBRE MAJA ---------------------------------------------------
  {
    nombre: "Polo MAJA",
    categoria: "Hombre",
    precio: 999,
    descripcion:
      "Nuestra Polo es ideal para llevarla en tus momentos de aventura y vestir de diario de forma casual. Corte clásico y protección UV para protegerte en todo momento.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM1-10-polo-manga-corta-negra-maja-sportswear-01.jpg?v=1764165062&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-10-polo-manga-corta-negra-maja-sportswear-02.jpg?v=1764165062&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-10-polo-manga-corta-negra-maja-sportswear-03.jpg?v=1764165062&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-10-polo-manga-corta-negra-maja-sportswear-04.jpg?v=1764165062&width=800"
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
    nombre: "Polo Naval",
    categoria: "Hombre",
    precio: 1199,
    descripcion:
      "El nuevo diseño de nuestra polo es ideal para llevarla en tus momentos de aventura y casuales. Corte clásico y protección UV para protegerte en todo momento.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM2-5-polo-manga-corta-naval-azul-marino-maja-sportswear-01.jpg?v=1764165787&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM2-5-polo-manga-corta-naval-azul-marino-maja-sportswear-02.jpg?v=1764165787&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM2-5-polo-manga-corta-naval-azul-marino-maja-sportswear-03.jpg?v=1764165787&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM2-5-polo-manga-corta-naval-azul-marino-maja-sportswear-04.jpg?v=1764165787&width=800"
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
    nombre: "Playera tipo Polo MAJA Caborca",
    categoria: "Hombre",
    precio: 999,
    descripcion:
      "La Playera tipo Polo MAJA Caborca combina diseño técnico con una estética inspirada en los paisajes áridos del desierto. Con un ajuste regular, estiramiento en 4 vías y detalles MAJA en contraste naranja, es una prenda versátil que equilibra comodidad, frescura y movimiento en cada ruta.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM1-31-playera-tipo-polo-maja-caborca-maja-sportswear-01.jpg?v=1763132337&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-31-playera-tipo-polo-maja-caborca-maja-sportswear-02.jpg?v=1763132337&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-31-playera-tipo-polo-maja-caborca-maja-sportswear-03.jpg?v=1763132337&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-31-playera-tipo-polo-maja-caborca-maja-sportswear-04.jpg?v=1763132337&width=800"
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
    nombre: "Playera tipo Polo MAJA Ocaso",
    categoria: "Hombre",
    precio: 999,
    descripcion:
      "Nuestra Polo es ideal para llevarla en tus momentos de aventura y vestir de diario de forma casual. Corte clásico y protección UV para protegerte en todo momento.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM1-30-playera-tipo-polo-maja-ocaso-roja-maja-sportswear-01.jpg?v=1753909344&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-30-playera-tipo-polo-maja-ocaso-roja-maja-sportswear-02.jpg?v=1753909344&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-30-playera-tipo-polo-maja-ocaso-roja-maja-sportswear-03.jpg?v=1753909344&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-30-playera-tipo-polo-maja-ocaso-roja-maja-sportswear-04.jpg?v=1753909344&width=800"
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
    nombre: "Polo MAJA Active",
    categoria: "Hombre",
    precio: 999,
    descripcion:
      "Diseño clásico de la polo en un textil ligero, ventilado y fit cómodo. Llévala en tu paso por el campo de golf, la oficina a tus actividades al aire libre.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM1-29-polo-manga-corta-maja-active-azul-cielo-maja-sportswear-01.jpg?v=1764167241&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-29-polo-manga-corta-maja-active-azul-cielo-maja-sportswear-02.jpg?v=1764167241&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-29-polo-manga-corta-maja-active-azul-cielo-maja-sportswear-03.jpg?v=1764167241&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-29-polo-manga-corta-maja-active-azul-cielo-maja-sportswear-04.jpg?v=1764167241&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-29-polo-manga-corta-maja-active-azul-cielo-maja-sportswear-05.jpg?v=1764167241&width=800"
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
    nombre: "Polo Pure Line",
    categoria: "Hombre",
    precio: 999,
    descripcion:
      "Un clásico que no pasa de moda. Una prenda básica que no puede faltar, lista para vivir el día a día. Un estilo sofisticado en la senda de la aventura.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM1-25-polo-pure-line-azul-maja-sportswear-01.jpg?v=1758908698&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-25-polo-pure-line-azul-maja-sportswear-02.jpg?v=1758908698&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-25-polo-pure-line-azul-maja-sportswear-03.jpg?v=1758908698&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-25-polo-pure-line-azul-maja-sportswear-04.jpg?v=1758908698&width=800"
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
    nombre: "Playera Tipo Polo MAJA Jaspe",
    categoria: "Hombre",
    precio: 1199,
    descripcion:
      "La Playera tipo polo MAJA Jaspe combina comodidad, durabilidad y diseño técnico en una prenda que se adapta a cualquier entorno. Fabricada en tela elástica con estiramiento en 4 vías, ofrece libertad total de movimiento y frescura gracias a su panel de ventilación en el cuello, ideal para climas cálidos o jornadas activas.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-CPM7-1-playera-tipo-polo-maja-jaspe-color-negro-maja-sportswear-01.jpg?v=1761870640&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CPM7-1-playera-tipo-polo-maja-jaspe-color-negro-maja-sportswear-02.jpg?v=1761870640&width=800",
      "https://majasportswear.com/cdn/shop/files/C-CPM7-1-playera-tipo-polo-maja-jaspe-color-negro-maja-sportswear-03.jpg?v=1761870640&width=800"
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
    nombre: "Polo Dri Fit JEEP x MAJA Jeepster",
    categoria: "Hombre",
    precio: 999,
    descripcion:
      "Inspirada en el icónico Jeepster, el modelo Jeep que redefinió la aventura con estilo desde los años 40. Su tejido de tacto inigualable y su ajuste estructurado garantizan comodidad en cada movimiento. Además, su tecnología de estiramiento en 4 vías permite máxima movilidad sin perder su forma.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM3-4-polo-jeepster-maja-jeep-patron-duna-maja-sportswear-01.jpg?v=1762058742&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM3-4-polo-jeepster-maja-jeep-patron-duna-maja-sportswear-02.jpg?v=1762058742&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM3-4-polo-jeepster-maja-jeep-patron-duna-maja-sportswear-03.jpg?v=1762058742&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM3-4-polo-jeepster-maja-jeep-patron-duna-maja-sportswear-04.jpg?v=1762058742&width=800"
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
    nombre: "Playera tipo Polo MAJA Paddock Edición Checo Pérez",
    categoria: "Hombre",
    precio: 1399,
    descripcion:
      "La polo técnica MAJA PADDOCK ofrece comodidad, elasticidad y carácter en una prenda versátil. Su tela stretch en 4 direcciones, cuello tipo polo con cierre reflectivo y acabados en contraste la hacen ideal para el trabajo, el viaje o el descanso activo.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM4-1-playera-tipo-polo-gris-oxford-maja-sportswear-paddock-edicion-checo-perez-01.jpg?v=1761448473&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM4-1-playera-tipo-polo-gris-oxford-maja-sportswear-paddock-edicion-checo-perez-02.jpg?v=1761448473&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM4-1-playera-tipo-polo-gris-oxford-maja-sportswear-paddock-edicion-checo-perez-03.jpg?v=1761448473&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM4-1-playera-tipo-polo-gris-oxford-maja-sportswear-paddock-edicion-checo-perez-04.jpg?v=1761448473&width=800"
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
    nombre: "Polo Seamtaping Horizonte",
    categoria: "Hombre",
    precio: 999,
    descripcion:
      "Una polo sin costuras, lista para cualquier plan. Gracias a su tecnología SEAMTAPING, los acabados sin costuras le dan un diseño limpio, más elasticidad y comodidad para moverte libremente.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM1-27-polo-manga-corta-seamtaping-horizonte-roja-maja-sportswear-01.jpg?v=1764168111&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-27-polo-manga-corta-seamtaping-horizonte-roja-maja-sportswear-02.jpg?v=1764168111&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-27-polo-manga-corta-seamtaping-horizonte-roja-maja-sportswear-03.jpg?v=1764168111&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-27-polo-manga-corta-seamtaping-horizonte-roja-maja-sportswear-04.jpg?v=1764168111&width=800"
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
    nombre: "Playera Tipo Polo MAJA Mármol",
    categoria: "Hombre",
    precio: 1199,
    descripcion:
      "Nuestra Polo es ideal para llevarla en tus momentos de aventura y vestir de diario de forma casual. Corte clásico y protección UV para protegerte en todo momento.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/C-PM1-33-playera-tipo-polo-maja-marmol-color-beige-maja-sportswear-01.jpg?v=1765072936&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-33-playera-tipo-polo-maja-marmol-color-beige-maja-sportswear-02.jpg?v=1765072936&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-33-playera-tipo-polo-maja-marmol-color-beige-maja-sportswear-03.jpg?v=1765072936&width=800",
      "https://majasportswear.com/cdn/shop/files/C-PM1-33-playera-tipo-polo-maja-marmol-color-beige-maja-sportswear-04.jpg?v=1765072936&width=800"
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

  //-----------------------------MUJER CAMISAS----------------------------
  {
    nombre: "Camisa MAJA Outdoor Signature",
    categoria: "Mujer",
    precio: 1499,
    descripcion:
      "La Camisa MAJA® Outdoor Signature combina protección solar, ventilación estratégica y repelencia al agua en una prenda ligera y resistente. Su tela antidesgarro con estiramiento en 4 vías garantiza libertad de movimiento, mientras que el forro interno de malla mejora la transpirabilidad durante largas jornadas.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-CO1-3-camisa-manga-larga-outdoor-signature-maja-sportswear-01.jpg?v=1764907059&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO1-3-camisa-manga-larga-outdoor-signature-maja-sportswear-02.jpg?v=1764907059&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO1-3-camisa-manga-larga-outdoor-signature-maja-sportswear-03.jpg?v=1764907059&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO1-3-camisa-manga-larga-outdoor-signature-maja-sportswear-04.jpg?v=1764907059&width=700"
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
    nombre: "Camisa MAJA Oxford",
    categoria: "Mujer",
    precio: 1099,
    descripcion:
      "Nuestra camisa MAJA Oxford proporciona un aspecto clásico y versátil para el uso diario. Ajustamos cada detalle para garantizar la calidad, el ajuste y la comodidad.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-CO4-1-camisa-manga-larga-tipo-oxford-blanca-maja-sportswear-01.jpg?v=1758824811&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO4-1-camisa-manga-larga-tipo-oxford-blanca-maja-sportswear-02.jpg?v=1758824811&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO4-1-camisa-manga-larga-tipo-oxford-blanca-maja-sportswear-03.jpg?v=1758824811&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO4-1-camisa-manga-larga-tipo-oxford-blanca-maja-sportswear-04.jpg?v=1758824811&width=700"
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
    categoria: "Mujer",
    precio: 1499,
    descripcion:
      "La Camisa Pescadero es ligera, ventilada y funcional. Ideal para pesca, caminatas, trabajo al sol o cualquier jornada larga. Su corte relajado y tela microperforada te mantienen fresca y en movimiento todo el día.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-CO5-2-camisa-manga-larga-pescadero-verde-menta-maja-sportswear-01.jpg?v=1764907324&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO5-2-camisa-manga-larga-pescadero-verde-menta-maja-sportswear-01.jpg?v=1764907324&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO5-2-camisa-manga-larga-pescadero-verde-menta-maja-sportswear-01.jpg?v=1764907324&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CO5-2-camisa-manga-larga-pescadero-verde-menta-maja-sportswear-01.jpg?v=1764907324&width=700"
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
//----------------------PLAYERA MUJER -------------------------------------
    {
    nombre: "Playera MAJA Estrella",
    categoria: "Mujer",
    precio: 499,
    descripcion:
      "La playera Maja Estrella combina protección solar, ventilación estratégica y repelencia al agua en una prenda ligera y resistente.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-PD1-2-playera-maja-estrella-verde-lima-maja-sportswear-01.jpg?v=1764907864&width=700",
      "https://majasportswear.com/cdn/shop/files/D-PD1-2-playera-maja-estrella-verde-lima-maja-sportswear-02.jpg?v=1764907864&width=700",
      "https://majasportswear.com/cdn/shop/files/D-PD1-2-playera-maja-estrella-verde-lima-maja-sportswear-03.jpg?v=1764907864&width=700",
      "https://majasportswear.com/cdn/shop/files/D-PD1-2-playera-maja-estrella-verde-lima-maja-sportswear-04.jpg?v=1764907864&width=700"
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
  //--------------------SUDADERA MUJER ------------------------
    {
    nombre: "Sudadera MAJA Calma",
    categoria: "Mujer",
    precio: 1399,
    descripcion:
      "La Sudadera MAJA Calma equilibra funcionalidad, estilo y confort en una silueta moderna tipo crop. Diseñada para acompañarte en entrenamientos, días casuales o actividades al aire libre, combina una tela híper suave, conservación térmica y tejido elástico en 4 vías para brindar libertad total de movimiento.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-CF4-1-sudadera-maja-calma-color-gris-oscuro-maja-sportswear-01.jpg?v=1761626717&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF4-1-sudadera-maja-calma-color-gris-oscuro-maja-sportswear-02.jpg?v=1761626717&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF4-1-sudadera-maja-calma-color-gris-oscuro-maja-sportswear-03.jpg?v=1761626717&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF4-1-sudadera-maja-calma-color-gris-oscuro-maja-sportswear-04.jpg?v=1761626717&width=700"
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
    nombre: "Hoodie MAJA Polar",
    categoria: "Mujer",
    precio: 1199,
    descripcion:
      "La Hoodie MAJA Polar redefine el confort con un diseño minimalista, térmico y funcional. Su silueta boxy combina un estilo urbano relajado con la practicidad de una prenda técnica. Confeccionada en mezcla de algodón y poliéster, mantiene la temperatura corporal sin perder transpirabilidad.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-HO1-4-hoodie-maja-polar-color-cafe-maja-sportswear-01.jpg?v=1761626922&width=700",
      "https://majasportswear.com/cdn/shop/files/D-HO1-4-hoodie-maja-polar-color-cafe-maja-sportswear-02.jpg?v=1761626922&width=700",
      "https://majasportswear.com/cdn/shop/files/D-HO1-4-hoodie-maja-polar-color-cafe-maja-sportswear-03.jpg?v=1761626922&width=700",
      "https://majasportswear.com/cdn/shop/files/D-HO1-4-hoodie-maja-polar-color-cafe-maja-sportswear-04.jpg?v=1761626922&width=700"
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
    nombre: "Hoodie Emblema MAJA",
    categoria: "Mujer",
    precio: 1199,
    descripcion:
      "Diseñada para acompañarte en movimiento, la Hoodie Emblema MAJA combina estilo, comodidad y funcionalidad en una sola prenda. Su corte entallado y sus detalles técnicos la hacen ideal para entrenar, recorrer la ciudad o enfrentar cambios de clima sin perder ritmo.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-CH1-1-hoodie-emblema-maja-blanco-maja-sportswear-01.jpg?v=1753913413&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CH1-1-hoodie-emblema-maja-blanco-maja-sportswear-02.jpg?v=1753913413&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CH1-1-hoodie-emblema-maja-blanco-maja-sportswear-03.jpg?v=1753913413&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CH1-1-hoodie-emblema-maja-blanco-maja-sportswear-04.jpg?v=1753913413&width=700"
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

  //-----------------------CHALECO MUJER -----------------------------
    {
    nombre: "Chaleco Polar MAJA",
    categoria: "Mujer",
    precio: 1199,
    descripcion:
      "El Chaleco MAJA Polar combina ligereza, funcionalidad y estilo moderno en una prenda pensada para acompañarte en todo momento. Confeccionado en tejido resistente y suave al tacto, este chaleco es ideal como capa exterior ligera para actividades al aire libre o como complemento casual.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-CF2-4-chaleco-maja-polar-color-cafe-maja-sportswear-01.jpg?v=1764767929&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF2-4-chaleco-maja-polar-color-cafe-maja-sportswear-02.jpg?v=1764767929&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF2-4-chaleco-maja-polar-color-cafe-maja-sportswear-03.jpg?v=1764767929&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF2-4-chaleco-maja-polar-color-cafe-maja-sportswear-04.jpg?v=1764767929&width=700"
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
    nombre: "Chaleco MAJA Pedregal Dama",
    categoria: "Mujer",
    precio: 1399,
    descripcion:
      "El Chaleco MAJA Pedregal Dama combina abrigo, ligereza y estilo urbano en una prenda diseñada para los días fríos o de clima variable. Su silueta ligera y cómoda permite moverte con libertad, mientras que la tecnología de conservación térmica y repelencia al agua mantiene el confort en cualquier entorno.",
    imagenes: [
      "https://majasportswear.com/cdn/shop/files/D-CF3-2-chaleco-maja-pedregal-dama-color-verde-bahia-maja-sportswear-01.jpg?v=1762526160&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF3-2-chaleco-maja-pedregal-dama-color-verde-bahia-maja-sportswear-02.jpg?v=1762526160&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF3-2-chaleco-maja-pedregal-dama-color-verde-bahia-maja-sportswear-03.jpg?v=1762526160&width=700",
      "https://majasportswear.com/cdn/shop/files/D-CF3-2-chaleco-maja-pedregal-dama-color-verde-bahia-maja-sportswear-04.jpg?v=1762526160&width=700"
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
