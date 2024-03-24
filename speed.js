function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    let demeritPoints = 0;

    if (speed <= speedLimit) {
        console.log("Ok");
    } else {
        demeritPoints = Math.floor((speed - speedLimit) / 5);
        console.log("Points:", demeritPoints);
        
        if (demeritPoints > 12) {
            console.log("License suspended");
        }
    }
}

function main() {
    let input = prompt("Enter the speed of the car:");
    let speed = parseInt(input);
    
    if (!isNaN(speed)) {
        calculateDemeritPoints(speed);
    } else {
        console.log("Invalid input! Please enter a valid speed.");
    }
}

main();
