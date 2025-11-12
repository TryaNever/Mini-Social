export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
        <div className="relative w-32 h-32 rounded-full border-8 border-slate-700/30 border-t-purple-500 border-r-pink-500 animate-spin"></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-6 border-slate-700/30 border-b-cyan-400 border-l-blue-500 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50 animate-pulse"></div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <p className="text-white text-lg font-semibold tracking-wider animate-pulse">
            Chargement
            <span className="inline-block animate-bounce ml-1">.</span>
            <span
              className="inline-block animate-bounce ml-1"
              style={{ animationDelay: "0.2s" }}
            >
              .
            </span>
            <span
              className="inline-block animate-bounce ml-1"
              style={{ animationDelay: "0.4s" }}
            >
              .
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
