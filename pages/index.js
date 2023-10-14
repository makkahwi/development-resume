import Link from "next/link";
import React from "react";

import { socialLinksList } from "./_document";

const ComingSoon = () => {
  const [days, setDays] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      commingSoonTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const commingSoonTime = () => {
    let endTime = new Date("Nov 1, 2023 17:00:00 PDT");
    let endTimeParse = Date.parse(endTime) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let days = Math.floor(timeLeft / 86400);
    let hours = Math.floor((timeLeft - days * 86400) / 3600);
    let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    let seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    );
    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  return (
    <div className="coming-soon-area">
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-lg-6 col-md-12 p-0">
            <div className="coming-soon-content">
              <div className="d-table">
                <div className="d-table-cell">
                  <Link href="/">
                    <span className="logo">
                      <img src="/images/logo.png" alt="image" />
                    </span>
                  </Link>
                  <h2>Rebranding Is In-Progress</h2>
                  <h3 className="my-4 text-primary">We will be back in...</h3>
                  <div
                    id="timer"
                    className="flex-wrap d-flex justify-content-center"
                  >
                    <div
                      id="days"
                      className="align-items-center flex-column d-flex justify-content-center bg-primary text-white"
                    >
                      {days} <span className="text-white">Days</span>
                    </div>
                    <div
                      id="hours"
                      className="align-items-center flex-column d-flex justify-content-center bg-primary text-white"
                    >
                      {hours} <span className="text-white">Hours</span>
                    </div>
                    <div
                      id="minutes"
                      className="align-items-center flex-column d-flex justify-content-center bg-primary text-white"
                    >
                      {minutes} <span className="text-white">Minutes</span>
                    </div>
                    <div
                      id="seconds"
                      className="align-items-center flex-column d-flex justify-content-center bg-primary text-white"
                    >
                      {seconds} <span className="text-white">Seconds</span>
                    </div>
                  </div>
                  <div className="single-footer-widget text-center">
                    <ul className="social-links">
                      {socialLinksList.map(({ icon, link }, i) => (
                        <li key={i}>
                          <a href={link} target="_blank" className="mx-2">
                            <i className={icon + " fw-light"} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 p-0">
            <div className="coming-soon-image">
              <img src="/images/coming-soon.jpg" alt="coming-soon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
