*** MENY ***
� navigere til forsiden vil antakeligvis ikke funke n� siden jeg jobbet p� localhost og brukte "/" for � navigere til index
Bare bytt til "index.html" i stedet for "/" i #menuwrapper. For � f� active statusen til � funke for index m� du antakeligvis 
ogs� bytte fra if(current_page === ""){...} til if(current_page == "index.html"){...} i js/silseth.js 

*** SlIDESHOW ***
Har gjort noen endringer i bxslider sin CSS som ligger i path js/bxslider/jquery.bxslider.css
Dette gjelder hovedsaklig posisjonering og ikon for pilene som brukes i navigasjonen for slideshow