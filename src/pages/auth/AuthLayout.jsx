import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(/Phishnet-bg.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>

      <div className="h-full hero-content flex-col-reverse lg:flex-row-reverse text-neutral-content">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl text-base-content">
          <div className="card-body">
            <Outlet />
          </div>
        </div>

        <div className="text-center lg:text-left max-w-lg lg:mr-12">
          <h1 className="text-5xl font-bold">Welcome to PhishNet</h1>
          <p className="py-6">
            Gauge your team's cybersecurity awareness through simulated phishing attacks and stay one
            step ahead of threats.
          </p>
        </div>
      </div>
    </div>
  );
}
