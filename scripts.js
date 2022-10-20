function D(sides) {
    if (sides <= 0) {
        return undefined
    }
    let dice = function () { return Math.floor(Math.random() * sides) + 1; }
    dice.sides = sides
    return dice
}

function explode(dice) {
    let asd = function () {
        let sum = 0;
        let r = 0;
        do {
            r = dice();
            sum += r;
        } while (r == dice.sides);
        return sum;
    }
    return asd
}

function multiple(count, dice) {
    let asd = function () {
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += dice()
        }
        return sum
    }
    return asd
}


function largest(keep, ...dices) {
    let asd = function () {
        const rolls = [];
        for (const dice of dices) {
            rolls.push(dice())
        }
        rolls.sort((a, b) => b - a)
        let sum = 0;
        for (let index = 0; index < Math.min(keep, rolls.length); index++) {
            sum += rolls[index];
        }
        return sum
    }
    return asd
}



function draw() {
    const rolls = {}
    let random_throw = undefined
    const formula = eval(document.getElementById("formula").value)
    for (let index = 0; index < 1000000; index++) {
        const r = formula()
        if (random_throw === undefined) {
            random_throw = r;
        }
        if (rolls[r] === undefined) {
            rolls[r] = 0
        }
        rolls[r]++;
    }
    document.getElementById("output").innerHTML = "Random throw: " + random_throw
    random_throw = undefined
    draw_graph(rolls)
}

let chart = undefined;

function draw_graph(rolls) {
    const labels = Object.keys(rolls);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Rolls',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: Object.values(rolls),
        }],
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true,
                    transitions: 'active'
                }
            }
        }
    };
    const config = {
        type: 'bar',
        data: data,
        options: {}
    };
    if (chart === undefined) {
        chart = new Chart(
            document.getElementById('dice_graph'),
            config
        );

    }
    else {
        chart.data = data
        chart.update();
    }
}