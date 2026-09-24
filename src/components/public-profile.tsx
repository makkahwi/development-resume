export function PublicProfile() {
  return (
    <section className="publicProfile" aria-labelledby="profile-title">
      <div className="profileIntro">
        <p className="sectionEyebrow">PUBLIC PROFILE</p>
        <h2 id="profile-title">A little context before the conversation.</h2>
        <p>
          Suhaib Ahmad is a Jordan-based full-stack developer. This page brings
          together selected public details about his projects, technical work,
          education, and interests. The conversational experience is in
          development.
        </p>
      </div>

      <div className="profileGrid">
        <article className="profileCard">
          <span className="profileCardNumber">01 / WORK</span>
          <h3>What does Suhaib build?</h3>
          <p>
            He has worked on web applications and digital platforms, with
            experience across frontend and full-stack roles. His published
            technical skills include React, Next.js, NestJS, TypeScript, and
            Node.js.
          </p>
          <a href="https://suhaib.dev/en/hands-on">Explore his professional work <span aria-hidden="true">↗</span></a>
        </article>

        <article className="profileCard">
          <span className="profileCardNumber">02 / PROJECTS</span>
          <h3>Sanad and Mustaheq</h3>
          <p>
            On Sanad, Jordan’s digital government services platform, Suhaib
            built and maintained the frontend. For Mustaheq, a Saudi nonprofit
            coordination platform, he led full-stack development using React
            and NestJS.
          </p>
          <a href="https://suhaib.dev/en/hands-on">View project details <span aria-hidden="true">↗</span></a>
        </article>

        <article className="profileCard">
          <span className="profileCardNumber">03 / BACKGROUND</span>
          <h3>Jordan and Malaysia</h3>
          <p>
            Suhaib studied computer science at International Islamic
            University Malaysia, specializing in data science and computational
            intelligence. He also completed Python-based web development
            training at ASAC of LTUC College in Jordan.
          </p>
          <a href="https://www.iium.edu.my/">About IIUM <span aria-hidden="true">↗</span></a>
        </article>

        <article className="profileCard">
          <span className="profileCardNumber">04 / BEYOND WORK</span>
          <h3>Interests and everyday life</h3>
          <p>
            His public personal profile lists cooking, chess, motorcycles,
            swimming, walking, volleyball, and films among his interests.
          </p>
          <a href="https://personal.suhaib.dev">Explore his personal site <span aria-hidden="true">↗</span></a>
        </article>
      </div>

      <div className="profileLinks">
        <p>Connect with Suhaib</p>
        <a href="https://linkedin.com/in/SuhaibAhmadAi/">LinkedIn</a>
        <a href="https://github.com/makkahwi">GitHub</a>
        <a href="https://suhaib.dev">Professional portfolio</a>
      </div>
    </section>
  );
}
