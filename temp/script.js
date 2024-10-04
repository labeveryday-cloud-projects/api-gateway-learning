// Simple fade-in animation for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };
    
    const fadeInOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        });
    }, options);

    sections.forEach(section => {
        fadeInOnScroll.observe(section);
    });
});
