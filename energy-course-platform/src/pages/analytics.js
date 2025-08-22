const analytics = {
    trackPageView: function(page) {
        console.log(`Page viewed: ${page}`);
        // Here you would typically send this data to your analytics service
    },
    trackButtonClick: function(buttonName) {
        console.log(`Button clicked: ${buttonName}`);
        // Here you would typically send this data to your analytics service
    },
    trackCourseEnrollment: function(courseId) {
        console.log(`Course enrolled: ${courseId}`);
        // Here you would typically send this data to your analytics service
    }
};

// Example usage
document.addEventListener('DOMContentLoaded', function() {
    analytics.trackPageView(window.location.pathname);

    const enrollButtons = document.querySelectorAll('.enroll-button');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.dataset.courseId;
            analytics.trackCourseEnrollment(courseId);
            analytics.trackButtonClick('Enroll Now');
        });
    });
});