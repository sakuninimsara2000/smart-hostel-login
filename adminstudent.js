const ctx = document.getElementById('attendanceChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            data: [],
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                display: true,
                grid: { color: '#e5e7eb' },
                ticks: { color: '#555' }
            },
            y: {
                display: true,
                min: 80,
                max: 100,
                grid: { color: '#e5e7eb' },
                ticks: {
                    color: '#555',
                    callback: value => value + '%'
                }
            }
        }
    }
});
