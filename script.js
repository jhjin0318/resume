// GSAP 및 ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 기존 페이드업(Fade-up) 애니메이션
    const revealElements = document.querySelectorAll(".gsap-reveal");
    revealElements.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", 
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 2. 상단 메뉴 & 우측 별 모양 네비게이션 스크롤 완벽 연동
    const sections = document.querySelectorAll("section");
    const allNavLinks = document.querySelectorAll("header nav a, #side-nav a"); 

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        allNavLinks.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
    });

    // 네비게이션 클릭 시 해당 섹션으로 부드럽게 스크롤
    allNavLinks.forEach((link) => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: targetId, offsetY: 50 },
                ease: "power2.inOut"
            });
        });
    });

    // ==========================================================================
    // 3. "기획자 진주형 입니다." 타자기 애니메이션 (기존 유지)
    // ==========================================================================
    const typingContainer = document.getElementById("typing-container");
    
    if (typingContainer) {
        const segments = [
            { text: "기획자\u00A0", className: "text-small" },
            { text: "진주형\u00A0", className: "text-big colored-name" }, 
            { text: "입니다.", className: "text-small" }
        ];

        let segIdx = 0;
        let charIdx = 0;
        typingContainer.innerHTML = ""; 

        function typeNextChar() {
            if (segIdx >= segments.length) return; 

            if (charIdx === 0) {
                const span = document.createElement("span");
                if (segments[segIdx].className) span.className = segments[segIdx].className;
                typingContainer.appendChild(span);
            }

            const currentSpan = typingContainer.lastElementChild;
            currentSpan.textContent += segments[segIdx].text[charIdx];
            charIdx++;

            if (charIdx >= segments[segIdx].text.length) {
                segIdx++;
                charIdx = 0;
            }

            setTimeout(typeNextChar, Math.random() * 50 + 100);
        }
        
        setTimeout(typeNextChar, 1200);
    }

    // ==========================================================================
    // 4. 스킬 원형 그래프 애니메이션 (0부터 차오르기) (기존 유지)
    // ==========================================================================
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const circle = item.querySelector('.progress-circle');
        const percentText = item.querySelector('.skill-percent');
        const targetPercent = parseInt(circle.getAttribute('data-target'));
        const circumference = 283; 
        
        const targetOffset = circumference - (circumference * targetPercent) / 100;
        
        ScrollTrigger.create({
            trigger: '#experience', 
            start: 'top 70%',
            onEnter: () => {
                gsap.to(circle, {
                    strokeDashoffset: targetOffset,
                    duration: 2, 
                    ease: "power2.out"
                });
                
                gsap.to(percentText, {
                    innerHTML: targetPercent,
                    duration: 2,
                    snap: { innerHTML: 1 }, 
                    ease: "power2.out",
                    onUpdate: function() {
                        percentText.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
                    }
                });
            },
            once: true 
        });
    });

    // ==========================================================================
    // 🔥 5. 하단 인사말 박스 유기적 맥동 애니메이션 (과하지 않게)
    // ==========================================================================
    const greetingBox = document.querySelector('.hero-greeting-box');

    if (greetingBox) {
        // 테두리 네온 광택 맥동 (box-shadow)
        gsap.to(greetingBox, {
            boxShadow: '0 0 35px rgba(70, 160, 230, 0.6), inset 0 0 20px rgba(70, 160, 230, 0.4)',
            duration: 3, // 3초 동안 천천히
            yoyo: true, // 갔다가 다시 옴 (맥동)
            repeat: -1, // 무한 반복
            ease: "power1.inOut" // 부드럽게
        });
    }

});