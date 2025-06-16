import CarouselComp from "@/components/carousel";
import PageSection from "@/components/pageSection";
import Typography from "@/components/typography";
import { Fragment } from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      author: "Noor Kayyali",
      content:
        "Suhaib has been an outstanding mentee and technical advisor. He showed strong commitment to every session, was always respectful, and a pleasure to work with. He also developed my website, which continues to receive compliments and has been key in presenting my professional identity. His work is thoughtful, reliable, and impactful—I highly recommend him.",
      link: "https://www.linkedin.com/in/noorkayyali",
      img: "noor.jpeg",
    },
    {
      author: "Mazen Adel",
      content:
        "I had the chance to work under Suhaib's command on several creative projects, and I am certain he is among the best and most supportive leaders I've ever had the opportunity to work under. Suhaib organized the tasks, oversaw the workflow, and made sure everything was running according to our goal. I personally hope to be able to continue with him in more projects. I learnt from him a lot in management and clean code.",
      link: "https://www.linkedin.com/in/mazen-adel-bab",
      img: "mazen.jpeg",
    },
    {
      author: "Hanan N.",
      content:
        "Suhaib has always been generous with his technical advice, especially in backend development and database design. His input was consistently thoughtful, practical, and rooted in solid experience. I truly appreciated his willingness to support and guide whenever we needed an expert opinion.",
      link: "https://www.linkedin.com/in/hananni",
      img: "hanan.jpeg",
    },
    {
      author: "Ahmad Alkharfan",
      content:
        "Great mentor, helped me get on my feet at the start of my career life",
      link: "https://www.linkedin.com/in/ahmad-alkharfan",
      img: "kharfan.jpeg",
    },
  ];

  return (
    <PageSection title="Testimonials" color="white" NoBg id="home">
      <CarouselComp
        items={testimonials.map(({ content, author, link, img }, i) => (
          <Fragment key={i}>
            <Typography size={6} color="info" className="lh-lg">
              {content}
            </Typography>

            <Typography size={6} color="dark" className="mt-5">
              <a href={link} target="_blank" className="text-decoration-none">
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/resume-data-8215f.appspot.com/o/${img}?alt=media`}
                  alt="Profile"
                  height="50px"
                  className="me-2 rounded-circle"
                />
                {author}
              </a>
            </Typography>
          </Fragment>
        ))}
      />
    </PageSection>
  );
};

export default TestimonialsSection;
