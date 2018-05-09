   var gameField = document.querySelector('#gameField');
   var array2D = [];

   function controls() {

       //catch all rows and cells;
       var rows = document.querySelectorAll('.row');
       var cells = document.querySelectorAll('.cell');

       //add click event to cells
       for (var i = 0; i < cells.length; i++) {
           cells[i].addEventListener('click', function () {
               this.classList.toggle('active');
           });
       }
   }

   function createField() {

       //Create game field
       for (var x = 0; x < 42; x++) {
           var row = document.createElement('div');
           row.classList.add('row');

           for (var y = 0; y < 63; y++) {
               var cell = document.createElement('div');
               cell.classList.add('cell');
               row.appendChild(cell);
           }
           gameField.appendChild(row);
       }
   }

   //Creating 2D array with all cells
   function create2Darray() {
       var rows = document.querySelectorAll('.row');
       for (var x = 0; x < 42; x++) {
           array2D[x] = rows[x];

           for (var y = 0; y < 63; y++) {
               cells = rows[x].querySelectorAll('.cell');
               array2D[x][y] = cells[y];
           }
       }
   }


   function check() {
       create2Darray();

       for (var x = 0; x < 42; x++) {
           for (var y = 0; y < 63; y++) {

               if (!array2D[x][y - 1]) {
                   var left = array2D[x][62];
               } else {
                   var left = array2D[x][y - 1];
               }

               if (!array2D[x][y + 1]) {
                   var right = array2D[x][0];
               } else {
                   var right = array2D[x][y + 1];
               }

               if (!array2D[x - 1]) {
                   var top = array2D[41][y];
               } else {
                   var top = array2D[x - 1][y];
               }

               if (!array2D[x + 1]) {
                   var bottom = array2D[0][y];
               } else {
                   var bottom = array2D[x + 1][y];
               }

               if (!array2D[x - 1] && !array2D[x][y - 1]) {
                   var topLeft = array2D[41][62];
               } else if (array2D[x - 1] && !array2D[x][y - 1]) {
                   var topLeft = array2D[x - 1][62];
               } else if (!array2D[x - 1] && array2D[x][y - 1]) {
                   var topLeft = array2D[41][y - 1];
               } else {
                   var topLeft = array2D[x - 1][y - 1];
               }

               if (!array2D[x - 1] && !array2D[x][y + 1]) {
                   var topRight = array2D[41][0];
               } else if (array2D[x - 1] && !array2D[x][y + 1]) {
                   var topRight = array2D[x - 1][0];
               } else if (!array2D[x - 1] && array2D[x][y + 1]) {
                   var topRight = array2D[41][y + 1];
               } else {
                   var topRight = array2D[x - 1][y + 1];
               }

               if (!array2D[x + 1] && !array2D[x][y - 1]) {
                   var bottomLeft = array2D[0][62];
               } else if (array2D[x + 1] && !array2D[x][y - 1]) {
                   var bottomLeft = array2D[x + 1][62];
               } else if (!array2D[x + 1] && array2D[x][y - 1]) {
                   var bottomLeft = array2D[0][y - 1];
               } else {
                   var bottomLeft = array2D[x + 1][y - 1];
               }

               if (!array2D[x + 1] && !array2D[x][y + 1]) {
                   var bottomRight = array2D[0][0];
               } else if (array2D[x + 1] && !array2D[x][y + 1]) {
                   var bottomRight = array2D[x + 1][0];
               } else if (!array2D[x + 1] && array2D[x][y + 1]) {
                   var bottomRight = array2D[0][y + 1];
               } else {
                   var bottomRight = array2D[x + 1][y + 1];
               }

               var active = 0;
               if (left.classList.contains('active')) {
                   active++;
               }
               if (right.classList.contains('active')) {
                   active++;
               }
               if (top.classList.contains('active')) {
                   active++;
               }
               if (bottom.classList.contains('active')) {
                   active++;
               }
               if (topLeft.classList.contains('active')) {
                   active++;
               }
               if (topRight.classList.contains('active')) {
                   active++;
               }
               if (bottomLeft.classList.contains('active')) {
                   active++;
               }
               if (bottomRight.classList.contains('active')) {
                   active++;
               }

               var current = array2D[x][y];

               current.dataset.alive = active;
               if (current.classList.contains('active') && (active == 2 || active == 3)) {
                   current.dataset.survive = 'willBeFine';
               } else if (current.classList.contains('active') && (active < 2 || active > 3)) {
                   current.dataset.survive = 'willBeDead';
               }
               if (!current.classList.contains('active') && active == 3) {
                   current.dataset.survive = 'willBeFine';
               } else if (!current.classList.contains('active') && (active < 3 || active > 3)) {
                   current.dataset.survive = 'willBeDead';
               }

           }
       }

   }

   function play() {

       var cells = document.querySelectorAll('.cell');

       for (var i = 0; i < cells.length; i++) {
           if (cells[i].dataset.survive == "willBeFine") {
               cells[i].classList.add('active');
           } else if (cells[i].dataset.survive == "willBeDead") {
               cells[i].classList.remove('active');
           }
       }
   }


   function randomCells() {
       var cells = document.querySelectorAll('.cell');

       for (var i = 0; i < 300; i++) {
           var randomCell = Math.floor(Math.random() * 2646);
           cells[randomCell].classList.add('active');
       }
   }

   function resetField() {
       var cells = document.querySelectorAll('.cell');
       for (var i = 0; i < cells.length; i++) {
           cells[i].classList.remove('active');
       }
   }


   var startBtn = document.querySelector('#startBtn');
   var resetBtn = document.querySelector('#resetBtn');
   var randomBtn = document.querySelector('#randomBtn');
   var counter = 0;
   var startStop = null;

   createField();
   controls();


   function myInterval() {
       if (!startStop) {
           startStop = setInterval(function () {
               check();
               play();
           }, 100)
           startBtn.innerText = "STOP";
       } else {
           clearInterval(startStop)
           startStop = null;
           startBtn.innerText = "START";
       }
   }

   startBtn.addEventListener('click', myInterval);
   resetBtn.addEventListener('click', resetField);
   randomBtn.addEventListener('click', randomCells);
