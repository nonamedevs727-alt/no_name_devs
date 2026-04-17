import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { PenLine, X, Check, Trash2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NoteData {
  id: string;
  text: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

const NOTE_COLORS = ["#fef08a", "#fbcfe8", "#bfdbfe", "#bbf7d0", "#e9d5ff"];
const STORAGE_KEY = "nonamedev-guest-notes-v1";

// ─── Single draggable sticky note ─────────────────────────────────────────────
function StickyNote({
  note,
  isEditing,
  onEdit,
  onDone,
  onDelete,
  onChange,
}: {
  note: NoteData;
  isEditing: boolean;
  onEdit: () => void;
  onDone: () => void;
  onDelete: () => void;
  onChange: (u: Partial<NoteData>) => void;
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [caretPos, setCaretPos] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const x = useMotionValue(note.x);
  const y = useMotionValue(note.y);

  // random tilt per note
  const tilt = (note.id.charCodeAt(note.id.length - 1) % 10) - 5;

  const updateCaret = useCallback(() => {
    if (!textareaRef.current || !mirrorRef.current) return;
    const ta = textareaRef.current;
    const mr = mirrorRef.current;
    const text = ta.value.substring(0, ta.selectionEnd ?? 0);
    mr.textContent = text.endsWith("\n") ? text + "\u200b" : text;
    const sp = document.createElement("span");
    sp.textContent = "\u200b";
    mr.appendChild(sp);
    setCaretPos({ x: sp.offsetLeft - ta.scrollLeft, y: sp.offsetTop - ta.scrollTop });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ text: e.target.value });
    updateCaret();
    setIsTyping(true);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => setIsTyping(false), 500);
  };

  useEffect(() => {
    if (isEditing) textareaRef.current?.focus();
  }, [isEditing]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.7, x: note.x, y: note.y }}
      animate={{ opacity: 1, scale: isEditing ? 1 : 0.7, rotate: isEditing ? 0 : tilt, zIndex: isEditing ? 60 : 20 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      style={{ x, y, backgroundColor: note.color, position: "absolute", width: isEditing ? 220 : 100, height: isEditing ? "auto" : 100, minHeight: isEditing ? 220 : 100, overflow: "hidden", pointerEvents: "auto" }}
      onDragEnd={() => onChange({ x: x.get(), y: y.get() })}
      onClick={() => { if (!isEditing) onEdit(); }}
      className={`shadow-2xl rounded-sm flex flex-col overflow-hidden origin-center ${
        isEditing ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {/* Header bar */}
      <div className="bg-black/10 px-2 py-1.5 flex justify-between items-center border-b border-black/10 h-8 cursor-move">
        {isEditing ? (
          <>
            <div className="flex gap-1.5">
              {NOTE_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={(e) => { e.stopPropagation(); onChange({ color: c }); }}
                  className={`w-3 h-3 rounded-full border border-black/20 transition-transform ${
                    note.color === c ? "scale-125 ring-1 ring-black/40" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onDone(); }}
                className="p-1 hover:bg-black/10 rounded-full transition-colors text-black/60"
              >
                <Check size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-1 hover:bg-black/10 rounded-full transition-colors text-black/60"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full" />
        )}
      </div>

      {/* Name line (only when editing) */}
      {isEditing && (
        <input
          type="text"
          value={note.name}
          placeholder="Your name (optional)"
          onChange={(e) => onChange({ name: e.target.value })}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-full px-3 pt-2 pb-1 bg-transparent text-[10px] font-mono uppercase tracking-widest text-black/50 placeholder:text-black/30 outline-none border-b border-black/10"
          maxLength={32}
        />
      )}

      {/* Note name on collapsed card */}
      {!isEditing && note.name && (
        <div className="px-3 pt-2 text-[9px] font-mono uppercase tracking-widest text-black/40">
          — {note.name}
        </div>
      )}

      {/* Textarea */}
      <div className="relative flex-1 flex flex-col overflow-hidden">
        <textarea
          ref={textareaRef}
          value={note.text}
          onChange={handleChange}
          onSelect={updateCaret}
          onScroll={updateCaret}
          onPointerDown={(e) => e.stopPropagation()}
          readOnly={!isEditing}
          placeholder="Leave us a note..."
          rows={6}
          className={`w-full flex-1 p-3 bg-transparent resize-none outline-none text-xs text-black/80 leading-relaxed placeholder:text-black/30 [&::-webkit-scrollbar]:hidden ${
            !isEditing ? "pointer-events-none" : ""
          }`}
          spellCheck={false}
          style={{ minHeight: isEditing ? 120 : 60 }}
        />
        {/* Mirror div for caret tracking */}
        {isEditing && (
          <div
            ref={mirrorRef}
            className="absolute inset-0 p-4 text-sm leading-relaxed whitespace-pre-wrap break-words opacity-0 pointer-events-none"
            aria-hidden
          />
        )}
        {/* Animated pen at caret */}
        <AnimatePresence>
          {isEditing && isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [-5, 10, -5, 15, -10, 5],
                x: [0, 3, -2, 4, -1, 0],
                y: [0, -3, 2, -4, 1, 0],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                rotate: { repeat: Infinity, duration: 0.28, ease: "easeInOut" },
                x: { repeat: Infinity, duration: 0.22, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 0.32, ease: "easeInOut" },
                opacity: { duration: 0.15 },
              }}
              className="absolute pointer-events-none z-20 text-gray-800 drop-shadow-lg origin-bottom-left"
              style={{ left: caretPos.x + 12, top: caretPos.y + 36 }}
            >
              <PenLine size={22} className="fill-gray-800/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner fold */}
      <div className="absolute bottom-0 right-0 w-7 h-7 bg-gradient-to-tl from-black/15 to-transparent rounded-tl-md opacity-60 pointer-events-none" />
    </motion.div>
  );
}

