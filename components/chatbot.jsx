'use client';

import { useEffect } from 'react';

export default function Chatbot() {
  useEffect(() => {
 
    window.chatbaseUserConfig = {
      user_id: "guest-user", // Replace with dynamic user ID
      // user_hash must be generated on the server using the Secret Key
      user_hash: "", 
      user_metadata: {
        name: "Guest User",
        email: "",
        company: ""
      }
    };

  
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        }
      });

      const loadScript = () => {
        const script = document.createElement('script');
        script.src = 'https://www.chatbase.co/embed.min.js';
        script.id = 'npSlHbg482XuA35Y8tytC'; 
        script.domain = 'www.chatbase.co';
        document.body.appendChild(script);
      };

      if (document.readyState === 'complete') {
        loadScript();
      } else {
        window.addEventListener('load', loadScript);
      }
    }
  }, []);

  return null;
}
  