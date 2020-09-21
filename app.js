document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const resultDisplay = document.getElementById("result");
    const width = 4;
    let squares = [];
    let score = 0;
    
    // 創造一個遊戲面板
    function createBoard(){
        for(let i=0; i<width*width; i++){
            square = document.createElement('div')
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    createBoard();




    // 產生隨機亂數
    function generate(){
       let randomNumber = Math.floor(Math.random() * squares.length)
       if(squares[randomNumber].innerHTML == 0){
           squares[randomNumber].innerHTML = 2
           checkForGameOver()
       }else generate()
    }

    // 右滑
    function moveRight(){
        for(let i = 0; i<16; i++){
            if (i%4 === 0) {
                let totalOne = squares[i].innerHTML 
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                // let row = [totalOne,totalTwo,totalThree,totalFour];
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                // console.log(row);

                let filteredRow = row.filter(num =>num)
                // console.log(filteredRow);
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                // console.log(zeros);
                let newRow = zeros.concat(filteredRow)
                // console.log(newRow);


                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }


    // moveRight();


    // 左滑
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                // let row = [totalOne,totalTwo,totalThree,totalFour];
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                // console.log(row);

                let filteredRow = row.filter(num => num)
                // console.log(filteredRow);
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                // console.log(zeros);
                let newRow = filteredRow.concat(zeros)
                // console.log(newRow);


                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }
    // 下滑
    function moveDown(){
        for(let i = 0; i < 4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumn = column.filter(num=>num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+(width*2)].innerHTML = newColumn[2]
            squares[i+(width*3)].innerHTML = newColumn[3]

        }
    }
    // 上滑
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]

        }
    }



    function combineRow(){
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i+1].innerHTML = 0
                score += combineTotal
                scoreDisplay.innerHTML = score
            }            
        }
        checkForWin()
    }


    function combineColumn(){
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML) {
                let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combineTotal
                squares[i+width].innerHTML = 0
                score += combineTotal
                scoreDisplay.innerHTML = score
            }            
        }
        checkForWin()
    }

    // assign keycodes

    function control(e){
        if (e.key === 'ArrowRight') {
            keyRight()
        }else if (e.key === 'ArrowLeft'){
            keyLeft()
        }else if (e.key === 'ArrowDown'){
            keyDown()
        }else if (e.key === 'ArrowUp'){
            keyUp()
        }
    }

    document.addEventListener('keyup',control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }


    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }
    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    // 看看贏了沒
    function checkForWin() {
        for (let i=0; i< squares.length; i++){
            if (squares[i].innerHTML == 16) {
                resultDisplay.innerHTML = 'You win!'
                document.removeEventListener('keyup', control)
            }
        }
    }

    // 輸了沒
    function checkForGameOver(){
        let zeros = 0
        for(let i=0; i < squares.length; i++){
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if(zeros === 0 ){
            resultDisplay.innerHTML = "You Lose"
            document.removeEventListener('keyup', control)
        }
    }


})