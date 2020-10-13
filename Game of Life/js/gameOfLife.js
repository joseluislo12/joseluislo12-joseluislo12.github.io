class gameOfLife{
    constructor(){
        this.cellSize = 15;
        this.cellBorder = Math.floor(this.cellSize / 10);
        this.dead = '#6B6B6B';
        this.alive = '#820303';
        this.borderColor = this.dead;
        this.cellsCol = Math.floor(canvas.width / this.cellSize);
        this.cellsRow = Math.floor(canvas.height / this.cellSize);
        this.live = [];
        this.temp = [];
        this.selection = false;
        this.living = false;
        this.action = 0;

        this.init = () => {
            for(let i = 0; i < this.cellsRow; i++){
                this.live[i] = []; this.temp[i] = [];
                for(let j = 0; j < this.cellsCol; j++){
                    this.live[i][j] = 0;
                    this.temp[i][j] = 0;
                }
            }
            this.ready(false);
            this.action = 0;
        };

        this.random = () => {
            for(let i = 0; i < this.cellsRow; i++){
                for(let j = 0; j < this.cellsCol; j++){
                    this.live[i][j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }
            this.ready(true);
            this.action = 1;
        };

        this.select = () => {
           /* this.borderColor = this.alive;
            ctx.strokeStyle = this.borderColor;
            ctx.lineWidth = this.cellBorder;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);*/

            this.init();
            
            this.borderColor = this.alive;
            ctx.strokeStyle = this.borderColor;
            for(let i = 0; i < this.cellsRow; i++){
                for(let j = 0; j < this.cellsCol; j++){
                    //ctx.strokeRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);

                    let color = this.dead;

                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);

                    ctx.strokeStyle = this.borderColor;
                    ctx.lineWidth = this.cellBorder;
                    ctx.strokeRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                }
            }

            this.selection = true;
            this.ready(false);
            this.action = 2;
        };

        this.colorStatus = (row, col) => {
            let color = this.dead;
                    
            if(this.live[row][col]){ color = this.alive; }

            ctx.fillStyle = color;
            ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);

            ctx.strokeStyle = this.borderColor;
            ctx.lineWidth = this.cellBorder;
            ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
        };
        
        this.selected = (x, y, top, left) => {
            const yC = top, xC = left;
            let i = -1, j = -1;
            
            let temp = xC;
            while(x >= temp){
                j++; temp += this.cellSize;
            }
            
            temp = yC;
            while(y >= temp){
                i++; temp += this.cellSize;
            }
            
            /*if(this.live[i][j]){ this.live[i][j] = 0; }
            else{*/ this.live[i][j] = 1; //}
            this.colorStatus(i, j);
        };

        this.life = () => {
            for(let i = 0; i < this.cellsRow; i++){
                for(let j = 0; j < this.cellsCol; j++){
                    this.colorStatus(i, j);
                }
            }
        };

        this.lookAround = (row, col) => {
            try{ return this.live[row][col]; }
            catch { return 0; }
        };

        this.countNeighbours = (row, col) => {
            let totalLiving = 0;

            totalLiving += this.lookAround(row - 1, col - 1);
            totalLiving += this.lookAround(row - 1, col);
            totalLiving += this.lookAround(row - 1, col + 1);
            totalLiving += this.lookAround(row,     col - 1);
            totalLiving += this.lookAround(row,     col + 1);
            totalLiving += this.lookAround(row + 1, col - 1);
            totalLiving += this.lookAround(row + 1, col);
            totalLiving += this.lookAround(row + 1, col + 1);

            return totalLiving;
        };

        this.check = (row, col) => {
            const totalLive = this.countNeighbours(row, col);

            if(this.live[row][col] === 1){
                if((totalLive === 2) || (totalLive === 3)) { return 1; }
                else{ return 0; }
            }
            else{
                if(totalLive === 3){ return 1; }
                else{ return 0; }
            }
        };

        this.liveOrDead = () => {
            let aaa = 0;
            
            for(let i = 0; i < this.cellsRow; i++){
                
                for(let j = 0; j < this.cellsCol; j++){
                    if((i < 3) && (j < 3)){
                        aaa++;
                    }
                    
                    let state = this.check(i, j);
                    this.temp[i][j] = state;
                }
            }
            
            for(let i = 0; i < this.cellsRow; i++){
                for(let j = 0; j < this.cellsCol; j++){
                    this.live[i][j] = this.temp[i][j];
                }
            }
        };

        this.ready = (status) => {
            this.living = status;
        };

        this.born = () =>{
            if(this.selection){ this.selection = false; }
            
            if(this.living){
                this.liveOrDead();
                this.life(); 
            } 
        };

        this.setLiveColor = (color) => {
            this.alive = color;
            this.changeColors();
        }

        this.setDeadColor = (color) => {
            this.dead = color;
            this.changeColors();
        }

        this.changeColors = () => {
            if(this.action == 2){ this.borderColor = this.alive; }
            else { this.borderColor = this.dead; }

            for(let i = 0; i < this.cellsRow; i++){
                for(let j = 0; j < this.cellsCol; j++){
                    this.colorStatus(i, j);
                }
            }
        }
        
        this.setCellSize = (newCellSize) => {
            this.cellSize = newCellSize;
            this.cellBorder = Math.floor(this.cellSize / 10);
            this.cellsCol = Math.floor(canvas.width / this.cellSize);
            this.cellsRow = Math.floor(canvas.height / this.cellSize);
        }
    }
}