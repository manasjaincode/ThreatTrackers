import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link as ScrollLink, Element as ScrollElement } from 'react-scroll';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Widget = () => {
    const initialValues = [2, 4, 2.2, 1.4, 2.6, 4.6, 5.5, 4.5, 4.6, 6.4, 1.5];
    const areas = [
        'Geeta Bhawan',
        'Saket Nagar',
        'Palasia',
        'MR-10',
        'Scheme 140',
        'Gumashta Nagar',
        'Nanda Nagar',
        'Bada Ganpati',
        'Rajen Nagar',
        'Bhawarkua',
        'Rajiv Nagar'
    ];

    const detailedData = {
        'Geeta Bhawan': { houses: ['House 1', 'House 2', 'House 3'], waterLevels: [1.2, 1.5, 1.8] },
        'Saket Nagar': { houses: ['House 1', 'House 2'], waterLevels: [2.0, 2.3] },
        // Add detailed data for other areas
    };

    const houseData = {
        '001': { name: "Manas's", waterLevels: [5, 10, 15, 20, 25], times: ['10:00', '11:00', '12:00', '13:00', '14:00'] },
        '002': { name: "Vinayak's", waterLevels: [4, 8, 12, 16, 20], times: ['10:00', '11:00', '12:00', '13:00', '14:00'] },
        '003': { name: "Sarthak's", waterLevels: [6, 12, 18, 24, 30], times: ['10:00', '11:00', '12:00', '13:00', '14:00'] },
        '004': { name: "Rajeev's", waterLevels: [3, 6, 9, 12, 15], times: ['10:00', '11:00', '12:00', '13:00', '14:00'] }
    };

    const timeRangeData = {
        today: { waterLevels: [5, 10, 15, 20, 25], times: ['10:00', '11:00', '12:00', '13:00', '14:00'] },
        '1 month': { waterLevels: [6, 12, 18, 24, 30], times: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
        '6 months': { waterLevels: [7, 14, 21, 28, 35, 42], times: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'] },
        '1 year': { waterLevels: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96], times: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }
    };

    const [chartData, setChartData] = useState({
        labels: areas,
        datasets: [
            {
                label: 'Water Volume (cubic meters)',
                data: initialValues,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    const [detailChartData, setDetailChartData] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [inputId, setInputId] = useState('');
    const [houseChartData, setHouseChartData] = useState(null);
    const [selectedTimeRange, setSelectedTimeRange] = useState('today');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        issue: '',
        description: '',
        photo: null,
    });

    const handleAreaClick = (event, element) => {
        if (element && element.length > 0) {
            const index = element[0].index;
            const area = areas[index];
            setSelectedArea(area);
            const detail = detailedData[area];
            if (detail) {
                setDetailChartData({
                    labels: detail.houses,
                    datasets: [
                        {
                            label: `Water Levels in ${area}`,
                            data: detail.waterLevels,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            }
        }
    };

    const handleIdChange = (event) => {
        setInputId(event.target.value);
    };

    const handleSearch = () => {
        const data = houseData[inputId];
        if (data) {
            setHouseChartData({
                labels: timeRangeData[selectedTimeRange].times,
                datasets: [
                    {
                        label: `Water Levels in ${data.name} (KL)`,
                        data: timeRangeData[selectedTimeRange].waterLevels,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } else {
            alert('House ID not found');
        }
    };

    const handleTimeRangeChange = (event) => {
        const newRange = event.target.value;
        setSelectedTimeRange(newRange);
        if (houseChartData) {
            const data = houseData[inputId];
            if (data) {
                setHouseChartData({
                    labels: timeRangeData[newRange].times,
                    datasets: [
                        {
                            label: `Water Levels in ${data.name} (KL)`,
                            data: timeRangeData[newRange].waterLevels,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            setFormData((prevState) => ({
                ...prevState,
                photo: files[0],
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e) => {
      e.preventByDefault();
  
      const formData = new FormData();
      formData.append('name', formData.name);
      formData.append('phone', formData.phone);
      formData.append('location', formData.location);
      formData.append('issue', formData.issue);
      formData.append('description', formData.description);
      if (formData.photo) {
          formData.append('photo', formData.photo);
      }
  
      try {
          const response = await fetch('/api/report-problem', {
              method: 'POST',
              body: formData,
          });
  
          const result = await response.json();
          alert(result.message);
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while reporting the problem.');
      }
  };
  

    return (
        <div className="bg-slate-800 text-foreground min-h-screen">
            <nav className="fixed top-0 left-0 right-0 bg-slate-600 bg-opacity-75 shadow-md p-6 flex justify-between items-center z-10 backdrop-blur-sm" style={{ height: '120px' }}>
                <div className="flex items-center">
                    <img src="image.png" alt="Logo" className="h-24 w-96" />
                </div>
                <div className="space-x-4">
                    <a href="https://imcindore.mp.gov.in/our-services#Payment&Taxes#WaterCharges" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary">payment and taxes</a>
                    <ScrollLink to="data-analytics" smooth={true} className="text-muted hover:text-primary cursor-pointer">data analytics</ScrollLink>
                    <ScrollLink to="report-problem" smooth={true} className="text-muted hover:text-primary cursor-pointer">report problem</ScrollLink>
                    <a href="https://pvnpms.phmsa.dot.gov/PublicViewer/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary">MAP</a>
                </div>
            </nav>
            <main className="flex-grow mt-24 p-10">
                <ScrollElement name="data-analytics" className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Water Flow Data</h1>
                    <div className="mt-8">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Water Volume Data (cubic meters)',
                                        font: {
                                            size: 18,
                                        },
                                        color: '#333',
                                    },
                                    legend: {
                                        position: 'top',
                                        labels: {
                                            color: '#333',
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            color: '#333',
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            color: '#333',
                                        },
                                    },
                                },
                                onClick: handleAreaClick,
                            }}
                            height={400}
                        />
                        {selectedArea && detailChartData && (
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Water Levels in {selectedArea}</h2>
                                <Bar
                                    data={detailChartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: `Water Levels in ${selectedArea}`,
                                                font: {
                                                    size: 18,
                                                },
                                                color: '#333',
                                            },
                                            legend: {
                                                position: 'top',
                                                labels: {
                                                    color: '#333',
                                                },
                                            },
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: '#333',
                                                },
                                            },
                                            y: {
                                                ticks: {
                                                    color: '#333',
                                                },
                                            },
                                        },
                                    }}
                                    height={400}
                                />
                            </div>
                        )}
                    </div>
                </ScrollElement>

                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                  
                  
                  
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">House Water Flow Data</h1>
                    <input
                        type="text"
                        placeholder="Enter House ID"
                        value={inputId}
                        onChange={handleIdChange}
                        className="w-full p-2 border border-gray-300 text-black rounded-lg mb-4"
                    />
                    <select
                        value={selectedTimeRange}
                        onChange={handleTimeRangeChange}
                        className="w-full p-2 border border-gray-300 text-gray-800 rounded-lg mb-4"
                    >
                        <option value="today">Today</option>
                        <option value="1 month">1 Month</option>
                        <option value="6 months">6 Months</option>
                        <option value="1 year">1 Year</option>
                    </select>
                    <button onClick={handleSearch} className="bg-blue-500 text-gray-800  py-2 px-4 rounded-lg">Search</button>
                    {houseChartData && (
                        <div className="mt-8">
                            <Bar
                                data={houseChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: `Water Levels for House ID: ${inputId}`,
                                            font: {
                                                size: 18,
                                            },
                                            color: '#333',
                                        },
                                        legend: {
                                            position: 'top',
                                            labels: {
                                                color: '#333',
                                            },
                                        },
                                    },
                                    scales: {
                                        x: {
                                            ticks: {
                                                color: '#333',
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                color: '#333',
                                            },
                                        },
                                    },
                                }}
                                height={400}
                            />
                        </div>
                    )}
                </div>

                <ScrollElement name="report-problem" className="mt-16 bg-white p-6 rounded-lg shadow-lg" style={{ marginTop: '50px' }}>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Report a Problem</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 text-gray-800  rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 text-gray-800  rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 text-gray-800  rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issue" className="block text-gray-700 font-medium mb-2">Issue</label>
                            <input
                                type="text"
                                id="issue"
                                name="issue"
                                value={formData.issue}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300  text-gray-800 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 text-gray-800  rounded-lg"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">Photo</label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Submit</button>
                    </form>
                </ScrollElement>
            </main>
        </div>
    );
};

export default Widget;
