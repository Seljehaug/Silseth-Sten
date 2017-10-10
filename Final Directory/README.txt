*** MENY ***
Å navigere til forsiden vil antakeligvis ikke funke nå siden jeg jobbet på localhost og brukte "/" for å navigere til index
Bare bytt til "index.html" i stedet for "/" i #menuwrapper. For å få active statusen til å funke for index må du antakeligvis 
også bytte fra if(current_page === ""){...} til if(current_page == "index.html"){...} i js/silseth.js 

*** SlIDESHOW ***
Har gjort noen endringer i bxslider sin CSS som ligger i path js/bxslider/jquery.bxslider.css
Dette gjelder hovedsaklig posisjonering og ikon for pilene som brukes i navigasjonen for slideshow