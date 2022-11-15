import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
  where,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const mock = [
  {
    id: "1X1KBq1W6cBUDbC0BQuG",
    item: "Alfamart",
    value: 500000,
    isApprove: true,
    details: [
      {
        value: 126000,
        item: "Beras 10kg",
      },
      {
        value: 45000,
        item: "Tisu",
      },
      {
        item: "Sunlight",
        value: 39000,
      },
      {
        item: "Saos",
        value: 11100,
      },
      {
        item: "Clear sampo",
        value: 30500,
      },
      {
        item: "Pepsodent ",
        value: 17568,
      },
      {
        item: "Pantene",
        value: 46700,
      },
      {
        value: 23500,
        item: "Pembalut",
      },
      {
        item: "My baby",
        value: 28900,
      },
      {
        item: "Sinzui",
        value: 29900,
      },
      {
        value: 15300,
        item: "My Bb wangi",
      },
      {
        item: "Kecap",
        value: 21600,
      },
      {
        value: 32000,
        item: "Garnier",
      },
      {
        value: 21600,
        item: "Senitizer ",
      },
      {
        value: 5800,
        item: "Mie",
      },
      {
        item: "Ngasih ujang",
        value: 5532,
      },
    ],
    bulan: "september",
  },
  {
    id: "2bFaDeOyIBGIO6iMEX1S",
    item: "Alfamart",
    value: 500000,
    isApprove: true,
    details: [
      {
        item: "Belanja Dc Mall",
        value: 370000,
      },
      {
        value: 60000,
        item: "Beras 5kg",
      },
      {
        item: "Belanja alfa",
        value: 70000,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "LFnSe94v3X7mQsN3dwG4",
    item: "Alfamart",
    value: 500000,
    isApprove: true,
    details: [
      {
        item: "Roti tawar&pop mie",
        value: 26500,
      },
      {
        value: 50000,
        item: "Sabun Bunda",
      },
      {
        item: "Pepsoden",
        value: 22500,
      },
      {
        item: "So klin",
        value: 19500,
      },
      {
        value: 28900,
        item: "Tisu",
      },
      {
        value: 46500,
        item: "Detol ",
      },
      {
        item: "Beras 5kg",
        value: 62500,
      },
      {
        value: 20500,
        item: "Stella home air spray",
      },
      {
        item: "Madu honey",
        value: 17500,
      },
      {
        item: "Roti bun",
        value: 12000,
      },
    ],
    bulan: "nopember",
  },
  {
    id: "OX7yOI5T5HMiXuupaoK1",
    item: "Alfamart",
    value: 410000,
    isApprove: true,
    details: [
      {
        item: "Beras 5kg",
        value: 64000,
      },
      {
        item: "Tisu",
        value: 36900,
      },
      {
        value: 26600,
        item: "My Baby",
      },
      {
        item: "My baby hair",
        value: 15700,
      },
      {
        item: "Milas,stella,roti,susu cokelat,garnier",
        value: 66800,
      },
      {
        value: 28500,
        item: "So klin",
      },
      {
        item: "Gulput",
        value: 15500,
      },
      {
        value: 156000,
        item: "Beras5kg,galon 2,Roti,miegor2,miku2,rumput1,sambal",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "59vRJZFL7WlUW6Sufycn",
    item: "Arisan Banjar",
    value: 150000,
    isApprove: true,
    details: [],
    bulan: "nopember",
  },
  {
    id: "AtkDjjllGMKOsZqKvdlh",
    item: "Arisan Banjar",
    value: 150000,
    isApprove: true,
    details: [
      {
        item: "Arisan",
        value: 150000,
      },
    ],
    bulan: "september",
  },
  {
    id: "YszQKLJ8s1vl3SjQ7YsG",
    item: "Arisan Banjar",
    value: 150000,
    isApprove: true,
    details: [
      {
        value: 150000,
        item: "Sangkep",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "phawkyzwkgrF1pKgMq5z",
    item: "Arisan Banjar",
    value: 150000,
    isApprove: true,
    details: [
      {
        value: 150000,
        item: "Arisan",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "8i1jL4ayA1ECUeMOI2jh",
    item: "Arisan banjar",
    value: 150000,
    isApprove: true,
    details: [
      {
        value: 150000,
        item: "Arisan bln juli sudah",
      },
    ],
    bulan: "juli",
  },
  {
    id: "cZMEx1HZpVgeDDO5rRaC",
    item: "Ayah",
    value: 1100000,
    isApprove: true,
    details: [
      {
        item: "Top up ovo",
        value: 500000,
      },
      {
        item: "Bensin",
        value: 150000,
      },
      {
        value: 105000,
        item: "McD",
      },
      {
        value: 110000,
        item: "Timer",
      },
      {
        value: 37000,
        item: "Gofood",
      },
      {
        item: "Tambahan beli piza",
        value: 28000,
      },
      {
        item: "Kfc",
        value: 111000,
      },
      {
        item: "Dipegang ayah 59000",
        value: 59000,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "MFnboQ542aPpnBCp9Xz7",
    item: "Bayar c juju waktu belikan belanjaan ayu&a eman",
    value: 300000,
    isApprove: true,
    details: [
      {
        item: "Lunas",
        value: 300000,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "zuQNoPSRROiyfmdJbmoY",
    item: "Beli Tas Raka dan Jas Hujan",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 150000,
        item: "Beli Tas",
      },
      {
        value: 37000,
        item: "Jas Hujan",
      },
      {
        value: 13000,
        item: "Minyak Rambut",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "35fd5eGsYCLIhwz31b9I",
    item: "Bunda",
    value: 1500000,
    isApprove: true,
    details: [
      {
        item: "Dompet",
        value: 50000,
      },
      {
        item: "Filler hidung",
        value: 866250,
      },
      {
        item: "Shopepay ",
        value: 300000,
      },
      {
        value: 100000,
        item: "Baju",
      },
      {
        item: "Tiktok",
        value: 95000,
      },
      {
        value: 3000,
        item: "Jajan",
      },
      {
        item: "Ayuk",
        value: 30000,
      },
      {
        value: 55750,
        item: "Peeling",
      },
    ],
    bulan: "september",
  },
  {
    id: "8KToSRSBydtWwnPaCEPt",
    item: "Bunda",
    value: 800000,
    isApprove: true,
    details: [
      {
        value: 800000,
        item: "skin care",
      },
    ],
    bulan: "juli",
  },
  {
    id: "9ebR8Qeq6q5Jfya6RCcK",
    item: "Bunda",
    value: 1500000,
    isApprove: true,
    details: [
      {
        value: 600000,
        item: "Shopee ",
      },
      {
        value: 500000,
        item: "Shopee",
      },
      {
        item: "Roll cake guru TK,dan bunda 1",
        value: 110000,
      },
    ],
    bulan: "nopember",
  },
  {
    id: "cGHaclTkGgD3UkmTdxPC",
    item: "Bunda",
    value: 1100000,
    isApprove: true,
    details: [
      {
        item: "Handbody ",
        value: 370000,
      },
      {
        item: "Sabun mandi",
        value: 90000,
      },
      {
        item: "Sunscreen",
        value: 100000,
      },
      {
        item: "Tas Gendong",
        value: 40000,
      },
      {
        item: "Higheel dan sandal damelia",
        value: 200000,
      },
      {
        item: "Pulsa internet",
        value: 50000,
      },
      {
        item: "Celana",
        value: 50000,
      },
      {
        item: "Sabun",
        value: 50000,
      },
      {
        item: "Lain2 ",
        value: 138000,
      },
      {
        item: "Jajan",
        value: 12000,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "PcqLTGL2q6ijRkRB9GgC",
    item: "Bunda byr utg seli",
    value: 1500000,
    isApprove: true,
    details: [
      {
        value: 1500000,
        item: "Lunas",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "KpOOcFTtxnktQoN6A9sS",
    item: "Cas/emergency ",
    value: 4000000,
    isApprove: true,
    details: [
      {
        item: "Jam tangan ayah",
        value: 450000,
      },
      {
        value: 497000,
        item: "Susu Pediasure 2 kaleng",
      },
      {
        value: 7000,
        item: "Gorengan a eman",
      },
      {
        value: 917000,
        item: "Flimeal ayah",
      },
      {
        item: "Kasih a eman benerin keramik",
        value: 50000,
      },
      {
        value: 300000,
        item: "Uang saku ayah",
      },
      {
        value: 70000,
        item: "Obat demam dan obat Radang Raka",
      },
      {
        item: "Punia konsumsi mejaitan banten melasti",
        value: 100000,
      },
    ],
    bulan: "nopember",
  },
  {
    id: "qvOIMYkV6iMtYIMDE6yZ",
    item: "Dana darurat",
    value: 400000,
    isApprove: true,
    details: [
      {
        value: 25000,
        item: "Tambahan keamanan bulan agustus",
      },
      {
        item: "Gorengan psg pagar ",
        value: 20000,
      },
      {
        item: "Kopi psg pagar",
        value: 10000,
      },
      {
        item: "Es cincau psg tralis",
        value: 20000,
      },
      {
        value: 20000,
        item: "Lakban",
      },
      {
        value: 100000,
        item: "Makan sama Semen",
      },
      {
        item: "Beli bell rumah",
        value: 100000,
      },
      {
        value: 100000,
        item: "Semen 1 sak",
      },
      {
        item: "Gorengan",
        value: 5000,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "B2LS5ckNenlURbA1XO2J",
    item: "Dana punia",
    value: 695000,
    isApprove: true,
    details: [
      {
        item: "Sembako a eman",
        value: 300000,
      },
      {
        item: "Punia Paud",
        value: 200000,
      },
      {
        value: 50000,
        item: "Punia mba atik",
      },
      {
        item: "Punia jaket mb naning",
        value: 67000,
      },
      {
        item: "Sisa dipegang ayah",
        value: 78000,
      },
    ],
    bulan: "juli",
  },
  {
    id: "H0iW8NBoq7zi20fJsUyA",
    item: "Galon",
    value: 100000,
    isApprove: true,
    details: [
      {
        value: 33000,
        item: "Sanford 3 ",
      },
      {
        value: 11000,
        item: "Galon",
      },
      {
        value: 22000,
        item: "Galon 2",
      },
      {
        item: "Galon 2",
        value: 22000,
      },
      {
        value: 12000,
        item: "Air kelapa obat anak2",
      },
    ],
    bulan: "september",
  },
  {
    id: "aBU3MgHko7ZxmkReDc35",
    item: "Galon",
    value: 100000,
    isApprove: true,
    details: [
      {
        item: "Galon",
        value: 11000,
      },
      {
        item: "Galon 2",
        value: 22000,
      },
      {
        item: "Galon 2",
        value: 24000,
      },
      {
        item: "Golon 2",
        value: 24000,
      },
      {
        value: 11000,
        item: "Galon 1",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "wvuL0B710xssH7B3fmF2",
    item: "Galon",
    value: 100000,
    isApprove: true,
    details: [
      {
        value: 22000,
        item: "2 galon",
      },
      {
        value: 10000,
        item: "Galon bu ika",
      },
      {
        item: "Galon 2",
        value: 22000,
      },
      {
        value: 11000,
        item: "Galon",
      },
      {
        item: "Galon",
        value: 11000,
      },
      {
        value: 22000,
        item: "Galon",
      },
      {
        item: "Jajan ade",
        value: 2000,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "zdBo8iI28ydpnAyzPzoC",
    item: "Galon",
    value: 100000,
    isApprove: true,
    details: [
      {
        item: "2 galon",
        value: 22000,
      },
      {
        value: 11000,
        item: "Sanford 1",
      },
    ],
    bulan: "nopember",
  },
  {
    id: "tzFcCAvZ84Hznf6XToB9",
    item: "Gas",
    value: 50000,
    isApprove: true,
    details: [
      {
        item: "Gas",
        value: 20000,
      },
      {
        item: "Gas",
        value: 20000,
      },
      {
        value: 10000,
        item: "Adek jajan kue donat",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "2nMxdiXZzeP2tMy185e8",
    item: "Gas ",
    value: 50000,
    isApprove: true,
    details: [
      {
        item: "Gas ",
        value: 20000,
      },
      {
        value: 10000,
        item: "Bayar ke ayu",
      },
      {
        value: 20000,
        item: "Gas",
      },
    ],
    bulan: "september",
  },
  {
    id: "audgonVaR8v5KmVVSM7F",
    item: "Gas ",
    value: 50000,
    isApprove: true,
    details: [],
    bulan: "nopember",
  },
  {
    id: "LiwuXIIn3e5l57P1ZQpf",
    item: "Gas dan telor",
    value: 100000,
    isApprove: true,
    details: [
      {
        value: 50000,
        item: "Telor",
      },
      {
        value: 20000,
        item: "Gas ",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "Sx0x1jcAEJg6qz5vsPxd",
    item: "Gas&Ayam",
    value: 100000,
    isApprove: true,
    details: [
      {
        value: 20000,
        item: "Gas ",
      },
      {
        value: 50000,
        item: "Ayam Betutu",
      },
      {
        item: "Jajan alfamart",
        value: 10000,
      },
      {
        item: "Buat tambahan isi galon",
        value: 20000,
      },
    ],
    bulan: "juli",
  },
  {
    id: "LHhqrvJxfxBiRUvgS7sh",
    item: "Iuran2 sekolah",
    value: 200000,
    isApprove: true,
    details: [
      {
        item: "Infaq sekolah",
        value: 10000,
      },
      {
        item: "Sewa baju karnaval",
        value: 30000,
      },
    ],
    bulan: "nopember",
  },
  {
    id: "AGHzoqjdEcpI5Cq0PVKh",
    item: "Jajan Raka",
    value: 250000,
    isApprove: true,
    details: [
      {
        item: "Cimory",
        value: 10100,
      },
      {
        value: 12500,
        item: "Snack star",
      },
      {
        item: "Jajan",
        value: 2000,
      },
      {
        item: "Jajan",
        value: 5000,
      },
      {
        item: "Jajan",
        value: 3000,
      },
      {
        value: 15000,
        item: "Cap kaki 3 anak",
      },
      {
        item: "Potato rio",
        value: 16200,
      },
      {
        value: 8500,
        item: "Good time",
      },
      {
        item: "Yakult ",
        value: 20000,
      },
      {
        item: "Honey star",
        value: 12500,
      },
      {
        value: 9500,
        item: "Roma creps",
      },
      {
        value: 21900,
        item: "Froot lop ",
      },
      {
        item: "Jajan",
        value: 2000,
      },
    ],
    bulan: "nopember",
  },
  {
    id: "AP7JZofv6vhFOKTDo5yu",
    item: "Jajan Raka",
    value: 250000,
    isApprove: true,
    details: [
      {
        value: 16700,
        item: "Tao",
      },
      {
        value: 5400,
        item: "Kusuka krju",
      },
      {
        value: 15500,
        item: "Potato",
      },
      {
        value: 57900,
        item: "Bigseet",
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 2000,
        item: "Abang adik",
      },
      {
        item: "Jajan sekolah",
        value: 2000,
      },
      {
        item: "Jajan adik abang",
        value: 2000,
      },
      {
        item: "Jajan sekolah",
        value: 2000,
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        item: "Jajan adik dan raka",
        value: 2000,
      },
      {
        item: "Jajan sekolah",
        value: 2000,
      },
      {
        value: 2000,
        item: "Jajan drumah",
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        item: "Jajan sekolah",
        value: 2000,
      },
      {
        item: "Jajan drumah",
        value: 5000,
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        item: "Adem sari",
        value: 7500,
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 2000,
        item: "Jajn sekolah",
      },
      {
        item: "Jajan sekolah",
        value: 2000,
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 5000,
        item: "Jajan dirumah",
      },
      {
        item: "Jajan adik",
        value: 1000,
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 9000,
        item: "Talirapia buat tugas",
      },
      {
        value: 15000,
        item: "Tugas sekolah",
      },
      {
        value: 2000,
        item: "Jajan sekolah ",
      },
      {
        value: 25000,
        item: "Jajan sekolah ada kegiatan",
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 10000,
        item: "Jajan ",
      },
      {
        value: 33000,
        item: "Jajan alfa",
      },
    ],
    bulan: "september",
  },
  {
    id: "X4JUP5MKSqQSL8bUiJ9C",
    item: "Jajan Sekolah",
    value: 250000,
    isApprove: true,
    details: [
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 2000,
        item: "Jajan",
      },
      {
        value: 7600,
        item: "Cap kaki 3 anak",
      },
      {
        item: "Madu tj",
        value: 15000,
      },
      {
        item: "Jajan",
        value: 4000,
      },
      {
        value: 5000,
        item: "Jajan",
      },
      {
        value: 10400,
        item: "Jajan lasegar",
      },
      {
        value: 204000,
        item: "Kutus2 termogun",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "8duWPmkhx0WB5MSQgczF",
    item: "Jajan Sp",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 100000,
        item: "Durian",
      },
      {
        item: "Creps",
        value: 20000,
      },
      {
        value: 5000,
        item: "Jajan es",
      },
      {
        value: 6000,
        item: "Jajan koperasi",
      },
      {
        item: "Jajan Yakul",
        value: 10000,
      },
      {
        item: "Bengbeng",
        value: 8000,
      },
      {
        item: "Durian",
        value: 40000,
      },
      {
        value: 11000,
        item: "Donat",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "U1irZNC0mT5jISI8W8yO",
    item: "Jajan Sp",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 20000,
        item: "Kado ultah tia",
      },
      {
        value: 30000,
        item: "Jajan alfamart",
      },
      {
        value: 65000,
        item: "Jajan sp",
      },
      {
        value: 40000,
        item: "Sus buah jenguk ibas",
      },
      {
        value: 10000,
        item: "Mie ayam",
      },
      {
        item: "Jajan",
        value: 35000,
      },
    ],
    bulan: "juli",
  },
  {
    id: "XDd4D8J5LPt8ZuyZBZQi",
    item: "Jajan Sp",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 35000,
        item: "Jajan",
      },
      {
        item: "Beli nangka",
        value: 20000,
      },
      {
        value: 24000,
        item: "Roti bun",
      },
      {
        value: 20000,
        item: "Wedang ronde",
      },
      {
        value: 30000,
        item: "Mie ayam ayu",
      },
      {
        value: 17000,
        item: "Jajan mie ayam",
      },
      {
        value: 25000,
        item: "Larutan ayah roti",
      },
      {
        item: "Kepake makan saat rawat inap arka",
        value: 29000,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "7tpQ7VrUWQNWCqSBCmLY",
    item: "Jajan sp",
    value: 200000,
    isApprove: true,
    details: [
      {
        item: "Rebo",
        value: 15900,
      },
      {
        item: "Roti sobek buat a eman",
        value: 19000,
      },
      {
        value: 6000,
        item: "Isoplus raka & a eman",
      },
      {
        item: "Telor gulung",
        value: 15000,
      },
      {
        value: 75000,
        item: "Jajan gopay",
      },
      {
        value: 26000,
        item: "Salak&pisang",
      },
      {
        item: "Roti sobek",
        value: 19000,
      },
      {
        value: 15000,
        item: "Telor gulung",
      },
    ],
    bulan: "nopember",
  },
  {
    id: "LwzGcgN6d9RA4TPHv956",
    item: "Jajan sp",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 60000,
        item: "Es cream",
      },
      {
        value: 18500,
        item: "Roti tawar",
      },
      {
        item: "Jajan awug2 nenek",
        value: 10000,
      },
      {
        value: 38000,
        item: "Roti 12 nanas 26",
      },
      {
        value: 16000,
        item: "Pizza",
      },
      {
        item: "Beli Roti",
        value: 12000,
      },
      {
        item: "Awug awug",
        value: 10000,
      },
      {
        item: "Ngasih ujang",
        value: 12000,
      },
      {
        item: "Awug2",
        value: 10000,
      },
      {
        value: 13500,
        item: "Bayar ke ayu",
      },
    ],
    bulan: "september",
  },
  {
    id: "k7wL8aAmkCohfKBiJEQm",
    item: "Keamanan",
    value: 25000,
    isApprove: true,
    details: [
      {
        item: "Keamanan",
        value: 25000,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "rykUvvuglkHOmMh0YROV",
    item: "Keamanan",
    value: 25000,
    isApprove: true,
    details: [
      {
        item: "Isi air galon",
        value: 21000,
      },
      {
        value: 4000,
        item: "Jajan",
      },
    ],
    bulan: "juli",
  },
  {
    id: "6V56yphkvOfybeWdiP3N",
    item: "Keamanan ",
    value: 25000,
    isApprove: true,
    details: [],
    bulan: "nopember",
  },
  {
    id: "IniH1pkZuLq39MAwKvOm",
    item: "Keamanan September",
    value: 25000,
    isApprove: true,
    details: [
      {
        value: 25000,
        item: "Keamanan",
      },
    ],
    bulan: "september",
  },
  {
    id: "j3RmaDk33M5j33svs0Va",
    item: "Keperluan sekolah Raka",
    value: 900000,
    isApprove: true,
    details: [
      {
        value: 100000,
        item: "ngecilin baju",
      },
      {
        value: 35000,
        item: "Botol minum ngambil uang jajan raka",
      },
      {
        item: "Bad name tag",
        value: 12000,
      },
      {
        value: 30000,
        item: "Kaos kaki sekolah Raka",
      },
      {
        item: "Jajan alfa",
        value: 15000,
      },
      {
        item: "Uang saku sekolah",
        value: 10000,
      },
      {
        item: "Jajan sus",
        value: 40000,
      },
      {
        value: 2000,
        item: "Jajan",
      },
      {
        value: 30000,
        item: "Dasi pramuka,gesper pramuka,ikat dasi",
      },
      {
        value: 5000,
        item: "Jajan sekolah",
      },
      {
        item: "Jajan",
        value: 7000,
      },
      {
        value: 10000,
        item: "Jajan dan punia",
      },
      {
        item: "Cemilan Raka Sekolah",
        value: 143300,
      },
      {
        item: "Kaos kaki pramuka",
        value: 10000,
      },
      {
        value: 20000,
        item: "Es cincau",
      },
      {
        value: 10000,
        item: "A ujang jajan",
      },
      {
        value: 10000,
        item: "Telor gulung ",
      },
      {
        item: "Jajan",
        value: 700,
      },
      {
        item: "Celana training",
        value: 50000,
      },
      {
        value: 10000,
        item: "Jajan mie ayam",
      },
      {
        item: "Bayar iuran kas kelas 6bulan",
        value: 30000,
      },
      {
        value: 20000,
        item: "Uang jajan",
      },
      {
        item: "Transport sekolah",
        value: 300000,
      },
    ],
    bulan: "juli",
  },
  {
    id: "Dx8BZgCXBsYqEwwq4Ydj",
    item: "Kesehatan",
    value: 500000,
    isApprove: true,
    details: [
      {
        item: "Adem sari lasegar raka",
        value: 31700,
      },
      {
        item: "Kiranti 2 botol",
        value: 15000,
      },
      {
        value: 49500,
        item: "Adem sari 3 kotakx15.500",
      },
      {
        item: "Lasegar raka 2 kaleng",
        value: 15200,
      },
      {
        value: 203000,
        item: "Madu anak2",
      },
      {
        value: 110300,
        item: "Masker",
      },
      {
        value: 75300,
        item: "Minyak Bapil, demam ",
      },
    ],
    bulan: "nopember",
  },
  {
    id: "un55WalyDWRzp9ua38rJ",
    item: "Kesehatan",
    value: 400000,
    isApprove: true,
    details: [
      {
        item: "Vitaamin osb",
        value: 240500,
      },
      {
        item: "Adem Sari",
        value: 30000,
      },
      {
        item: "Vic 44",
        value: 10000,
      },
      {
        item: "Cinolon salep",
        value: 16000,
      },
      {
        item: "By fever",
        value: 103500,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "f8I4dYnCacQcxTSsyENm",
    item: "Lauk ",
    value: 1200000,
    isApprove: true,
    details: [
      {
        value: 23000,
        item: "kecap bangau",
      },
      {
        value: 2000,
        item: "Ade jajan",
      },
      {
        item: "Sawi,baput,bamer,timun,nangka,cabe",
        value: 54000,
      },
      {
        value: 20000,
        item: "Tahu ",
      },
      {
        item: "Ayam betutu 2 ekor",
        value: 150000,
      },
      {
        value: 7000,
        item: "Timun",
      },
      {
        value: 7000,
        item: "Ketimun",
      },
      {
        value: 50000,
        item: "Belanja",
      },
      {
        item: "Lauk",
        value: 35000,
      },
      {
        value: 7000,
        item: "Lauk",
      },
      {
        item: "Sayur,bamer,baput,sosis,ayam,apel,cabe setan,jagung dll",
        value: 116000,
      },
      {
        value: 10000,
        item: "Krupuk",
      },
      {
        item: "Gofood",
        value: 65000,
      },
      {
        value: 10000,
        item: "Burger,roti",
      },
      {
        item: "Nanas2,timun,jamur,pisang",
        value: 54000,
      },
      {
        value: 20000,
        item: "Tahu sumedang",
      },
      {
        item: "Jajan bakso",
        value: 48000,
      },
      {
        value: 10000,
        item: "Bakso",
      },
      {
        item: "Ayam 1kg lebih",
        value: 40000,
      },
      {
        item: "Sayuran",
        value: 58000,
      },
      {
        item: "Telur,kacang,gulmer",
        value: 42000,
      },
      {
        item: "Minyak 2 liter",
        value: 50000,
      },
      {
        value: 68500,
        item: "Kangkung,bawang,terong,timun,sosis",
      },
      {
        value: 147000,
        item: "Sosis,gqlon2x,laundry2x,kacang mb amik,belanja,jajan,sosis",
      },
      {
        item: "Lontong sayur,mb naning,bude,bunda",
        value: 36000,
      },
      {
        value: 51000,
        item: "Telor 1 papan",
      },
      {
        value: 10000,
        item: "Yakul",
      },
      {
        value: 3000,
        item: "Jajan adik",
      },
      {
        item: "Tempe dan masako",
        value: 6500,
      },
    ],
    bulan: "juli",
  },
  {
    id: "95uukZ9QopeWfi3AaYw5",
    item: "Lauk Nasi",
    value: 1700000,
    isApprove: true,
    details: [
      {
        item: "Lauk",
        value: 15000,
      },
      {
        value: 300000,
        item: "Belanja diet di shopee ",
      },
      {
        value: 42000,
        item: "Lauk",
      },
      {
        item: "Roti tawar,cimory diet dan korek kuping",
        value: 59500,
      },
      {
        item: "Lauk",
        value: 10000,
      },
      {
        item: "Belanja pasar diet ayah",
        value: 245000,
      },
      {
        value: 24000,
        item: "Sarapan",
      },
      {
        item: "Bahan diet ayah roti dan snack diet",
        value: 54600,
      },
      {
        value: 20000,
        item: "Lauk nasi",
      },
      {
        item: "Roti diet ayah",
        value: 13000,
      },
      {
        item: "Lauk nasi",
        value: 20000,
      },
      {
        item: "Udang lauk",
        value: 15000,
      },
      {
        item: "Lauk ",
        value: 25000,
      },
      {
        value: 100000,
        item: "Keperluan diet ayah",
      },
      {
        item: "Buah2 han diet ayah",
        value: 72000,
      },
      {
        item: "Lauk nasi",
        value: 25000,
      },
      {
        value: 37000,
        item: "Lauk",
      },
      {
        value: 12000,
        item: "Lauk",
      },
      {
        item: "Belanja diet ayah jagung,tempe,timun,wortel,pisang dll",
        value: 55000,
      },
      {
        item: "Sosis",
        value: 35000,
      },
      {
        item: "Lauk nasi",
        value: 25000,
      },
      {
        item: "Obat ayah nanas,dll",
        value: 27000,
      },
      {
        value: 80000,
        item: "Beli minum,tisu basah,makan di aini rawat adik",
      },
      {
        item: "Sarapan",
        value: 28000,
      },
      {
        item: "Buah",
        value: 35000,
      },
      {
        item: "Roti arkha",
        value: 17000,
      },
      {
        item: "Lauk d rs aqua",
        value: 44000,
      },
      {
        item: "Sarapan rs ainu",
        value: 27000,
      },
      {
        value: 40000,
        item: "Lauk d isi bensin ayu",
      },
      {
        value: 26000,
        item: "Mie ayam",
      },
      {
        item: "Sayur",
        value: 100000,
      },
      {
        item: "Kpake mkn rawat inap arkha",
        value: 71900,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "UzDylXUP63FmGFQmNltd",
    item: "Lauk Nasi",
    value: 1700000,
    isApprove: true,
    details: [
      {
        value: 30000,
        item: "Naspad ayu,bunda,ayah waktu ke awal bros",
      },
      {
        value: 10000,
        item: "Lauk nasi sore ",
      },
      {
        item: "Lauk",
        value: 28000,
      },
      {
        item: "Sarapan",
        value: 20000,
      },
      {
        item: "Sop",
        value: 10000,
      },
      {
        value: 15000,
        item: "Lele goreng ",
      },
      {
        item: "Naspad ",
        value: 30000,
      },
      {
        value: 12000,
        item: "Krupuk",
      },
      {
        item: "Lauk kondang",
        value: 25000,
      },
      {
        item: "Ngasih ayu",
        value: 40000,
      },
      {
        item: "Sarapan roti",
        value: 9000,
      },
      {
        item: "Lauk nasi",
        value: 30000,
      },
      {
        value: 10000,
        item: "Sarapan",
      },
      {
        item: "Sambal goreng udang terong",
        value: 15000,
      },
      {
        item: "Timun,teri,bengkoang",
        value: 22000,
      },
      {
        value: 23000,
        item: "Lele raka",
      },
      {
        value: 5000,
        item: "Ojek ujang",
      },
      {
        item: "Kwetiaw ",
        value: 12000,
      },
      {
        value: 30000,
        item: "Lauk",
      },
    ],
    bulan: "nopember",
  },
  {
    id: "qwHL9KV88yeNDi7LjiCB",
    item: "Lauk Nasi",
    value: 1700000,
    isApprove: true,
    details: [
      {
        value: 32300,
        item: "Sosis champ",
      },
      {
        item: "Sarapan ",
        value: 40000,
      },
      {
        item: "Sarapan",
        value: 13000,
      },
      {
        item: "Sop ",
        value: 10000,
      },
      {
        value: 20000,
        item: "Lauk ",
      },
      {
        value: 10000,
        item: "Lauk",
      },
      {
        item: "Telor",
        value: 5000,
      },
      {
        item: "Sosis asimo",
        value: 21000,
      },
      {
        item: "Tahu",
        value: 5000,
      },
      {
        item: "Udang",
        value: 25000,
      },
      {
        value: 11000,
        item: "Sayur bening",
      },
      {
        value: 55000,
        item: "Lauk",
      },
      {
        item: "Lauk",
        value: 50000,
      },
      {
        item: "Lauk",
        value: 40000,
      },
      {
        item: "Sarapan",
        value: 15000,
      },
      {
        value: 25000,
        item: "Lauk",
      },
      {
        value: 7000,
        item: "Lauk nasi",
      },
      {
        value: 14000,
        item: "Sarapan",
      },
      {
        item: "Lauk dpasraman",
        value: 127000,
      },
      {
        item: "Gofood",
        value: 61000,
      },
      {
        value: 45000,
        item: "Lauk",
      },
      {
        value: 30000,
        item: "Sarapan",
      },
      {
        item: "Lauk ",
        value: 20000,
      },
      {
        item: "Lauk",
        value: 35000,
      },
      {
        item: "Sarapan",
        value: 12000,
      },
      {
        value: 20000,
        item: "Lauk",
      },
      {
        item: "Lauk",
        value: 20000,
      },
      {
        value: 20000,
        item: "Sarapan",
      },
      {
        value: 35000,
        item: "Lauk",
      },
      {
        item: "Lauk",
        value: 15000,
      },
      {
        item: "Kasih ujang karna belikan durian",
        value: 20000,
      },
      {
        item: "Lauk",
        value: 55000,
      },
      {
        value: 15000,
        item: "Belanja timun,jeruk,terong",
      },
      {
        value: 20000,
        item: "Lauk",
      },
      {
        value: 20000,
        item: "Sarapan",
      },
      {
        value: 55000,
        item: "Lauk paraman",
      },
      {
        item: "Pop mie",
        value: 7000,
      },
      {
        item: "Jajan pasraman",
        value: 20000,
      },
      {
        value: 22000,
        item: "Sosis",
      },
      {
        value: 20000,
        item: "Ongkos ujang",
      },
      {
        item: "Sarapan",
        value: 15000,
      },
      {
        item: "Lauk",
        value: 25000,
      },
      {
        item: "Jajan Sp",
        value: 60000,
      },
      {
        value: 40000,
        item: "Lauk",
      },
      {
        item: "Lauk buat a eman dan ayu",
        value: 25000,
      },
      {
        value: 24000,
        item: "Cabe,timun,sawi,pisang",
      },
      {
        value: 12500,
        item: "Mie",
      },
      {
        value: 22000,
        item: "Sarapan",
      },
      {
        item: "lauk",
        value: 35000,
      },
      {
        value: 17000,
        item: "Belanja bihun,cabe merah,salak",
      },
      {
        value: 30000,
        item: "Lauk",
      },
      {
        value: 15000,
        item: "Ikan Asin,kol,sawi",
      },
      {
        item: "Lauk",
        value: 45000,
      },
      {
        value: 10000,
        item: "Lauk",
      },
      {
        item: "Gofood",
        value: 100000,
      },
      {
        item: "Lauk",
        value: 30000,
      },
      {
        value: 25000,
        item: "Sayuran,bawang,cabe",
      },
      {
        item: "Lauk",
        value: 50000,
      },
      {
        value: 27200,
        item: "Pisang ambon",
      },
    ],
    bulan: "september",
  },
  {
    id: "rl3ujBf6w2zhK35SL313",
    item: "Lauk Nasi",
    value: 1500000,
    isApprove: true,
    details: [
      {
        item: "Lauk Nasi",
        value: 30000,
      },
      {
        item: "Sarapan",
        value: 20000,
      },
      {
        value: 30000,
        item: "Lauk Nasi",
      },
      {
        item: "Cabe,sosis,salak,timun,bamer",
        value: 66000,
      },
      {
        item: "Lauk Nasi",
        value: 30000,
      },
      {
        value: 55000,
        item: "Nasi goreng,ayah,bunda,ayuk,adik,abang",
      },
      {
        value: 30000,
        item: "Lauk Nasi",
      },
      {
        item: "Lauk Nasi",
        value: 10000,
      },
      {
        value: 30000,
        item: "Nasgor",
      },
      {
        item: "Kripik lauk",
        value: 40000,
      },
      {
        value: 34000,
        item: "Timun dan sosis",
      },
      {
        item: "Sasogu",
        value: 20000,
      },
      {
        item: "Lauk Nasi",
        value: 30000,
      },
      {
        item: "Lauk nasi jinggo ",
        value: 64000,
      },
      {
        item: "Jajann koperasi",
        value: 6000,
      },
      {
        item: "Kangkung,kol,cabe",
        value: 28000,
      },
      {
        value: 36000,
        item: "Sayuran,buah,cabe,jeruk lemon",
      },
      {
        value: 30000,
        item: "Lauk Nasi",
      },
      {
        value: 20000,
        item: "Lauk nasi",
      },
      {
        value: 25000,
        item: "Lauk Nasi",
      },
      {
        item: "Lauk Nasi ",
        value: 43000,
      },
      {
        value: 57000,
        item: "Sayuran,sosis",
      },
      {
        item: "Kecap",
        value: 8000,
      },
      {
        value: 40000,
        item: "Lauk nasi",
      },
      {
        item: "Gofood ayu,bunda,ayah",
        value: 84000,
      },
      {
        value: 12000,
        item: "Lontong sayur",
      },
      {
        item: "Mie ayam ",
        value: 45000,
      },
      {
        item: "Lauk",
        value: 20000,
      },
      {
        value: 20000,
        item: "Lauk",
      },
      {
        item: "Lontong sayur",
        value: 24000,
      },
      {
        item: "Lauk",
        value: 30000,
      },
      {
        item: "Lauk",
        value: 20000,
      },
      {
        value: 30000,
        item: "Lauk",
      },
      {
        item: "Lontong sayur ayu",
        value: 24000,
      },
      {
        value: 25000,
        item: "Lauk ",
      },
      {
        value: 60000,
        item: "Beli sayur+salak,bawang,cabe,timun",
      },
      {
        item: "Sosis",
        value: 22000,
      },
      {
        value: 35000,
        item: "Gofood ayah",
      },
      {
        value: 48000,
        item: "Lauk",
      },
      {
        value: 55000,
        item: "Lauk",
      },
      {
        value: 12000,
        item: "Mie",
      },
      {
        value: 40000,
        item: "Lauk",
      },
      {
        item: "Es kelapa org kerja",
        value: 15000,
      },
      {
        value: 30000,
        item: "Gorengan org kerja",
      },
      {
        item: "Belanja sosis nangka",
        value: 27000,
      },
      {
        value: 35000,
        item: "Lauk",
      },
      {
        value: 5000,
        item: "Jajan arkha",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "k2HobJ8WgI0p1GVjQtMl",
    item: "Laundry",
    value: 200000,
    isApprove: true,
    details: [
      {
        item: "Nyetrika",
        value: 23000,
      },
      {
        value: 31000,
        item: "Nyetrika",
      },
      {
        item: "Nyetrika",
        value: 20000,
      },
      {
        item: "Nyetrika",
        value: 31000,
      },
      {
        item: "Nyetrika",
        value: 40000,
      },
      {
        item: "Nyetrika",
        value: 35000,
      },
      {
        item: "Belanja lauk",
        value: 20000,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "nTPAB6vJnd49nezzY7wQ",
    item: "Laundry",
    value: 300000,
    isApprove: true,
    details: [
      {
        item: "Jam tangan bapa",
        value: 150000,
      },
    ],
    bulan: "nopember",
  },
  {
    id: "pfqf341ogws8sEqOy23r",
    item: "Laundry",
    value: 300000,
    isApprove: true,
    details: [
      {
        item: "Nyetrika",
        value: 52000,
      },
      {
        value: 248000,
        item: "Bunda yg laundry",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "tgfK9CFWZRcKajE9SEU3",
    item: "Laundry",
    value: 300000,
    isApprove: true,
    details: [
      {
        item: "So klin",
        value: 9000,
      },
      {
        value: 57000,
        item: "Nyetrika",
      },
      {
        item: "Soklin cair",
        value: 20000,
      },
      {
        value: 70000,
        item: "Nyetrika",
      },
      {
        value: 32000,
        item: "Nyetrika",
      },
      {
        value: 66000,
        item: "Jajan sp",
      },
      {
        value: 46000,
        item: "Nyetrika",
      },
    ],
    bulan: "september",
  },
  {
    id: "igLAUNmX373CDwClyD0D",
    item: "Lingeri",
    value: 150000,
    isApprove: true,
    details: [
      {
        item: "Vasselin",
        value: 78000,
      },
      {
        item: "Kojic sabun",
        value: 52000,
      },
      {
        item: "jajan alfa",
        value: 20000,
      },
    ],
    bulan: "juli",
  },
  {
    id: "9MLw3LIKySmoSaAkkcIQ",
    item: "Mimih",
    value: 600000,
    isApprove: true,
    details: [
      {
        value: 600000,
        item: "Sudah Transfer",
      },
    ],
    bulan: "september",
  },
  {
    id: "WF0CcXxGGhzhEje8PiXb",
    item: "Mimih",
    value: 600000,
    isApprove: true,
    details: [
      {
        value: 600000,
        item: "Transfer",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "g8LJaUjYwqU0NtbPnO0e",
    item: "Mimih",
    value: 600000,
    isApprove: true,
    details: [
      {
        item: "Lunas",
        value: 600000,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "oId0kBnnwmMxlNepVesa",
    item: "Mimih",
    value: 600000,
    isApprove: true,
    details: [
      {
        item: "Transfer",
        value: 600000,
      },
    ],
    bulan: "nopember",
  },
  {
    id: "xeqzSJZbtfGAvxgRnsaw",
    item: "Mimih",
    value: 600000,
    isApprove: true,
    details: [
      {
        value: 600000,
        item: "Mimih",
      },
    ],
    bulan: "juli",
  },
  {
    id: "HnPE2TdTl4fZBizNc4kb",
    item: "Out of budget",
    value: 2000000,
    isApprove: true,
    details: [
      {
        item: "Keran + paku",
        value: 94000,
      },
      {
        item: "PBB",
        value: 302000,
      },
      {
        item: "Semen 1 sak",
        value: 60000,
      },
      {
        value: 25000,
        item: "Lauk nasi ujang a eman",
      },
      {
        value: 44000,
        item: "Jajan pasar&lontong sayur aeman,ujang",
      },
      {
        item: "Bayar Tukang aeman,ujang",
        value: 350000,
      },
      {
        value: 16500,
        item: "By by fever",
      },
      {
        item: "Iuran 17 agustus",
        value: 20000,
      },
      {
        item: "Perlengkapan sembahyang",
        value: 386200,
      },
      {
        item: "Pulsa a jaja",
        value: 11155,
      },
      {
        value: 20000,
        item: "Lauk nasi",
      },
      {
        value: 12000,
        item: "Kerupuk",
      },
      {
        item: "Tahu dan kue getas",
        value: 22000,
      },
      {
        value: 75000,
        item: "Popok Dewasa&obat anyang2 ngan",
      },
      {
        item: "Lauk nasi",
        value: 20000,
      },
      {
        item: "Obat beijing anyang2",
        value: 50000,
      },
      {
        item: "Jajan sp",
        value: 35000,
      },
      {
        item: "Lauk jajan master kue",
        value: 67500,
      },
      {
        value: 30000,
        item: "Sosis,timun,terong",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "OQoXoBGp9qOTNRWpZLXX",
    item: "Ovo",
    value: 1200000,
    isApprove: true,
    details: [
      {
        value: 1200000,
        item: "Transfer ayah",
      },
    ],
    bulan: "nopember",
  },
  {
    id: "6cM9Wn0aDcLF5VxKflSf",
    item: "Pempes",
    value: 200000,
    isApprove: true,
    details: [
      {
        item: "Pempes ",
        value: 52000,
      },
      {
        item: "Keambil nambahin kutus2",
        value: 50000,
      },
      {
        value: 50000,
        item: "Tambahan beli kutus2",
      },
      {
        item: "Toilet training",
        value: 48000,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "LbT4fq09IVVpPZGAJhHt",
    item: "Pempes",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 68000,
        item: "Pempes ",
      },
      {
        item: "Obat Raka",
        value: 110000,
      },
      {
        item: "Sarapan jajan pasar",
        value: 22000,
      },
    ],
    bulan: "september",
  },
  {
    id: "tNcn50y7mlj0WRBxnjQu",
    item: "Pempes",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 55900,
        item: "Sweety",
      },
    ],
    bulan: "nopember",
  },
  {
    id: "2eqtVYZwuN55ZRKys427",
    item: "Pempes arkha+pembalut bunda",
    value: 195000,
    isApprove: true,
    details: [
      {
        item: "Nombokin uang keamanan juli",
        value: 25000,
      },
      {
        item: "Pempes dan jajan",
        value: 109000,
      },
      {
        item: "Beli jagung buat arkha",
        value: 11000,
      },
      {
        item: "Pempes",
        value: 50000,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "gTyANBO3fjh6JNviqRXm",
    item: "Pempes+Pembalut",
    value: 260000,
    isApprove: true,
    details: [
      {
        value: 30000,
        item: "pembalut",
      },
      {
        item: "pempes",
        value: 45000,
      },
      {
        item: "Alfamart uang pembalut",
        value: 20000,
      },
      {
        item: "Pemoes",
        value: 45000,
      },
      {
        item: "Jajan",
        value: 15000,
      },
      {
        value: 5000,
        item: "Jajan roti",
      },
      {
        value: 100000,
        item: "Dipegang bunda sisa nya",
      },
    ],
    bulan: "juli",
  },
  {
    id: "E5XiNxlNlVavShVDINdY",
    item: "Pengeluaran 25juni-5juli",
    value: 2000000,
    isApprove: true,
    details: [
      {
        value: 2000000,
        item: "Realisasi",
      },
    ],
    bulan: "juli",
  },
  {
    id: "MdzTaNRTF5bI1Zoxbmrv",
    item: "Pulsa",
    value: 50000,
    isApprove: true,
    details: [
      {
        item: "kado aay",
        value: 50000,
      },
    ],
    bulan: "juli",
  },
  {
    id: "XanpvQIERxVaO4USnAlO",
    item: "Punia",
    value: 778000,
    isApprove: true,
    details: [
      {
        item: "Punia WHDI Kota",
        value: 100000,
      },
      {
        item: "Punia kripik untuk a eman,ujang",
        value: 40000,
      },
      {
        value: 200000,
        item: "Ibu Cicih",
      },
      {
        value: 200000,
        item: "Punia C asih",
      },
      {
        item: "Punia mb amik",
        value: 50000,
      },
      {
        value: 5000,
        item: "Iuran duka sekolah abang",
      },
      {
        item: "Punia Tilem",
        value: 50000,
      },
      {
        value: 78000,
        item: "Jilid laporan surat Sri Lalita",
      },
      {
        value: 55000,
        item: "Musola sekolah Raka",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "7FnQxToW8UUHwXsNp13k",
    item: "Rainan",
    value: 300000,
    isApprove: true,
    details: [
      {
        value: 30000,
        item: "Nombok Lauk Nasi",
      },
      {
        item: "Mpe2 anterin piring nenek",
        value: 20000,
      },
      {
        item: "Isi Galon",
        value: 22000,
      },
      {
        value: 53000,
        item: "Nombok Lauk",
      },
      {
        item: "Ade jajan indomaret",
        value: 25000,
      },
      {
        value: 33000,
        item: "Rarapan bu ika",
      },
      {
        value: 20000,
        item: "Beli telor 5,dan mie 2,jajan 2000",
      },
      {
        value: 80000,
        item: "Rarapan Tumpek Kandang alfamart",
      },
      {
        item: "Beli mie goreng 3 dan jajan",
        value: 17000,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "C8bEs20gddXGqMJT1LoG",
    item: "Rainan",
    value: 300000,
    isApprove: true,
    details: [
      {
        item: "Yakul",
        value: 20200,
      },
      {
        item: "Coco pie",
        value: 17900,
      },
      {
        value: 24700,
        item: "Kraft",
      },
      {
        item: "Purnama",
        value: 135000,
      },
      {
        item: "Tilem ",
        value: 102000,
      },
      {
        item: "Tilem",
        value: 200,
      },
    ],
    bulan: "september",
  },
  {
    id: "awrmFKiIikRKwajD1Ikc",
    item: "Rainan",
    value: 300000,
    isApprove: true,
    details: [
      {
        value: 80000,
        item: "Banten",
      },
      {
        value: 100000,
        item: "Purnama",
      },
      {
        value: 120000,
        item: "Kepke beli makan saat opnam arkha",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "i5NaOtNNasxcHYBgZ5eG",
    item: "Rainan",
    value: 300000,
    isApprove: true,
    details: [
      {
        item: "Tilem pagerwesi",
        value: 91800,
      },
      {
        value: 9700,
        item: "Kopiko",
      },
      {
        item: "Buah",
        value: 39000,
      },
      {
        value: 136100,
        item: "Rarapan tumpek, Melasti ",
      },
      {
        value: 10000,
        item: "Ujang ngantar belanja",
      },
    ],
    bulan: "nopember",
  },
  {
    id: "pAVXZwxtQcm9FIqxHo3a",
    item: "Rainan",
    value: 300000,
    isApprove: true,
    details: [
      {
        item: "rarapan",
        value: 30000,
      },
      {
        value: 115000,
        item: "Purnama",
      },
      {
        item: "Beli rarapan tilem",
        value: 155000,
      },
    ],
    bulan: "juli",
  },
  {
    id: "4Pg4zvLosg4aGAO6QrQJ",
    item: "Saku ayah",
    value: 1365000,
    isApprove: true,
    details: [
      {
        value: 300000,
        item: "cash",
      },
      {
        value: 100000,
        item: "Shopee",
      },
      {
        item: "sembako",
        value: 150000,
      },
      {
        value: 20000,
        item: "tolak angin",
      },
      {
        value: 150000,
        item: "Shope sandal akupuntur,swalow,sandal jalan",
      },
      {
        item: "Redbul&icecream",
        value: 15000,
      },
      {
        value: 500000,
        item: "transfer",
      },
      {
        value: 10000,
        item: "Jajn indomaret",
      },
      {
        item: "Obat herbal asam urat",
        value: 50000,
      },
      {
        value: 70000,
        item: "Jam tangan,cucian beras belanja shopee",
      },
    ],
    bulan: "juli",
  },
  {
    id: "Dxo2A81ZSRM9rKG83ufT",
    item: "Spp Raka pasraman juli-des (20rb)",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 50000,
        item: "Iuran pojok baca",
      },
      {
        item: "Ngasih ayu waktu jaga arkha",
        value: 20000,
      },
      {
        item: "Spp pasraman ",
        value: 130000,
      },
    ],
    bulan: "september",
  },
  {
    id: "dUkJTHhy0znqHovhhD2h",
    item: "TRM",
    value: 500000,
    isApprove: true,
    details: [
      {
        value: 500000,
        item: "Trm",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "i72Xg3UJYcETJV2bpua3",
    item: "TRM",
    value: 500000,
    isApprove: true,
    details: [
      {
        value: 500000,
        item: "Potong TRM",
      },
    ],
    bulan: "september",
  },
  {
    id: "mSCHlj3XcfEEYJpwHHSi",
    item: "TRM",
    value: 500000,
    isApprove: true,
    details: [
      {
        item: "Transfer",
        value: 500000,
      },
    ],
    bulan: "agustus",
  },
  {
    id: "uOKoDPzrndZuTDegYr8v",
    item: "TRM",
    value: 500000,
    isApprove: true,
    details: [],
    bulan: "nopember",
  },
  {
    id: "WHlPWNL5s0XjlkQyQjdJ",
    item: "TRM Bunda",
    value: 500000,
    isApprove: true,
    details: [
      {
        value: 500000,
        item: "trm",
      },
    ],
    bulan: "juli",
  },
  {
    id: "aBMWOo6E3umePDChka49",
    item: "TV Kabel",
    value: 75000,
    isApprove: true,
    details: [
      {
        value: 75000,
        item: "Tv kabel 7 sep 22",
      },
    ],
    bulan: "september",
  },
  {
    id: "mBVnIfC1p0Lp35tdcOjv",
    item: "Tabungan  Raka",
    value: 100000,
    isApprove: true,
    details: [
      {
        value: 24000,
        item: "Dipakai fotocopy",
      },
      {
        value: 65000,
        item: "Botol minum adik abang",
      },
      {
        value: 11000,
        item: "Jajan adik abang di dina dini",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "RJjF9IjTNCHgPfjdA7Kx",
    item: "Tagihan Rumah",
    value: 145000,
    isApprove: true,
    details: [
      {
        item: "Sampah jul-des",
        value: 45000,
      },
      {
        value: 75000,
        item: "Tv kabel",
      },
      {
        value: 25000,
        item: "Keamanan agustus",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "8LESviEIFDea4ci7a52k",
    item: "Telor",
    value: 50000,
    isApprove: true,
    details: [
      {
        value: 50000,
        item: "Telor 1 papan",
      },
    ],
    bulan: "september",
  },
  {
    id: "HEANWslTaPKdjrOXh2Ds",
    item: "Telor",
    value: 50000,
    isApprove: true,
    details: [
      {
        value: 17900,
        item: "10 biji telor",
      },
      {
        value: 32100,
        item: "Telor",
      },
    ],
    bulan: "nopember",
  },
  {
    id: "gGVJGkAhEYDpmY6d0VVe",
    item: "Telor 1 papan",
    value: 50000,
    isApprove: true,
    details: [
      {
        value: 50000,
        item: "Sudah beli",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "JXmrt2wjfWB3fYDAwpkl",
    item: "Terapi",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 30000,
        item: "Edamame buat mb amik",
      },
      {
        item: "Jajan awal bros topak angin,air minum,nasi",
        value: 68300,
      },
      {
        item: "Minyak telon",
        value: 16500,
      },
      {
        item: "Rynos anak",
        value: 62500,
      },
      {
        item: "Kepake kep opnam arkha",
        value: 22700,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "QOnfMQyRS1OVBj68OeNt",
    item: "Terapi ",
    value: 200000,
    isApprove: true,
    details: [
      {
        value: 55000,
        item: "Terapi awal bros,sarapan",
      },
      {
        item: "Oreo ade",
        value: 8700,
      },
      {
        value: 26700,
        item: "Tambahan beli minyak bapil,demam",
      },
      {
        value: 8000,
        item: "Biskuit marie",
      },
      {
        item: "Hello panda",
        value: 8800,
      },
      {
        item: "Promina baby",
        value: 10000,
      },
    ],
    bulan: "nopember",
  },
  {
    id: "wquxqASKfeV3yVDjfQgT",
    item: "Terapi Adik",
    value: 450000,
    isApprove: true,
    details: [
      {
        item: "Kecelakaan order KFC",
        value: 185000,
      },
      {
        item: "Durian",
        value: 100000,
      },
      {
        value: 30000,
        item: "Nasgor ayah&bunda",
      },
      {
        value: 20000,
        item: "Nasi ujang&eman",
      },
      {
        item: "Naspad a eman,bunda",
        value: 46000,
      },
      {
        value: 69000,
        item: "Bayar terapi",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "aBiTzCAXUvyb05guOhy0",
    item: "Terapi adik",
    value: 200000,
    isApprove: true,
    details: [
      {
        item: "Jajan cerelak",
        value: 8200,
      },
      {
        value: 27000,
        item: "Es cream 3,ciki 3",
      },
      {
        item: "Jajan rumah",
        value: 2000,
      },
      {
        value: 75700,
        item: "Jajan awal bros",
      },
      {
        value: 87100,
        item: "Ibuprofen dan attarok ",
      },
    ],
    bulan: "september",
  },
  {
    id: "mhM2jUrwn3z6Vd0lhQa3",
    item: "Transport Arkha",
    value: 250000,
    isApprove: true,
    details: [],
    bulan: "nopember",
  },
  {
    id: "bBLC0ErLACXtrqPGNsnh",
    item: "Transport Raka",
    value: 350000,
    isApprove: true,
    details: [
      {
        value: 350000,
        item: "Sudah dibayar kan",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "iX1n3FUIDQyBsFL42n6u",
    item: "Transport Raka",
    value: 350000,
    isApprove: true,
    details: [],
    bulan: "nopember",
  },
  {
    id: "yOMCgtxR1pSBq3E8wRCO",
    item: "Transport Raka",
    value: 350000,
    isApprove: true,
    details: [],
    bulan: "oktober",
  },
  {
    id: "gSOyLIOYe0jrKNpqFYqy",
    item: "Transport arkha",
    value: 250000,
    isApprove: true,
    details: [
      {
        item: "Masyeba awal bros",
        value: 70000,
      },
      {
        item: "Awal bros masyeba",
        value: 70000,
      },
      {
        value: 24000,
        item: "Rumah aini,aini rumah",
      },
      {
        value: 86000,
        item: "Ojek bulak balik rumah,isi ayu bensin opnam arkha",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "9DbuIntuZl5zpWeLw81V",
    item: "Transport awal bros",
    value: 500000,
    isApprove: true,
    details: [],
    bulan: "nopember",
  },
  {
    id: "gfYm6G7YTh6eM7EyXOaf",
    item: "Transpot Arkha",
    value: 250000,
    isApprove: true,
    details: [
      {
        item: "Maxim pp",
        value: 150000,
      },
      {
        item: "Masyeba-Derma",
        value: 72000,
      },
      {
        item: "Derma-awal bros",
        value: 28000,
      },
    ],
    bulan: "september",
  },
  {
    id: "oEejBdUlw4P9BgiDbtZA",
    item: "Transpot Raka",
    value: 350000,
    isApprove: true,
    details: [
      {
        item: "Ojek",
        value: 350000,
      },
    ],
    bulan: "september",
  },
  {
    id: "Qpl4aTJ4F5AqaPu8gdev",
    item: "Tv Kabel",
    value: 75000,
    isApprove: true,
    details: [],
    bulan: "nopember",
  },
  {
    id: "zcC6f2MuW1yNCFAmrVmy",
    item: "Tv Kabel",
    value: 75000,
    isApprove: true,
    details: [
      {
        item: "Tv kabel",
        value: 75000,
      },
    ],
    bulan: "oktober",
  },
  {
    id: "nGa95RmJmfY5Pzpk9JI8",
    item: "Uang Jajan Sekolah Raka",
    value: 250000,
    isApprove: true,
    details: [
      {
        value: 50000,
        item: "Jajan 1 minggu",
      },
      {
        item: "Jajan sekolah",
        value: 2000,
      },
      {
        item: "Jajan Raka arkha",
        value: 4000,
      },
      {
        value: 2000,
        item: "Jajan sekolah",
      },
      {
        value: 22800,
        item: "Lasegar 3",
      },
      {
        value: 2000,
        item: "Uang saku",
      },
      {
        value: 2000,
        item: "Jajan",
      },
      {
        value: 5000,
        item: "Jajan",
      },
      {
        item: "Jajan",
        value: 6000,
      },
      {
        item: "Jajan sekolah",
        value: 2000,
      },
      {
        value: 12000,
        item: "Jajan",
      },
      {
        value: 21000,
        item: "Jajan 17 agustus",
      },
      {
        value: 50000,
        item: "Jajan 1 minggu",
      },
      {
        value: 2000,
        item: "Jajan adik",
      },
      {
        item: "Jajan sekolah",
        value: 2000,
      },
      {
        value: 3000,
        item: "Jajan",
      },
      {
        value: 2000,
        item: "Jajan",
      },
      {
        item: "Jajan ",
        value: 2000,
      },
      {
        value: 2000,
        item: "Jajan",
      },
      {
        value: 3000,
        item: "Jajan",
      },
      {
        item: "Fotocopy",
        value: 10000,
      },
      {
        item: "Jajan",
        value: 10000,
      },
      {
        item: "Jajan",
        value: 3000,
      },
      {
        item: "Jajan dirumah",
        value: 4000,
      },
      {
        item: "Jajan",
        value: 2000,
      },
      {
        item: "Jajan",
        value: 2000,
      },
      {
        item: "Jajan adik&Raka",
        value: 12000,
      },
      {
        value: 3200,
        item: "Jajn sama adik",
      },
      {
        value: 7000,
        item: "Jajan",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "sMUFIvD4u9uGk8rp0PNF",
    item: "Ulang Tahun Raka",
    value: 400000,
    isApprove: true,
    details: [
      {
        item: "Donat J.co",
        value: 100000,
      },
      {
        value: 170000,
        item: "Kwetiaw&cake",
      },
      {
        value: 35000,
        item: "Cake roll",
      },
      {
        value: 95000,
        item: "Pizza",
      },
    ],
    bulan: "agustus",
  },
  {
    id: "exKtkP9HhMukG25ZSebG",
    item: "Ultah Bunda",
    value: 600000,
    isApprove: true,
    details: [
      {
        value: 50000,
        item: "Punia mb intan",
      },
      {
        item: "Jajan",
        value: 25000,
      },
      {
        item: "Volla cafe",
        value: 288200,
      },
      {
        value: 234300,
        item: "Bhineka.cafe",
      },
      {
        value: 2500,
        item: "Jajan adik",
      },
    ],
    bulan: "september",
  },
  {
    id: "XWtoWWXowakRDc9Ycmpj",
    item: "Vitamin",
    value: 400000,
    isApprove: true,
    details: [
      {
        value: 38000,
        item: "Larutan cap kaki 3 5",
      },
      {
        value: 40000,
        item: "Vick 44 anak beli 2",
      },
      {
        item: "Adem Sari",
        value: 44000,
      },
      {
        item: "Ventuline obat uap",
        value: 100000,
      },
      {
        item: "Ventuline Raka",
        value: 20000,
      },
      {
        value: 20000,
        item: "Ibuprofen adik",
      },
      {
        item: "Ventuline 9 pcs + gosend",
        value: 120000,
      },
      {
        value: 15000,
        item: "Lobak",
      },
      {
        item: "Ngasih ujang",
        value: 3000,
      },
    ],
    bulan: "september",
  },
  {
    id: "cbrEwYFfku6wbs6saqDb",
    item: "Vitamin",
    value: 400000,
    isApprove: true,
    details: [
      {
        item: "Madu TJ",
        value: 18000,
      },
      {
        value: 31500,
        item: "Imboost kids",
      },
      {
        item: "Buah2 han",
        value: 109000,
      },
      {
        value: 97000,
        item: "Obat dan rhinos,hansaplas",
      },
      {
        value: 95000,
        item: "Cek darah adik",
      },
      {
        value: 18000,
        item: "Ibu profen adik",
      },
      {
        value: 31500,
        item: "Adem sari",
      },
    ],
    bulan: "oktober",
  },
  {
    id: "E4c66iRICPpoC9CsTYl9",
    item: "iuran2 sekolah",
    value: 300000,
    isApprove: true,
    details: [
      {
        value: 20000,
        item: "Isi bensin Ayu",
      },
      {
        item: "Tambahan minyak rambut raka",
        value: 12000,
      },
      {
        item: "Iuran pojok baca tahap 2",
        value: 10000,
      },
      {
        item: "Gojek lukis dinding kelas",
        value: 12000,
      },
      {
        value: 205000,
        item: "Sewa mainan ber 2 selama 1 bulan",
      },
      {
        item: "Beli kue maulid nabi",
        value: 15000,
      },
      {
        item: "Beli buku gambar dan crayon",
        value: 26000,
      },
    ],
    bulan: "oktober",
  },
];

export const compileRecord = (records) => {
  const newRecords = [];
  records.forEach((record) => {
    const newDetails = [];
    record.details.forEach((detail) => {
      let d = new Date();
      newDetails.push({ ...detail, tanggal: d.getDate() });
    });

    newRecords.push({ ...record, details: newDetails });
  });

  return newRecords;
};

export const getRecords = async () => {
  const q = query(collection(db, "records"));
  const querySnapshot = await getDocs(q);
  const records = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    records.push({
      id: doc.id,
      item: data.item,
      value: data.value,
      isApprove: data.isApprove,
      details: data.details,
      bulan: data.bulan,
    });
  });
  return records;
};

export const updateRecord = (record) => {
  const newDetails = [];
  record.details.forEach((detail) => {
    let d = new Date();
    newDetails.push({ ...detail, tanggal: d.getDate() });
  });

  return { ...record, details: newDetails };
};

export const updateIdRecord = (record) => {
  const newDetails = [];
  record.details.forEach((detail) => {
    let id = uuidv4();
    newDetails.push({ id, ...detail });
  });

  return { ...record, details: newDetails };
};

export const executeUpdate = async () => {
  const org = await getRecords();
  org.forEach(async (data) => {
    const updated = updateIdRecord(data);
    await setDoc(doc(db, "records", data.id), updated);
    console.log(data.id + " updated");
  });
  // org.forEach(async (data) => {
  //   const updated = updateRecord(data);
  //   await setDoc(doc(db, "records", data.id), updated);
  //   console.log(data.id + " updated");
  // });
};
