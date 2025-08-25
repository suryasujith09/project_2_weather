// import { useState } from "react";
// import { MessageCircle, X } from "lucide-react"; // icons

// export default function GeminiChat() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       {/* Floating Toggle Button */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
//         >
//           <MessageCircle size={24} />
//         </button>
//       )}

//       {/* Chat Window */}
//       {open && (
//         <div className="fixed bottom-4 right-4 w-72 h-96 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col">
//           {/* Header with Close Button */}
//           <div className="flex justify-between items-center bg-blue-600 text-white px-3 py-2">
//             <span className="font-semibold">Chatbot</span>
//             <button onClick={() => setOpen(false)}>
//               <X size={20} />
//             </button>
//           </div>

//           {/* Iframe */}
//           <iframe
//             src="https://www.chatbase.co/chatbot-iframe/7QLu7_3Q6YZzniGhxg095"
//             width="100%"
//             height="100%"
//             style={{ border: "none" }}
//             title="Chatbase Chatbot"
//           />
//         </div>
//       )}
//     </div>
//   );
// }
