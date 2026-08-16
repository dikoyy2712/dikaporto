/* =====================================================
   CYBER PORTFOLIO SYSTEM
===================================================== */


/* =====================================================
   PROFILE PARALLAX
===================================================== */

const profileVisual =
    document.querySelector(".profile-visual");


if (profileVisual) {

    document.addEventListener(
        "mousemove",
        function (event) {

            const x =
                (window.innerWidth / 2 - event.clientX)
                / 35;

            const y =
                (window.innerHeight / 2 - event.clientY)
                / 35;


            profileVisual.style.transform =
                `rotateY(${x}deg) rotateX(${y}deg)`;

        }
    );

}


/* =====================================================
   3D CARDS
===================================================== */

const interactiveCards =
    document.querySelectorAll(
        ".skill-card, .interest-card, .certificate-card, .daily-photo"
    );


interactiveCards.forEach(function(card) {

    card.addEventListener(
        "mousemove",
        function(event) {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;


            card.style.transform =
                `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        function() {

            card.style.transform =
                "";

        }
    );

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    function(element) {

        observer.observe(element);

    }
);


/* =====================================================
   CURSOR LIGHT
===================================================== */

const cursorGlow =
    document.createElement("div");


cursorGlow.style.position =
    "fixed";

cursorGlow.style.width =
    "200px";

cursorGlow.style.height =
    "200px";

cursorGlow.style.borderRadius =
    "50%";

cursorGlow.style.pointerEvents =
    "none";

cursorGlow.style.zIndex =
    "-1";

cursorGlow.style.background =
    `
    radial-gradient(
        circle,
        rgba(0,229,255,0.07),
        transparent 70%
    )
    `;

cursorGlow.style.transform =
    "translate(-50%, -50%)";


document.body.appendChild(
    cursorGlow
);


document.addEventListener(
    "mousemove",
    function(event) {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    }
);


/* =====================================================
   DIGITAL PARTICLES
===================================================== */

function createParticle() {

    const particle =
        document.createElement("span");


    particle.style.position =
        "fixed";

    particle.style.width =
        Math.random() * 3 + 1 + "px";

    particle.style.height =
        Math.random() * 3 + 1 + "px";

    particle.style.background =
        "#00e5ff";

    particle.style.borderRadius =
        "50%";

    particle.style.boxShadow =
        "0 0 8px #00e5ff";

    particle.style.pointerEvents =
        "none";

    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.top =
        Math.random() * 100 + "vh";

    particle.style.opacity =
        Math.random() * 0.5 + 0.1;

    particle.style.zIndex =
        "-1";


    document.body.appendChild(
        particle
    );


    particle.animate(

        [
            {
                transform:
                    "translateY(0)",
                opacity: 0
            },

            {
                transform:
                    "translateY(-100px)",
                opacity: 0.8
            },

            {
                transform:
                    "translateY(-200px)",
                opacity: 0
            }
        ],

        {
            duration:
                5000 +
                Math.random() * 3000,

            easing:
                "linear"
        }

    );


    setTimeout(
        function() {

            particle.remove();

        },

        8000
    );

}


setInterval(
    createParticle,
    700
);


/* =====================================================
   SYSTEM MESSAGE
===================================================== */

console.log(
    "%c SYSTEM ONLINE ",
    `
    color:#00e5ff;
    background:#030712;
    font-size:16px;
    padding:8px;
    `
);

console.log(
    "%c Portfolio system initialized.",
    `
    color:#7dd3fc;
    font-size:13px;
    `
);