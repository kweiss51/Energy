// Copied from courses.html for homepage course display
const courseData = {
    foundation: [
        {
            title: "Energy Systems Fundamentals",
            description: "Transform from confused beginner to confident energy professional. Master core concepts through hands-on simulations.",
            outcomes: ["Understand energy system basics", "Read and interpret system diagrams", "Calculate basic energy flows"],
            duration: "3 weeks",
            level: "Beginner",
            image: "images/energy-fundamentals2",
            slug: "energy-fundamentals"
        },
        {
            title: "Renewable Energy Essentials",
            description: "Become the go-to expert for renewable energy solutions. Learn to evaluate and implement sustainable systems.",
            outcomes: ["Assess renewable potential", "Design basic solar systems", "Understand wind power basics"],
            duration: "3 weeks",
            level: "Beginner",
            image: "images/renewable-essentials2",
            slug: "renewable-essentials"
        }
    ],
    advanced: [
        {
            title: "Advanced Solar Design",
            description: "Transform into a solar design specialist. Master complex system design and optimization techniques.",
            outcomes: ["Design commercial systems", "Optimize for efficiency", "Master advanced modeling"],
            duration: "3 weeks",
            level: "Advanced",
            image: "images/advanced-solar2.jpeg",
            slug: "advanced-solar"
        },
        {
            title: "Grid Integration Mastery",
            description: "Become an integration expert. Learn to seamlessly connect renewable sources to existing grids.",
            outcomes: ["Master grid standards", "Design integration systems", "Solve complex challenges"],
            duration: "3 weeks",
            level: "Advanced",
            image: "images/grid-mastery2",
            slug: "grid-mastery"
        }
    ],
    specialized: [
        {
            title: "Energy Storage Solutions",
            description: "Lead the energy storage revolution. Master cutting-edge storage technologies and implementation.",
            outcomes: ["Design storage systems", "Optimize battery life", "Implement smart solutions"],
            duration: "3 weeks",
            level: "Specialized",
            image: "images/storage-solutions4",
            slug: "storage-solutions"
        },
        {
            title: "Microgrid Design",
            description: "Become a microgrid specialist. Design resilient, efficient systems for communities and industries.",
            outcomes: ["Design microgrids", "Implement controls", "Optimize performance"],
            duration: "3 weeks",
            level: "Specialized",
            image: "images/microgrid-design2",
            slug: "microgrid-design"
        }
    ]
};

function createCourseCard(course) {
    // Special case: Energy Fundamentals is now live
    const isEnergyFundamentals = course.slug === 'energy-fundamentals';
    return `
        <div class="course-card" data-level="${course.level.toLowerCase()}">
            <div class="course-card-inner">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                    <span class="course-duration">${course.duration}</span>
                </div>
                <div class="course-content">
                    <h3>${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-outcomes">
                        <h4>You'll Learn:</h4>
                        <ul>
                            ${course.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                        </ul>
                    </div>
                    <a href="pages/${isEnergyFundamentals ? 'energy-fundamentals/week1-lesson1.html' : course.slug + '/week1-lesson1.html'}" class="course-cta">
                        Start Learning
                        <span class="arrow">→</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderHomeCourses() {
    console.log('🔥 RENDERING COURSES - This should appear in console!');
    const allCourses = [...courseData.foundation, ...courseData.advanced, ...courseData.specialized];
    const courseGrid = document.getElementById('home-courses-grid');
    
    if (courseGrid) {
        console.log('✅ Found course grid element');
        const html = allCourses.map(course => createCourseCard(course)).join('');
        courseGrid.innerHTML = html;
        console.log('✅ Added', allCourses.length, 'courses to grid');
        
        // Force visibility with inline styles
        courseGrid.style.display = 'grid';
        courseGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        courseGrid.style.gap = '2rem';
        courseGrid.style.padding = '2rem';
        courseGrid.style.background = '#f5f5f7';
        courseGrid.style.minHeight = '500px';
        
        // Add emergency fallback content if cards aren't visible
        setTimeout(() => {
            if (courseGrid.children.length === 0) {
                courseGrid.innerHTML = `
                    <div style="background: white; padding: 2rem; border: 2px solid #007aff; border-radius: 12px;">
                        <h3 style="color: #1d1d1f; font-size: 1.5rem; margin-bottom: 1rem;">Emergency Fallback: Energy Systems Fundamentals</h3>
                        <p style="color: #6e6e73; margin-bottom: 1rem;">If you see this, the JavaScript is working but course cards aren't rendering properly.</p>
                        <a href="pages/energy-fundamentals/week1-lesson1.html" style="background: #007aff; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none;">Start Learning →</a>
                    </div>
                `;
            }
        }, 1000);
    } else {
        console.error('❌ Course grid element not found!');
        // Create the element if it doesn't exist
        const courseSection = document.querySelector('.course-section');
        if (courseSection) {
            const newGrid = document.createElement('div');
            newGrid.id = 'home-courses-grid';
            newGrid.className = 'course-grid';
            courseSection.appendChild(newGrid);
            renderHomeCourses(); // Try again
        }
    }
}

document.addEventListener('DOMContentLoaded', renderHomeCourses);

// Fallback for when DOMContentLoaded has already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHomeCourses);
} else {
    renderHomeCourses();
}
