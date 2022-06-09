import Course from './Components/Models/Course';


let fakeCourses = [
  new Course("02GOLOV", "Architetture dei sistemi di elaborazione", 12, null, null, ["02LSEOV"], null),
  new Course("02LSEOV", "Computer architectures", 12, null, null, ["02GOLOV"], null),
  new Course("01SQJOV", "Data Science and Database Technology", 8, null, null, ["01SQMOV", "01SQLOV"], null),
  new Course("01SQMOV", "Data Science e Tecnologie per le Basi di Dati", 8, null, null, ["01SQJOV", "01SQMOV"], null),
  new Course("01SQLOV", "Database systems", 8, null, null, ["01SQJOV", "01SQLOV"], null),
  new Course("01OTWOV", "Computer network technologies and services", 6, null, 3, ["02KPNOV"], null),
  new Course("02KPNOV", "Tecnologie e servizi di rete", 6, null, 3, ["01OTWOV"], null),
  new Course("01TYMOV", "Information systems security services", 12, null, null, ["01UDUOV"], null),
  new Course("01UDUOV", "Sicurezza dei sistemi informativi ", 12, null, null, ["01TYMOV"], null),
  new Course("05BIDOV", "Ingegneria del software", 6, null, null, ["04GSPOV"], ["02GOLOV"]),
  new Course("04GSPOV", "Software engineering", 6, null, null, ["05BIDOV"], ["02LSEOV"]),
  new Course("01UDFOV", "Applicazioni Web I ", 6, null, null, ["01TXYOV"], null),  
  new Course("01TXYOV", "Web Applications I", 6, null, 3, ["01UDFOV"], null),  
  new Course("01TXSOV", "Web Applications II", 6, null, null, null, ["01TXYOV"]),
  new Course("02GRSOV", "Programmazione di sistema", 6, null, null, ["01NYHOV"], null),  
  new Course("01NYHOV", "System and device programming", 6, null, 3, ["02GRSOV"], null),  
  new Course("01SQOOV", "Reti Locali e Data Center", 6, null, null, null, null),  
  new Course("01TYDOV", "Software networking", 7, null, null, null, null),  
  new Course("03UEWOV", "Challenge", 5, null, null, null, null),  
  new Course("01URROV", "Computational intelligence", 6, null, null, null, null),
  new Course("01OUZPD", "Model based software design", 4, null, null, null, null),  
  new Course("01URSPD", "Internet Video Streaming", 6, null, 2, null, null),  


  

] 


export default fakeCourses;