// ─── Main GuestNotes overlay ───────────────────────────────────────────────────
export default function GuestNotes() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [boardOpen, setBoardOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setNotes(JSON.parse(saved));
    } catch {}
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes, isLoaded]);

  const createNote = () => {
    const id = Date.now().toString();
    const newNote: NoteData = {
      id,
      text: "",
      name: "",
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      x: window.innerWidth / 2 - 50,
      y: window.innerHeight / 2 - 50,
    };
    setNotes((prev) => [...prev, newNote]);
    setEditingId(id);
    setBoardOpen(true);
  };

  const updateNote = (id: string, updates: Partial<NoteData>) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <>
      {/* ── Board toggle button (bottom-left) ── */}
      <div className="absolute bottom-8 left-6 z-30 flex flex-col items-start gap-2">
        {/* Note count badge */}
        {notes.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setBoardOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-[#1f3324]/10 bg-white/80 px-3 py-1.5 backdrop-blur-sm shadow-sm"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4d6a51]">
              {notes.length} note{notes.length !== 1 ? "s" : ""}
            </span>
          </motion.button>
        )}

        {/* Pen FAB */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={createNote}
          title="Leave a note for NOname dev"
          className="group flex items-center gap-2 rounded-full border border-[#1f3324]/15 bg-[#1f3324] px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#2d4a32]"
        >
          <PenLine size={16} className="text-[#dfe6df] group-hover:-rotate-12 transition-transform duration-300" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#dfe6df]">Leave a note</span>
        </motion.button>
      </div>

      {/* ── Sticky notes board overlay ── */}
      <AnimatePresence>
        {boardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-40"
            style={{ pointerEvents: "none" }}
          >
            {/* dim backdrop only when editing */}
            {editingId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                style={{ pointerEvents: "auto" }}
                onClick={() => setEditingId(null)}
              />
            )}

            {/* Close board button */}
            <button
              onClick={() => { setBoardOpen(false); setEditingId(null); }}
              className="absolute top-24 right-6 z-50 rounded-full border border-[#1f3324]/15 bg-white/80 p-2 backdrop-blur-sm shadow-md hover:bg-white transition-colors sm:top-6"
              style={{ pointerEvents: "auto" }}
            >
              <X size={16} className="text-[#4d6a51]" />
            </button>

            {/* Notes */}
            <AnimatePresence>
              {notes.map((note) => (
                <StickyNote
                  key={note.id}
                  note={note}
                  isEditing={editingId === note.id}
                  onEdit={() => setEditingId(note.id)}
                  onDone={() => setEditingId(null)}
                  onDelete={() => deleteNote(note.id)}
                  onChange={(updates) => updateNote(note.id, updates)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
