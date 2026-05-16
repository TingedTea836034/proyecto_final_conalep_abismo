"use client";
import Preloader from "../../componentes/preloader.jsx";
import Post_hoyo from "../../componentes/post_hoyo.jsx";
import Preloader_1 from "../../componentes/preloader_1.jsx";
import { useState } from "react";

export default function Home() {
  const [finished, setFinished] = useState(false);

  return (
    <main className="relative w-full">
      
      {/* ✅ FIX: Cuando finished es true, el Preloader se desmonta completamente */}
      {!finished && <Preloader setFinished={setFinished} />}

      {finished && (
        <div className="relative w-full">
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Post_hoyo />
          </div>
          <div className="relative z-10">
            <Preloader_1 />
          </div>
          <div className="h-screen" />
        </div>
      )}

    </main>
  );
}