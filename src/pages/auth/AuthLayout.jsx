import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div
        className="w-full lg:w-1/2 flex items-center justify-center text-neutral-content p-8 relative min-h-[300px] lg:min-h-screen order-1 lg:order-2"
        style={{
          backgroundImage: "url(/phishnet/Phishnet-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative flex flex-col items-center lg:items-start justify-center text-center lg:text-left max-w-lg space-y-6">
          <img src="/phishnet/phishnet.png" alt="icon" className="w-24 h-24 lg:w-48 lg:h-48 mx-auto" />
          <h1 className="text-4xl lg:text-5xl font-bold">Welcome to PhishNet</h1>
          <p className="text-lg lg:text-xl">
            Gauge your team's cybersecurity awareness through simulated phishing attacks and stay one
            step ahead of threats.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100 p-6 order-2 lg:order-1">
        <div className="card w-full max-w-sm">
          <div className="card-body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
