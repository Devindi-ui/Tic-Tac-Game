# Manual Test Cases

## TC001: Game Initialization
**Objectives**: Verify the game initializes correctly
**Steps** : 
1. Open the game in browser
2. Verify 3x3 game grid is display
3. Check status text shows "Your Turn (X)"
4. Verify all cells are empty

**Expected Result** : Game loads with empty cells and current status
**Actual Result** :
**Prority** : Hidh
**Status** : Pass [] Fail []

## TC002 : Player Move
**Objectives**: Verify player can make moves
**Steps** : 
1. Click on any empty cell
2. Verify 'X' appears in clicked cell
3. Check status changes to 'Computer thinking...'
4. Verify cell becomes disabled

**Expected Result** : Player move registered correctly
**Actual Result** : 
**Prority** : High
**Status** : Pass [] Fail []

## TC003 : Computer Move
**Objectives**: Verify computer makes moves
**Steps** : 
1. Make a player move
2. Wait for computer response
3. If center cell is empty, Verify 'O' appears in a center cell
4. If center cell is not empty, Verify 'O' appears in a random empty cell
5. Check status returns to "Your Turn (X)"

**Expected Result** : Computer makes valid move
**Actual Result** : 
**Prority** : High
**Status** : Pass [] Fail []