google.charts.load("current", {packages:["calendar"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Gym' });

    var rawDateString = document.getElementById('dates').value + '\n';
    const yyyyRegex = /(\d\d\d\d)-(\d\d)-(\d\d)\s+/g
    const implicitYearRegex = /(\d\d)\/(\d\d)\/(\d\d)\s+/g
    const monthFirstRegex = /(\d\d)\/(\d\d)\/(\d\d\d\d)\s+/g

    var dates = [];
    // this earliestdate thing is a dumb hack, to make the colors look good we need a 0 to go with our 1 values
    // so put in the day before the earliest date as a "zero"
    var earliestDate = new Date(9999,1,1);
    for (const match of rawDateString.matchAll(yyyyRegex)) {
        var year = parseInt(match[1])
        var month = parseInt(match[2])
        var day = parseInt(match[3])
        var date = new Date(year, month-1, day);
        if (date < earliestDate) {
            earliestDate = date;
        }
        dates.push([date, 1 ])
    }

    for (const match of rawDateString.matchAll(implicitYearRegex)) {
        var year = "20" + parseInt(match[3])
        var month = parseInt(match[1])
        var day = parseInt(match[2])
        var date = new Date(year, month-1, day)
        if (date < earliestDate) {
            earliestDate = date;
        }
        dates.push([date, 1 ])
    }

    for (const match of rawDateString.matchAll(monthFirstRegex)) {
        var year = parseInt(match[3])
        var month = parseInt(match[1])
        var day = parseInt(match[2])
        var date = new Date(year, month-1, day)
        if (date < earliestDate) {
            earliestDate = date;
        }
        dates.push([date, 1 ])
    }
    if (dates.length > 0 && earliestDate.getYear() < 9999) {
        var previousDate = new Date(earliestDate.getTime());
        previousDate.setDate(earliestDate.getDate() - 1);
        dates.push([previousDate, 0]);
    }
    dataTable.addRows(dates);

    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

    var options = {
        title: "",
        height: 3500,
    };

    chart.draw(dataTable, options);
}