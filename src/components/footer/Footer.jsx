export default function Footer() {
    return (
        <footer className="w-full bg-black text-white bg-center bg-cover">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <img src="/logo.svg" alt="DataStock Pro" width="40" height="40" />
                    <span className="text-xl font-bold text-white">DataStock Pro</span>
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-slate-300">
                    Empowering Instagram sellers with smart inventory management tools. Track, manage, and grow your social commerce business with ease.
                </p>
            </div>
            <div className="border-t border-white/15">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="/" className="text-indigo-400 hover:text-indigo-300">DataStock Pro</a> 2024. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

