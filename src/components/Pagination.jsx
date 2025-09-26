import React, { useState } from 'react'
import "../Styles/Pagination.css"

const Pagination = () => {

    const dummyPersons = [
        { id: 1, name: "Anand Nair", age: 25, designation: "Software Engineer" },
        { id: 2, name: "Divya Menon", age: 28, designation: "UI/UX Designer" },
        { id: 3, name: "Rajesh Pillai", age: 32, designation: "Project Manager" },
        { id: 4, name: "Sneha Nambiar", age: 24, designation: "Frontend Developer" },
        { id: 5, name: "Vivek Kurup", age: 30, designation: "Backend Developer" },
        { id: 6, name: "Lekshmi Warrier", age: 26, designation: "QA Engineer" },
        { id: 7, name: "Arjun Panicker", age: 27, designation: "Business Analyst" },
        { id: 8, name: "Kavya Nair", age: 29, designation: "Data Scientist" },
        { id: 9, name: "Mohan Menon", age: 31, designation: "DevOps Engineer" },
        { id: 10, name: "Pooja Varma", age: 23, designation: "Intern" },

        { id: 11, name: "Sandeep Kumar", age: 34, designation: "Team Lead" },
        { id: 12, name: "Anjali Ramesh", age: 22, designation: "Content Writer" },
        { id: 13, name: "Manoj Pillai", age: 35, designation: "Solution Architect" },
        { id: 14, name: "Shreya Nair", age: 27, designation: "HR Manager" },
        { id: 15, name: "Pradeep Menon", age: 29, designation: "Marketing Executive" },
        { id: 16, name: "Meera Kurian", age: 26, designation: "Graphic Designer" },
        { id: 17, name: "Sujith Nair", age: 33, designation: "Database Admin" },
        { id: 18, name: "Reshma Warrier", age: 24, designation: "SEO Specialist" },
        { id: 19, name: "Ajith Kumar", age: 32, designation: "System Analyst" },
        { id: 20, name: "Neethu Nambiar", age: 28, designation: "Digital Marketer" },

        { id: 21, name: "Vimal Nair", age: 30, designation: "Product Manager" },
        { id: 22, name: "Arya Menon", age: 23, designation: "Intern" },
        { id: 23, name: "Suresh Pillai", age: 36, designation: "Tech Lead" },
        { id: 24, name: "Devika Nair", age: 27, designation: "Recruiter" },
        { id: 25, name: "Harish Kurup", age: 29, designation: "Mobile Developer" },
        { id: 26, name: "Bindu Ramesh", age: 31, designation: "HR Executive" },
        { id: 27, name: "Rakesh Panicker", age: 28, designation: "Support Engineer" },
        { id: 28, name: "Aparna Warrier", age: 25, designation: "Research Analyst" },
        { id: 29, name: "Deepak Nair", age: 34, designation: "Operations Manager" },
        { id: 30, name: "Vidya Menon", age: 26, designation: "Trainer" },

        { id: 31, name: "Sanjay Kumar", age: 32, designation: "Security Analyst" },
        { id: 32, name: "Radhika Pillai", age: 24, designation: "Assistant Manager" },
        { id: 33, name: "Nikhil Nair", age: 29, designation: "AI Engineer" },
        { id: 34, name: "Athira Kurup", age: 27, designation: "Data Engineer" },
        { id: 35, name: "Binu Menon", age: 33, designation: "Cloud Architect" },
        { id: 36, name: "Revathi Varma", age: 25, designation: "Sales Executive" },
        { id: 37, name: "Jithin Warrier", age: 28, designation: "Fullstack Developer" },
        { id: 38, name: "Sreeja Nair", age: 26, designation: "Tester" },
        { id: 39, name: "Kiran Kumar", age: 31, designation: "Solutions Engineer" },
        { id: 40, name: "Anusha Nambiar", age: 22, designation: "Intern" },

        { id: 41, name: "Akhil Menon", age: 30, designation: "Machine Learning Engineer" },
        { id: 42, name: "Parvathy Nair", age: 27, designation: "Content Strategist" },
        { id: 43, name: "Sunil Pillai", age: 35, designation: "Delivery Manager" },
        { id: 44, name: "Athul Kurian", age: 28, designation: "Frontend Developer" },
        { id: 45, name: "Remya Varma", age: 29, designation: "Social Media Manager" },
        { id: 46, name: "Vishnu Nair", age: 32, designation: "Network Engineer" },
        { id: 47, name: "Gayathri Warrier", age: 24, designation: "Junior Designer" },
        { id: 48, name: "Aravind Kumar", age: 34, designation: "Finance Analyst" },
        { id: 49, name: "Soumya Menon", age: 25, designation: "HR Associate" },
        { id: 50, name: "Midhun Nair", age: 27, designation: "Software Developer" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(dummyPersons.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = dummyPersons.slice(startIndex, endIndex);


    const goToPage = (pageNumber) => {
        setCurrentPage(currentPage < totalPages ? pageNumber : 1);
    };




    return (
        <>

            <div className="card-grid">
                {currentData.map((di, index) => (
                    <div className="card" key={index}>
                        <h3>{di.name}</h3>
                        <p>Age: {di.age}</p>
                        <p>Designation: {di.designation}</p>
                    </div>
                ))}
            </div>

            <div className="btn-div">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    className='goto-btn'
                >
                    {currentPage - 1}
                </button>
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    className='goto-btn'
                >
                    {currentPage + 1}
                </button>
                

                

            </div>

        </>
    )
}

export default Pagination
