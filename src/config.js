export const PARTIDOS = {
  p01: { 
    id: "p01", nombre: "NGP", color: "#f18c28", logo: "/img/p01-logo.png", fotoAlcalde: "/candidatos/P01-A.jpg",
    candidatoAlcalde: "Omar Ledezma",
    concejales: [
      "JIMMY HERBAS LAGUNA", "INGRID VANESSA ORTUÑO RAMIREZ", "ONZALO ROJAS RODRIGUEZ", "ROSA VILLANUEVA MORALES"
    ]
  },
  p02: { 
    id: "p02", nombre: "MTS", color: "#00a135", logo: "/img/p02-logo.png", fotoAlcalde: "/candidatos/P02-A.jpg",
    candidatoAlcalde: "Milton Paichucama",
    concejales: [
      "MARIA TERESA BARRIONUEVO CORRALES", "RICHARD CONDORI BAUTISTA", "EUGENIA CONDORI MAMANI", "ADRIAN JAVIER GALARZA CHOQUE"
    ]
  },
  p03: { 
    id: "p03", nombre: "PATRIA", color: "#FD4F00", logo: "/img/p03-logo.png", fotoAlcalde: "/candidatos/P03-A.jpg",
    candidatoAlcalde: "Jesus Hinojosa",
    concejales: [
      "JHESSICA COLQUE FORONDA", "WILBER ROCHA RIOS", "COPERTINA GABRIEL CESPEDES", "ROBERTO FERNANDEZ MALDONADO"
    ]
  },
  p04: { 
    id: "p04", nombre: "SUMATE", color: "#7D21B1", logo: "/img/p04-logo.png", fotoAlcalde: "/candidatos/P04-A.jpg",
    candidatoAlcalde: "Roxama Moscoso",
    concejales: [
      "VILMA JIMENEZ VEGAMONTE", "DIEGO DURAN AGUILAR", "MARIAT LITZI VELASCO CACERES", "ALBERTO MALDONADO RIOS"
    ]
  },
  p05: { 
    id: "p05", nombre: "UNIDOS", color: "#df0900", logo: "/img/p05-logo.png", fotoAlcalde: "/candidatos/P05-A.jpg",
    candidatoAlcalde: "Edwin Lopez",
    concejales: [
      "JHANET CAMPERO SEJAS", "ABRAHAM MAMANI BEDOYA", "ROXANA MAMANI INCA", "JUAN JOSE PINTO REYES"
    ]
  },
  p06: { 
    id: "p06", nombre: "FRI", color: "#0d143b", logo: "/img/p06-logo.png", fotoAlcalde: "/candidatos/P06-A.jpg",
    candidatoAlcalde: "Omar Amaya",
    concejales: [
      "ESTHER ESPERANZA ROCHA CARTAGENA", "ARIEL DANNY JIMENEZ FUENTES", "PAMELA VILLEGAS MONTAÑO", "ENOC BRAYAN WAYAR FUENTES"
    ]
  },
  p07: { 
    id: "p07", nombre: "UNE", color: "#00b8ff", logo: "/img/p07-logo.png", fotoAlcalde: "/candidatos/P07-A.jpg",
    candidatoAlcalde: "Victor Carvajal",
    concejales: [
      "WENDY DANITZA CONDORI QUISPE", "TEOFILO SANCHEZ CRUZ", "MONICA JHASMIN CANEDO", "ARMANDO ALFREDO VEIZAGA ADRIAZOLA"
    ]
  },
  p08: { 
    id: "p08", nombre: "LIBRE", color: "#0000ff", logo: "/img/p08-logo.png", fotoAlcalde: "/candidatos/P08-A.jpg",
    candidatoAlcalde: "Gualberto Mercado",
    concejales: [
      "CINTHIA VARGAS MARTINEZ", "AURELIO VICENTE BAEZ PEREZ", "MARIA VERONICA ZENTENO SARAVIA", "BEIMAR VIDAURRE FLORES"
    ]
  },
  p09: { 
    id: "p09", nombre: "PPS", color: "#ffff00", logo: "/img/p09-logo.png", fotoAlcalde: "/candidatos/P09-A.jpg",
    candidatoAlcalde: "Felix Quispe",
    concejales: [
      "MARLENE TAPIA VARGAS", "MILTON ROBERT TORRICO FERRUFINO", "SUGRA ELIZABETH MARTINEZ YAPURA", "KARY LEDEZMA OVANDO"
    ]
  },
  p10: { 
    id: "p10", nombre: "SOLUCIONES", color: "#f992b7", logo: "/img/p10-logo.png", fotoAlcalde: "/candidatos/P10-A.jpg",
    candidatoAlcalde: "Alfredo Lucana",
    concejales: [
      "GIASMANI IVAN MIRANDA ARGOTE", "MARIA ELENA ESPINOZA CHARRO", "BASILIO RAMOS CHOQUE", "JHENNY CRUZ TARIFA"
    ]
  },
  p11: { 
    id: "p11", nombre: "ALIANZA", color: "#6f000e", logo: "/img/p11-logo.png", fotoAlcalde: "/candidatos/P011-A.jpg", // Adjust filename if P11-A.jpg is needed
    candidatoAlcalde: "Patricia Arce",
    concejales: [
      "PATRICIO PORTILLO VELIZ", "ELIZABETH ANCALLE PANIAGUA", "TEODORO QUISPE OTALORA", "ROCIO AGUILAR ALAVE"
    ]
  },
};

export const PARTIDO_PRINCIPAL = {
  nombre: "ALIANZA",
  logo: "/img/p11-logo.png"
};

export const TOTAL_MESAS = 199;
export const TOTAL_ESCANOS = 9;

export const RECINTOS = {
  "R01": { id: "R01", nombre: "Escuela Melchor Cuadros", mesas: 30 },
  "R02": { id: "R02", nombre: "U.E Vargas Linde", mesas: 26 },
  "R03": { id: "R03", nombre: "Escuela Martín Cárdenas", mesas: 21 },
  "R04": { id: "R04", nombre: "Unidad Educativa David Arzabe", mesas: 16 },
  "R05": { id: "R05", nombre: "Escuela Ismael Montes", mesas: 16 },
  "R06": { id: "R06", nombre: "Unidad Educativa Sagrada Familia", mesas: 15 },
  "R07": { id: "R07", nombre: "Unidad Educativa Anocaraire", mesas: 14 },
  "R08": { id: "R08", nombre: "Núcleo Escolar Simón Bolívar (Thiomoko)", mesas: 9 },
  "R09": { id: "R09", nombre: "U.E. Avelino Mérida Zubieta", mesas: 8 },
  "R10": { id: "R10", nombre: "U.E. María Ayma", mesas: 6 },
  "R11": { id: "R11", nombre: "U.E. 5 de Septiembre", mesas: 5 },
  "R12": { id: "R12", nombre: "U.E. Soledad Rivas", mesas: 5 },
  "R13": { id: "R13", nombre: "U.E. Álvaro García Linera", mesas: 5 },
  "R14": { id: "R14", nombre: "U.E. Simón I. Patiño", mesas: 4 },
  "R15": { id: "R15", nombre: "U.E. Carmen Rosa Salguero", mesas: 3 },
  "R16": { id: "R16", nombre: "U.E. Nuestra Señora del Rosario", mesas: 3 },
  "R17": { id: "R17", nombre: "U.E. Combuyo", mesas: 3 },
  "R18": { id: "R18", nombre: "U.E. Vilomilla", mesas: 3 },
  "R19": { id: "R19", nombre: "U.E. Bartolina Sisa", mesas: 3 },
  "R20": { id: "R20", nombre: "Unidad Educativa Keraya", mesas: 2 },
  "R21": { id: "R21", nombre: "U.E. La Llave", mesas: 2 },
};
